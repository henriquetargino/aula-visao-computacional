import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Fingerprint, ChevronRight } from 'lucide-react';

const BiometricScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef();
  
  const SCAN_DURATION = 1500; // 1.5s to complete

  const startScan = () => {
    setIsScanning(true);
  };

  const stopScan = () => {
    setIsScanning(false);
    setProgress(0);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  useEffect(() => {
    let startTime;
    
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const newProgress = Math.min((elapsed / SCAN_DURATION) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Scan complete
        navigate('/lab');
      }
    };

    if (isScanning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isScanning, navigate]);

  return (
    <div className="relative inline-flex items-center justify-center mt-8 group select-none">
      {/* Container principal - GestureDetector */}
      <div
        onMouseDown={startScan}
        onMouseUp={stopScan}
        onMouseLeave={stopScan}
        onTouchStart={startScan}
        onTouchEnd={stopScan}
        className="relative cursor-pointer"
      >
        {/* Background Button */}
        <div className={`
          relative z-20 flex items-center justify-center gap-3 px-10 py-5 
          bg-slate-900 rounded-full transition-all duration-300
          ${isScanning ? 'scale-95' : 'hover:scale-105 hover:bg-slate-800'}
        `}>
          <div className={`relative ${isScanning ? 'text-cyan-400' : 'text-white'}`}>
            <Fingerprint size={28} className={`transition-all ${isScanning ? 'animate-pulse' : ''}`} />
          </div>
          
          <div className="flex flex-col items-start">
            <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${isScanning ? 'text-cyan-400' : 'text-slate-400'}`}>
              {isScanning && progress < 100 ? 'Escaneando...' : 'Sistema de Acesso'}
            </span>
            <span className={`text-lg font-bold transition-colors ${isScanning ? 'text-white' : 'text-white'}`}>
              {isScanning && progress < 100 ? `${Math.round(progress)}% Concluído` : 'Inicializar Laboratório'}
            </span>
          </div>

          <ChevronRight 
            size={20} 
            className={`text-slate-500 transition-transform duration-300 ${isScanning ? 'translate-x-2 text-cyan-400' : 'group-hover:translate-x-1'}`} 
          />
        </div>

        {/* Pulse Effect Rings (Visible on Hover/Idle) */}
        {!isScanning && (
          <>
            <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping-slow pointer-events-none" />
            <div className="absolute -inset-1 rounded-full border border-cyan-500/20 pointer-events-none" />
          </>
        )}

        {/* Scanning Progress Ring (Visible when Scanning) */}
        {isScanning && (
          <div className="absolute -inset-0.5 rounded-full overflow-hidden pointer-events-none">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl transition-all duration-500" />
            
            {/* Border Progress - SVG Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect 
                x="0" 
                y="0" 
                width="100%" 
                height="100%" 
                rx="50"
                ry="50"
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="4"
                strokeDasharray="400"
                strokeDashoffset={400 - (400 * progress) / 100}
                className="transition-all duration-75 ease-linear"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className={`
        absolute -bottom-8 left-0 right-0 text-center transition-all duration-300
        ${isScanning ? 'opacity-0 translate-y-2' : 'opacity-60 translate-y-0'}
      `}>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Mantenha Pressionado
        </span>
      </div>
    </div>
  );
};

export default BiometricScanner;
