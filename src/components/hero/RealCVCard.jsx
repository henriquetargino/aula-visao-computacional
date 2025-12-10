import React from 'react';

const RealCVCard = ({ src, label, className, delay = 0 }) => (
  <div 
    className={`absolute hidden md:block rounded-xl overflow-hidden shadow-2xl border-2 border-slate-900/10 bg-black animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {/* HUD Overlay */}
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* REC Indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-mono text-white font-bold tracking-widest">REC</span>
      </div>
      
      {/* Label */}
      <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded shadow-lg">
        <span className="text-[10px] font-mono text-white font-bold tracking-wider uppercase">{label}</span>
      </div>

      {/* Crosshairs */}
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/50 rounded-bl" />
    </div>

    {/* Image Feed */}
    <img 
      src={src} 
      alt={label} 
      className="w-80 h-48 object-cover opacity-90 transition-opacity hover:opacity-100"
    />
    
    {/* Scan Line Animation */}
    <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-[200%] w-full animate-scan-fast pointer-events-none opacity-30" />
  </div>
);

export default RealCVCard;
