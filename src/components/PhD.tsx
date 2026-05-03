export function PhD() {
  return (
    <section
      id="phd"
      className="relative w-full bg-obsidian text-parchment overflow-hidden"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        paddingLeft: 'clamp(28px, 5vw, 80px)',
        paddingRight: 'clamp(28px, 5vw, 80px)',
      }}
    >
      <style>{`
        @keyframes emberPulse {
          0%, 100% {
            box-shadow: 0 0 0 1px rgba(196,98,45,0.5), 0 0 16px rgba(196,98,45,0.12);
          }
          50% {
            box-shadow: 0 0 0 1.5px rgba(196,98,45,0.95), 0 0 32px rgba(196,98,45,0.35);
          }
        }
        .phd-card {
          transition: box-shadow 0.35s ease, background 0.35s ease;
          cursor: default;
        }
        .phd-card:hover {
          background: rgba(196,98,45,0.04) !important;
          animation: emberPulse 1.8s ease-in-out infinite;
        }
        .phd-phase-card {
          transition: box-shadow 0.35s ease, background 0.35s ease;
          cursor: default;
        }
        .phd-phase-card:hover {
          background: rgba(196,98,45,0.04);
          animation: emberPulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-[1080px] mx-auto relative z-10">

        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-14 js-reveal"
          style={{ borderBottom: '1px solid rgba(245,240,232,0.08)', paddingBottom: 20 }}
        >
          <div className="font-mono tracking-[0.06em]" style={{ fontSize: 11, color: 'rgba(245,240,232,0.3)' }}>03</div>
          <div className="uppercase font-medium font-sans tracking-[0.18em]" style={{ fontSize: 11, color: 'rgba(245,240,232,0.45)' }}>
            PhD Research
          </div>
          <div style={{ width: 1, height: 14, background: 'rgba(245,240,232,0.15)' }} />
          <div className="uppercase font-medium font-sans tracking-[0.18em]" style={{ fontSize: 11, color: 'rgba(196,98,45,0.7)' }}>
            PhD · 2026
          </div>
        </div>

        {/* Thesis title */}
        <div className="mb-6 js-reveal">
          <h2
            className="font-serif font-light leading-[1.0] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', color: '#F5F0E8' }}
          >
            Trust as a{' '}
            <span className="text-ember italic">Sociotechnical</span>
            <br />Accomplishment
          </h2>
          <p
            className="font-sans mt-4 tracking-[0.02em]"
            style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(245,240,232,0.45)', letterSpacing: '0.01em' }}
          >
            Explainability and Governance in Mental Health AI
          </p>
        </div>

        {/* Central research question */}
        <div
          className="mb-16 js-reveal"
          style={{
            borderLeft: '2px solid #C4622D',
            paddingLeft: 'clamp(20px, 3vw, 36px)',
            paddingTop: 16,
            paddingBottom: 16,
            marginTop: 36,
          }}
        >
          <div className="uppercase font-medium font-sans tracking-[0.18em] mb-4" style={{ fontSize: 10, color: 'rgba(196,98,45,0.6)' }}>
            Central Research Question
          </div>
          <p
            className="font-serif italic font-light leading-[1.55]"
            style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: 'rgba(245,240,232,0.85)', maxWidth: '64ch' }}
          >
            How is clinician trust in AI-assisted clinical decision support constituted in public mental health services, and what implementation framework operationalises the conditions necessary to build and sustain it?
          </p>
        </div>

        {/* Three conditions */}
        <div className="mb-16">
          <div className="uppercase font-medium font-sans tracking-[0.18em] mb-8 js-reveal" style={{ fontSize: 10, color: 'rgba(245,240,232,0.3)' }}>
            Three necessary conditions of trust
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 js-reveal">
            {[
              {
                num: '01',
                title: 'Explainability Design',
                body: 'The format, framing, and clinical meaningfulness of how AI outputs are presented at the point of decision.',
              },
              {
                num: '02',
                title: 'Governance Practice',
                body: 'The visible organisational processes through which a tool is evaluated, approved, monitored, and held accountable.',
              },
              {
                num: '03',
                title: 'Workflow Integration',
                body: 'The alignment between AI outputs and the clinician\'s existing locus of professional responsibility.',
              },
            ].map((c, i) => (
              <div
                key={i}
                className="phd-card"
                style={{
                  padding: 'clamp(20px, 3vw, 36px)',
                  borderTop: '1px solid rgba(245,240,232,0.1)',
                  borderLeft: i > 0 ? '1px solid rgba(245,240,232,0.06)' : undefined,
                  background: 'transparent',
                }}
              >
                <div
                  className="font-serif italic font-light mb-4"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: 'rgba(196,98,45,0.15)', lineHeight: 1 }}
                >
                  {c.num}
                </div>
                <h3
                  className="font-serif font-light mb-3"
                  style={{ fontSize: 'clamp(17px, 1.7vw, 21px)', color: '#F5F0E8', lineHeight: 1.2 }}
                >
                  {c.title}
                </h3>
                <p
                  className="font-sans leading-[1.7]"
                  style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(245,240,232,0.5)' }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: 'clamp(14px, 2vw, 24px) clamp(20px, 3vw, 36px)',
              borderTop: '1px solid rgba(245,240,232,0.1)',
              background: 'rgba(196,98,45,0.04)',
            }}
          >
            <p className="font-sans" style={{ fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'rgba(245,240,232,0.4)', maxWidth: '72ch' }}>
              The theoretical claim: clinician trust in AI clinical decision support is not a property of the tool. It is a sociotechnical accomplishment, co-constituted by all three conditions. None is sufficient alone.
            </p>
          </div>
        </div>

        {/* Research phases */}
        <div className="mb-14 js-reveal">
          <div className="uppercase font-medium font-sans tracking-[0.18em] mb-6" style={{ fontSize: 10, color: 'rgba(245,240,232,0.3)' }}>
            Research timeline · Part-time · 5 years
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { phase: 'Phase 1', period: 'Yr 1 to 2', title: 'Trust Mapping', sub: 'Systematic review, interviews, governance analysis in public mental health services.' },
              { phase: 'Phase 2', period: 'Yr 2 to 3.5', title: 'Explainability Design', sub: 'Participatory co-design with clinical teams. Experimental comparison of explanation formats.' },
              { phase: 'Phase 3', period: 'Yr 3.5 to 4.5', title: 'Governance Study', sub: 'How organisational accountability practice shapes the trust formed in Phase 2.' },
              { phase: 'Phase 4', period: 'Yr 4.5 to 5', title: 'Framework Synthesis', sub: 'Validated implementation framework. National expert review. Thesis submission.' },
            ].map((p, i) => (
              <div
                key={i}
                className="phd-phase-card"
                style={{
                  padding: '20px 12px',
                  borderTop: `2px solid ${i === 0 ? '#C4622D' : 'rgba(245,240,232,0.1)'}`,
                }}
              >
                <div className="font-mono uppercase tracking-[0.16em] mb-1" style={{ fontSize: 9, color: i === 0 ? '#C4622D' : 'rgba(245,240,232,0.3)' }}>
                  {p.phase} · {p.period}
                </div>
                <div className="font-sans font-medium mb-2" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(245,240,232,0.8)' }}>
                  {p.title}
                </div>
                <p className="font-sans leading-[1.6]" style={{ fontSize: 'clamp(11px, 1vw, 13px)', color: 'rgba(245,240,232,0.4)' }}>
                  {p.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolment row */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 js-reveal"
          style={{ borderTop: '1px solid rgba(245,240,232,0.07)' }}
        >
          {[
            { label: 'Mode', value: 'Part-time' },
            { label: 'Field', value: 'AI in Mental Healthcare' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <div className="uppercase font-medium font-sans tracking-[0.16em]" style={{ fontSize: 9, color: 'rgba(245,240,232,0.3)' }}>
                {label}
              </div>
              <div className="font-sans" style={{ fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'rgba(245,240,232,0.6)' }}>
                {value}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
