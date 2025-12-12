import React, { useEffect, useState, useRef } from 'react';
import { usePyodide } from '../context/PyodideContext';
import { Play, RotateCcw, Image as ImageIcon, Loader2 } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import LiveHandTracker from '../components/lab/LiveHandTracker';

const DEFAULT_CODE = `# CÓDIGO INICIAL
import cv2
import numpy as np

# 1. Obter imagem carregada
img = get_input_image('input.png')

# 2. Processamento: Detecção de Bordas
# Converta para Cinza
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Aplique Canny (Bordas)
edges = cv2.Canny(gray, 100, 200)

# 3. Renderize o resultado
render(edges)
`;

const Lab = () => {
    const { pyodide, loadPyodideRuntime, isLoading, progress, error } = usePyodide();
    const [code, setCode] = useState(DEFAULT_CODE);
    const [output, setOutput] = useState(null);
    const [inputPreview, setInputPreview] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'live'
    
    // Auto-init ao entrar na página
    useEffect(() => {
        loadPyodideRuntime().then(async (py) => {
            // Carrega imagem default se for a primeira vez
            if (py && !py.FS.analyzePath('input.png').exists) {
                loadDefaultImage(py);
            }
        });
    }, []);

    const loadDefaultImage = async (pyInstance = pyodide) => {
        if (!pyInstance) return;
        try {
            const url = "/images/arcade.jpg";
            const res = await fetch(url);
            const buf = await res.arrayBuffer();
            pyInstance.FS.writeFile('input.png', new Uint8Array(buf));
            addLog("Imagem padrão carregada.");
            setInputPreview(url);
            setOutput(null); // Limpa output anterior
        } catch(e) { 
            console.error(e); 
            addLog("Erro ao carregar imagem padrão.");
        }
    };


    const addLog = (msg) => setLogs(p => [...p, `> ${msg}`]);

    const handleRun = async () => {
        if (!pyodide) return;
        setIsRunning(true);
        try {
            // Captura stdout
            await pyodide.runPythonAsync(`
import sys
sys.stdout = StdoutCatcher()
`);
            
            // Roda código do usuário
            const result = await pyodide.runPythonAsync(code);
            
            // Captura logs
            const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
            if(stdout) addLog(stdout);

            // Verifica resultado
            if (typeof result === 'string' && result.startsWith("IMG_DATA:")) {
                setOutput(`data:image/png;base64,${result.replace("IMG_DATA:", "")}`);
                addLog("Renderização concluída.");
            } else if (typeof result === 'string' && result.startsWith("ERROR:")) {
                addLog(result);
            }
        } catch (err) {
            addLog(`ERRO: ${err.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleUpload = async (e) => {
        if(!e.target.files[0] || !pyodide) return;
        const file = e.target.files[0];
        
        // Preview da imagem enviada
        const previewUrl = URL.createObjectURL(file);
        setInputPreview(previewUrl);
        setOutput(null); // Limpa o output anterior para focar na nova imagem

        const ab = await file.arrayBuffer();
        pyodide.FS.writeFile('input.png', new Uint8Array(ab));
        addLog(`Arquivo ${file.name} carregado.`);
        
        // Permitir re-upload do mesmo arquivo
        e.target.value = '';
    };

    const handleReset = async () => {
        if (!pyodide) return;
        await loadDefaultImage(pyodide);
    };

    // TELA DE LOADING INICIAL (SÓ PARA O LAB)
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
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 shadow-sm z-10">
                <h1 className="text-xl font-bold text-gray-800 mr-4">Laboratório de Visão</h1>
                <button 
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                        activeTab === 'editor' 
                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 code-font'
                    }`}
                >
                    <span className="font-mono">🐍 Editor Python</span>
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
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'editor' ? (
                    <div className="h-full p-6 gap-6 flex flex-col md:flex-row bg-slate-50/0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* EDITOR: VS Code Style */}
                        <div className="flex-1 flex flex-col bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl border border-gray-800">
                            {/* VS Code Tabs */}
                            <div className="bg-[#252526] flex items-center">
                                <div className="px-4 py-2.5 bg-[#1e1e1e] border-t-2 border-blue-500 text-white text-xs font-medium flex items-center gap-2 pr-6">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-4 h-4" alt="py"/> 
                                    <span className="text-blue-400">editor.py</span>
                                    <span className="ml-2 w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 cursor-pointer"></span>
                                </div>
                            </div>
                            
                            {/* Editor Area */}
                            <div className="flex-1 relative flex overflow-hidden">
                                {/* Line Numbers Fake Column - Extended */}
                                <div className="w-12 bg-[#1e1e1e] text-[#858585] text-right pr-3 pt-4 text-xs font-mono select-none border-r border-[#333]">
                                    {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                                </div>
                                <div className="flex-1 relative overflow-auto custom-scrollbar">
                                    <Editor
                                        value={code}
                                        onValueChange={setCode}
                                        highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
                                        padding={16}
                                        style={{
                                            fontFamily: '"Fira Code", "Fira Mono", monospace',
                                            fontSize: 14,
                                            backgroundColor: '#1e1e1e',
                                            color: '#d4d4d4',
                                            minHeight: '100%',
                                        }}
                                        className="outline-none"
                                        textareaClassName="focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* VS Code Status Bar */}
                            <div className="h-6 bg-[#007acc] flex items-center px-3 text-[11px] text-white justify-between select-none">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><span className="font-bold">⊗</span> 0</span>
                                    <span className="flex items-center gap-1"><span className="font-bold">⚠</span> 0</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>Ln {code.split('\n').length}, Col 1</span>
                                    <span>UTF-8</span>
                                    <span>Python</span>
                                </div>
                            </div>

                            {/* Toolbar */}
                            <div className="p-3 bg-[#252526] border-t border-[#333] flex justify-between items-center">
                                <button onClick={() => setCode(DEFAULT_CODE)} className="p-1.5 hover:bg-white/10 rounded flex items-center gap-2 text-xs text-[#cccccc] transition-colors">
                                    <RotateCcw size={14}/> Resetar
                                </button>
                                <button 
                                    onClick={handleRun}
                                    disabled={isRunning}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-sm font-medium text-xs transition-all ${
                                        isRunning 
                                        ? 'bg-[#333] text-gray-500 cursor-wait' 
                                        : 'bg-green-700 hover:bg-green-600 text-white'
                                    }`}
                                >
                                    {isRunning ? <Loader2 size={14} className="animate-spin"/> : <Play size={14} fill="currentColor"/>}
                                    {isRunning ? 'EXECUTANDO...' : 'RODAR CÓDIGO (F5)'}
                                </button>
                            </div>
                        </div>

                        {/* PREVIEW COLUNA DIREITA */}
                        <div className="w-full md:w-[450px] flex flex-col gap-6">
                            {/* Canvas Area */}
                            <div className="flex-1 bg-white border border-gray-200 rounded-xl relative flex flex-col items-center justify-center overflow-hidden shadow-sm">
                                <div className="absolute top-0 left-0 right-0 p-3 bg-white/90 backdrop-blur border-b border-gray-100 flex justify-between items-center z-10">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {output ? "Resultado" : "Visualização"}
                                    </span>
                                    
                                    <div className="flex items-center gap-2">
                                        
                                        <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 flex text-xs px-3 py-1.5 rounded-md transition-colors font-semibold items-center gap-2">
                                            <ImageIcon size={14} />
                                            Upload
                                            <input type="file" className="hidden" accept="image/*" onChange={handleUpload}/>
                                        </label>

                                        <button 
                                            onClick={handleReset}
                                            className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 flex text-xs px-3 py-1.5 rounded-md transition-colors font-semibold items-center gap-2"
                                            title="Resetar para imagem original"
                                        >
                                            <RotateCcw size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-full p-4 flex items-center justify-center bg-[radial-gradient(#f3f4f6_1px,transparent_1px)] [background-size:16px_16px]">
                                    {output ? (
                                        <img src={output} className="max-w-full max-h-full rounded shadow-sm border border-gray-100 object-contain" />
                                    ) : inputPreview ? (
                                        <img src={inputPreview} className="max-w-full max-h-full rounded shadow-sm border border-gray-100 object-contain" />
                                    ) : (
                                        <div className="text-center text-gray-300">
                                            <ImageIcon size={64} className="mx-auto mb-3 opacity-50"/>
                                            <p className="text-sm font-medium">Nenhuma imagem carregada</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Terminal Area */}
                            <div className="h-48 bg-[#1e1e1e] border border-gray-800 rounded-xl flex flex-col shadow-sm overflow-hidden text-[#cccccc]">
                                <div className="bg-[#252526] px-4 py-2 border-b border-[#333] flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-wider">Terminal</span>
                                    <span className="text-[10px] text-gray-500">bash</span>
                                </div>
                                <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
                                    {logs.map((l, i) => (
                                        <div key={i} className="mb-1 break-all border-b border-[#333] pb-0.5 last:border-0">{l}</div>
                                    ))}
                                    {logs.length === 0 && <span className="text-gray-500 italic">Aguardando execução...</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <LiveHandTracker />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lab;