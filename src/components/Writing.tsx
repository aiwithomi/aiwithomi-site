import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const POSTS = [
  {
    num: '01',
    category: 'Healthcare AI · PhD Research',
    title: 'The black box is not the problem.',
    excerpt: 'A short note on what we actually mean when we say a model is opaque, and why explainability is a contract, not a feature. Connected to my doctoral work on clinician trust in AI.',
    href: 'https://aiwithomi.substack.com/p/the-black-box-is-not-the-problem',
  },
  {
    num: '02',
    category: 'Practical Builds',
    title: 'The AI tool that writes my reports while I sleep.',
    excerpt: 'A workflow I actually run every week. The setup, the prompts, what it gets right, where I still have to step in.',
    href: 'https://aiwithomi.substack.com/p/the-ai-tool-that-writes-my-reports',
  },
  {
    num: '03',
    category: 'PhD Path',
    title: 'What clinicians actually want.',
    excerpt: 'Three quiet asks I hear in every workshop. None of them are about accuracy. All of them are about accountability.',
    href: 'https://aiwithomi.substack.com/p/what-clinicians-actually-want',
  },
];

function Post3D({ post }: { post: typeof POSTS[0] }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 28, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 28, mass: 0.6 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['2.5deg', '-2.5deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-3deg', '3deg']);

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={post.href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        borderTop: '1px solid rgba(245,240,232,0.1)',
      }}
      className="group relative grid grid-cols-[80px_1fr_auto] gap-8 items-start py-12 js-reveal-item cursor-pointer"
    >
      {/* Big number */}
      <div
        className="font-serif italic font-light leading-none select-none transition-colors duration-500 group-hover:text-ember/30"
        style={{
          fontSize: 'clamp(40px, 4.5vw, 60px)',
          color: 'rgba(245,240,232,0.1)',
          transform: 'translateZ(-12px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {post.num}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <div className="uppercase font-medium font-sans tracking-[0.2em] text-ember" style={{ fontSize: 12 }}>
          {post.category}
        </div>
        <h3
          className="font-serif font-light leading-[1.1] tracking-[-0.01em] transition-colors duration-300 group-hover:text-ember"
          style={{ fontSize: 'clamp(24px, 2.6vw, 34px)' }}
        >
          {post.title}
        </h3>
        <p
          className="font-sans leading-[1.75]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'rgba(245,240,232,0.65)', maxWidth: '52ch' }}
        >
          {post.excerpt}
        </p>
      </div>

      {/* Read arrow */}
      <div
        className="flex items-center gap-1 font-mono uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-ember pt-2"
        style={{
          fontSize: 12,
          color: 'rgba(245,240,232,0.4)',
          transform: 'translateZ(8px)',
          transformStyle: 'preserve-3d',
        }}
      >
        Read →
      </div>
    </motion.a>
  );
}

export function Writing() {
  return (
    <section
      id="read"
      className="relative w-full bg-obsidian text-parchment"
      style={{
        paddingTop: 'clamp(80px, 10vw, 130px)',
        paddingBottom: 'clamp(60px, 7vw, 90px)',
        paddingLeft: 'clamp(28px, 5vw, 80px)',
        paddingRight: 'clamp(28px, 5vw, 80px)',
      }}
    >
      <div className="max-w-[1080px] mx-auto" style={{ perspective: '1200px', perspectiveOrigin: 'center 40%' }}>
        {/* Header */}
        <div className="mb-16 js-reveal">
          <h2
            className="font-serif font-light leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
          >
            Three threads,<br />one <span className="text-ember italic">question</span>.
          </h2>
        </div>

        {/* Editorial list */}
        <div className="flex flex-col js-reveal-group">
          {POSTS.map((post, i) => (
            <Post3D key={i} post={post} />
          ))}
          <div className="js-draw-line h-[1px] w-full" style={{ background: 'rgba(245,240,232,0.1)' }} />
        </div>

        {/* Substack CTA */}
        <div className="mt-16 js-reveal">
          <a
            href="https://aiwithomi.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans transition-colors duration-200 hover:text-ember"
            style={{ fontSize: 16, color: 'rgba(245,240,232,0.5)', letterSpacing: '0.02em' }}
          >
            Full archive on Substack
            <span style={{ color: 'rgba(196,98,45,0.7)' }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
