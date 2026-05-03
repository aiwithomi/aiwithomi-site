import { Beam } from './Beam';

export function Socials() {
  const socials = [
    { name: 'Instagram', icon: <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.657 0 3 1.343 3 3v10c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3V7c0-1.657 1.343-3 3-3zm5 4c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm4.5-1.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" /> },
    { name: 'TikTok', icon: <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.26-.71 4.46-2.06 6.17-1.21 1.53-2.91 2.65-4.8 3.12-1.78.43-3.64.44-5.39-.08-1.92-.57-3.56-1.79-4.71-3.41-1.18-1.66-1.78-3.67-1.68-5.7.07-1.82.68-3.56 1.83-5.01 1.08-1.38 2.61-2.4 4.34-2.89 1.29-.36 2.65-.45 3.97-.33V8.81c-1.07.11-2.12.39-3.08.89-.92.48-1.7 1.2-2.21 2.1-.5.88-.74 1.89-.78 2.9-.06 1.01.12 2.05.57 2.96.48.97 1.25 1.77 2.18 2.27.91.49 1.95.73 2.97.74.96.01 1.92-.19 2.82-.57.86-.36 1.63-1 2.14-1.77.56-.84.87-1.85.9-2.86.06-2.92.02-5.85.03-8.77.01-2.46-.02-4.93.02-7.4z" /> },
    { name: 'YouTube', icon: <path d="M21.58 5.48c-.24-.91-.94-1.61-1.85-1.85C18.1 3.25 12 3.25 12 3.25s-6.1 0-7.73.38c-.91.24-1.61.94-1.85 1.85C2 7.11 2 12 2 12s0 4.89.42 6.52c.24.91.94 1.61 1.85 1.85C5.9 20.75 12 20.75 12 20.75s6.1 0 7.73-.38c.91-.24 1.61-.94 1.85-1.85.42-1.63.42-6.52.42-6.52s0-4.89-.42-6.52zM9.5 15.5v-7l6.5 3.5-6.5 3.5z" /> },
    { name: 'LinkedIn', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> },
    { name: 'X', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> }
  ];

  return (
    <section className="relative w-full bg-obsidian text-parchment py-[clamp(80px,9vw,140px)] px-8 overflow-hidden">
      <Beam className="bottom-0 left-1/4 w-[40vw] h-[40vh]" opacity={0.4} apexX={200} apexY={300} />
      
      <div className="max-w-[800px] mx-auto text-center relative z-10 js-reveal">
        <div className="uppercase text-[11px] tracking-[0.18em] font-medium text-ash mb-4">
          06 Where to find me
        </div>
        <h2 className="font-serif font-semibold leading-[1.0] tracking-[-0.01em] mb-12" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
          Same voice. Different <span className="text-ember">channels</span>.
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {socials.map((s, i) => (
            <a 
              key={i} 
              href="#" 
              className="flex items-center gap-3 px-[26px] py-[15px] rounded-[100px] border border-white/20 text-parchment/75 hover:border-ember hover:text-ember hover:-translate-y-[2px] transition-all duration-250 bg-transparent"
              aria-label={s.name}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                {s.icon}
              </svg>
              <span className="font-medium text-sm">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
