import React, { createContext, useContext, useState, useRef } from 'react';

const PyodideContext = createContext();

// Script auxiliar Python que roda na inicialização
const PYTHON_SETUP_CODE = `
import sys
import io
import base64
import cv2
import numpy as np
from js import console

class StdoutCatcher(io.StringIO):
    def write(self, string):
        super().write(string)

def render(img_array):
    try:
        success, buffer = cv2.imencode('.png', img_array)
        if not success: return "ERROR: Encoding failed"
        img_str = base64.b64encode(buffer).decode('utf-8')
        return "IMG_DATA:" + img_str
    except Exception as e:
        return f"ERROR: {str(e)}"

def get_input_image(filename='input.png'):
    img = cv2.imread(filename)
    if img is None: raise Exception("Imagem não encontrada no sistema virtual.")
    return img
`;

export const PyodideProvider = ({ children }) => {
    const [pyodide, setPyodide] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState("");
    const [error, setError] = useState(null);
    
    // Evita carregamento duplo
    const loadingRef = useRef(false);

    const loadPyodideRuntime = async () => {
        if (pyodide) return pyodide; // Já carregado
        if (loadingRef.current) return; // Já está carregando

        loadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            // 1. Injetar Script Dinamicamente
            if (!window.loadPyodide) {
                setProgress("Baixando Motor Python (Wasm)...");
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            // 2. Inicializar Pyodide
            setProgress("Inicializando Interpretador...");
            const pyInstance = await window.loadPyodide();

            // 3. Carregar Pacotes Pesados
            setProgress("Instalando NumPy & OpenCV...");
            await pyInstance.loadPackage("numpy");
            await pyInstance.loadPackage("opencv-python");

            // 4. Setup
            setProgress("Configurando Helpers...");
            await pyInstance.runPythonAsync(PYTHON_SETUP_CODE);

            setPyodide(pyInstance);
            return pyInstance;
        } catch (err) {
            console.error(err);
            setError("Falha ao carregar o ambiente Python. Verifique sua conexão.");
        } finally {
            setIsLoading(false);
            loadingRef.current = false;
        }
    };

    return (
        <PyodideContext.Provider value={{ pyodide, loadPyodideRuntime, isLoading, progress, error }}>
            {children}
        </PyodideContext.Provider>
    );
};

export const usePyodide = () => useContext(PyodideContext);