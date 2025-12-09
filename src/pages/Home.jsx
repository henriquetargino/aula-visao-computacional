import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Eye, Layers } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-cyan-500/50 transition-all group hover:-translate-y-1">
    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      {/* Hero */}
      <div className="text-center mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-800 text-cyan-400 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          VISION LAB v2.0
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          A VISÃO ALÉM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">DOS OLHOS</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light">
          Uma plataforma interativa para entender como máquinas interpretam o mundo. Sem instalação. Sem configuração. Python real no seu navegador.
        </p>

        <Link 
          to="/lab"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          Iniciar Laboratório
          <ArrowRight size={20} />
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={Cpu}
          title="Processamento Real"
          desc="Rodamos um interpretador Python completo via WebAssembly. Use NumPy e OpenCV de verdade."
        />
        <FeatureCard 
          icon={Eye}
          title="Visão Computacional"
          desc="Experimente algoritmos de Canny, Sobel e Thresholding em tempo real."
        />
        <FeatureCard 
          icon={Layers}
          title="Aprendizado Visual"
          desc="Veja a matriz de pixels sendo transformada passo a passo na sua frente."
        />
      </div>
    </div>
  );
};

export default Home;