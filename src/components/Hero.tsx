import { BrandMark } from '@/components/BrandMark';

export function Hero() {
  return (
    <section id="top" className="hero-band">
      <div className="hero-watermark" aria-hidden="true">A<em>/</em>O</div>
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker reveal">
            <BrandMark onInk showName={false} />
            <span>AIwithOmi / Brisbane, Australia</span>
          </p>

          <h1 className="reveal" style={{ transitionDelay: '0.05s' }}>
            Make AI <em>easier to see.</em>
          </h1>

          <p className="hero-lede reveal" style={{ transitionDelay: '0.1s' }}>
            I test AI in real work, study why models fail, and share the useful bits. This is a public notebook for learning, research and better questions.
          </p>

          <div className="hero-actions reveal" style={{ transitionDelay: '0.15s' }}>
            <a className="button button--light" href="#paths">Start here</a>
            <a className="button button--ghost-light" href="#notes">Read the notes</a>
          </div>

          <div className="hero-status reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="status-dot" aria-hidden="true" />
            <span>Learning AI in public</span>
          </div>
        </div>

        <div className="hero-portrait-wrap reveal" style={{ transitionDelay: '0.12s' }}>
          <div className="portrait-ring portrait-ring--hero" aria-hidden="true">
            <BrandMark showName={false} />
          </div>
          <p className="hero-caption">AIwithOmi / Brisbane, Australia</p>
        </div>
      </div>
    </section>
  );
}
