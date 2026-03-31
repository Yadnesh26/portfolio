import React, { useEffect, useRef } from 'react';

const FluidMagnetic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  // Target mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Current blob positions for lerping (delayed physics state)
  const current1 = useRef({ x: 500, y: 500 });
  const current2 = useRef({ x: 500, y: 500 });
  const current3 = useRef({ x: 500, y: 500 });

  useEffect(() => {
    // Initial center position
    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;
    current1.current.x = mouse.current.x;
    current1.current.y = mouse.current.y;
    current2.current.x = mouse.current.x;
    current2.current.y = mouse.current.y;
    current3.current.x = mouse.current.x + 200;
    current3.current.y = mouse.current.y + 200;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      // Lerp function for smooth magnetic pull
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      // Add floating offset using sine waves
      const floatX = Math.sin(time) * 100;
      const floatY = Math.cos(time * 0.8) * 100;

      // Update Blob 1 (Faster)
      current1.current.x = lerp(current1.current.x, mouse.current.x, 0.04);
      current1.current.y = lerp(current1.current.y, mouse.current.y, 0.04);

      // Update Blob 2 (Slower, trails behind)
      current2.current.x = lerp(current2.current.x, mouse.current.x + floatX, 0.02);
      current2.current.y = lerp(current2.current.y, mouse.current.y + floatY, 0.02);

      // Update Blob 3 (Inverted feeling pull)
      const invX = window.innerWidth - mouse.current.x;
      const invY = window.innerHeight - mouse.current.y;
      current3.current.x = lerp(current3.current.x, invX - floatX, 0.015);
      current3.current.y = lerp(current3.current.y, invY - floatY, 0.015);

      // Apply transforms
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${current1.current.x - 200}px, ${current1.current.y - 200}px, 0)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${current2.current.x - 300}px, ${current2.current.y - 300}px, 0)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${current3.current.x - 350}px, ${current3.current.y - 350}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      
      {/* Noise Texture Overlay for Premium Tactile Feel */}
      <div className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay z-20" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-purple-900/10 rounded-full blur-[120px] z-0" />

      {/* Blobs container with heavy blur to create fluid fusion (gooey) effect */}
      <div className="absolute inset-0 w-full h-full filter blur-[90px] opacity-[0.35]">
        
        {/* Blob 1: Orange-500 */}
        <div
          ref={blob1Ref}
          className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#f97316] rounded-full mix-blend-screen z-10 will-change-transform"
        />

        {/* Blob 2: Cyan-400 */}
        <div
          ref={blob2Ref}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#22d3ee] rounded-full mix-blend-screen z-10 will-change-transform"
        />

        {/* Blob 3: Purple-500 */}
        <div
          ref={blob3Ref}
          className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#a855f7] rounded-full mix-blend-screen z-10 will-change-transform"
        />

      </div>
    </div>
  );
};

export default FluidMagnetic;
