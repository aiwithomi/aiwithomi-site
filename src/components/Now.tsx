const ITEMS = [
  {
    tag: 'Studying',
    title: 'One curriculum unit a day',
    body: 'A self-built 190-unit syllabus, from how computers represent information through to interpretability research. Day counter running. The streak matters more than the pace.',
  },
  {
    tag: 'Testing',
    title: 'Tools against real work',
    body: 'Every tool gets tried on an actual task, not a demo. What I publish is what happened: the time it saved, the mess it made, whether I kept it.',
  },
  {
    tag: 'Asking',
    title: 'Why models get things wrong',
    body: 'The question behind everything here. I recently asked a model to explain a wrong answer and it invented working that contradicted its own conclusion. Understanding that failure is the homework.',
  },
  {
    tag: 'Making',
    title: 'First videos',
    body: 'Two series in production: Black Box, on what we can and cannot see inside a model, and Trust Check, on hyped claims versus what actually happened. First one lands soon.',
  },
];

export function Now() {
  return (
    <section id="now" className="w-full" style={{ background: 'var(--surface)', paddingTop: 'clamp(70px, 10vh, 110px)', paddingBottom: 'clamp(70px, 10vh, 110px)' }}>
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8">
        <p className="kicker reveal" style={{ marginBottom: 24 }}>Now</p>
        <h2
          className="reveal font-serif text-ink"
          style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.015em', maxWidth: 560, marginBottom: 48 }}
        >
          What I&rsquo;m learning right now
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="reveal rounded-lg bg-paper"
              style={{ border: '1px solid var(--line-soft)', padding: '28px 28px 30px', transitionDelay: `${i * 0.05}s` }}
            >
              <span
                className="font-sans inline-block rounded-pill"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--clay)',
                  background: 'var(--clay-12)',
                  padding: '4px 12px',
                  marginBottom: 18,
                }}
              >
                {item.tag}
              </span>
              <h3 className="font-serif text-ink" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.25, marginBottom: 12 }}>
                {item.title}
              </h3>
              <p className="text-muted" style={{ fontSize: 16, lineHeight: 1.65 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="reveal text-muted" style={{ fontSize: 15, lineHeight: 1.6, marginTop: 36, maxWidth: 620 }}>
          This section is honest by design: it changes as the learning does,
          and nothing gets listed here before it exists.
        </p>
      </div>
    </section>
  );
}
