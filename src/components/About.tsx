export function About() {
  return (
    <section id="about" className="w-full" style={{ paddingTop: 'clamp(70px, 10vh, 110px)', paddingBottom: 'clamp(70px, 10vh, 110px)' }}>
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 md:gap-16 items-start">
        <div>
          <p className="kicker reveal" style={{ marginBottom: 24 }}>About</p>

          <h2
            className="reveal font-serif text-ink"
            style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.015em', maxWidth: 560 }}
          >
            G&rsquo;day, I&rsquo;m Omi. I&rsquo;m not here to tell you I&rsquo;m an expert.
          </h2>

          <div className="reveal" style={{ marginTop: 32, maxWidth: 600, transitionDelay: '0.05s' }}>
            <p className="text-ink" style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 22 }}>
              I manage a data and analytics team in healthcare, which means I
              spend my days finding out what happens when careful, sceptical
              people meet new technology. It is a good place to learn humility
              about AI. The gap between what a tool claims and what it does
              under pressure is where I live.
            </p>
            <p className="text-ink" style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 22 }}>
              Outside work I am a student of this field, deliberately. I built
              myself a 190-unit curriculum and I work through it one unit a
              day. I run small AI experiments at home, most of which break, and
              I am preparing doctoral research on why models make the decisions
              they do. I am at the start of that road, not the end of it.
            </p>
            <p className="text-ink" style={{ fontSize: 18, lineHeight: 1.7 }}>
              Everything here is me showing my working: what I tried, what it
              cost, what broke, and what I would do differently. If you are
              learning this stuff too, we will get along.
            </p>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '0.1s' }}>
          <img
            src="/omi-portrait.jpg"
            alt="Omi"
            className="w-full rounded-lg"
            style={{ border: '1px solid var(--line)', filter: 'saturate(0.92)' }}
            loading="lazy"
          />
          <p className="font-mono text-muted" style={{ fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>
            Brisbane. Health data by day, AI homework by night.
          </p>
        </div>
      </div>
    </section>
  );
}
