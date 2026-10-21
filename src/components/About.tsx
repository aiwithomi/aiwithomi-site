import { BrandMark } from '@/components/BrandMark';

export function About() {
  return (
    <section id="about" className="section section--paper">
      <div className="shell about-grid">
        <div className="about-copy">
          <p className="microlabel reveal">About AIwithOmi</p>
          <h2 className="reveal">A serious interest in useful, explainable AI.</h2>
          <div className="about-body reveal" style={{ transitionDelay: '0.05s' }}>
            <p>
              I manage a data and analytics team in healthcare, which means I spend my days finding out what happens when careful, sceptical people meet new technology. It is a good place to learn humility about AI. The gap between what a tool claims and what it does under pressure is where I live.
            </p>
            <p>
              AIwithOmi is where I work through that distance in public: testing agents and tools, translating AI news and building practical resources.
            </p>
            <p>
              I am not presenting a finished authority. I am showing the questions, evidence and corrections that make better work possible.
            </p>
          </div>
        </div>

        <div className="about-side reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="portrait-ring portrait-ring--about" aria-hidden="true">
            <BrandMark showName={false} />
          </div>
          <p className="portrait-caption">AIwithOmi<br />Brisbane, Australia</p>
        </div>
      </div>

      <div className="shell stat-row reveal" style={{ transitionDelay: '0.15s' }}>
        <div className="stat-block">
          <span className="stat-number">01</span>
          <span className="stat-label">public research question</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">03</span>
          <span className="stat-label">editorial lanes</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">∞</span>
          <span className="stat-label">things still to test</span>
        </div>
      </div>
    </section>
  );
}
