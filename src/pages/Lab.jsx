import React, { useState, useEffect } from 'react';
import { usePyodide } from '../context/PyodideContext';
import { Loader2 } from 'lucide-react';
import CodeChallenge from '../components/lab/CodeChallenge';
import LiveHandTracker from '../components/lab/LiveHandTracker';

const CHALLENGES = [
    {
        id: "canny",
        title: "1. Detector de Bordas (Canny)",
        description: "O computador enxerga 'bordas' onde a cor muda drasticamente. É como desenhar apenas os contornos.",
        defaultImage: "/images/arcade.jpg",
        initialCode: `# EXERCÍCIO 1: CANNY (BORDAS)
import cv2
import numpy as np

# 1. Carrega a imagem do desafio
img = get_input_image('input_canny.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) # Converte para cinza

# 2. Detecta as bordas
# Os números (100, 200) são a sensibilidade.
# Menor = detecta mais detalhes (e ruído). Maior = apenas bordas fortes.
edges = cv2.Canny(gray, 100, 200)

# 3. Mostra o resultado
render(edges)
`
    },
    {
        id: "blur",
        title: "2. Suavização de Imagem (Blur)",
        description: "Reduz o ruído e detalhes finos, deixando a imagem 'embaçada'. Útil para limpar a imagem antes de processar.",
        defaultImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
        initialCode: `# EXERCÍCIO 2: GAUSSIAN BLUR (SUAVIZAÇÃO)
import cv2
import numpy as np

img = get_input_image('input_blur.png')

# 2. Aplica o filtro de desfoque
# O valor (31, 31) é o tamanho do borrão. 
# ATENÇÃO: Os números DEVEM ser ímpares (ex: 15, 31, 55)!
blurred = cv2.GaussianBlur(img, (31, 31), 0)

render(blurred)
`
    },
    {
        id: "gray",
        title: "3. Visão em Preto & Branco (Grayscale)",
        description: "Simplifica a imagem removendo as cores. 90% dos algoritmos de IA preferem imagens assim para focar na forma, não na cor.",
        defaultImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        initialCode: `# EXERCÍCIO 3: GRAYSCALE
import cv2
import numpy as np

img = get_input_image('input_gray.png')

# 2. Converte de Colorido (BGR) para Cinza (GRAY)
# O computador agora vê apenas intensidade de luz (0 a 255).
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

render(gray)
`
    },
    {
        id: "thresh",
        title: "4. Limiarização (Threshold)",
        description: "Decisão radical: Transformar cada pixel em PRETO total ou BRANCO total. Separa o objeto do fundo.",
        defaultImage: "/images/londres.jpg",
        initialCode: `# EXERCÍCIO 4: THRESHOLD (Binarização)
import cv2
import numpy as np

img = get_input_image('input_thresh.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 2. Aplica o corte (Limiar)
# Pixels abaixo de 40 viram preto (0). Acima, viram branco (255).
# Tente mudar o 40 para filtrar mais ou menos detalhes.
_, binary = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)

render(binary)
`
    },
    {
        id: "morph",
        title: "5. Morfologia (Dilatação)",
        description: "Operações matemáticas na forma dos objetos. A dilatação 'engorda' as áreas brancas, conectando letras falhadas.",
        defaultImage: "/images/central_park.jpg",
        initialCode: `# EXERCÍCIO 5: DILATAÇÃO
import cv2
import numpy as np

img = get_input_image('input_morph.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Invertendo para que as letras fiquem brancas (necessário para dilatar)
_, mask = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY_INV)

# 2. Cria o kernel (pincel) e Dilata
# Aumente (5,5) para engordar mais as letras.
kernel = np.ones((5,5), np.uint8)
dilation = cv2.dilate(mask, kernel, iterations=1)

render(dilation)
`
    }
];

const Lab = () => {
    // Note: usePyodide is now safely handled inside components, but checking loader state here is fine.
    // However, if CodeChallenge also accesses usePyodide, we should assume the Provider is wrapping everything.
    // Provider is in App.jsx, so we are good.
    const pyodideContext = usePyodide();
    const { loadPyodideRuntime, isLoading, progress, error, pyodide } = pyodideContext || {};

    const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'live'

    useEffect(() => {
        if (loadPyodideRuntime) {
            loadPyodideRuntime();
        }
    }, [loadPyodideRuntime]);
    
    // TELA DE LOADING INICIAL
    if (isLoading || !pyodide) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-20 bg-white">
                <div className="relative mb-6">
                    <Loader2 size={64} className="text-blue-600 animate-spin relative z-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Inicializando Laboratório</h2>
                <p className="text-slate-500 font-mono text-sm mb-4">{progress}</p>
                <p className="text-xs text-slate-400 max-w-md text-center">
                    Carregando Python, NumPy e OpenCV via WebAssembly.
                </p>
                {error && <p className="text-red-600 mt-4 bg-red-50 p-2 rounded border border-red-100">{error}</p>}
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header Tabs */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 shadow-sm z-10 sticky top-0">
                <h1 className="text-xl font-bold text-gray-800 mr-4 ml-24">Laboratório de Visão</h1>
                <button 
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                        activeTab === 'editor' 
                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 code-font'
                    }`}
                >
                    <span className="font-mono">🐍 Desafios OpenCV</span>
                </button>
                <button 
                    onClick={() => setActiveTab('live')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                        activeTab === 'live' 
                        ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-200' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    <span>🎥 Demo Ao Vivo (Webcam)</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto relative scroll-smooth">
                {activeTab === 'editor' ? (
                    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Editor OpenCV</h2>
                            <p className="text-gray-600">
                                Experimente os filtros clássicos de visão computacional diretamente no navegador. 
                                O código roda localmente usando WebAssembly.
                            </p>
                        </div>
                        
                        <div className="space-y-12">
                            {CHALLENGES.map(challenge => (
                                <CodeChallenge key={challenge.id} {...challenge} />
                            ))}
                        </div>

                        <div className="text-center text-gray-400 text-sm mt-12 pb-8">
                            Fim dos exercícios. Agora tente a aba <strong>Demo Ao Vivo</strong>!
                        </div>
                    </div>
                ) : (
                    <div className="h-full p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <LiveHandTracker />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lab;
