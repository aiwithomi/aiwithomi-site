(function (root) {
  const answers = ['2,3', 'called', 'console'];
  const fields = ['imports', 'variables', 'loops', 'functions', 'trace'];
  const empty = () => ({version: 1, step: 0, answers: ['', '', ''], notes: Object.fromEntries(fields.map(k => [k, ''])), completed: null});
  function restore(raw) {
    try {
      const value = JSON.parse(raw);
      if (value.version !== 1) return empty();
      const state = empty();
      state.step = [0, 1, 2].includes(value.step) ? value.step : 0;
      state.answers = answers.map((_, i) => typeof value.answers?.[i] === 'string' ? value.answers[i] : '');
      fields.forEach(k => state.notes[k] = typeof value.notes?.[k] === 'string' ? value.notes[k].slice(0, 5000) : '');
      state.completed = typeof value.completed === 'string' && ready(state) ? value.completed : null;
      return state;
    } catch { return empty(); }
  }
  const score = state => answers.reduce((n, answer, i) => n + (state.answers[i] === answer), 0);
  const ready = state => score(state) === 3 && fields.every(k => state.notes[k]?.trim()) && state.notes.trace.trim().split(/\s+/).length >= 5;
  function markdown(state) {
    return '# T003: Reading Python Without Fear\n\n' +
      `Practice: ${score(state)}/3 correct\nStatus: ${state.completed ? 'Practice completed' : 'Draft'}\n\n` +
      fields.map(k => `## ${k[0].toUpperCase() + k.slice(1)}\n\n${state.notes[k] || '(Not written yet)'}\n`).join('\n') +
      '\nPersonal learning note. Completion covers this practice, not the wider curriculum.\n';
  }
  const api = {answers, fields, empty, restore, score, ready, markdown};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OLAPractice = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
