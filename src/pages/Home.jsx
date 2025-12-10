import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Eye, Layers, Cpu, Code2 } from 'lucide-react';
import ScatterImages from '../components/hero/ScatterImages';

const Section = ({ title, children, className = "" }) => (
  <section className={`py-16 border-b border-gray-100 relative z-10 ${className}`}>
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
      <div className="text-lg text-gray-600 leading-relaxed space-y-6">
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
  <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
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
    <div className="w-full bg-white pb-32 relative min-h-screen">
      {/* Global Tech Mesh Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none h-full" />
      
      {/* Hero Header */}
      <header className="py-24 px-6 text-center relative overflow-hidden">
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


      {/* Conteúdo da Aula */}
      <Section title="O que é uma Imagem Digital?">
        <p>
          Para nós, uma imagem é uma representação visual de objetos, pessoas e cenários. 
          Mas para o computador, uma imagem não passa de uma <strong>vasta matriz numérica</strong>.
        </p>
        <p>
          Imagine uma grade gigante semelhante a uma planilha de Excel. Cada célula dessa grade é um <strong>pixel</strong> (picture element).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <InfoCard icon={Layers} title="Matriz de Pixels">
            Uma imagem Full HD (1920x1080) contém mais de 2 milhões de pixels. Cada um armazena informações de cor.
          </InfoCard>
          <InfoCard icon={Eye} title="Canais de Cor">
            Normalmente usamos 3 canais: Vermelho (R), Verde (G) e Azul (B). Juntos, formam todas as cores que vemos.
          </InfoCard>
        </div>
      </Section>

      <Section title="OpenCV: A Ferramenta Padrão">
        <p>
          O OpenCV (Open Source Computer Vision Library) é a biblioteca mais utilizada no mundo para processamento de imagens em tempo real.
          Originalmente escrita em C++, ela possui uma interface Python extremamente poderosa que vamos usar hoje.
        </p>
        <p>
          No nosso laboratório, usamos uma versão especial chamada <strong>opencv-python-headless</strong> rodando diretamente no seu navegador via WebAssembly.
        </p>
      </Section>

      <Section title="Exemplo: Detecção de Bordas (Canny)">
        <p>
          Um dos algoritmos mais fundamentais é o <strong>Canny Edge Detector</strong>. Ele nos ajuda a encontrar as "linhas" que definem formas em uma imagem.
        </p>
        <p>
          O processo simplificado é:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4 marker:font-bold marker:text-blue-600">
          <li>Carregar a imagem original</li>
          <li>Converter para Tons de Cinza (simplifica os dados)</li>
          <li>Aplicar um filtro para reduzir ruído (Blur)</li>
          <li>Calcular o gradiente de intensidade (onde a cor muda bruscamente)</li>
        </ol>

        <CodeBlock code={`import cv2

# 1. Carregar imagem
img = cv2.imread('foto.jpg')

# 2. Converter para cinza
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 3. Detectar bordas
edges = cv2.Canny(gray, 100, 200)`} />
        
        <p>
          No laboratório ao lado, você poderá rodar exatamente este código e ver o resultado instantaneamente!
        </p>
      </Section>

      <Section title="Próximos Passos">
        <p>
          Agora que você entende o conceito básico de que imagens são números e que podemos manipulá-las matematicamente, é hora de colocar a mão na massa.
        </p>
        <div className="bg-gray-50 p-8 rounded-2xl text-center mt-8">
          <Cpu size={48} className="mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ambiente Configurado</h3>
          <p className="text-gray-600 mb-6">
            Preparamos um ambiente Python completo rodando no seu navegador. Nada para instalar.
          </p>
          <Link 
            to="/lab"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Começar Experimento <Code2 size={18} />
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;