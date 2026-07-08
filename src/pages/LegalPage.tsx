import { Link } from 'wouter';

type LegalPageProps = {
  type: 'terms' | 'privacy';
};

const updated = '23 May 2026';

const termsSections = [
  {
    title: 'Use of this website',
    body: 'AIwithOmi is a public education and project website about healthcare AI, data, research, and related digital products. You may view and share public pages for personal, educational, and professional purposes, provided you do not misuse the site or interfere with its operation.',
  },
  {
    title: 'No clinical advice',
    body: 'Content on this website is general information only. It is not medical advice, clinical advice, diagnosis, treatment guidance, or a substitute for professional judgement from a qualified clinician.',
  },
  {
    title: 'Intellectual property',
    body: 'Unless otherwise stated, text, designs, media, and brand assets on this website are owned by AIwithOmi or used with permission. Do not copy, resell, or redistribute substantial parts of the site without written permission.',
  },
  {
    title: 'Third-party services',
    body: 'This website may link to external services, social platforms, newsletters, or tools. Those services are governed by their own terms and policies.',
  },
  {
    title: 'Changes',
    body: 'These terms may be updated as the website and related products evolve. Continued use of the site after updates means you accept the updated terms.',
  },
];

const privacySections = [
  {
    title: 'Information collected',
    body: 'This website may collect information you choose to provide, such as newsletter signups, contact details, form submissions, or messages. Basic technical information such as browser, device, approximate region, referring page, and page activity may also be collected by hosting, analytics, security, or embedded third-party services.',
  },
  {
    title: 'How information is used',
    body: 'Information is used to operate the website, respond to enquiries, improve content and services, maintain security, understand audience interest, and support AIwithOmi publishing and product workflows.',
  },
  {
    title: 'Sharing',
    body: 'Personal information is not sold. Information may be processed by service providers used for hosting, analytics, email, forms, automation, social publishing, or security. Information may also be disclosed if required by law or to protect the website and its users.',
  },
  {
    title: 'Cookies and analytics',
    body: 'The website and connected services may use cookies or similar technologies to support basic functionality, analytics, embedded content, and security. You can manage cookies through your browser settings.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions or requests, contact AIwithOmi through the public contact or social links listed on the website.',
  },
];

export function LegalPage({ type }: LegalPageProps) {
  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';
  const sections = isTerms ? termsSections : privacySections;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12 sm:px-8 lg:py-16">
        <Link
          href="/"
          className="mb-10 inline-flex w-fit font-sans text-sm font-semibold tracking-tight text-ink transition hover:text-clay"
        >
          AI<span className="text-clay">with</span>Omi
        </Link>
        <p className="kicker mb-3">Last updated {updated}</p>
        <h1 className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <div className="mt-10 space-y-8 text-base leading-7 text-muted">
          {sections.map(section => (
            <section key={section.title}>
              <h2 className="mb-3 font-serif text-xl font-semibold text-ink">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
