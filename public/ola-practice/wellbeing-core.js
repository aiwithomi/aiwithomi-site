(function (root) {
  const steps = Object.freeze(['Notice', 'Ground', 'Choose']);
  const breathPhases = Object.freeze([
    Object.freeze({ label: 'Breathe in gently, if comfortable', seconds: 3 }),
    Object.freeze({ label: 'Breathe out easily, without forcing', seconds: 4 }),
  ]);

  function moveStep(index, direction) {
    if (!Number.isInteger(index) || !Number.isInteger(direction)) return 0;
    return Math.max(0, Math.min(steps.length - 1, index + direction));
  }

  function recallFeedback(answer) {
    if (answer === 'maybe') return 'Correct. A prediction describes what might happen.';
    if (answer === 'certain') return 'Try again. A prediction is not proof.';
    return 'Choose an answer first.';
  }

  const api = { steps, breathPhases, moveStep, recallFeedback };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OLAWELLBEING = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
