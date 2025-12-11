import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Eye, Layers, Cpu, Code2 } from 'lucide-react';
import ScatterImages from '../components/hero/ScatterImages';

const Section = ({ title, children, className = "" }) => (
  <section className={`py-16 border-b border-gray-100 relative z-10 min-h-screen flex flex-col justify-center ${className}`}>
    <div className="max-w-3xl mx-auto px-6 w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">{title}</h2>
      <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  </section>
);

const CodeBlock = ({ code }) => (
  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto my-6 shadow-lg">
    <pre>{code}</pre>
  </div>
);

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl transition-transform hover:-translate-y-1 duration-300">
    <div className="flex items-center gap-3 mb-3 text-blue-800">
      <Icon size={24} />
      <h3 className="font-bold">{title}</h3>
    </div>
    <p className="text-gray-700 text-base">{children}</p>
  </div>
);

const Home = () => {
  const { isSidebarOpen } = useOutletContext();

  return (
    <div className="w-full bg-white pb-0 relative">
      {/* Global Tech Mesh Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Hero Header */}
      <header className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden bg-white/50 backdrop-blur-sm z-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50/0 to-transparent opacity-70" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 border border-blue-100 shadow-sm animate-fade-in-up">
            Apresentação Interativa
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight drop-shadow-sm relative z-10">
            Introdução à <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Visão Computacional</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light relative z-10">
            Como as máquinas veem? O que elas entendem? <br />
            <span className="font-medium text-slate-800">Vamos descobrir na aula de hoje!</span>
          </p>
          
          <div className="h-24" /> {/* Spacer */}
        </div>

        {/* User Scatter Images (Full Width) */}
        <ScatterImages isSidebarOpen={isSidebarOpen} />
      </header>


      {/* --- Section 0: Introdução (Matriz Numérica) --- */}
      <Section title="O Que é uma Imagem Digital?">
         <p className="text-xl text-center text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Para nós, uma imagem é uma representação visual de objetos, pessoas e cenários.
            Mas para o computador, uma imagem não passa de uma <span className="font-bold text-blue-600">vasta matriz numérica</span>.
         </p>

         <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16">
            
            {/* Visual 1: O Que Vemos (Pixel Art) */}
            <div className="flex flex-col items-center space-y-4 group">
                <div className="relative w-64 h-64 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white grid grid-cols-8 gap-0.5 p-1 transition-transform duration-500 hover:scale-105">
                     {/* 8x8 Smiley Face Data */}
                     {[
                        0,0,0,0,0,0,0,0,
                        0,0,1,0,0,1,0,0,
                        0,0,1,0,0,1,0,0,
                        0,0,0,0,0,0,0,0,
                        0,1,0,0,0,0,1,0,
                        0,1,0,0,0,0,1,0,
                        0,0,1,1,1,1,0,0,
                        0,0,0,0,0,0,0,0
                     ].map((val, i) => (
                        <div key={i} className={`w-full h-full rounded-sm ${val ? 'bg-yellow-400' : 'bg-gray-800'}`}></div>
                     ))}
                </div>
                <div className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                    <span className="font-bold text-gray-700 flex items-center gap-2">
                        🎨 O Que Vemos
                    </span>
                </div>
            </div>

            {/* Arrow Indicator */}
            <div className="hidden lg:block text-gray-300">
                <ArrowRight size={48} className="animate-pulse" />
            </div>

            {/* Visual 2: Visão da Máquina (Matriz) */}
            <div className="flex flex-col items-center space-y-4 group">
                <div className="relative w-64 h-64 bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 grid grid-cols-8 gap-0 p-1 font-mono text-[10px] sm:text-xs content-center transition-transform duration-500 hover:scale-105">
                     {[
                        0,0,0,0,0,0,0,0,
                        0,0,1,0,0,1,0,0,
                        0,0,1,0,0,1,0,0,
                        0,0,0,0,0,0,0,0,
                        0,1,0,0,0,0,1,0,
                        0,1,0,0,0,0,1,0,
                        0,0,1,1,1,1,0,0,
                        0,0,0,0,0,0,0,0
                     ].map((val, i) => (
                        <div key={i} className={`flex items-center justify-center ${val ? 'text-yellow-400 font-bold' : 'text-gray-700'}`}>
                           {val ? '255' : '0'}
                        </div>
                     ))}
                </div>
                <div className="px-6 py-2 bg-gray-900 border border-gray-700 rounded-full shadow-sm whitespace-nowrap">
                   <span className="font-bold text-green-400 flex items-center gap-2">
                        💾 Visão do Computador
                   </span>
                </div>
            </div>

         </div>
      </Section>


      {/* --- Section 1: Teoria (Pixels & RGB) --- */}
      <Section title="A Teoria: Números e Cores" className="bg-slate-50">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-lg leading-relaxed">
              Já sabemos que imagens são matrizes numéricas. Mas como os números viram cores?
            </p>
            <p className="text-lg leading-relaxed">
               Cada <strong>Pixel</strong> não é apenas um número, mas um trio deles. O computador mistura três focos de luz com intensidades que vão de <strong>0</strong> (desligado) a <strong>255</strong> (máximo).
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Layers className="text-blue-500" size={20} /> O Sistema <span className="tracking-tighter"><span className="text-red-600">R</span><span className="text-green-600">G</span><span className="text-blue-600">B</span></span>
              </h4>
              <p className="text-sm text-gray-600">
                É como empilhar 3 "planilhas" de luz:
                <br/>
                <span className="text-red-600 font-bold">R</span>ed (Vermelho) + 
                <span className="text-green-600 font-bold"> G</span>reen (Verde) + 
                <span className="text-blue-600 font-bold"> B</span>lue (Azul).
                <br/>
                A soma de todos eles (255, 255, 255) resulta na luz Branca pura, enquanto a ausência de todos (0, 0, 0) resulta na escuridão total.
              </p>
            </div>
          </div>
          
          {/* Visual Metaphor for RGB (Additive Mixing) */}
          <div className="flex-1 flex flex-col items-center justify-center relative group">
             {/* Dark "Screen" Container */}
             <div className="relative w-64 h-64 md:w-80 md:h-80 bg-black rounded-full shadow-2xl border-4 border-gray-200 overflow-hidden flex items-center justify-center isolate">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50"></div>
                
                {/* Red Channel */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 bg-[#FF0000] rounded-full mix-blend-screen">
                   <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xs tracking-widest">RED</span>
                </div>
                
                {/* Green Channel */}
                <div className="absolute bottom-10 left-10 w-32 h-32 md:w-40 md:h-40 bg-[#00FF00] rounded-full mix-blend-screen">
                   <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-500 font-bold text-xs tracking-widest">GREEN</span>
                </div>
                
                {/* Blue Channel */}
                <div className="absolute bottom-10 right-10 w-32 h-32 md:w-40 md:h-40 bg-[#0000FF] rounded-full mix-blend-screen">
                   <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-blue-500 font-bold text-xs tracking-widest">BLUE</span>
                </div>
             </div>
             <p className="text-center text-xs text-gray-400 mt-4 max-w-xs">
                <strong>Mistura Aditiva:</strong> O centro branco é a soma de R + G + B.
             </p>
          </div>
        </div>
      </Section>

      {/* --- Section 2: Aplicações no Dia a Dia --- */}
      <Section title="Visão Computacional no Cotidiano">
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Você já usufruiu ou presenciou a visão computacional hoje, talvez sem perceber. Ela saiu dos filmes de ficção científica e agora vive no seu bolso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <InfoCard icon={Eye} title="FaceID & Biometria">
            Seu celular desbloqueia mapeando 30.000 pontos infravermelhos no seu rosto em milissegundos. Isso é visão computacional pura.
          </InfoCard>
          <InfoCard icon={Layers} title="Redes Sociais & Filtros">
             Aquele filtro de "orelha de cachorro"? Ele usa <strong>Face Mesh</strong> para criar um modelo 3D detalhado do rosto através de landmarks (pontos de referência).
          </InfoCard>
          <InfoCard icon={Cpu} title="Carros Autônomos">
            Carros modernos "leem" placas, detectam pedestres e calculam a distância de outros veículos usando câmeras, não apenas radares.
          </InfoCard>
          <InfoCard icon={ArrowRight} title="Diagnóstico Médico">
            IAs analisam Raio-X e Ressonâncias para detectar anomalias (como tumores) com precisão muitas vezes superior à humana.
          </InfoCard>
        </div>
      </Section>

      {/* --- Section 3: OpenCV --- */}
      <Section title="A Ferramenta: OpenCV">
        <p className="text-lg mb-8">
          Criada pela Intel em 1999, a <strong>OpenCV</strong> (Open Source Computer Vision Library) é a biblioteca padrão da indústria.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-900 text-white rounded-xl">
                <div className="text-4xl font-black text-blue-400 mb-2">2.500+</div>
                <div className="text-sm font-medium opacity-80">Algoritmos Otimizados</div>
            </div>
            <div className="text-center p-6 bg-gray-900 text-white rounded-xl">
                <div className="text-4xl font-black text-green-400 mb-2">47.000+</div>
                <div className="text-sm font-medium opacity-80">Membros na Comunidade</div>
            </div>
            <div className="text-center p-6 bg-gray-900 text-white rounded-xl">
                <div className="text-4xl font-black text-purple-400 mb-2">C++ / Py</div>
                <div className="text-sm font-medium opacity-80">Multi-Linguagem</div>
            </div>
        </div>

        <p className="text-lg mb-4">
          Vamos ver como o computador vê bordas com apenas 3 linhas de código:
        </p>

        <CodeBlock code={`import cv2

# 1. Carregar a câmera ou imagem
img = cv2.imread('minha_foto.jpg')

# 2. Detectar bordas (Algoritmo Canny)
# Ele procura onde a cor muda bruscamente (ex: branco para preto)
bordas = cv2.Canny(img, 100, 200)

# 3. Mostrar o resultado
cv2.imshow('Bordas Detectadas', bordas)`} />
      </Section>

      {/* --- Section 4: CTA --- */}
      <Section title="Hora da Prática!">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-12 rounded-3xl text-center text-white relative overflow-hidden shadow-2xl mx-auto max-w-4xl">
           {/* Background Decoration */}
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           
           <div className="relative z-10">
              <Cpu size={64} className="mx-auto text-blue-300 mb-6 animate-pulse" />
              <h3 className="text-3xl font-bold mb-4">Seu Laboratório Está Pronto</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Não precisa instalar nada. Configurei um ambiente Python completo com OpenCV rodando diretamente no seu navegador.
              </p>
              
              <Link 
                to="/lab"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg group"
              >
                <Code2 size={24} className="group-hover:rotate-12 transition-transform" />
                Acessar Laboratório Agora
              </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;