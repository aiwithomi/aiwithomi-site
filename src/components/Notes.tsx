const SUBSTACK_URL = 'https://aiwithomi.substack.com';

const NOTE_LANES = [
  {
    label: 'AI news, decoded',
    title: 'What changed, what matters, what does not',
    body: 'Model launches and AI headlines translated into useful context, with the source and the limits left visible.',
  },
  {
    label: 'Black box journal',
    title: 'The explanation has to survive contact with reality',
    body: 'Working notes on interpretability, explainability and the gap between a plausible story and a faithful one.',
  },
  {
    label: 'Real-work tests',
    title: 'A tool is only as good as the task it survives',
    body: 'Experiments with agents and AI products on ordinary work, including the time saved, the errors introduced and the judgement still required.',
  },
];

export function Notes() {
  return (
    <section id="notes" className="section section--paper">
      <div className="shell">
        <div className="section-heading-row reveal">
          <div>
            <p className="microlabel">Field notes</p>
            <h2>Useful context, published as I learn it.</h2>
          </div>
          <a className="button button--outline" href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
            Open the notes
          </a>
        </div>

        <div className="notes-grid">
          {NOTE_LANES.map((lane, index) => (
            <article className="note-card reveal" key={lane.label} style={{ transitionDelay: `${index * 0.06}s` }}>
              <p className="microlabel">{lane.label}</p>
              <h3>{lane.title}</h3>
              <p>{lane.body}</p>
              <a className="text-link" href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                Read on Substack
              </a>
            </article>
          ))}
        </div>

        <p className="section-footnote reveal">
          The live archive is on Substack. This page will become the home for selected notes once there is a verified feed to publish here.
        </p>
      </div>
    </section>
  );
}
