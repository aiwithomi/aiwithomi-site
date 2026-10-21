'use strict';

const core = window.OLAWELLBEING;
const tabs = [...document.querySelectorAll('[data-step]')];
const panels = [...document.querySelectorAll('[data-panel]')];
const stepStatus = document.getElementById('step-status');

function showStep(index, focusTab = false) {
  const safeIndex = Math.max(0, Math.min(core.steps.length - 1, index));
  tabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === safeIndex;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
  });
  panels.forEach((panel, panelIndex) => { panel.hidden = panelIndex !== safeIndex; });
  stepStatus.textContent = `Step ${safeIndex + 1} of ${core.steps.length} · ${core.steps[safeIndex]}`;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showStep(index));
  tab.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    showStep(core.moveStep(index, direction), true);
  });
});

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => showStep(Number(button.dataset.go)));
});

const breathStart = document.getElementById('breath-start');
const breathPause = document.getElementById('breath-pause');
const breathStop = document.getElementById('breath-stop');
const breathStatus = document.getElementById('breath-status');
let breathTimer = null;
let breathRunning = false;
let breathPaused = false;
let breathPhase = 0;
let breathSeconds = 0;

function renderBreathStatus() {
  const phase = core.breathPhases[breathPhase];
  breathStatus.textContent = `${phase.label} · about ${phase.seconds} seconds. You can stop at any time.`;
}

function finishBreathing() {
  window.clearTimeout(breathTimer);
  breathTimer = null;
  breathRunning = false;
  breathPaused = false;
  breathStart.disabled = false;
  breathStart.textContent = 'Try one more optional cycle';
  breathPause.disabled = true;
  breathPause.textContent = 'Pause';
  breathStop.disabled = true;
  breathStatus.textContent = 'Cycle finished. Return to your usual breathing. Repeat only if you want to and it feels comfortable.';
}

function scheduleBreathTick() {
  breathTimer = window.setTimeout(() => {
    breathSeconds -= 1;
    if (breathSeconds <= 0) {
      if (breathPhase + 1 < core.breathPhases.length) {
        breathPhase += 1;
        breathSeconds = core.breathPhases[breathPhase].seconds;
        renderBreathStatus();
        scheduleBreathTick();
      } else {
        finishBreathing();
      }
      return;
    }
    scheduleBreathTick();
  }, 1000);
}

function startBreathing() {
  if (!breathRunning) {
    breathRunning = true;
    breathPaused = false;
    breathPhase = 0;
    breathSeconds = core.breathPhases[0].seconds;
    breathStart.disabled = true;
    breathPause.disabled = false;
    breathStop.disabled = false;
    renderBreathStatus();
    scheduleBreathTick();
    return;
  }
  if (breathPaused) {
    breathPaused = false;
    breathPause.textContent = 'Pause';
    breathStatus.textContent = 'Resumed. There is no need to match the timer.';
    renderBreathStatus();
    scheduleBreathTick();
  }
}

function pauseBreathing() {
  if (!breathRunning || breathPaused) return;
  window.clearTimeout(breathTimer);
  breathTimer = null;
  breathPaused = true;
  breathPause.textContent = 'Resume';
  breathStatus.textContent = `Paused. ${core.breathPhases[breathPhase].label}. Resume or stop whenever you like.`;
}

function stopBreathing(message = 'Stopped. Return to comfortable, unpaced breathing.') {
  window.clearTimeout(breathTimer);
  breathTimer = null;
  breathRunning = false;
  breathPaused = false;
  breathPhase = 0;
  breathSeconds = 0;
  breathStart.disabled = false;
  breathStart.textContent = 'Start one optional cycle';
  breathPause.disabled = true;
  breathPause.textContent = 'Pause';
  breathStop.disabled = true;
  breathStatus.textContent = message;
}

breathStart.addEventListener('click', startBreathing);
breathPause.addEventListener('click', () => {
  if (breathPaused) startBreathing();
  else pauseBreathing();
});
breathStop.addEventListener('click', () => stopBreathing());
document.addEventListener('visibilitychange', () => {
  if (document.hidden && breathRunning && !breathPaused) {
    pauseBreathing();
    breathStatus.textContent = 'Paused because this page is no longer visible. Resume or stop whenever you like.';
  }
});

const recallButton = document.getElementById('check-recall');
const recallStatus = document.getElementById('recall-status');
recallButton.addEventListener('click', () => {
  const answer = document.querySelector('input[name="recall"]:checked');
  recallStatus.textContent = core.recallFeedback(answer?.value);
});

const readButton = document.getElementById('read-aloud');
const stopReadingButton = document.getElementById('stop-reading');
const readStatus = document.getElementById('read-status');
function localSpeechVoice() {
  if (!('speechSynthesis' in window)) return null;
  const localVoices = window.speechSynthesis.getVoices().filter(voice => voice.localService === true);
  return localVoices.find(voice => voice.default) || localVoices[0] || null;
}

function updateReadAloudAvailability() {
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const voice = supported ? localSpeechVoice() : null;
  readButton.disabled = !voice;
  if (!supported) {
    readStatus.textContent = 'Read-aloud is not available in this browser. You can read the short text above.';
  } else if (!voice) {
    readStatus.textContent = 'No device-local voice is available. Read-aloud is disabled; the text remains available above.';
  } else {
    readStatus.textContent = 'A device-local voice is available. Press the button to read this chunk aloud.';
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', updateReadAloudAvailability);
}

readButton.addEventListener('click', () => {
  const voice = localSpeechVoice();
  if (!voice || !('SpeechSynthesisUtterance' in window)) {
    updateReadAloudAvailability();
    return;
  }
  window.speechSynthesis.cancel();
  const text = document.getElementById('learning-chunk').textContent.trim();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.onend = () => {
    readStatus.textContent = 'Finished. Nothing was saved by this page.';
    stopReadingButton.disabled = true;
  };
  utterance.onerror = () => {
    readStatus.textContent = 'Read-aloud stopped. The text is still available above.';
    stopReadingButton.disabled = true;
  };
  window.speechSynthesis.speak(utterance);
  readStatus.textContent = 'Reading aloud with your browser or device voice. Press Stop reading at any time.';
  stopReadingButton.disabled = false;
});
stopReadingButton.addEventListener('click', () => {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  readStatus.textContent = 'Stopped. The text is still available above.';
  stopReadingButton.disabled = true;
});
window.addEventListener('pagehide', () => {
  stopBreathing('Stopped because you left the page.');
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
});

updateReadAloudAvailability();
showStep(0);
