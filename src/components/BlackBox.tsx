import { useState, useEffect, useRef } from 'react';
import { Beam } from './Beam';

interface TriageResult {
  recommendation: string;
  confidence: number;
  features: { name: string; weight: string; note: string }[];
  uncertainty: string;
}

const THINKING_STEPS = [
  { id: 'read',     label: 'Reading presentation',       code: 'parse_clinical_input()' },
  { id: 'identify', label: 'Identifying clinical features', code: 'extract_features()' },
  { id: 'weigh',    label: 'Weighing evidence',           code: 'score_features()' },
  { id: 'compose',  label: 'Composing explanation',       code: 'build_output()' },
  { id: 'done',     label: 'Done',                        code: 'return result' },
];

declare global {
  interface Window {
    claude?: { complete: (prompt: string) => Promise<string> };
  }
}

const PRESETS = [
  { label: 'DVT risk', text: 'A 34-year-old with chest pain after a long flight' },
  { label: 'Mental health', text: 'A teenager with sudden mood drop and social withdrawal' },
  { label: 'Geriatric', text: 'A 72-year-old with confusion and a recent fall' },
];

const MOCK_RESULTS: Record<string, TriageResult> = {
  'A 34-year-old with chest pain after a long flight': {
    recommendation: 'Priority review within 2 hours — Emergency Department presentation recommended.',
    confidence: 92,
    features: [
      { name: 'Chest pain', weight: 'high', note: 'Primary presenting symptom requires immediate ruling out of acute coronary syndrome or pulmonary embolism.' },
      { name: 'Recent long-haul travel', weight: 'high', note: 'Immobility during flight significantly increases risk of deep vein thrombosis (DVT) and secondary pulmonary embolism.' },
      { name: 'Age 34', weight: 'low', note: 'Young age reduces baseline cardiorespiratory disease risk but does not mitigate acute thromboembolic risk.' }
    ],
    uncertainty: 'Unable to verify vital signs, oxygen saturation, presence of unilateral leg swelling, or pleuritic nature of the chest pain from the brief text description.'
  },
  'A teenager with sudden mood drop and social withdrawal': {
    recommendation: 'Urgent clinical assessment by a mental health professional within 24 hours.',
    confidence: 85,
    features: [
      { name: 'Sudden mood drop', weight: 'high', note: 'Rapid changes in mood in teenagers warrant immediate evaluation for acute depressive episodes or stress-related crisis.' },
      { name: 'Social withdrawal', weight: 'high', note: 'Withdrawal from peer groups and activities is a key indicator of clinical distress and functional impairment.' },
      { name: 'Adolescent age group', weight: 'medium', note: 'Increased vulnerability to rapid clinical deterioration and risk issues requires proactive, developmentally appropriate review.' }
    ],
    uncertainty: 'Lack of detail on duration of symptoms, presence of self-harm or suicidal ideation, academic changes, or family support structures.'
  },
  'A 72-year-old with confusion and a recent fall': {
    recommendation: 'Immediate medical review — hospital evaluation recommended to exclude acute delirium.',
    confidence: 95,
    features: [
      { name: 'Acute confusion', weight: 'high', note: 'Sudden onset confusion in an older adult is delirium until proven otherwise; requires screening for infection (e.g. UTI), medication reaction, or stroke.' },
      { name: 'Recent fall', weight: 'high', note: 'Poses immediate physical risk (e.g., subdural haematoma, fracture) and suggests structural or physiological instability.' },
      { name: 'Age 72', weight: 'medium', note: 'Vulnerability to rapid cognitive decline and outcomes following physical trauma.' }
    ],
    uncertainty: 'Baseline cognitive status is unknown, making it impossible to determine the extent of acute change vs chronic delirium. Vital signs, pupillary response, and focal neurological signs are unassessed.'
  }
};

