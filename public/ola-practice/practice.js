'use strict';
const core = window.OLAPractice;
const storageKey = 'ola-personal-t003-practice-v1';
let state = core.empty();
let persistent = true;
try { state = core.restore(localStorage.getItem(storageKey)); } catch { persistent = false; }
const $ = id => document.getElementById(id);
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); persistent = true; }
  catch { persistent = false; }
  $('save-status').textContent = persistent ? 'Saved in this browser on this device. Nothing uploaded.' : 'Browser storage is unavailable. Download your note before closing.';
}
function update() {
  $('start-apply').disabled = core.score(state) !== 3;
  $('complete').disabled = !core.ready(state) || Boolean(state.completed);
  $('progress').textContent = state.completed ? 'Practice completed / T003 only' : `Check: ${core.score(state)}/3 correct / practice in progress`;
  $('completion-hint').textContent = state.completed ? 'You can keep editing and download the note.' : 'Complete all three checks, identify each mechanism, and write at least five words describing the flow.';
  $('completion').hidden = !state.completed;
  $('completion').textContent = state.completed ? 'Done. Your audit note is saved here. Download it to keep a separate copy.' : '';
}
function step(number, focus = true) {
  state.step = number;
  for (let i = 0; i < 3; i++) {
    $(`step-${i}`).hidden = i !== number;
    $(`tab-${i}`).setAttribute('aria-selected', String(i === number));
    $(`tab-${i}`).tabIndex = i === number ? 0 : -1;
  }
  if (focus) $(`tab-${number}`).focus();
  save();
}
for (let i = 0; i < 3; i++) {
  $(`tab-${i}`).addEventListener('click', () => step(i));
  $(`tab-${i}`).addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); step((i + (event.key === 'ArrowRight' ? 1 : 2)) % 3);
    }
  });
}
$('start-check').addEventListener('click', () => step(1));
$('back-trace').addEventListener('click', () => step(0));
$('start-apply').addEventListener('click', () => step(2));
const explanations = {
  imports: 'import math loads Python’s standard maths module. Here, math.ceil rounds a number up to the next whole number.',
  variables: 'items names the list [3, 5]. packs starts empty. count takes each value in items in turn, and packs gains one result on each pass.',
  functions: 'def creates the function; its body runs only when called. packs_needed takes two inputs and returns the rounded-up number of packs.',
  loops: 'The loop runs twice. Three items need two packs; five items need three packs. print displays the final list [2, 3]. No file is written.'
};
for (const button of document.querySelectorAll('[data-mechanism]')) {
  button.addEventListener('click', () => {
    for (const other of document.querySelectorAll('[data-mechanism]')) other.setAttribute('aria-pressed', String(other === button));
    $('explanation').textContent = explanations[button.dataset.mechanism];
  });
}
$('explanation').textContent = explanations.imports;
const feedback = [
  'math.ceil rounds 3/2 up to 2 and 5/2 up to 3. The final list is [2, 3].',
  'Defining the function does not run its calculation. Each loop iteration calls it once.',
  'print displays the result. There is no file-writing operation in this example.'
];
for (const radio of document.querySelectorAll('input[type=radio]')) {
  radio.checked = state.answers[Number(radio.name.slice(1))] === radio.value;
  radio.addEventListener('change', () => {
    state.answers[Number(radio.name.slice(1))] = radio.value;
    state.completed = null; $('quiz-feedback').hidden = true; save(); update();
  });
}
$('quiz').addEventListener('submit', event => {
  event.preventDefault();
  const missed = core.answers.map((answer, i) => state.answers[i] === answer ? null : `${i + 1}. ${feedback[i]}`).filter(Boolean);
  $('quiz-feedback').textContent = missed.length ? `${core.score(state)}/3 correct. Try again.\n${missed.join('\n')}` : '3/3 correct. You traced the script. Now write the audit note.';
  $('quiz-feedback').hidden = false; update(); save();
});
for (const field of document.querySelectorAll('[data-note]')) {
  field.value = state.notes[field.dataset.note];
  field.addEventListener('input', () => {
    state.notes[field.dataset.note] = field.value;
    if (!core.ready(state)) state.completed = null;
    save(); update();
  });
}
$('complete').addEventListener('click', () => {
  if (!core.ready(state)) return;
  state.completed = new Date().toISOString(); save(); update();
});
$('export').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([core.markdown(state)], {type: 'text/markdown;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'T003-personal-audit-note.md'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
step(state.step, false); update();
