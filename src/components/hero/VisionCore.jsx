import React from 'react';

const VisionCore = () => {
  return (
    <div className="relative flex items-center justify-center h-64 w-64 pointer-events-none select-none">
      {/* Core Glow */}
      <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-[60px] animate-pulse-slow" />

      {/* Center Core */}
      <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.6)] animate-pulse">
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping-slow" />
      </div>

      {/* Orbital Ring 1 - Fast Tilt */}
      <div className="absolute w-40 h-40 border border-blue-400/30 rounded-full animate-spin-slow [transform-style:preserve-3d] [perspective:1000px] [transform:rotateX(60deg)_rotateY(12deg)]" />

      {/* Orbital Ring 2 - Reverse */}
      <div className="absolute w-56 h-56 border border-cyan-400/20 rounded-full animate-spin-reverse-slower [transform-style:preserve-3d] [perspective:1000px] [transform:rotateX(-60deg)_rotateY(-12deg)]" />

      {/* Orbital Ring 3 - Dashed */}
      <div className="absolute w-48 h-48 border border-dashed border-indigo-500/30 rounded-full animate-spin [animation-duration:10s]" />

      {/* Floating Particles/Data Points */}
      <div className="absolute top-0 right-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
      <div className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
      
      {/* Tech Decorations */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent absolute" />
      </div>

      {/* Status Label */}
      <div className="absolute -bottom-8 text-[10px] font-mono tracking-[0.3em] text-blue-400/60 uppercase">
        System Active
      </div>
    </div>
  );
};

export default VisionCore;