export function BlackBox() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState('');
  const [barWidth, setBarWidth] = useState(0);
  const stepTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    stepTimers.current.forEach(t => clearTimeout(t));
    stepTimers.current = [];
  }

  async function handleRun() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');
    setActiveStep(0);
    setBarWidth(0);
    clearTimers();

    THINKING_STEPS.forEach((_, i) => {
      if (i === 0) return;
      const t = setTimeout(() => setActiveStep(i), i * 440);
      stepTimers.current.push(t);
    });

    try {
      if (!window.claude?.complete) {
        const cleanInput = input.trim();
        const presetResult = MOCK_RESULTS[cleanInput];
        if (presetResult) {
          setTimeout(() => {
            clearTimers();
            setActiveStep(4);
            setTimeout(() => {
              setResult(presetResult);
              setLoading(false);
              setTimeout(() => setBarWidth(presetResult.confidence), 80);
            }, 350);
          }, 1800);
          return;
        } else {
          throw new Error('Custom entries require connection to the clinical research model, which is currently offline. Please select one of the common clinical scenarios above to test the triage reasoning demo.');
        }
      }

      const prompt = `You are a triage demonstration for AIwithOmi. Given this clinical presentation, return ONLY valid JSON with no markdown, no code fences:
{
  "recommendation": "string (triage priority and direction — never a diagnosis, e.g. 'Urgent assessment', 'Priority review within 2 hours')",
  "confidence": number between 0 and 100,
  "features": [{ "name": "string", "weight": "low|medium|high", "note": "string (one sentence)" }],
  "uncertainty": "string (what the model is not sure about — plain English, honest, specific)"
}
Presentation: "${input}"`;

      const response = await window.claude.complete(prompt);
      const cleaned = response.replace(/```json?/g, '').replace(/```/g, '').trim();
      const parsed: TriageResult = JSON.parse(cleaned);
      clearTimers();
      setActiveStep(4);
      setTimeout(() => {
        setResult(parsed);
        setLoading(false);
        setTimeout(() => setBarWidth(parsed.confidence), 80);
      }, 350);
    } catch (e: unknown) {
      clearTimers();
      setActiveStep(-1);
      setError(e instanceof Error ? e.message : 'Failed to parse response. Please try again.');
      setLoading(false);
    }
  }

  useEffect(() => () => clearTimers(), []);

  const weightColor = (w: string) => ({
    high: '#C4622D',
    medium: 'rgba(196,98,45,0.55)',
    low: 'rgba(245,240,232,0.3)',
  }[w] ?? 'rgba(245,240,232,0.3)');

  return (
    <section id="blackbox" className="relative w-full bg-obsidian text-parchment py-[clamp(80px,9vw,140px)] px-8">
      <Beam className="js-parallax-beam left-[-10%] top-[-10%] w-[65%]" style={{ height: '120%' }} opacity={0.45} apexX={60} apexY={300} />

      <div className="max-w-[1080px] mx-auto relative z-10">
        {/* Section header — brand-book 2-col grid */}
        <div className="relative mb-16 pb-10 js-reveal">
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'clamp(120px, 15vw, 200px) 1fr',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'baseline',
            }}
          >
            <div className="flex flex-col gap-3">
              <div className="font-mono tracking-[0.06em]" style={{ fontSize: 11, color: 'rgba(245,240,232,0.35)' }}>02</div>
              <div className="uppercase font-medium font-sans tracking-[0.18em]" style={{ fontSize: 11, color: 'rgba(245,240,232,0.5)' }}>The Black Box</div>
            </div>
            <div>
              <h2 className="font-serif font-light leading-[1.0] tracking-[-0.01em] mb-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                Open the <span className="text-ember">black box</span>.
              </h2>
              <p className="font-serif italic font-light leading-[1.45]" style={{ fontSize: 21, color: 'rgba(245,240,232,0.65)', maxWidth: '52ch' }}>
                A live demonstration. Watch the model explain its reasoning in plain English. Trust is not a claim. It is a demonstration.
              </p>
              <p className="font-sans leading-[1.7] mt-4" style={{ fontSize: 14, color: 'rgba(245,240,232,0.4)', maxWidth: '52ch' }}>
                Clinicians resist AI not out of technophobia, but because they cannot interrogate a system that produces no auditable reasoning. That resistance is rational. The same opacity that stalls clinical adoption is the force behind a more urgent problem: consumer AI platforms fielding mental health queries with no grounding in clinical evidence and no mechanism for accountability. When those systems get it wrong, people are harmed. My research treats interpretability not as an engineering refinement but as a precondition for safe deployment in any high-stakes domain.
              </p>
            </div>
          </div>
          <div className="js-draw-line absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'rgba(245,240,232,0.08)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8">
          {/* Left — Input */}
          <div className="flex flex-col gap-5 js-reveal-x">
            <div className="flex flex-col gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setInput(p.text)}
                  className="text-left border transition-all duration-200"
                  style={{
                    padding: '14px 16px',
                    borderColor: input === p.text ? 'rgba(196,98,45,0.6)' : 'rgba(245,240,232,0.1)',
                    background: input === p.text ? 'rgba(196,98,45,0.06)' : 'transparent',
                    borderRadius: 4,
                  }}
                  onMouseEnter={e => { if (input !== p.text) e.currentTarget.style.borderColor = 'rgba(196,98,45,0.4)'; }}
                  onMouseLeave={e => { if (input !== p.text) e.currentTarget.style.borderColor = 'rgba(245,240,232,0.1)'; }}
                >
                  <div className="font-mono uppercase tracking-[0.16em] text-ember mb-1" style={{ fontSize: 9, fontWeight: 500 }}>
                    {p.label}
                  </div>
                  <div className="font-sans leading-[1.5]" style={{ fontSize: 14, color: 'rgba(245,240,232,0.8)' }}>
                    {p.text}
                  </div>
                </button>
              ))}
            </div>

            <div className="uppercase text-center font-medium font-sans tracking-[0.22em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.35)' }}>
              or
            </div>

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full h-28 p-4 focus:outline-none resize-none font-sans leading-relaxed transition-colors duration-200 placeholder:text-parchment/20"
              style={{
                background: 'rgba(245,240,232,0.03)',
                border: `1px solid ${input ? 'rgba(196,98,45,0.5)' : 'rgba(245,240,232,0.1)'}`,
                borderRadius: 4,
                fontSize: 14,
                color: '#F5F0E8',
              }}
              placeholder="Describe your own clinical presentation..."
            />

            <button
              onClick={handleRun}
              disabled={loading || !input.trim()}
              className="font-semibold font-sans py-3 px-6 transition-opacity duration-200 disabled:opacity-40"
              style={{
                background: '#C4622D',
                color: '#1A1A1A',
                borderRadius: 2,
                fontSize: 14,
                letterSpacing: '0.04em',
              }}
            >
              {loading ? 'Reasoning...' : 'Run · Show reasoning'}
            </button>

            {error && (
              <p className="font-mono text-[12px] text-parchment/45 pl-3" style={{ borderLeft: '1px solid rgba(245,240,232,0.15)' }}>
                {error}
              </p>
            )}
          </div>

          {/* Right — Output (terminal-style) */}
          <div
            className="rounded-lg overflow-hidden font-mono"
            style={{
              background: '#0e0e0e',
              border: `1px solid ${loading || result ? 'rgba(196,98,45,0.2)' : 'rgba(245,240,232,0.06)'}`,
              minHeight: 360,
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: '#161616', borderBottom: '1px solid rgba(245,240,232,0.06)' }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(245,240,232,0.1)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(245,240,232,0.1)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(245,240,232,0.1)' }} />
              </div>
              <div className="flex-1 text-center uppercase tracking-[0.16em]" style={{ fontSize: 9, color: 'rgba(245,240,232,0.3)' }}>
                AIwithOmi · Triage Reasoning Engine
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-6">
              {/* Thinking steps */}
              {loading && activeStep >= 0 && !result && (
                <div className="flex flex-col gap-3">
                  <div className="uppercase tracking-[0.18em] mb-3" style={{ fontSize: 9, color: 'rgba(245,240,232,0.35)' }}>
                    // SYSTEM REASONING
                  </div>
                  {THINKING_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 transition-all duration-300"
                      style={{ opacity: i <= activeStep ? 1 : 0.2 }}
                    >
                      <span style={{ fontSize: 12, color: i < activeStep ? '#C4622D' : i === activeStep ? '#22c55e' : 'rgba(245,240,232,0.2)' }}>
                        {i < activeStep ? '✓' : i === activeStep ? '›' : '·'}
                      </span>
                      <span style={{ fontSize: 12, color: 'rgba(245,240,232,0.5)', minWidth: 80 }}>
                        {step.code}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: i === activeStep ? '#F5F0E8' : i < activeStep ? 'rgba(245,240,232,0.4)' : 'rgba(245,240,232,0.15)',
                        }}
                      >
                        {step.label}
                        {i === activeStep && i < 4 && (
                          <span className="animate-pulse" style={{ color: '#C4622D' }}> _</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Result */}
              {result && !loading && (
                <div className="flex flex-col gap-5">
                  {/* Recommendation */}
                  <div>
                    <div className="uppercase tracking-[0.18em] mb-2" style={{ fontSize: 9, color: 'rgba(245,240,232,0.35)' }}>
                      // TRIAGE OUTPUT — NOT A DIAGNOSIS
                    </div>
                    <h3 className="font-serif font-light not-italic leading-tight" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', color: '#F5F0E8', fontFamily: 'Cormorant Garamond, serif' }}>
                      {result.recommendation}
                    </h3>
                  </div>

                  {/* Confidence */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="uppercase tracking-[0.12em]" style={{ fontSize: 9, color: 'rgba(245,240,232,0.4)' }}>
                        model_confidence
                      </span>
                      <span style={{ fontSize: 13, color: '#C4622D', fontFamily: 'JetBrains Mono, monospace' }}>
                        {result.confidence}%
                      </span>
                    </div>
                    <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(245,240,232,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          background: 'linear-gradient(90deg, rgba(196,98,45,0.6) 0%, #C4622D 100%)',
                          transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 0 8px rgba(196,98,45,0.4)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="uppercase tracking-[0.18em] mb-3" style={{ fontSize: 9, color: 'rgba(245,240,232,0.35)' }}>
                      // FEATURES DETECTED
                    </div>
                    <div className="flex flex-col gap-2">
                      {result.features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-[12px] py-2"
                          style={{ borderBottom: '1px solid rgba(245,240,232,0.04)' }}
                        >
                          <span style={{ color: weightColor(f.weight), flexShrink: 0, width: 40 }}>
                            [{f.weight.slice(0, 3).toUpperCase()}]
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <span style={{ color: 'rgba(245,240,232,0.85)', fontWeight: 500 }}>{f.name}</span>
                            <span style={{ color: 'rgba(245,240,232,0.4)' }}>{f.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Uncertainty */}
                  <div style={{ borderTop: '1px solid rgba(245,240,232,0.06)', paddingTop: 16 }}>
                    <div className="uppercase tracking-[0.18em] mb-2" style={{ fontSize: 9, color: 'rgba(245,240,232,0.35)' }}>
                      // UNCERTAINTY
                    </div>
                    <blockquote
                      className="font-serif italic font-light leading-[1.45]"
                      style={{ fontSize: 16, color: 'rgba(245,240,232,0.75)', fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      "{result.uncertainty}"
                    </blockquote>
                  </div>

                  <div className="uppercase tracking-[0.14em]" style={{ fontSize: 9, color: 'rgba(245,240,232,0.2)' }}>
                    // demo only · not a clinical tool · for illustration purposes only · once a framework is established during my PhD journey, it will go live here
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!loading && !result && (
                <div className="flex flex-col items-start gap-2 py-6">
                  <div className="uppercase tracking-[0.18em] mb-1" style={{ fontSize: 9, color: 'rgba(245,240,232,0.25)' }}>
                    // AWAITING INPUT
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(245,240,232,0.25)' }}>
                    Select a scenario or enter your own.
                  </div>
                  <span className="animate-pulse" style={{ color: '#C4622D', fontSize: 18 }}>_</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
