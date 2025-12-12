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

const TerminalWindow = ({ children, title = "terminal.py" }) => (
  <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden my-6 border border-gray-800 font-mono text-sm leading-relaxed text-gray-300 transform transition-transform hover:scale-[1.01]">
    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/50">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="text-xs text-gray-500 font-sans font-medium">{title}</div>
      <div className="w-12" />
    </div>
    <div className="p-6 overflow-x-auto">
        <pre>{children}</pre>
    </div>
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
                     {/* 8x8 Data */}
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
            Carros modernos "leem" placas, detectam pedestres e calculam a distância de outros veículos usando câmeras, não apenas sensores.
          </InfoCard>
          <InfoCard icon={ArrowRight} title="Diagnóstico Médico">
            IAs analisam Raio-X e Ressonâncias para detectar anomalias (como tumores) com precisão muitas vezes superior à humana.
          </InfoCard>
        </div>
      </Section>

      {/* --- Section 3: OpenCV --- */}
      {/* --- Section 3: OpenCV --- */}
      <Section title="A Base de Tudo: OpenCV">
        <p className="text-xl text-gray-600 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
          Criada pela Intel em 1999, a <strong>OpenCV</strong> (Open Source Computer Vision Library) é o "canivete suíço" da área. 
          Ela não apenas carrega imagens, mas nos dá <strong>superpoderes matemáticos</strong> para manipulá-las: aplicar filtros, transformar perspectivas, detectar bordas e converter espaços de cor.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-5 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl font-black text-blue-400 mb-1">1999</div>
                <div className="text-xs font-medium opacity-80 text-center">Lançado pela Intel</div>
            </div>
            <div className="flex flex-col items-center p-5 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl font-black text-green-400 mb-1">Real-Time</div>
                <div className="text-xs font-medium opacity-80 text-center">Processamento em Tempo Real</div>
            </div>
            <div className="flex flex-col items-center p-5 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl font-black text-purple-400 mb-1">Multi</div>
                <div className="text-xs font-medium opacity-80 text-center">C++ & Python</div>
            </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-8 mb-8 max-w-4xl mx-auto">
           <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">O Que Ela Faz de Verdade?</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col gap-2">
                 <div className="font-bold text-blue-700">🖼️ Processamento</div>
                 <p className="text-gray-600">Ajuste de brilho, contraste, desfoque (blur) e conversão de cores (ex: RGB para Cinza).</p>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="font-bold text-blue-700">📐 Geometria</div>
                 <p className="text-gray-600">Redimensionar, rotacionar, cortar e corrigir distorções de perspectiva.</p>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="font-bold text-blue-700">🔍 Análise</div>
                 <p className="text-gray-600">Encontrar bordas (Canny), detectar formas, linhas e contornos em objetos.</p>
              </div>
           </div>
        </div>

        <div className="text-center">
            <p className="text-lg font-medium text-slate-700 flex items-center justify-center gap-2">
               <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               Vamos explorar essas funções na prática no <strong>Laboratório</strong>.
            </p>
        </div>
      </Section>

      {/* --- Section 4: MediaPipe --- */}
      <Section title="A Evolução: Google MediaPipe" className="bg-blue-50">
         <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Context & Explanation */}
            <div className="flex-1 space-y-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                    Aqui damos um salto da "Visão Clássica" para o <strong>Deep Learning</strong>. 
                    Antigamente, rastrear uma mão exigia supercomputadores. O Google mudou o jogo ao otimizar redes neurais complexas para rodarem levemente no navegador e no celular.
                </p>
                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2">🚀 A Diferença Chave</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        O OpenCV "vê" contrastes de cores. O MediaPipe "entende" o objeto. 
                        Ele usa uma rede neural treinada com milhões de mãos reais para <strong>predizer</strong> onde cada articulação está, mesmo sem ter todos os pontos visíveis.
                    </p>
                </div>
            </div>
            
            {/* Right Column: Visuals & Models */}
            <div className="flex-1 w-full space-y-6">
                {/* Visual Proof (Image) */}
                <div className="relative group w-full">
                     <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-1 opacity-10 blur-sm"></div>
                     <img 
                        src="/images/hand_landmarks.png" 
                        alt="MediaPipe Hand Landmarks" 
                        className="relative rounded-2xl shadow-lg w-full h-auto border-2 border-white"
                     />
                </div>

                {/* Models List (Moved from bottom to here) */}
                <div className="grid grid-cols-1 gap-3">
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-400 transition-colors group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">🖐️</div>
                        <div>
                           <h3 className="font-bold text-gray-800">Hands</h3>
                           <p className="text-sm text-gray-600 leading-tight">Rastreia 21 pontos 3D para controle gestual.</p>
                        </div>
                     </div>
                     
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-purple-400 transition-colors group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">🎭</div>
                        <div>
                           <h3 className="font-bold text-gray-800">Face Mesh</h3>
                           <p className="text-sm text-gray-600 leading-tight">468 landmarks para filtros e expressões.</p>
                        </div>
                     </div>
                     
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-green-400 transition-colors group">
                        <div className="text-2xl group-hover:scale-110 transition-transform">🏃</div>
                        <div>
                           <h3 className="font-bold text-gray-800">Pose</h3>
                           <p className="text-sm text-gray-600 leading-tight">Análise de corpo inteiro para esportes.</p>
                        </div>
                     </div>
                </div>
                
                <p className="text-xs text-gray-400 text-center">E muito mais: Iris, Holistic, Objectron...</p>
            </div>
         </div>
      </Section>

      {/* --- Section 5: Teachable Machine --- */}
      <Section title="Sua Vez: Teachable Machine">
         <div className="flex flex-col items-center gap-8 max-w-6xl mx-auto py-8">
            
            {/* 1. Intro Text */}
            <p className="text-xl text-gray-700 text-center max-w-4xl leading-relaxed">
               Agora que você conhece a teoria, que tal <strong>prototipar sua própria IA</strong> em minutos? 
               O <strong>Teachable Machine</strong> permite ensinar computadores a reconhecerem <span className="text-blue-600 font-bold">Imagens, Sons e Poses</span>.
            </p>

            {/* 2. Main Image (Centered & Compact) */}
            <div className="relative group w-full max-w-3xl">
                 <div className="absolute inset-0 bg-purple-600 rounded-2xl rotate-1 opacity-10 blur-sm transform scale-105"></div>
                 <img 
                     src="/images/teacheblemachine.PNG" 
                     alt="Interface do Teachable Machine" 
                     className="relative rounded-2xl shadow-xl w-full h-auto border-2 border-white"
                 />
            </div>

            {/* 3. Horizontal Steps (Detailed) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
               <div className="flex flex-col items-center text-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-300 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-3">1</div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2">Coletar</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Capture imagens (Webcam) ou grave áudios (Microfone) para criar suas categorias.</p>
               </div>
               
               <div className="flex flex-col items-center text-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-purple-300 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mb-3">2</div>
                   <h4 className="font-bold text-gray-800 text-lg mb-2">Treinar</h4>
                   <p className="text-sm text-gray-600 leading-relaxed">Defina hiperparâmetros como épocas e learning rate, e treine o modelo instantaneamente.</p>
               </div>
               
               <div className="flex flex-col items-center text-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-green-300 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mb-3">3</div>
                   <h4 className="font-bold text-gray-800 text-lg mb-2">Exportar</h4>
                   <p className="text-sm text-gray-600 leading-relaxed">Exporte seu modelo treinado para usar em sites, aplicativos ou projetos de robótica.</p>
               </div>
            </div>
            
            {/* 4. CTA (Prominent) */}
            <div>
               <a 
                  href="https://teachablemachine.withgoogle.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-all hover:shadow-xl hover:-translate-y-1"
               >
                  <Cpu size={24} /> Criar Meu Primeiro Modelo
               </a>
            </div>
         </div>
      </Section>

      {/* --- Section 6: Phase 1 - Hand Tracking --- */}
      <Section title="Saindo da Teoria: O Projeto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left: Code Logic */}
              <div className="flex-1 w-full">
                  <p className="text-gray-700 mb-4 font-medium text-lg leading-relaxed">
                      "Esse é o tipo de projeto que eu sempre quis construir."
                  </p>
                  <p className="text-gray-600 mb-4 text-base leading-relaxed">
                      Entrei na área de Dados impressionado por carros autônomos, tentando entender como as máquinas "enxergavam". Mas o caminho não foi linear: comecei focado em <strong>Pandas, Numpy e Análise de Dados</strong>.
                  </p>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">
                      Depois de mais de 1 ano, percebi que ainda não tinha me aventurado no que me trouxe para essa carreira. <strong>Mudei isso agora.</strong>
                  </p>
                  <p className="text-blue-800 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500 mb-6 text-sm">
                      O primeiro passo foi usar a biblioteca <strong>MediaPipe</strong> para detectar os 21 landmarks (pontos-chave) que você viu na <strong>sessão acima</strong>.
                  </p>
                  
                <TerminalWindow title="detector.py">
                      <div><span className="text-purple-400">import</span> mediapipe <span className="text-purple-400">as</span> mp</div>
                      <div className="text-gray-500"># ... inicialização ...</div>
                      <div>results = hands.process(img_rgb)</div>
                      <div><span className="text-purple-400">if</span> results.multi_hand_landmarks:</div>
                      <div className="pl-4 text-gray-500"># Desenhar os 21 pontos</div>
                      <div className="pl-4">mp_draw.draw_landmarks(</div>
                      <div className="pl-8">img,</div>
                      <div className="pl-8">hands.HAND_CONNECTIONS</div>
                      <div className="pl-4">)</div>
                </TerminalWindow>
              </div>

              {/* Right: Visualization */}
              <div className="flex-1 w-full flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-500 w-full max-w-lg group">
                       {/* Scanner Overlay Effect */}
                       <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_rgb(59,130,246)] opacity-75 animate-pulse"></div>
                       <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500 opacity-20"></div>
                       <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500 opacity-20"></div>
                       
                       <img 
                           src="/images/hand_tracking.jpg" 
                           alt="Rastreamento de Mão MediaPipe" 
                           className="w-full h-auto"
                       />
                       
                       {/* HUD Overlay - Cleaned */}
                       <div className="absolute top-4 right-4 flex gap-2">
                           <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                           <span className="text-xs font-mono text-green-400 font-bold">LIVE SYSTEM</span>
                       </div>
                  </div>
              </div>
          </div>
      </Section>

      {/* --- Section 7.1: Phase 2 - Step 1 (Normal) --- */}
      {/* --- Section 7.1: Phase 2 - Step 1 (Normal) --- */}
      <Section title="Fase 2.1: A Matemática dos Vetores">
          <div className="flex flex-col lg:flex-row items-center gap-12 h-full">
              {/* Left: Image */}
              <div className="flex-1 w-full flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-500 w-full max-w-lg group hover:scale-[1.02] transition-transform">
                       <img src="/images/normal.jpg" alt="Estado Normal - Landmarks" className="w-full h-auto" />
                       <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded shadow-lg font-mono">ESTADO: 0 (NORMAL)</div>
                  </div>
              </div>

              {/* Right: Technical Explanation */}
              <div className="flex-1 space-y-6 min-w-0">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</div>
                      Normalização e Rastreamento
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                      Tudo começa com a extração bruta. O código varre os pixels e retorna uma lista de <strong>21 coordenadas (X, Y)</strong>.
                  </p>
                  <TerminalWindow title="math_utils.py">
                       <div><span className="text-purple-400">def</span> <span className="text-blue-400">find_hands</span>(img):</div>
                       <div className="pl-4">results = hands.process(img_rgb)</div>
                       <div className="pl-4 text-gray-500"># Retorna lista de Landmarks (pontos)</div>
                       <div className="pl-4">lm_list.append([id, cx, cy])</div>
                  </TerminalWindow>
                  <p className="text-sm text-gray-500 italic border-l-4 border-blue-200 pl-4 py-1">
                      Nesta etapa, o sistema é "frio". Ele vê a mão, mas não julga a intenção.
                  </p>
              </div>
          </div>
      </Section>

      {/* --- Section 7.2: Phase 2 - Step 2 (Armed) --- */}
      <Section title="Fase 2.2: Lógica & Geometria">
          <div className="flex flex-col lg:flex-row items-center gap-12 h-full">
               {/* Left: Image */}
              <div className="flex-1 w-full flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500 w-full max-w-lg group hover:scale-[1.02] transition-transform">
                       <img src="/images/armado.jpg" alt="Estado Armado - Geometria" className="w-full h-auto" />
                       <div className="absolute bottom-4 left-4 bg-orange-600 text-white text-xs px-3 py-1 rounded shadow-lg font-mono animate-pulse">ESTADO: 1 (ARMADO)</div>
                  </div>
              </div>

              {/* Right: Technical Explanation */}
              <div className="flex-1 space-y-6 min-w-0">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">2</div>
                      Cálculo de Hipotenusa
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                      Como saber se o dedão está dobrado? Usamos <strong>Álgebra Linear</strong>. Calculamos a distância euclidiana entre a ponta do dedão e a base do mindinho.
                  </p>
                    <TerminalWindow title="geometry.py">
                       <div className="text-gray-500"># A Regra de Ouro</div>
                       <div><span className="text-purple-400">if</span> dedao_dobrado &lt; (</div>
                       <div className="pl-4">largura_palma * <span className="text-orange-400">0.9</span></div>
                       <div>):</div>
                       <div className="pl-4"><span className="text-blue-400">print</span>(<span className="text-green-400">"Sinal Possível"</span>)</div>
                    </TerminalWindow>
                  <p className="text-gray-600 leading-relaxed">
                      Se essa condição for verdadeira E os 4 dedos estiverem para cima, o sistema desenha a <span className="text-orange-600 font-bold">caixa laranja</span> e entra em estado de alerta preliminar.
                  </p>
              </div>
          </div>
      </Section>

      {/* --- Section 7.3: Phase 2 - Step 3 (Alert) --- */}
      <Section title="Fase 2.3: Integração Universal (Webhooks)">
          <div className="flex flex-col lg:flex-row items-center gap-12 h-full">
               {/* Left: Image */}
              <div className="flex-1 w-full flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 w-full max-w-lg group hover:scale-[1.02] transition-transform">
                       <img src="/images/alerta.jpg" alt="Estado Alerta - Disparo" className="w-full h-auto" />
                       <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
                       <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded shadow-lg font-mono">ESTADO: 2 (DISPARO)</div>
                  </div>
              </div>

              {/* Right: Technical Explanation */}
              <div className="flex-1 space-y-6 min-w-0">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm">3</div>
                      O Céu é o Limite
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed text-justify">
                      Ao detectar o validador temporal (2s), enviamos um objeto JSON para o <strong>N8N</strong> (Automação).
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed text-justify">
                      Com o dado no Webhook, podemos conectá-lo a <strong>qualquer lugar</strong>: WhatsApp, SMS, Dashboard da Polícia ou Slack.
                  </p>
                    <TerminalWindow title="webhook_service.py">
                       <div><span className="text-purple-400">import</span> threading</div>
                       <div><span className="text-purple-400">import</span> requests</div>
                       <div className="mt-2 text-gray-500"># Envio Assíncrono</div>
                       <div>threading.Thread(</div>
                       <div className="pl-4">target=webhook_socorro,</div>
                       <div className="pl-4">args=(alert_data,)</div>
                       <div>).start()</div>
                    </TerminalWindow>
                  <p className="text-sm text-gray-500 italic border-l-4 border-red-200 pl-4 py-1 text-justify">
                      Curiosidade técnica: O envio é feito via <strong>Threading</strong> para não travar o processamento de imagem (FPS).
                  </p>
              </div>
          </div>
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