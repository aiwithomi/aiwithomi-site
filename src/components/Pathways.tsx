const PATHWAYS = [
  {
    label: 'Start here',
    title: 'Learn without the fog',
    body: 'Plain-English explainers, practical experiments and free tools for people who want to use AI with a little more judgement.',
    href: '#resources',
    action: 'Explore resources',
  },
  {
    label: 'Research log',
    title: 'Follow the black box',
    body: 'A public record of questions about how AI decisions can become easier to understand and evaluate.',
    href: '#research',
    action: 'Read the research log',
  },
  {
    label: 'Field notes',
    title: 'Keep up without the noise',
    body: 'Current AI news, model releases and real-work tests, interpreted for people who need to know what changed and what actually matters.',
    href: '#notes',
    action: 'See the editorial lanes',
  },
];

export function Pathways() {
  return (
    <section id="paths" className="section section--paper">
      <div className="shell">
        <div className="section-intro reveal">
          <p className="microlabel">Choose a route</p>
          <h2>One site. Three useful ways in.</h2>
          <p className="section-lede">
            AIwithOmi is where learning, research and honest testing meet.
            Start with the question you brought.
          </p>
        </div>

        <div className="pathway-grid">
          {PATHWAYS.map((pathway, index) => (
            <article className="practice-card reveal" key={pathway.title} style={{ transitionDelay: `${index * 0.06}s` }}>
              <p className="practice-index">0{index + 1} / {pathway.label}</p>
              <h3>{pathway.title}</h3>
              <p>{pathway.body}</p>
              <a className="text-link" href={pathway.href}>
                {pathway.action}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
