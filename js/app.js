/* API 해킹 야간 노트 — app shell */
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const state = {
    view: "landing",
    chapterId: null,
    flashIdx: 0,
  };

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => t.classList.remove("show"), 2800);
  }

  function showView(name) {
    state.view = name;
    $$(".view").forEach((v) => {
      const on = v.dataset.view === name;
      v.classList.toggle("active", on);
      if (v.id === "landing-view" && !on) v.style.display = "none";
    });
    const shell = $("#study-shell");
    if (name !== "landing" && shell) {
      shell.style.display = "grid";
      shell.classList.add("active");
    }
    try {
      window.scrollTo(0, 0);
    } catch (_) {
      /* ignore */
    }
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function difficultyDots(n) {
    return `<span class="diff" title="난이도 ${n}/5">${[1, 2, 3, 4, 5]
      .map((i) => `<i class="${i <= n ? "on" : ""}"></i>`)
      .join("")}</span>`;
  }

  function renderBlock(b) {
    if (!b) return "";
    switch (b.type) {
      case "p":
        return `<p>${esc(b.text)}</p>`;
      case "list":
        return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      case "callout":
        return `<div class="callout ${esc(b.tone || "tip")}"><div class="ct">${esc(b.title || "Note")}</div><div>${esc(b.text)}</div></div>`;
      case "code":
        return `<div class="codeblock"><div class="chd"><span>${esc(b.title || b.lang || "code")}</span><button type="button" class="copy" data-copy="${esc(b.code)}">copy</button></div><pre>${esc(b.code)}</pre></div>`;
      case "table": {
        const head = `<tr>${b.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>`;
        const rows = b.rows
          .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
      }
      case "cards":
        return `<div class="cards">${b.items
          .map((c) => `<div class="mini-card"><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div>`)
          .join("")}</div>`;
      default:
        return "";
    }
  }

  function updateProgressUI() {
    const st = Progress.stats(CURRICULUM);
    const bar = $("#global-bar");
    if (bar) bar.style.width = st.pct + "%";
    const label = $("#global-pct");
    if (label) label.textContent = `${st.done}/${st.total} · ${st.pct}%`;
    const xp = $("#global-xp");
    if (xp) xp.textContent = `XP ${st.xp}`;

    // nav checks
    $$(".nav-item").forEach((btn) => {
      const id = btn.dataset.id;
      btn.classList.toggle("done", !!st.completed[id]);
      btn.classList.toggle("active", id === state.chapterId);
    });

    // achievements toast
    const s = Progress.get();
    if (s._justUnlocked?.length) {
      const ach = CURRICULUM.achievements || [];
      s._justUnlocked.forEach((id) => {
        const a = ach.find((x) => x.id === id);
        if (a) toast(`${a.icon} 업적 해제: ${a.title}`);
      });
      delete s._justUnlocked;
      Progress.save(s);
    }
  }

  function buildSidebar() {
    const nav = $("#side-nav");
    if (!nav) return;
    const st = Progress.stats(CURRICULUM);
    let html = "";
    for (const part of CURRICULUM.parts) {
      html += `<div class="nav-section"><div class="nav-part"><span class="pdot" style="background:${part.color}"></span>${esc(part.num)}. ${esc(part.title)}</div>`;
      for (const ch of CURRICULUM.chapters.filter((c) => c.part === part.id)) {
        const done = st.completed[ch.id] ? "done" : "";
        html += `<button type="button" class="nav-item ${done}" data-id="${ch.id}">
          <span class="num">${esc(ch.num)}</span>
          <span class="title">${esc(ch.title)}</span>
          <span class="check"></span>
        </button>`;
      }
      html += `</div>`;
    }
    nav.innerHTML = html;
    nav.onclick = (e) => {
      const btn = e.target.closest(".nav-item");
      if (!btn) return;
      openChapter(btn.dataset.id);
      closeMobileNav();
    };
  }

  function openChapter(id) {
    const ch = CURRICULUM.chapters.find((c) => c.id === id);
    if (!ch) return;
    state.chapterId = id;
    showView("study");
    $("#panel-dashboard").hidden = true;
    $("#panel-chapter").hidden = false;
    $("#panel-tools").hidden = true;
    $("#panel-glossary").hidden = true;
    $("#panel-achievements").hidden = true;
    $("#panel-flash").hidden = true;

    const part = CURRICULUM.parts.find((p) => p.id === ch.part);
    $("#crumb").innerHTML = `<span>${esc(part ? "PART " + part.num : "")}</span> · <strong>${esc(ch.title)}</strong>`;

    const st = Progress.get();
    const done = !!st.completed[id];

    const toc =
      ch.sections.length > 1
        ? `<nav class="sec-toc" aria-label="이 장 목차">${ch.sections
            .map(
              (sec) =>
                `<a href="#sec-${esc(sec.id)}">${esc(sec.id)} · ${esc(sec.title)}</a>`
            )
            .join("")}</nav>`
        : "";

    let sections = ch.sections
      .map((sec, i) => {
        const note = sec.note ? `<div class="personal-note">✏️ ${esc(sec.note)}</div>` : "";
        const body = (sec.body || []).map(renderBlock).join("");
        return `<article class="section" id="sec-${esc(sec.id)}">
          <h2><span class="sn">${esc(sec.id)}</span> ${esc(sec.title)}</h2>
          ${note}${body}
        </article>`;
      })
      .join("");

    let take = "";
    if (ch.keyTakeaways?.length) {
      take = `<div class="panel"><h3>🔑 한 장 정리</h3><ul class="takeaways">${ch.keyTakeaways
        .map((t) => `<li>${esc(t)}</li>`)
        .join("")}</ul></div>`;
    }

    let checklist = "";
    if (ch.checklist?.length) {
      checklist = `<div class="panel"><h3>☑️ 미니 체크</h3><ul>${ch.checklist
        .map((t) => `<li>${esc(t)}</li>`)
        .join("")}</ul></div>`;
    }

    let lab = "";
    if (ch.lab) {
      const labDone = !!st.labs[id];
      lab = `<div class="panel lab-panel">
        <h3>🧪 ${esc(ch.lab.title)}</h3>
        <p><strong>목표:</strong> ${esc(ch.lab.goal)}</p>
        <ol>${ch.lab.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-lab" ${labDone ? "disabled" : ""}>
          ${labDone ? "✓ 랩 완료 표시됨" : "랩 완료로 표시 (+XP)"}
        </button>
      </div>`;
    }

    // quiz
    const qs = (window.QUIZZES && QUIZZES[id]) || [];
    let quiz = "";
    if (qs.length) {
      quiz = `<div class="panel quiz-panel"><h3>🎯 이해도 퀴즈</h3>
        <div id="quiz-box">${qs
          .map(
            (q, qi) => `<div class="quiz-q" data-qi="${qi}">
            <div class="qq">Q${qi + 1}. ${esc(q.q)}</div>
            <div class="quiz-choices">${q.choices
              .map(
                (c, ci) =>
                  `<label><input type="radio" name="q${qi}" value="${ci}" /> <span>${esc(c)}</span></label>`
              )
              .join("")}</div>
          </div>`
          )
          .join("")}
          <button type="button" class="btn btn-primary btn-sm" id="btn-quiz">채점하기</button>
          <div id="quiz-result" style="margin-top:0.75rem;color:var(--muted);font-size:0.9rem"></div>
        </div></div>`;
    }

    const idx = CURRICULUM.chapters.findIndex((c) => c.id === id);
    const prev = CURRICULUM.chapters[idx - 1];
    const next = CURRICULUM.chapters[idx + 1];

    $("#panel-chapter").innerHTML = `
      <header class="ch-hero" data-num="${esc(ch.num)}">
        <div class="ch-meta">
          <span class="tag cyan">PART ${esc(part?.num || "")}</span>
          <span class="tag">Ch.${esc(ch.num)}</span>
          <span class="tag amber">~${ch.minutes}분</span>
          <span class="tag pink">+${ch.xp} XP</span>
          <span class="tag">${difficultyDots(ch.difficulty)}</span>
          ${done ? '<span class="tag" style="color:var(--green);border-color:rgba(52,211,153,.4)">완료</span>' : ""}
        </div>
        <h1>${esc(ch.title)}</h1>
        <p class="tagline">${esc(ch.tagline)}</p>
      </header>
      ${toc}
      ${sections}
      ${take}
      ${checklist}
      ${lab}
      ${quiz}
      <div class="ch-actions">
        <button type="button" class="btn btn-primary" id="btn-complete">${done ? "✓ 완료됨 (다시 저장)" : "이 장 완료하기"}</button>
        ${prev ? `<button type="button" class="btn btn-ghost" data-go="${prev.id}">← ${esc(prev.title)}</button>` : ""}
        ${next ? `<button type="button" class="btn btn-ghost" data-go="${next.id}">${esc(next.title)} →</button>` : ""}
      </div>
    `;

    $("#btn-complete").onclick = () => {
      Progress.completeChapter(id, ch.xp);
      updateProgressUI();
      toast(`완료! +${ch.xp} XP — ${ch.title}`);
      openChapter(id);
    };

    const labBtn = $("#btn-lab");
    if (labBtn) {
      labBtn.onclick = () => {
        Progress.completeLab(id);
        updateProgressUI();
        toast("실험실 완료 표시 +40 XP");
        openChapter(id);
      };
    }

    const quizBtn = $("#btn-quiz");
    if (quizBtn) {
      quizBtn.onclick = () => gradeQuiz(id, qs);
    }

    $("#panel-chapter").onclick = (e) => {
      const go = e.target.closest("[data-go]");
      if (go) openChapter(go.dataset.go);
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        navigator.clipboard?.writeText(copy.getAttribute("data-copy")).then(() => toast("복사됨"));
      }
    };

    updateProgressUI();
    const s = Progress.get();
    s.lastChapter = id;
    Progress.save(s);
  }

  function gradeQuiz(id, qs) {
    let score = 0;
    qs.forEach((q, qi) => {
      const box = $(`.quiz-q[data-qi="${qi}"]`);
      const labels = $$("label", box);
      labels.forEach((l) => l.classList.remove("correct", "wrong"));
      const selected = $(`input[name="q${qi}"]:checked`, box);
      const ans = q.a;
      labels[ans]?.classList.add("correct");
      if (selected) {
        const v = Number(selected.value);
        if (v === ans) score++;
        else labels[v]?.classList.add("wrong");
      }
    });
    Progress.recordQuiz(id, score, qs.length);
    updateProgressUI();
    const el = $("#quiz-result");
    el.textContent = `결과: ${score}/${qs.length}` + (score === qs.length ? " 🎉 만점! 저자급 감각." : " — 틀린 보기를 다시 읽어보세요.");
    toast(`퀴즈 ${score}/${qs.length}`);
  }

  function openDashboard() {
    state.chapterId = null;
    showView("study");
    $("#panel-dashboard").hidden = false;
    $("#panel-chapter").hidden = true;
    $("#panel-tools").hidden = true;
    $("#panel-glossary").hidden = true;
    $("#panel-achievements").hidden = true;
    $("#panel-flash").hidden = true;
    $("#crumb").innerHTML = "<strong>커리큘럼 대시보드</strong>";

    const st = Progress.stats(CURRICULUM);
    let parts = CURRICULUM.parts
      .map((p) => {
        const ps = st.byPart[p.id];
        return `<button type="button" class="part-card" data-part="${p.id}">
          <div class="ph">
            <span class="picon" style="color:${p.color};border-color:${p.color}55;background:${p.color}18">${p.icon}</span>
            <span class="tag">${ps.done}/${ps.total}</span>
          </div>
          <h3>PART ${esc(p.num)} · ${esc(p.title)}</h3>
          <p>${esc(p.subtitle)}</p>
          <div class="bar"><i style="width:${ps.pct}%"></i></div>
        </button>`;
      })
      .join("");

    let list = CURRICULUM.chapters
      .map((ch) => {
        const done = st.completed[ch.id];
        return `<button type="button" class="ch-row" data-id="${ch.id}">
          <span class="cn">${esc(ch.num)}</span>
          <div><h4>${done ? "✓ " : ""}${esc(ch.title)}</h4><small>${esc(ch.tagline)} · ${ch.minutes}분</small></div>
          ${difficultyDots(ch.difficulty)}
        </button>`;
      })
      .join("");

    $("#panel-dashboard").innerHTML = `
      <header class="ch-hero" data-num="◈">
        <div class="ch-meta">
          <span class="tag cyan">야간 노트</span>
          <span class="tag">${st.pct}% 완료</span>
          <span class="tag pink">XP ${st.xp}</span>
        </div>
        <h1>혼자 정리한 API 해킹 로드맵</h1>
        <p class="tagline">코리 볼 《API 해킹의 모든 것》 흐름을 따라, 조금씩 — 끝까지. 끝나면 저자급 지도를 머릿속에 남긴다.</p>
      </header>
      <div class="dash-grid">${parts}</div>
      <h3 style="margin:0 0 0.75rem">전체 장</h3>
      <div class="ch-list">${list}</div>
    `;

    $("#panel-dashboard").onclick = (e) => {
      const row = e.target.closest("[data-id]");
      if (row) return openChapter(row.dataset.id);
      const part = e.target.closest("[data-part]");
      if (part) {
        const first = CURRICULUM.chapters.find((c) => c.part === part.dataset.part);
        if (first) openChapter(first.id);
      }
    };
    updateProgressUI();
  }

  function openTools() {
    Progress.visitTools();
    updateProgressUI();
    showView("study");
    $("#panel-dashboard").hidden = true;
    $("#panel-chapter").hidden = true;
    $("#panel-tools").hidden = false;
    $("#panel-glossary").hidden = true;
    $("#panel-achievements").hidden = true;
    $("#panel-flash").hidden = true;
    $("#crumb").innerHTML = "<strong>인터랙티브 도구</strong>";

    const owasp = Tools.owaspMap()
      .map(
        (r) =>
          `<tr><td><b>${esc(r.id)}</b></td><td>${esc(r.name)}</td><td>${esc(r.ch)}</td><td>${esc(r.tip)}</td></tr>`
      )
      .join("");

    $("#panel-tools").innerHTML = `
      <header class="ch-hero" data-num="{ }">
        <h1>해커 작업대</h1>
        <p class="tagline">읽기만 하지 말고, 토큰을 까보고 요청을 조립해보자.</p>
      </header>
      <div class="tools-grid">
        <div class="tool-card">
          <h3>JWT 디코더</h3>
          <p class="desc">header · payload 를 펼치고 위험한 클레임을 표시합니다. (서명 검증 없음 — 학습용)</p>
          <div class="field"><label>JWT</label><textarea id="jwt-in" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTkwMDAwMDAwMH0.sig">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InVzZXIiLCJleHAiOjE5MDAwMDAwMDB9.signature</textarea></div>
          <button type="button" class="btn btn-primary btn-sm" id="jwt-go">디코드</button>
          <div class="tool-out" id="jwt-out">결과가 여기 표시됩니다.</div>
        </div>
        <div class="tool-card">
          <h3>HTTP 요청 빌더</h3>
          <p class="desc">메서드·호스트·헤더·바디로 raw 요청 골격을 만듭니다. Burp Repeater에 붙여넣기용.</p>
          <div class="field"><label>Method</label>
            <select id="http-method"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option><option>OPTIONS</option></select>
          </div>
          <div class="field"><label>Host</label><input id="http-host" value="crapi.example" /></div>
          <div class="field"><label>Path</label><input id="http-path" value="/api/v1/vehicle/1/location" /></div>
          <div class="field"><label>Headers (한 줄에 하나)</label><textarea id="http-headers">Authorization: Bearer ATTACKER_TOKEN
Accept: application/json</textarea></div>
          <div class="field"><label>Body (optional)</label><textarea id="http-body"></textarea></div>
          <button type="button" class="btn btn-primary btn-sm" id="http-go">생성</button>
          <div class="tool-out" id="http-out"></div>
        </div>
        <div class="tool-card">
          <h3>상태 코드 해석기</h3>
          <p class="desc">해커 관점에서 응답 코드를 읽습니다.</p>
          <div class="field"><label>Status</label><input id="st-in" type="number" value="403" /></div>
          <button type="button" class="btn btn-primary btn-sm" id="st-go">해석</button>
          <div class="tool-out" id="st-out"></div>
        </div>
        <div class="tool-card">
          <h3>퍼징 아이디어 생성</h3>
          <p class="desc">파라미터 이름만 넣으면 책 흐름 기준 체크 리스트를 뱉습니다.</p>
          <div class="field"><label>Parameter</label><input id="fuzz-in" value="userId" /></div>
          <button type="button" class="btn btn-primary btn-sm" id="fuzz-go">생성</button>
          <div class="tool-out" id="fuzz-out"></div>
        </div>
        <div class="tool-card">
          <h3>OWASP API ↔ 이 노트 매핑</h3>
          <p class="desc">Top 10 감각을 커리큘럼 장과 연결합니다. (번호는 학습용 정렬)</p>
          <div class="table-wrap"><table>
            <thead><tr><th>ID</th><th>이름</th><th>관련 장</th><th>한 줄 액션</th></tr></thead>
            <tbody>${owasp}</tbody>
          </table></div>
        </div>
      </div>
    `;

    $("#jwt-go").onclick = () => {
      const r = Tools.decodeJwt($("#jwt-in").value);
      if (r.error) {
        $("#jwt-out").textContent = r.error;
        return;
      }
      $("#jwt-out").textContent = `== header ==\n${r.header}\n\n== payload ==\n${r.payload}\n\n== signature ==\n${r.signature}\n\n== notes ==\n${r.notes}`;
    };
    $("#http-go").onclick = () => {
      $("#http-out").textContent = Tools.buildHttp({
        method: $("#http-method").value,
        host: $("#http-host").value,
        path: $("#http-path").value,
        headers: $("#http-headers").value,
        body: $("#http-body").value,
      });
    };
    $("#st-go").onclick = () => {
      $("#st-out").textContent = Tools.statusExplain($("#st-in").value);
    };
    $("#fuzz-go").onclick = () => {
      $("#fuzz-out").textContent = Tools.fuzzIdeas($("#fuzz-in").value);
    };
  }

  function openGlossaryOnce() {
    showView("study");
    $("#panel-dashboard").hidden = true;
    $("#panel-chapter").hidden = true;
    $("#panel-tools").hidden = true;
    $("#panel-glossary").hidden = false;
    $("#panel-achievements").hidden = true;
    $("#panel-flash").hidden = true;
    $("#crumb").innerHTML = "<strong>용어집</strong>";
    $("#panel-glossary").innerHTML = `
      <header class="ch-hero" data-num="Aa"><h1>용어집</h1>
      <p class="tagline">책·노트에 반복되는 단어를 한곳에.</p></header>
      <div class="field"><label>검색</label><input id="gloss-search" placeholder="BOLA, JWT..." /></div>
      <div class="glossary-list" id="gloss-list"></div>`;
    const render = () => {
      const q = ($("#gloss-search").value || "").toLowerCase();
      const items = (CURRICULUM.glossary || []).filter(
        (g) => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)
      );
      $("#gloss-list").innerHTML = items
        .map((g) => `<div class="g-item"><b>${esc(g.term)}</b><span>${esc(g.def)}</span></div>`)
        .join("");
    };
    $("#gloss-search").oninput = render;
    render();
  }

  function openAchievements() {
    showView("study");
    $("#panel-dashboard").hidden = true;
    $("#panel-chapter").hidden = true;
    $("#panel-tools").hidden = true;
    $("#panel-glossary").hidden = true;
    $("#panel-achievements").hidden = false;
    $("#panel-flash").hidden = true;
    $("#crumb").innerHTML = "<strong>업적</strong>";
    const s = Progress.get();
    $("#panel-achievements").innerHTML = `
      <header class="ch-hero" data-num="★"><h1>업적</h1>
      <p class="tagline">진도를 게임처럼. 전부 모으면 👑</p></header>
      <div class="ach-grid">${(CURRICULUM.achievements || [])
        .map((a) => {
          const on = !!s.achievements[a.id];
          return `<div class="ach ${on ? "unlocked" : ""}"><div class="ai">${a.icon}</div><h4>${esc(a.title)}</h4><p>${esc(a.desc)}</p></div>`;
        })
        .join("")}</div>
      <p style="margin-top:1.5rem;color:var(--faint);font-size:0.85rem">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-reset">진도 초기화</button>
      </p>`;
    $("#btn-reset").onclick = () => {
      if (confirm("모든 진도·XP·업적을 지울까요?")) {
        Progress.reset();
        updateProgressUI();
        buildSidebar();
        openAchievements();
        toast("초기화 완료");
      }
    };
  }

  function openFlash() {
    showView("study");
    $("#panel-dashboard").hidden = true;
    $("#panel-chapter").hidden = true;
    $("#panel-tools").hidden = true;
    $("#panel-glossary").hidden = true;
    $("#panel-achievements").hidden = true;
    $("#panel-flash").hidden = false;
    $("#crumb").innerHTML = "<strong>플래시카드</strong>";

    const cards = [];
    for (const g of CURRICULUM.glossary || []) {
      cards.push({ front: g.term, back: g.def });
    }
    for (const ch of CURRICULUM.chapters) {
      for (const t of ch.keyTakeaways || []) {
        cards.push({ front: `Ch.${ch.num} 한 줄`, back: t });
      }
    }

    if (!cards.length) return;
    if (state.flashIdx >= cards.length) state.flashIdx = 0;
    let flipped = false;

    const paint = () => {
      const c = cards[state.flashIdx];
      $("#panel-flash").innerHTML = `
        <header class="ch-hero" data-num="▤"><h1>플래시카드</h1>
        <p class="tagline">출퇴근·쉬어갈 때. ${state.flashIdx + 1} / ${cards.length}</p></header>
        <div class="flash-wrap"><div class="flash" id="flash-card">
          <div><div class="fs">${flipped ? "ANSWER" : "PROMPT"}</div>
          <div class="ft">${esc(flipped ? c.back : c.front)}</div></div>
        </div></div>
        <div class="cta-row" style="justify-content:center;margin-top:1rem">
          <button type="button" class="btn btn-ghost btn-sm" id="f-prev">← 이전</button>
          <button type="button" class="btn btn-primary btn-sm" id="f-flip">뒤집기</button>
          <button type="button" class="btn btn-ghost btn-sm" id="f-next">다음 →</button>
        </div>`;
      $("#flash-card").onclick = () => {
        flipped = !flipped;
        paint();
      };
      $("#f-flip").onclick = () => {
        flipped = !flipped;
        paint();
      };
      $("#f-prev").onclick = () => {
        state.flashIdx = (state.flashIdx - 1 + cards.length) % cards.length;
        flipped = false;
        paint();
      };
      $("#f-next").onclick = () => {
        state.flashIdx = (state.flashIdx + 1) % cards.length;
        flipped = false;
        paint();
      };
    };
    paint();
  }

  function closeMobileNav() {
    $("#sidebar")?.classList.remove("open");
    $("#sidebar-backdrop")?.classList.remove("show");
  }

  function typeTerminal() {
    const el = $("#term-lines");
    if (!el) return;
    const lines = [
      { cls: "t-muted", t: "# 야간 세션 — API surface mapping" },
      { cls: "t-cyan", t: "$ recon --target api.example.com --mode passive" },
      { cls: "t-green", t: "✓ OSINT: 12 subdomains, 3 swagger hits" },
      { cls: "t-cyan", t: "$ burp history | grep '/api/' | sort -u" },
      { cls: "t-violet", t: "→ BOLA candidate: GET /api/v2/orders/{id}" },
      { cls: "t-cyan", t: "$ ab-test --token A --object B.id" },
      { cls: "t-pink", t: "💥 200 OK — foreign PII in response" },
      { cls: "t-amber", t: "note: 권한은 객체 단위로. 오늘 장: Ch.10" },
    ];
    el.innerHTML = "";
    let i = 0;
    const tick = () => {
      if (i >= lines.length) {
        el.innerHTML += `<div><span class="t-cyan">$</span> <span class="cursor"></span></div>`;
        return;
      }
      const L = lines[i++];
      el.innerHTML += `<div class="${L.cls}">${esc(L.t)}</div>`;
      setTimeout(tick, 380);
    };
    setTimeout(tick, 400);
  }

  function enterApp(resume) {
    try {
      const landing = $("#landing-view");
      const shell = $("#study-shell");
      if (landing) {
        landing.classList.remove("active");
        landing.style.display = "none";
      }
      if (shell) {
        shell.style.display = "grid";
        shell.classList.add("active");
      }
      buildSidebar();
      updateProgressUI();
      if (resume) {
        const s = Progress.get();
        if (s.lastChapter) openChapter(s.lastChapter);
        else openDashboard();
      } else {
        openDashboard();
      }
    } catch (err) {
      console.error("enterApp failed", err);
      toast("화면 전환 오류: " + (err && err.message ? err.message : err));
    }
  }

  function init() {
    if (!window.CURRICULUM) {
      document.body.innerHTML = "<p style='padding:2rem;color:#fff'>curriculum.js 로드 실패</p>";
      return;
    }

    // landing stats
    const totalCh = CURRICULUM.chapters.length;
    const totalMin = CURRICULUM.chapters.reduce((a, c) => a + (c.minutes || 0), 0);
    const labs = CURRICULUM.chapters.filter((c) => c.lab).length;
    $("#stat-ch").textContent = totalCh;
    $("#stat-min").textContent = totalMin + "+";
    $("#stat-lab").textContent = labs;
    $("#stat-parts").textContent = CURRICULUM.parts.length;

    typeTerminal();

    $("#btn-start")?.addEventListener("click", () => enterApp(false));
    $("#btn-resume")?.addEventListener("click", () => enterApp(true));

    $("#btn-dash")?.addEventListener("click", () => {
      closeMobileNav();
      openDashboard();
    });
    $("#btn-tools")?.addEventListener("click", () => {
      closeMobileNav();
      openTools();
    });
    $("#btn-gloss")?.addEventListener("click", () => {
      closeMobileNav();
      openGlossaryOnce();
    });
    $("#btn-ach")?.addEventListener("click", () => {
      closeMobileNav();
      openAchievements();
    });
    $("#btn-flash")?.addEventListener("click", () => {
      closeMobileNav();
      openFlash();
    });

    $("#menu-btn")?.addEventListener("click", () => {
      $("#sidebar").classList.add("open");
      $("#sidebar-backdrop").classList.add("show");
    });
    $("#sidebar-backdrop")?.addEventListener("click", closeMobileNav);
    $(".brand")?.addEventListener("click", () => openDashboard());

    $("#nav-filter")?.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      $$(".nav-item").forEach((btn) => {
        const t = btn.textContent.toLowerCase();
        btn.style.display = !q || t.includes(q) ? "" : "none";
      });
    });

    // keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
