export function Hero() {
  return (
    <section className="relative w-full" style={{ paddingTop: 'clamp(150px, 22vh, 230px)', paddingBottom: 'clamp(70px, 10vh, 120px)' }}>
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8">
        <p className="kicker reveal" style={{ marginBottom: 28 }}>
          Brisbane, Australia
        </p>

        <h1
          className="reveal font-serif text-ink"
          style={{
            fontSize: 'clamp(44px, 7vw, 84px)',
            fontWeight: 500,
            lineHeight: 1.06,
            letterSpacing: '-0.015em',
            maxWidth: 820,
            transitionDelay: '0.05s',
          }}
        >
          Learning AI <em className="text-clay" style={{ fontStyle: 'italic' }}>in public</em>.
        </h1>

        <p
          className="reveal text-muted"
          style={{
            fontSize: 'clamp(18px, 2vw, 21px)',
            lineHeight: 1.6,
            maxWidth: 620,
            marginTop: 36,
            transitionDelay: '0.1s',
          }}
        >
          I work with health data by day. The rest of the time I am a student of
          AI: testing tools against real work, studying why models get things
          wrong, and writing down what I find. Including the failures.
          Especially the failures.
        </p>

        <div className="reveal flex flex-wrap items-center gap-4" style={{ marginTop: 44, transitionDelay: '0.15s' }}>
          <a
            href="#newsletter"
            className="font-sans text-paper bg-ink hover:bg-clay transition-colors duration-200 rounded-pill"
            style={{ fontSize: 15, fontWeight: 500, padding: '13px 26px' }}
          >
            Follow along
          </a>
          <a
            href="#now"
            className="font-sans text-ink hover:text-clay transition-colors duration-200"
            style={{ fontSize: 15, fontWeight: 500, padding: '13px 4px' }}
          >
            What I&rsquo;m learning now &darr;
          </a>
        </div>
      </div>

      {/* single hairline, drawn once */}
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8" style={{ marginTop: 'clamp(60px, 9vh, 100px)' }}>
        <div style={{ height: 1, background: 'var(--line)' }} />
      </div>
    </section>
  );
}
