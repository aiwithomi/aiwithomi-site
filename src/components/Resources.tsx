const CHECKLIST = [
  'What was the actual task, and who is responsible for the outcome?',
  'What evidence supports the answer, and can I check it independently?',
  'What is the most likely failure mode in this context?',
  'What human review happens before anyone acts on it?',
];

export function Resources() {
  return (
    <section id="resources" className="section section--cloud">
      <div className="shell">
        <div className="section-intro reveal">
          <p className="microlabel">Free resources</p>
          <h2>Small tools for clearer AI decisions.</h2>
          <p className="section-lede">
            Start with the checklist below. More guides, templates and explainers will be added as they are tested in real work.
          </p>
        </div>

        <div className="resource-layout">
          <article className="resource-feature reveal">
            <div className="resource-feature-topline">
              <p className="microlabel">Free / use it now</p>
              <span className="resource-mark" aria-hidden="true">A/O</span>
            </div>
            <h3>The AI clarity checklist</h3>
            <p>
              Four questions to ask before an AI output becomes a decision. Use it for a model response, an agent workflow or a claim in the news.
            </p>
            <details>
              <summary>Open the checklist</summary>
              <ol className="checklist">
                {CHECKLIST.map(question => <li key={question}>{question}</li>)}
              </ol>
            </details>
          </article>

          <div className="resource-list">
            <article className="resource-row reveal">
              <span className="resource-row-number">01</span>
              <div>
                <p className="microlabel">Coming next</p>
                <h3>Trust Check worksheet</h3>
                <p>A one-page way to record what an AI tool promised, what it did and what you still had to fix.</p>
              </div>
            </article>
            <article className="resource-row reveal">
              <span className="resource-row-number">02</span>
              <div>
                <p className="microlabel">Coming next</p>
                <h3>Black box glossary</h3>
                <p>Plain-language definitions for the concepts people use when talking about explainability and interpretability.</p>
              </div>
            </article>
            <article className="resource-row reveal">
              <span className="resource-row-number">03</span>
              <div>
                <p className="microlabel">Try now / free</p>
                <h3>Omi Learns AI / T003 practice</h3>
                <p>A short Python reading practice with an optional wellbeing pause. T003 notes stay in this browser; the pause itself saves nothing.</p>
                <a className="text-link" href="/ola-practice/">Open T003 practice</a>
                <a className="text-link" href="/ola-practice/wellbeing.html">Start a short pause</a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
