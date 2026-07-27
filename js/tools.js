/* Interactive learning tools */
(function () {
  function b64urlDecode(str) {
    let s = str.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    try {
      const bin = atob(s);
      // utf-8
      try {
        return decodeURIComponent(
          bin
            .split("")
            .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("")
        );
      } catch {
        return bin;
      }
    } catch (e) {
      return null;
    }
  }

  function pretty(obj) {
    try {
      return JSON.stringify(JSON.parse(obj), null, 2);
    } catch {
      return obj;
    }
  }

  window.Tools = {
    decodeJwt(token) {
      const parts = (token || "").trim().split(".");
      if (parts.length < 2) return { error: "JWT는 header.payload.signature 형태여야 합니다." };
      const header = b64urlDecode(parts[0]);
      const payload = b64urlDecode(parts[1]);
      if (header == null || payload == null) return { error: "Base64URL 디코딩 실패." };
      let hObj = {}, pObj = {};
      try { hObj = JSON.parse(header); } catch { hObj = { raw: header }; }
      try { pObj = JSON.parse(payload); } catch { pObj = { raw: payload }; }

      const notes = [];
      if (hObj.alg === "none" || hObj.alg === "None") notes.push("⚠ alg=none — none 공격 후보");
      if (hObj.alg === "HS256" || hObj.alg === "HS384" || hObj.alg === "HS512")
        notes.push("HMAC 계열 — 약한 시크릿 크랙 가능 여부 점검");
      if (hObj.alg && String(hObj.alg).startsWith("RS")) notes.push("비대칭(RS*) — 알고리즘 스위치 공격 역사적 이슈 점검");
      if (pObj.exp) {
        const exp = new Date(pObj.exp * 1000);
        notes.push(`exp: ${exp.toISOString()} (${exp < new Date() ? "만료됨" : "유효 기간 남음"})`);
      }
      ["role", "admin", "isAdmin", "is_admin", "scope", "permissions"].forEach((k) => {
        if (k in pObj) notes.push(`권한 관련 클레임 발견: ${k}=${JSON.stringify(pObj[k])}`);
      });

      return {
        header: pretty(JSON.stringify(hObj)),
        payload: pretty(JSON.stringify(pObj)),
        signature: parts[2] ? `${parts[2].slice(0, 24)}… (${parts[2].length} chars)` : "(없음)",
        notes: notes.length ? notes.join("\n") : "특이 클레임 메모 없음 — 직접 변조 시나리오를 생각해보세요.",
      };
    },

    statusExplain(code) {
      const map = {
        200: "OK — 정상. 민감 데이터 포함 여부 확인 (과다 노출).",
        201: "Created — 생성 성공. 응답  Loc/바디의 ID 수집.",
        204: "No Content — 성공이지만 바디 없음.",
        301: "Moved Permanently — 경로/호스트 이전 단서.",
        302: "Found — 로그인 후 리다이렉트 등. open redirect 점검.",
        304: "Not Modified — 캐시.",
        400: "Bad Request — 스키마/파서 힌트. 퍼징 피드백.",
        401: "Unauthorized — 인증 필요/실패.",
        403: "Forbidden — 인증됐으나 권한 없음. BFLA 후보 비교용.",
        404: "Not Found — 존재 여부 오라클(열거) 가능.",
        405: "Method Not Allowed — 허용 메서드 단서. 메서드 스위칭 테스트.",
        415: "Unsupported Media Type — Content-Type 혼동 테스트.",
        429: "Too Many Requests — rate limit 동작 중.",
        500: "Internal Server Error — 주입/퍼징 히트 신호. 스택 누출 확인.",
        502: "Bad Gateway — 업스트림/게이트웨이 이슈.",
        503: "Service Unavailable — 과부하 또는 차단.",
      };
      const c = Number(code);
      if (map[c]) return map[c];
      if (c >= 100 && c < 200) return "1xx 정보성 응답.";
      if (c >= 200 && c < 300) return "2xx 성공 계열 — 응답 바디 필드 전수 검사.";
      if (c >= 300 && c < 400) return "3xx 리다이렉트 — Location 헤더 검증.";
      if (c >= 400 && c < 500) return "4xx 클라이언트 오류 — 인증/권한/존재 오라클.";
      if (c >= 500 && c < 600) return "5xx 서버 오류 — 이상 징후, 상세 에러 누출 확인.";
      return "알 수 없는 코드. 스펙 외 커스텀 코드일 수 있음 (예: 구 트위터 420).";
    },

    owaspMap() {
      return [
        { id: "API1", name: "BOLA", ch: "Ch.3, 10", tip: "객체 ID 교차 접근 (A-B)" },
        { id: "API2", name: "인증 결함", ch: "Ch.3, 8", tip: "브루트·토큰·JWT" },
        { id: "API3", name: "과다 노출", ch: "Ch.3, 7", tip: "응답 JSON 전 필드 읽기" },
        { id: "API4", name: "자원/한도", ch: "Ch.3, 9, 13", tip: "퍼징·rate limit" },
        { id: "API5", name: "BFLA", ch: "Ch.3, 10", tip: "관리 기능 A-B-A" },
        { id: "API6", name: "대량 할당", ch: "Ch.3, 11", tip: "숨은 필드 주입" },
        { id: "API7", name: "보안 설정", ch: "Ch.3, 7", tip: "에러·CORS·TLS" },
        { id: "API8", name: "주입", ch: "Ch.3, 12", tip: "SQL/NoSQL/OS/XSS" },
        { id: "API9", name: "자산 관리", ch: "Ch.3, 6", tip: "구버전·그림자 API" },
        { id: "API10", name: "로그/모니터링", ch: "실무", tip: "탐지 부재는 침해 증폭" },
      ];
    },

    buildHttp({ method, path, host, headers, body }) {
      const lines = [`${method || "GET"} ${path || "/"} HTTP/1.1`, `Host: ${host || "api.example.com"}`];
      const hs = (headers || "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (!hs.some((h) => h.toLowerCase().startsWith("user-agent"))) {
        lines.push("User-Agent: API-Hacking-Notes/1.0");
      }
      hs.forEach((h) => lines.push(h));
      if (body) {
        if (!hs.some((h) => h.toLowerCase().startsWith("content-type"))) {
          lines.push("Content-Type: application/json");
        }
        lines.push(`Content-Length: ${new TextEncoder().encode(body).length}`);
        lines.push("");
        lines.push(body);
      } else {
        lines.push("");
      }
      return lines.join("\n");
    },

    fuzzIdeas(param) {
      const p = param || "id";
      return [
        `${p}=1 → ${p}=2  (BOLA 순회)`,
        `${p}=1'  /  ${p}=1\"  (주입 탐침)`,
        `${p}=../../etc/passwd  (경로 순회)`,
        `${p}=` + "${7*7} / {{7*7}}  (템플릿)",
        `${p}=` + JSON.stringify({ $gt: "" }) + "  (NoSQL, JSON 바디)",
        `메서드 GET → DELETE/PUT/PATCH`,
        `Content-Type 바꿔 파서 혼동`,
        `X-Original-URL / X-Rewrite-URL 헤더`,
        `Authorization 제거 vs 저권한 토큰`,
      ].join("\n");
    },
  };
})();
