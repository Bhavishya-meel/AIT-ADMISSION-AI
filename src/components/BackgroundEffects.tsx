import React, { useEffect, useRef, useState } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Mouse & Scroll coordinates ref
  const coordsRef = useRef({
    mouseX: -1000,
    mouseY: -1000,
  });

  // Track window scroll & mouse coordinates
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollY(current);
      setScrollProgress(Math.min(1, Math.max(0, current / max)));
    };

    const handleMouseMove = (e: MouseEvent) => {
      coordsRef.current.mouseX = e.clientX;
      coordsRef.current.mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      coordsRef.current.mouseX = -1000;
      coordsRef.current.mouseY = -1000;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Whole-Site Interactive Particle Simulation (Rich, dark, dense, active everywhere)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      r: number;
      g: number;
      b: number;
      alpha: number;
      pulseSpeed: number;
      phase: number;
      isSparkle: boolean;
      isRing: boolean;
    }

    // High-visibility, rich dark palette tailored for AIT Pune
    const palette = [
      { r: 140, g: 16, b: 36 },   // AIT Deep Maroon / Crimson (#8C1024)
      { r: 180, g: 120, b: 12 },  // AIT Antique Deep Gold (#B4780C)
      { r: 0, g: 95, b: 204 },    // Monday Royal Blue (#005FCC)
      { r: 30, g: 40, b: 55 },    // Charcoal Slate (#1E2837)
      { r: 217, g: 119, b: 6 },   // Vibrant Amber (#D97706)
      { r: 40, g: 80, b: 40 },    // Deep Olive Army Green (#285028)
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Generous count so particles cover the whole screen densely
      const count = Math.min(85, Math.max(45, Math.floor(width / 16)));
      particles = [];

      for (let i = 0; i < count; i++) {
        const col = palette[Math.floor(Math.random() * palette.length)];
        const rand = Math.random();
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.6 - 0.2, // Smooth upward & wandering drift
          radius: Math.random() * 2.5 + 2.2,     // Visible 2.2px to 4.7px size
          r: col.r,
          g: col.g,
          b: col.b,
          alpha: Math.random() * 0.25 + 0.65,    // Dark, rich 0.65 to 0.90 opacity
          pulseSpeed: Math.random() * 0.03 + 0.015,
          phase: Math.random() * Math.PI * 2,
          isSparkle: rand > 0.8,
          isRing: rand > 0.65 && rand <= 0.8,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = coordsRef.current.mouseX;
      const mouseY = coordsRef.current.mouseY;

      // 1. Batch draw constellation lines between nearby particles
      ctx.lineWidth = 1.2;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 110;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.32;
            ctx.strokeStyle = `rgba(140, 16, 36, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw interactive connection line to mouse cursor
        if (mouseX > 0 && mouseY > 0) {
          const mdx = p1.x - mouseX;
          const mdy = p1.y - mouseY;
          const mdistSq = mdx * mdx + mdy * mdy;
          const mouseDist = 130;

          if (mdistSq < mouseDist * mouseDist && mdistSq > 1) {
            const mdist = Math.sqrt(mdistSq);
            const mLineAlpha = (1 - mdist / mouseDist) * 0.55;
            ctx.strokeStyle = `rgba(0, 95, 204, ${mLineAlpha})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();

            // Interactive cursor repulsion
            const force = (1 - mdist / mouseDist) * 1.8;
            p1.x += (mdx / mdist) * force;
            p1.y += (mdy / mdist) * force;
          }
        }
      }

      // 2. Draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth physics
        p.x += p.vx + Math.sin(p.phase) * 0.25;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        // Viewport wrap-around (particles always stay active on screen)
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        const currentAlpha = Math.max(0.5, Math.min(0.95, p.alpha + Math.sin(p.phase) * 0.15));

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 3;

        if (p.isSparkle) {
          // 4-point diamond crosshair sparkle
          ctx.strokeStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${currentAlpha})`;
          ctx.lineWidth = 1.6;
          const arm = p.radius * 2.2;
          ctx.beginPath();
          ctx.moveTo(p.x - arm, p.y);
          ctx.lineTo(p.x + arm, p.y);
          ctx.moveTo(p.x, p.y - arm);
          ctx.lineTo(p.x, p.y + arm);
          ctx.stroke();

          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.isRing) {
          // Delicate orbital ring with core
          ctx.strokeStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${currentAlpha})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${currentAlpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Solid bold particle
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Compute prominent logo scroll animation parameters:
  const rotationDeg = -5 + scrollProgress * 22;
  const parallaxY = -35 + scrollProgress * 70;
  const scaleValue = 1.02 + Math.sin(scrollProgress * Math.PI) * 0.09;
  const currentOpacity = 0.62 + Math.sin(scrollProgress * Math.PI) * 0.12;

  return (
    <>
      {/* =========================================================================
          LAYER 1: BACKGROUND WATERMARK CREST & AMBIENT AURA (Z-0)
          Stays fixed in background, clearly visible everywhere through transparent sections
          ========================================================================= */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Rich Radial Spotlight Glow centered behind the logo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] sm:w-[980px] sm:h-[980px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(128,20,38,0.18) 38%, rgba(0,113,227,0.08) 60%, transparent 75%)',
            transform: `translate(-50%, -50%) translateY(${parallaxY * 0.4}px) scale(${scaleValue})`,
          }}
        />

        {/* Deep Maroon Ambient Accent Blob */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(128,20,38,0.35) 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />

        {/* Deep Gold Ambient Accent Blob */}
        <div
          className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.38) 0%, transparent 70%)',
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        />

        {/* Centered Dark, Bold AIT Pune Logo with Scroll Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translateY(${parallaxY}px) scale(${scaleValue})`,
            }}
          >
            {/* Outer Rotating Dark Tactical Orbital Ring (Clockwise with scroll) */}
            <svg
              className="absolute w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] md:w-[780px] md:h-[780px] pointer-events-none transition-transform duration-200 ease-out"
              viewBox="0 0 800 800"
              style={{
                transform: `rotate(${scrollProgress * 110}deg)`,
                opacity: 0.65,
              }}
            >
              <circle
                cx="400"
                cy="400"
                r="380"
                fill="none"
                stroke="#801426"
                strokeWidth="2.5"
                strokeDasharray="6 10"
              />
              <circle
                cx="400"
                cy="400"
                r="350"
                fill="none"
                stroke="#B8860B"
                strokeWidth="2"
                strokeDasharray="28 14 6 14"
              />
              <line x1="400" y1="10" x2="400" y2="36" stroke="#801426" strokeWidth="3" />
              <line x1="400" y1="764" x2="400" y2="790" stroke="#801426" strokeWidth="3" />
              <line x1="10" y1="400" x2="36" y2="400" stroke="#801426" strokeWidth="3" />
              <line x1="764" y1="400" x2="790" y2="400" stroke="#801426" strokeWidth="3" />
            </svg>

            {/* Inner Counter-Rotating Orbit Ring (Counter-Clockwise with scroll) */}
            <svg
              className="absolute w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] md:w-[660px] md:h-[660px] pointer-events-none transition-transform duration-200 ease-out"
              viewBox="0 0 660 660"
              style={{
                transform: `rotate(${-scrollProgress * 140}deg)`,
                opacity: 0.6,
              }}
            >
              <circle
                cx="330"
                cy="330"
                r="310"
                fill="none"
                stroke="#B8860B"
                strokeWidth="2"
                strokeDasharray="20 12"
              />
              <circle
                cx="330"
                cy="330"
                r="280"
                fill="none"
                stroke="#801426"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />
            </svg>

            {/* Official Dark & Crisp AIT Pune Crest / Logo */}
            <div
              className="relative transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `rotate(${rotationDeg}deg)`,
                opacity: currentOpacity,
                filter: 'contrast(1.22) saturate(1.25) drop-shadow(0 20px 48px rgba(102, 12, 28, 0.45))',
              }}
            >
              <img
                src="/images/ait-pune-logo.png"
                alt="Army Institute of Technology Crest Watermark"
                className="w-[340px] h-auto sm:w-[480px] md:w-[620px] lg:w-[740px] max-w-none object-contain select-none pointer-events-none"
                draggable={false}
                loading="eager"
              />
            </div>

            {/* Bold Institutional Motto Ribbon beneath Crest */}
            <div
              className="absolute -bottom-12 sm:-bottom-16 transition-all duration-300 ease-out pointer-events-none"
              style={{
                opacity: Math.max(0.6, currentOpacity * 0.95),
                transform: `translateY(${parallaxY * 0.2}px)`,
              }}
            >
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase text-[#660C1C] select-none bg-white/70 px-4 py-1 rounded-full border border-[#801426]/30 shadow-xs">
                Onward To Glory · Estd 1994
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 2: PERSISTENT WHOLE-SITE PARTICLE CANVAS (Z-30)
          Mounted at z-30 with pointer-events-none:
          - Floats above all section backgrounds and cards across the ENTIRE site
          - Never hidden by any section or card
          - Completely transparent to clicks and mouse actions
          ========================================================================= */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 w-full h-full block"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      />
    </>
  );
};
export default BackgroundEffects;
