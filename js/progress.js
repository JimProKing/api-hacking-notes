/* Progress + achievements (localStorage) */
(function () {
  const KEY = "api-hacking-notes-v1";

  const defaultState = () => ({
    completed: {},      // chapterId -> true
    labs: {},           // chapterId -> true
    quizScores: {},     // chapterId -> {score, total, perfect}
    xp: 0,
    perfectQuizzes: 0,
    achievements: {},
    lastChapter: null,
    visitedTools: false,
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return { ...defaultState(), ...JSON.parse(raw) };
    } catch {
      return defaultState();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  window.Progress = {
    get: load,
    save,

    completeChapter(id, xpReward) {
      const s = load();
      if (!s.completed[id]) {
        s.completed[id] = true;
        s.xp += xpReward || 0;
      }
      s.lastChapter = id;
      this._evalAchievements(s);
      save(s);
      return s;
    },

    completeLab(id) {
      const s = load();
      if (!s.labs[id]) {
        s.labs[id] = true;
        s.xp += 40;
      }
      this._evalAchievements(s);
      save(s);
      return s;
    },

    recordQuiz(id, score, total) {
      const s = load();
      const prev = s.quizScores[id];
      const perfect = score === total;
      s.quizScores[id] = { score, total, perfect };
      if (perfect && (!prev || !prev.perfect)) {
        s.perfectQuizzes += 1;
        s.xp += 30;
      } else {
        s.xp += 10;
      }
      this._evalAchievements(s);
      save(s);
      return s;
    },

    visitTools() {
      const s = load();
      s.visitedTools = true;
      this._evalAchievements(s);
      save(s);
      return s;
    },

    reset() {
      localStorage.removeItem(KEY);
      return defaultState();
    },

    stats(curriculum) {
      const s = load();
      const chapters = curriculum.chapters || [];
      const total = chapters.length;
      const done = chapters.filter((c) => s.completed[c.id]).length;
      const pct = total ? Math.round((done / total) * 100) : 0;
      const byPart = {};
      for (const p of curriculum.parts || []) {
        const list = chapters.filter((c) => c.part === p.id);
        const d = list.filter((c) => s.completed[c.id]).length;
        byPart[p.id] = { done: d, total: list.length, pct: list.length ? Math.round((d / list.length) * 100) : 0 };
      }
      return { ...s, total, done, pct, byPart };
    },

    _evalAchievements(s) {
      const C = window.CURRICULUM;
      if (!C) return;
      const unlock = (id) => {
        if (!s.achievements[id]) {
          s.achievements[id] = Date.now();
          s._justUnlocked = s._justUnlocked || [];
          s._justUnlocked.push(id);
        }
      };

      if (Object.keys(s.completed).length >= 1) unlock("first_step");
      if (s.visitedTools) unlock("night_owl");
      if (s.perfectQuizzes >= 5) unlock("quiz_ace");
      if (Object.keys(s.labs).length >= 3) unlock("lab_rat");
      if (s.completed.ch10) unlock("bola_hunter");

      const partAch = { part1: "part1_done", part2: "part2_done", part3: "part3_done", part4: "part4_done" };
      for (const part of C.parts) {
        const list = C.chapters.filter((c) => c.part === part.id);
        if (list.length && list.every((c) => s.completed[c.id]) && partAch[part.id]) {
          unlock(partAch[part.id]);
        }
      }

      if (C.chapters.every((c) => s.completed[c.id])) unlock("author_level");
    },
  };
})();
