import React, { useEffect, useState, useRef } from 'react';
import { usePyodide } from '../context/PyodideContext';
import { Play, RotateCcw, Image as ImageIcon, Loader2 } from 'lucide-react';

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
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    
    // Auto-init ao entrar na página
    useEffect(() => {
        loadPyodideRuntime().then(async (py) => {
             // Carrega imagem default se for a primeira vez
             if (py && !py.FS.analyzePath('input.png').exists) {
                try {
                    const res = await fetch("https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80");
                    const buf = await res.arrayBuffer();
                    py.FS.writeFile('input.png', new Uint8Array(buf));
                    addLog("Imagem padrão carregada.");
                } catch(e) { console.error(e); }
             }
        });
    }, []);

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
        const ab = await file.arrayBuffer();
        pyodide.FS.writeFile('input.png', new Uint8Array(ab));
        addLog(`Arquivo ${file.name} carregado.`);
    };

    // TELA DE LOADING INICIAL (SÓ PARA O LAB)
    if (isLoading || !pyodide) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-20">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse"></div>
                    <Loader2 size={64} className="text-cyan-400 animate-spin relative z-10" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Inicializando Ambiente</h2>
                <p className="text-slate-400 font-mono text-sm">{progress}</p>
                {error && <p className="text-red-400 mt-4 bg-red-900/20 p-2 rounded">{error}</p>}
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-2rem)] p-4 flex gap-4">
            
            {/* EDITOR COLUNA ESQUERDA */}
            <div className="flex-1 flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#0d1117] px-4 py-2 border-b border-[#30363d] flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-400">main.py</span>
                    <div className="flex gap-2">
                        <button onClick={() => setCode(DEFAULT_CODE)} className="p-1 hover:bg-slate-800 rounded text-slate-400" title="Resetar">
                            <RotateCcw size={14}/>
                        </button>
                    </div>
                </div>
                
                <textarea 
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="flex-1 bg-[#0d1117] text-[#e6edf3] p-4 font-mono text-sm outline-none resize-none leading-relaxed"
                    spellCheck="false"
                />

                <div className="p-4 bg-[#161b22] border-t border-[#30363d] flex justify-between items-center">
                    <div className="text-xs text-slate-500">Python 3.11 (Wasm)</div>
                    <button 
                        onClick={handleRun}
                        disabled={isRunning}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                            isRunning ? 'bg-slate-700 cursor-wait' : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                        }`}
                    >
                        {isRunning ? <Loader2 size={16} className="animate-spin"/> : <Play size={16} fill="currentColor"/>}
                        {isRunning ? 'PROCESSANDO...' : 'RODAR CÓDIGO'}
                    </button>
                </div>
            </div>

            {/* PREVIEW COLUNA DIREITA */}
            <div className="w-[45%] flex flex-col gap-4">
                {/* Canvas Area */}
                <div className="flex-1 bg-[#010409] border border-[#30363d] rounded-xl relative flex items-center justify-center overflow-hidden bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
                    {output ? (
                        <img src={output} className="max-w-full max-h-full shadow-2xl" />
                    ) : (
                        <div className="text-center text-slate-600">
                            <ImageIcon size={48} className="mx-auto mb-2 opacity-20"/>
                            <p className="text-sm">Sem saída visual</p>
                        </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                         <label className="cursor-pointer bg-[#161b22] hover:bg-[#1f2937] border border-[#30363d] text-slate-300 text-xs px-3 py-1.5 rounded-md transition-colors flex items-center gap-2">
                            Upload Imagem
                            <input type="file" className="hidden" accept="image/*" onChange={handleUpload}/>
                        </label>
                    </div>
                </div>

                {/* Terminal Area */}
                <div className="h-40 bg-[#0d1117] border border-[#30363d] rounded-xl p-3 font-mono text-xs overflow-y-auto">
                    <div className="text-slate-500 mb-2 border-b border-[#30363d] pb-1">CONSOLE OUTPUT</div>
                    {logs.map((l, i) => (
                        <div key={i} className="text-slate-300 mb-1 break-all">{l}</div>
                    ))}
                    {logs.length === 0 && <span className="text-slate-700 italic">Pronto para execução...</span>}
                </div>
            </div>
        </div>
    );
};

export default Lab;