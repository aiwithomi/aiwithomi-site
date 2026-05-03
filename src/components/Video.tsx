import { Beam } from './Beam';

export function Video() {
  return (
    <section className="relative w-full bg-[#0D0D0D] text-parchment py-[clamp(80px,9vw,140px)] px-8 overflow-hidden">
      <Beam className="top-0 right-0 w-[50vw] h-[60vh] js-parallax-beam" opacity={0.4} apexX={400} apexY={50} />
      
      <div className="max-w-[1080px] mx-auto relative z-10 js-reveal">
        <div className="uppercase text-[11px] tracking-[0.18em] font-medium text-ember mb-4">
          04 Video essays
        </div>
        <h2 className="font-serif font-semibold leading-[1.0] tracking-[-0.01em] mb-12 max-w-[760px]" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
          Longer arguments. Same posture.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-center">
          <div className="relative aspect-video bg-obsidian border border-white/10 rounded-xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-ember flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,5 19,12 8,19" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-[17px] leading-[1.65] text-parchment/80">
              I make video essays about healthcare AI. Same directness, more space to develop an argument. Sometimes I show the tool running. Sometimes I just talk.
            </p>
            
            <a href="#" className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full border border-ember text-parchment hover:bg-ember hover:text-obsidian transition-colors font-medium text-sm">
              Watch on YouTube <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
