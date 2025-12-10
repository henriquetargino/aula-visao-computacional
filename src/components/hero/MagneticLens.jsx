import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';

const MagneticLens = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Configuration
  const MAGNETIC_STRENGTH = 0.5; // How much it follows the mouse (0-1)
  const MAGNETIC_RADIUS = 200; // Radius in pixels to activate effect

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < MAGNETIC_RADIUS) {
        // Magnetic pull
        const pullX = distX * MAGNETIC_STRENGTH;
        const pullY = distY * MAGNETIC_STRENGTH;
        setPosition({ x: pullX, y: pullY });
      } else {
        // Snap back
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    navigate('/lab');
  };

  return (
    <div className="relative flex items-center justify-center h-48 w-48">
      {/* Magnetic Area Debug (Optional, invisible) */}
      
      <div 
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.1s ease-out', // Smooth movement
        }}
        className="relative z-20 cursor-none group" // using cursor-none to replace with custom cursor if desired, or just pointer
      >
        {/* Main Glass Lens */}
        <div className={`
          relative flex items-center justify-center
          w-24 h-24 rounded-full
          bg-white/10 backdrop-blur-md border border-white/20
          shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
          transition-all duration-300
          ${isHovered ? 'scale-125 bg-white/20 border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]' : 'scale-100'}
        `}>
          {/* Inner Content */}
          <div className="relative text-blue-600 transition-transform duration-300">
             {isHovered ? (
               <ArrowRight size={32} className="animate-pulse" />
             ) : (
               <Eye size={32} />
             )}
          </div>

          {/* Glint/Reflection */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-white/40 rounded-full blur-[2px]" />
        </div>

        {/* Floating Label (follows lens) */}
        <div className={`
          absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
          text-xs font-bold tracking-widest uppercase
          transition-all duration-300 pointer-events-none
          ${isHovered ? 'text-blue-600 opacity-100 translate-y-0' : 'text-slate-400 opacity-0 -translate-y-2'}
        `}>
          Entrar no Laboratório
        </div>
      </div>
    </div>
  );
};

export default MagneticLens;
