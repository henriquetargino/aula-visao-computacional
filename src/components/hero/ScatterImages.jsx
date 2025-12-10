import React from 'react';

const ImageCard = ({ src, className, delay = 0, shadow = "shadow-2xl" }) => (
  <div 
    className={`absolute hidden md:block rounded-2xl overflow-hidden ${shadow} border-4 border-white/80 bg-white animate-sway-slow z-10 hover:z-50 transition-all duration-500 hover:scale-125 opacity-90 hover:opacity-100 cursor-pointer ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
    }}
  >
    <div className="absolute inset-0 bg-blue-500/0 hover:bg-transparent transition-colors duration-300 pointer-events-none" />
    <img 
      src={src} 
      alt="Computer Vision" 
      className="w-full h-full object-cover"
    />
  </div>
);

const HandDrawnArrow = ({ className, rotation = 0, flipX = false, delay = 0 }) => (
  <svg 
    viewBox="0 0 200 100" 
    className={`absolute text-blue-500/70 pointer-events-none opacity-0 animate-draw-arrow ${className}`} 
    style={{ 
      transform: `rotate(${rotation}deg) scaleY(${flipX ? -1 : 1})`, // Flip Y for curve direction control
      animationDelay: `${delay + 1}s`,
      animationFillMode: 'forwards'
    }}
  >
    <defs>
      <filter id="wobble">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
      </filter>
    </defs>
    {/* Thicker stroke, smoother curve */}
    <path 
      d="M10,50 Q100,20 180,50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round"
      style={{ filter: "url(#wobble)" }}
    />
    {/* Arrowhead */}
    <path 
      d="M180,50 L160,40 M180,50 L160,60" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round"
      style={{ filter: "url(#wobble)" }}
    />
  </svg>
);

const ScatterImages = ({ isSidebarOpen }) => {
  return (
    <div 
      className={`absolute top-0 h-full pointer-events-none max-w-[1800px] mx-auto overflow-hidden transition-all duration-300 origin-center ${
        isSidebarOpen 
          ? 'w-[125%] left-1/2 -translate-x-1/2 scale-75' 
          : 'w-full left-0 scale-100'
      }`}
    >
      {/* --- Arrows Layer --- */}
      <div className="absolute inset-0 z-20"> 
         {/* Arrow to Autonomo (Top Left) - Pulled Back */}
         <HandDrawnArrow className={`left-[23%] w-48 h-24 transition-all duration-300 ${isSidebarOpen ? 'top-8' : 'top-16'}`} rotation={200} flipX={true} delay={0.5} />
         
         {/* Arrow to Street (Top Right) - Pulled Back */}
         <HandDrawnArrow className={`right-[23%] w-48 h-24 transition-all duration-300 ${isSidebarOpen ? 'top-8' : 'top-16'}`} rotation={-20} delay={0.5} />
         
         {/* Arrow to Hand (Bottom Left) - From "Como" */}
         <HandDrawnArrow className={`left-[20%] w-48 h-26 transition-all duration-300 ${isSidebarOpen ? 'bottom-36' : 'bottom-44'}`} rotation={150} delay={0.7} />
         
         {/* Arrow to FaceID (Bottom Center) - Pulled Back */}
         <HandDrawnArrow className={`left-[46.5%] w-24 h-24 transition-all duration-300 ${isSidebarOpen ? 'bottom-36' : 'bottom-44'}`} rotation={90} delay={0.9} />
         
         {/* Arrow to Yolo (Bottom Right) - From "Entendem?" */}
         <HandDrawnArrow className={`right-[24%] w-48 h-24 transition-all duration-300 ${isSidebarOpen ? 'bottom-36' : 'bottom-44'}`} rotation={30} flipX={true} delay={0.7} />
      </div>

      {/* --- Images Layer --- */}

      {/* --- Images Layer --- */}

      {/* Top Left - Autonomo (Swapped from Right) */}
      <ImageCard 
        src="/images/autonomo.png" 
        className={`left-16 w-60 h-40 transition-all duration-300 ${isSidebarOpen ? 'top-0' : 'top-8'}`}
        shadow="shadow-lg"
        delay={0}
      />

      {/* Top Right - Street (Swapped from Left) */}
      <ImageCard 
        src="/images/street.jpg" 
        className={`right-8 w-65 h-40 transition-all duration-300 ${isSidebarOpen ? 'top-0' : 'top-8'}`}
        delay={0.2} 
      />

      {/* Bottom Left - Hand (Strictly Bottom Left) */}
      <ImageCard 
        src="/images/hand.jpg" 
        className={`left-8 w-64 h-40 transition-all duration-300 ${isSidebarOpen ? 'bottom-0' : 'bottom-12'}`}
        delay={1.0}
      />
      
      {/* Bottom Center - Face ID (Strictly Centered) */}
      <ImageCard 
        src="/images/faceid.webp" 
        className={`left-0 right-0 mx-auto w-36 h-36 rounded-full transition-all duration-300 ${isSidebarOpen ? 'bottom-0' : 'bottom-8'}`}
        delay={0.8}
      />
      
      {/* Bottom Right - Yolo (Strictly Bottom Right) */}
       <ImageCard 
        src="/images/yolo.webp" 
        className={`right-20 w-56 h-40 transition-all duration-300 ${isSidebarOpen ? 'bottom-0' : 'bottom-12'}`}
        delay={1.8}
      />
    </div>
  );
};

export default ScatterImages;
