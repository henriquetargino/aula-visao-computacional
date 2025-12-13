import React, { useState, useEffect, useCallback } from 'react';
import { usePyodide } from '../../context/PyodideContext';
import { Play, RotateCcw, Image as ImageIcon, Loader2, Save, Terminal } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
// import 'prismjs/themes/prism-tomorrow.css'; // Commented out to prevent potential build crash

const CodeChallenge = ({ id, title, description, difficulty, defaultImage, initialCode }) => {
    const pyodideContext = usePyodide();
    const pyodide = pyodideContext?.pyodide;
    
    // States
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState(null);
    const [inputPreview, setInputPreview] = useState(defaultImage);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    
    // File system name for this challenge
    const INPUT_FILENAME = `input_${id}.png`;

    const addLog = useCallback((msg) => setLogs(p => [...p, `> ${msg}`]), []);

    // 1. Initial Image Loading
    useEffect(() => {
        let mounted = true;

        const loadInternal = async () => {
            if (!pyodide || !mounted) return;
            
            try {
                // Check if file already exists (optimization)
                // specific check: pyodide.FS.analyzePath(INPUT_FILENAME).exists
                // But we usually want to ensure the default is there on fresh mount/reset
                
                // Fetch default image
                const res = await fetch(defaultImage);
                if (!res.ok) throw new Error("Failed to fetch default image");
                const buf = await res.arrayBuffer();
                
                if (mounted) {
                    pyodide.FS.writeFile(INPUT_FILENAME, new Uint8Array(buf));
                    // console.log(`Loaded default image for ${id}`);
                }
            } catch (err) {
                console.error(`Error loading default image for ${id}:`, err);
                if (mounted) addLog(`Erro ao carregar imagem padrão: ${err.message}`);
            }
        };

        loadInternal();

        return () => { mounted = false; };
    }, [pyodide, defaultImage, id, INPUT_FILENAME, addLog]);

    // Helper for safe execution with timeout
    const runWithTimeout = async (codeStr, timeoutMs = 10000) => {
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error("Tempo limite de execução excedido (10s).")), timeoutMs);
        });
        
        try {
            const result = await Promise.race([
                pyodide.runPythonAsync(codeStr),
                timeoutPromise
            ]);
            clearTimeout(timeoutId);
            return result;
        } catch (e) {
            clearTimeout(timeoutId);
            throw e;
        }
    };

    // 2. Handle Run
    const handleRun = async () => {
        if (!pyodide) return;
        setIsRunning(true);
        setLogs([]); 
        setOutput(null); 

        try {
            await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
`);
            
            const PRELUDE = `
import base64
import cv2
import numpy as np
import traceback
import sys

def get_input_image(filename):
    return cv2.imread(filename)

def render(img_array):
    if img_array is None:
        print("ERROR: Imagem vazia (None)")
        return
    _, buf = cv2.imencode('.png', img_array)
    b64 = base64.b64encode(buf).decode('utf-8')
    print("IMG_DATA:" + b64)
`;
            await runWithTimeout(PRELUDE);
            
            const SAFE_EXEC = `
try:
${code.split('\n').map(line => '    ' + line).join('\n')}
except Exception:
    print("ERROR_TRACE:" + traceback.format_exc())
`;
            
            await runWithTimeout(SAFE_EXEC);
            
            const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
            if (stdout) {
               if (stdout.includes("ERROR_TRACE:")) {
                   const parts = stdout.split("ERROR_TRACE:");
                   if(parts[0].trim()) addLog(parts[0]); 
                   
                   const tb = parts[1];
                   if (tb.includes("cv2.error")) {
                       addLog(`ERRO OpenCV: ${tb.split('cv2.error:')[1].split('\n')[0]}`);
                   } else {
                       addLog(`ERRO NO CÓDIGO:\n${tb}`);
                   }
               } else if (stdout.includes("IMG_DATA:")) {
                   // Split updates to handle regular logs + image
                   const lines = stdout.split('\n');
                   let imgFound = false;
                   lines.forEach(line => {
                       if (line.startsWith("IMG_DATA:")) {
                           const b64 = line.replace("IMG_DATA:", "");
                           setOutput(`data:image/png;base64,${b64}`);
                           addLog("Renderização concluída com sucesso!");
                           imgFound = true;
                       } else if (line.trim()) {
                           addLog(line);
                       }
                   });
               } else {
                   addLog(stdout);
                   addLog("(Sem imagem gerada. Use render(x) para ver o resultado.)");
               }
            } else {
                addLog("Código executado sem saída.");
            }

        } catch (err) {
            console.error(err);
            const msg = err.message || String(err);
            
            if (msg.includes("fatally failed")) {
                addLog("CRÍTICO: O ambiente Python travou.");
                setOutput("CRASHED"); 
            } else if (msg.includes("cv2.error")) {
                 addLog(`ERRO OpenCV: ${msg.split('cv2.error:')[1] || msg}`);
            } else {
                 addLog(`ERRO SISTEMA: ${msg}`);
            }
        } finally {
            setIsRunning(false);
        }
    };
    



    // 3. Handle Upload
    const handleUpload = async (e) => {
        if (!e.target.files[0] || !pyodide) return;
        const file = e.target.files[0];

        try {
            const ab = await file.arrayBuffer();
            pyodide.FS.writeFile(INPUT_FILENAME, new Uint8Array(ab));
            
            const previewUrl = URL.createObjectURL(file);
            setInputPreview(previewUrl);
            setOutput(null);
            addLog(`Upload: ${file.name} carregado como '${INPUT_FILENAME}'`);
            
            e.target.value = ''; // Reset input
        } catch (err) {
            addLog(`Erro no upload: ${err.message}`);
        }
    };

    // 4. Handle Reset
    const handleReset = async () => {
        if (!pyodide) return;
        try {
            const res = await fetch(defaultImage);
            const buf = await res.arrayBuffer();
            pyodide.FS.writeFile(INPUT_FILENAME, new Uint8Array(buf));
            setInputPreview(defaultImage);
            setOutput(null);
            setCode(initialCode);
            addLog("Reiniciado para imagem padrão.");
        } catch (err) {
            addLog("Erro ao resetar.");
        }
    };

    const renderPreviewContent = () => {
        if (output === "CRASHED") {
            return (
                <div className="flex flex-col items-center justify-center p-6 text-center h-full bg-red-50 text-red-800 animate-in fade-in zoom-in duration-300">
                    <div className="bg-red-100 p-4 rounded-full mb-4 shadow-sm">
                        <Loader2 size={32} className="animate-spin text-red-600"/> 
                    </div>
                    <h4 className="font-bold text-lg mb-2">Ambiente Travado!</h4>
                    <p className="text-sm mb-4 max-w-xs mx-auto">O Python encontrou um erro fatal (provavelmente loop infinito ou falta de memória).</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw size={16}/>
                        Recarregar Laboratório
                    </button>
                </div>
            );
        }
        
        if (output) {
            return <img src={output} alt="Output" className="max-w-full max-h-[320px] object-contain shadow-lg"/>;
        }
        
        if (inputPreview) {
             return <img src={inputPreview} alt="Input" className="max-w-full max-h-[320px] object-contain shadow-md"/>;
        }

        return (
             <div className="text-center text-gray-300">
                 <ImageIcon size={48} className="mx-auto mb-2"/>
                 <p className="text-sm">Sem imagem</p>
             </div>
        );
    };

    return (
        <div className="flex flex-col xl:flex-row gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* LEFT: Editor */}
            <div className="flex-1 flex flex-col min-h-[350px]">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                        </div>
                        <p className="text-gray-500 text-sm">{description}</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-800">
                    {/* Toolbar */}
                    <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-[#333]">
                        <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"/>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                             <div className="w-3 h-3 rounded-full bg-green-500"/>
                             <span className="ml-2 text-xs text-gray-400 font-mono">script.py</span>
                        </div>
                        <button 
                             onClick={handleRun}
                             disabled={isRunning || output === "CRASHED"}
                             className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold transition-all ${
                                 isRunning ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-500 text-white'
                             }`}
                        >
                             {isRunning ? <Loader2 size={12} className="animate-spin"/> : <Play size={12} fill="currentColor"/>}
                             {isRunning ? 'EXECUTANDO...' : 'RODAR CÓDIGO'}
                        </button>
                    </div>

                    <div className="flex-1 relative overflow-auto custom-scrollbar font-mono text-sm leading-relaxed">
                        <Editor
                            value={code}
                            onValueChange={setCode}
                            highlight={code => {
                                const grammar = Prism.languages.python || Prism.languages.plain;
                                return Prism.highlight(code, grammar, 'python');
                            }}
                            padding={20}
                            style={{
                                fontFamily: '"Fira Code", monospace',
                                fontSize: 14,
                                backgroundColor: '#1e1e1e',
                                color: '#d4d4d4',
                                minHeight: '100%',
                            }}
                            className="outline-none"
                        />
                    </div>
                </div>
                
            </div>

            {/* RIGHT: Preview & Terminal */}
            <div className="w-full xl:w-[400px] flex flex-col gap-4">
                <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-500 uppercase">Visualização</span>
                        <div className="flex gap-1">
                             <label className={`cursor-pointer p-1 hover:bg-white rounded text-blue-600 transition-colors ${output === "CRASHED" ? 'pointer-events-none opacity-50' : ''}`} title="Upload Imagem">
                                <ImageIcon size={14}/>
                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={output === "CRASHED"}/>
                             </label>
                             <button onClick={handleReset} disabled={output === "CRASHED"} className={`p-1 hover:bg-white rounded text-gray-600 transition-colors ${output === "CRASHED" ? 'pointer-events-none opacity-50' : ''}`} title="Resetar">
                                <RotateCcw size={14}/>
                             </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 min-h-[250px] bg-[url('/grid.svg')] bg-center relative group overflow-hidden flex items-center justify-center bg-gray-50">
                        {renderPreviewContent()}
                        {/* Loading Overlay */}
                        {isRunning && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                                <Loader2 size={32} className="animate-spin"/>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-3 text-center border-t border-gray-100">
                        <p className="text-xs text-gray-400">
                            {output === "CRASHED" ? "ERRO FATAL" : output ? "RESULTADO PYTHON" : "ENTRADA"}
                        </p>
                    </div>
                </div>

                 {/* Mini Terminal (Now on Right) */}
                 <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 h-40 overflow-y-auto border border-gray-800 shadow-inner flex-1 min-h-[150px]">
                    <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-gray-800 pb-1">
                        <Terminal size={12}/> <span>Terminal Output</span>
                    </div>
                    {logs.length === 0 ? (
                        <span className="text-gray-600 italic">Aguardando execução...</span>
                    ) : (
                        logs.map((l, i) => <div key={i}>{l}</div>)
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeChallenge;
