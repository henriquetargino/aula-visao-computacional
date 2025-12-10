import React from 'react';
import { ScanFace, Crosshair, BoxSelect, Activity } from 'lucide-react';

const FloatAnimation = ({ children, delay = 0, duration = 3 }) => (
  <div 
    className="animate-float"
    style={{ 
      animationDelay: `${delay}s`, 
      animationDuration: `${duration}s` 
    }}
  >
    {children}
  </div>
);

export const FaceDetectWidget = ({ className }) => (
  <FloatAnimation delay={0} duration={4}>
    <div className={`absolute flex flex-col items-center gap-2 p-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg shadow-lg ${className}`}>
      <div className="relative">
        <ScanFace className="text-blue-600" size={32} />
        <div className="absolute inset-0 border-2 border-blue-500/50 rounded-sm animate-ping-slow" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-1 rounded">FACE_ID: 8492</span>
        <span className="text-[9px] font-mono text-slate-500">CONFIDENCE: 99.8%</span>
      </div>
    </div>
  </FloatAnimation>
);

export const ObjectTag = ({ className, label, color = "green" }) => {
  const colorClasses = {
    green: "border-green-400 text-green-700 bg-green-50",
    purple: "border-purple-400 text-purple-700 bg-purple-50",
    orange: "border-orange-400 text-orange-700 bg-orange-50",
  }[color];

  return (
    <FloatAnimation delay={1.5} duration={5}>
      <div className={`absolute flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md border rounded-full shadow-sm ${colorClasses} ${className}`}>
        <BoxSelect size={14} />
        <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
        <span className="text-[10px] opacity-70 border-l border-current pl-2 ml-1">0.98</span>
      </div>
    </FloatAnimation>
  );
};

export const ProcessingChip = ({ className }) => (
  <FloatAnimation delay={0.5} duration={4.5}>
    <div className={`absolute flex items-center gap-3 pl-2 pr-4 py-2 bg-slate-900/90 backdrop-blur-md text-white rounded-lg shadow-xl border border-slate-700 ${className}`}>
      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center relative overflow-hidden">
        <Activity size={16} className="text-cyan-400" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-mono uppercase">Processing</span>
        <span className="text-xs font-bold text-cyan-400 font-mono">120 FPS</span>
      </div>
    </div>
  </FloatAnimation>
);

export const CodeSnippet = ({ className }) => (
  <FloatAnimation delay={2} duration={6}>
    <div className={`absolute p-3 bg-gray-900/95 backdrop-blur shadow-2xl rounded-lg border border-gray-700 font-mono text-[10px] leading-relaxed text-gray-300 ${className}`}>
      <div className="flex gap-1.5 mb-2 opacity-50">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
      <div><span className="text-purple-400">import</span> cv2</div>
      <div>img = cv2.<span className="text-blue-400">imread</span>(<span className="text-green-400">'data.jpg'</span>)</div>
      <div>gray = cv2.<span className="text-blue-400">cvtColor</span>(img)</div>
      <div className="text-gray-500 mt-1"># Analyzing...</div>
    </div>
  </FloatAnimation>
);
