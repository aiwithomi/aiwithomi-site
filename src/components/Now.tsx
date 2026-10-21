const FOCUS = [
  {
    label: 'Practice',
    title: 'Testing tools against real work',
    body: 'An AI tool earns its place by surviving a real task. I record the result, the failure modes and the human judgement that remains.',
  },
  {
    label: 'Research',
    title: 'Making the black box less black',
    body: 'Exploring how AI decisions can be made easier to understand, and what an explanation can honestly tell someone who needs to act.',
  },
  {
    label: 'Accountability',
    title: 'Showing the working',
    body: 'Sharing the questions, evidence and corrections alongside practical AI experiments, without claiming more than the work supports.',
  },
];

export function Now() {
  return (
    <section id="research" className="section section--cloud">
      <div className="shell">
        <div className="section-heading-row reveal">
          <div>
            <p className="microlabel">Research in progress</p>
            <h2>The question underneath the tools.</h2>
          </div>
          <p className="heading-aside">Updated as the work changes.<br />No completed result claimed early.</p>
        </div>

        <div className="research-grid">
          <div className="research-statement reveal">
            <p className="research-question">How can an AI decision become easier to understand and evaluate?</p>
            <p>
              That question sits behind the experiments, reading and content here. The aim is not to make a model sound more certain, but to make the limits of its decisions easier to see.
            </p>
            <a className="text-link" href="#newsletter">Follow the research log</a>
          </div>

          <div className="research-card reveal" style={{ transitionDelay: '0.08s' }}>
            <div className="research-card-topline">
              <span className="status-dot status-dot--light" aria-hidden="true" />
              <span className="microlabel microlabel--dark">Current status</span>
              <span className="research-card-date">Learning in public</span>
            </div>
            <h3>Explainable AI</h3>
            <p className="research-card-status">Current area of interest</p>
            <div className="research-next">
              <span className="microlabel microlabel--dark">Next visible step</span>
              <strong>Test what explanations make clear, and where they fall short.</strong>
            </div>
          </div>
        </div>

        <div className="focus-grid">
          {FOCUS.map((item, index) => (
            <article className="focus-card reveal" key={item.title} style={{ transitionDelay: `${index * 0.06}s` }}>
              <p className="microlabel">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
