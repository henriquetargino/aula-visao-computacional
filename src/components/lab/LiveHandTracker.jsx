import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { AlertTriangle, CheckCircle, Hand } from 'lucide-react';

const LiveHandTracker = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [status, setStatus] = useState("NORMAL"); // NORMAL, ARMED, TRIGGERED
    const [debugText, setDebugText] = useState("Aguardando gesto...");

    // Ref to store state without re-renders affecting logic loop
    const stateRef = useRef({
        status: "NORMAL",
        armStartTime: 0,
        lastSuccessTime: 0
    });

    // Constants
    const TIME_WINDOW = 2000; // 2 seconds to trigger after arming
    const COLOR_NORMAL = "#00FF00";
    const COLOR_ARMED = "#FFA500";
    const COLOR_TRIGGER = "#FF0000";

    const onResults = useCallback((results) => {
        if (!webcamRef.current || !webcamRef.current.video) return;

        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set canvas size
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasCtx = canvasRef.current.getContext('2d');
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, videoWidth, videoHeight);

        // Variables for this frame
        let signalDetectedInFrame = false;
        let now = Date.now();

        if (results.multiHandLandmarks) {
            for (let i = 0; i < results.multiHandLandmarks.length; i++) {
                const landmarks = results.multiHandLandmarks[i];
                const handedness = results.multiHandedness && results.multiHandedness[i] ? results.multiHandedness[i].label : "Right";
                
                // Draw skeleton
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
                drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1, radius: 2 });

                // --- LOGIC PER HAND ---
                const getCoord = (idx) => ({ x: landmarks[idx].x * videoWidth, y: landmarks[idx].y * videoHeight });
                const calcDist = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

                // 1. Fingers Up
                const fingers = [];
                const tipIds = [4, 8, 12, 16, 20];

                // Thumb Logic (Handedness Aware)
                // Right Hand: Thumb on Left (Tip X < Joint X = Open)
                // Left Hand: Thumb on Right (Tip X > Joint X = Open)
                // Note: Webcam is Mirrored visually, but Coordinates are normalized [0..1] from Left to Right of the IMAGE BUFFER.
                // If Mirrored: User Right Hand appears on Screen Right. 
                // MediaPipe Label "Right" = User's Right Hand.
                
                let thumbOpen = false;
                if (handedness === "Right") {
                     thumbOpen = landmarks[4].x < landmarks[3].x;
                } else {
                     thumbOpen = landmarks[4].x > landmarks[3].x;
                }
                fingers.push(thumbOpen ? 1 : 0);

                // 4 Fingers (Y axis)
                for (let j = 1; j < 5; j++) {
                    if (landmarks[tipIds[j]].y < landmarks[tipIds[j] - 2].y) {
                        fingers.push(1);
                    } else {
                        fingers.push(0);
                    }
                }

                // 2. Distances
                const p_indicador = getCoord(8);
                const p_medio = getCoord(12);
                const p_dedao = getCoord(4);
                const p_base_mind = getCoord(17);
                const p_base_ind = getCoord(5);

                const largura_palma = calcDist(p_base_ind, p_base_mind);
                const dist_dedos = calcDist(p_indicador, p_medio);
                const dist_dedao_mindinho = calcDist(p_dedao, p_base_mind);

                // 3. Conditions
                const quatro_dedos_up = (fingers[1] === 1 && fingers[2] === 1 && fingers[3] === 1 && fingers[4] === 1);
                const dedos_juntos = dist_dedos < (largura_palma * 0.45); // Slightly relaxed to 0.45
                const dedao_dobrado = dist_dedao_mindinho < (largura_palma * 0.9);
                const punho_fechado = fingers.every(f => f === 0);

                // --- STATE MACHINE UPDATE (PER HAND) ---
                let isArming = quatro_dedos_up && dedos_juntos && dedao_dobrado;
                
                if (isArming) {
                    signalDetectedInFrame = true;
                    // Draw Orange Info
                    canvasCtx.strokeStyle = COLOR_ARMED;
                    canvasCtx.lineWidth = 4;
                    // Bounding Box
                    const xList = landmarks.map(l => l.x * videoWidth);
                    const yList = landmarks.map(l => l.y * videoHeight);
                    const xMin = Math.min(...xList) - 20;
                    const xMax = Math.max(...xList) + 20;
                    const yMin = Math.min(...yList) - 20;
                    const yMax = Math.max(...yList) + 20;
                    canvasCtx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
                    
                    // Line
                    canvasCtx.beginPath();
                    canvasCtx.moveTo(p_dedao.x, p_dedao.y);
                    canvasCtx.lineTo(p_base_mind.x, p_base_mind.y);
                    canvasCtx.stroke();
                }

                // Check Trigger
                if (stateRef.current.status === "ARMED" && punho_fechado) {
                    signalDetectedInFrame = true; // Still detected "Activity"
                    
                    const timeSinceArm = now - stateRef.current.armStartTime;
                    if (timeSinceArm < TIME_WINDOW) {
                        // TRIGGER!
                        if (stateRef.current.status !== "TRIGGERED") {
                            stateRef.current.status = "TRIGGERED";
                            stateRef.current.lastSuccessTime = now;
                            setStatus("TRIGGERED");
                        }
                    }
                }
            }
        }

        // --- GLOBAL STATE LOGIC & TOLERANCE ---
        
        // If we found the signal (Arming or Triggering), update timestamps
        if (signalDetectedInFrame) {
             if (stateRef.current.status === "NORMAL" || stateRef.current.status === "ARMED") {
                 // Transition to ARMED if fresh
                 if (stateRef.current.status === "NORMAL") {
                     stateRef.current.status = "ARMED";
                     stateRef.current.armStartTime = now;
                     setStatus("ARMED");
                 }
                 // Keep updating "last seen" to prevent timeout
                 stateRef.current.lastArmedTime = now;
             }
        } else {
            // Signal NOT detected in this frame
            // Check tolerance to avoid flickering
            if (stateRef.current.status === "ARMED") {
                 const timeSinceLastSeen = now - (stateRef.current.lastArmedTime || 0);
                 if (timeSinceLastSeen > 500) { // 0.5s Tolerance
                     stateRef.current.status = "NORMAL";
                     setStatus("NORMAL");
                 }
            }
        }

        // Reset if ARMED for too long (Timeout)
        if (stateRef.current.status === "ARMED" && (now - stateRef.current.armStartTime) > TIME_WINDOW) {
            stateRef.current.status = "NORMAL";
            setStatus("NORMAL");
        }

        // Clear Trigger after display time
        if (stateRef.current.status === "TRIGGERED") {
            if (now - stateRef.current.lastSuccessTime > 4000) {
                stateRef.current.status = "NORMAL";
                setStatus("NORMAL");
            }
            // Flash Effect
            canvasCtx.fillStyle = "rgba(255, 0, 0, 0.3)";
            canvasCtx.fillRect(0, 0, videoWidth, videoHeight);
            setDebugText("ALERTA SOCORRO!");
        } else if (stateRef.current.status === "ARMED") {
             setDebugText("ARMADO (2s...)");
        } else {
             setDebugText("AGUARDANDO GESTO...");
        }

        canvasCtx.restore();
    }, []);

    useEffect(() => {
        let hands = null;
        let animationFrameId = null;

        if (cameraActive && isCameraReady) {
            hands = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`;
                }
            });

            hands.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.5
            });

            hands.onResults(onResults);

            const processVideo = async () => {
                if (
                    webcamRef.current && 
                    webcamRef.current.video && 
                    webcamRef.current.video.readyState === 4
                ) {
                    try {
                        await hands.send({ image: webcamRef.current.video });
                    } catch (error) {
                        console.error("MediaPipe Error:", error);
                    }
                }
                animationFrameId = requestAnimationFrame(processVideo);
            };

            processVideo();
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (hands) hands.close();
        };
    }, [cameraActive, isCameraReady, onResults]);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between w-full mb-4 bg-gray-900 p-4 rounded-xl text-white shadow-lg">
                <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${cameraActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="font-mono font-bold text-lg">{cameraActive ? "SISTEMA ATIVO" : "CÂMERA DESLIGADA"}</span>
                </div>
                
                {cameraActive && (
                    <div className="flex items-center gap-4 font-mono">
                        <span className={`px-3 py-1 rounded ${
                            status === 'TRIGGERED' ? 'bg-red-600 animate-bounce' : 
                            status === 'ARMED' ? 'bg-orange-500' : 'bg-green-800'
                        }`}>
                            {debugText}
                        </span>
                    </div>
                )}

                <button 
                    onClick={() => setCameraActive(!cameraActive)}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                        cameraActive 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {cameraActive ? 'Desligar Câmera' : 'Ligar Câmera'}
                </button>
            </div>

            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl">
                {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                        <Hand size={64} className="mb-4 opacity-50" />
                        <p>Ative a câmera para iniciar a detecção</p>
                    </div>
                )}
                
                {cameraActive && (
                    <>
                        <Webcam
                            ref={webcamRef}
                            className="absolute inset-0 w-full h-full object-cover"
                            mirrored={true}
                            onUserMedia={() => setIsCameraReady(true)}
                            onUserMediaError={(err) => console.error("Webcam Error:", err)}
                        />
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ transform: "scaleX(-1)" }}
                        />
                    </>
                )}
            </div>

            {/* Instruction Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
                 <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                        <CheckCircle size={20} /> 1. Normal
                    </div>
                    <p className="text-sm text-green-700">Mão aberta ou relaxada. Sistema em monitoramento.</p>
                 </div>
                 <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-800 font-bold mb-2">
                        <Hand size={20} /> 2. Armar
                    </div>
                    <p className="text-sm text-orange-700">Esconda o dedão na palma e levante os 4 dedos. (Dedos Juntos!)</p>
                 </div>
                 <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 text-red-800 font-bold mb-2">
                        <AlertTriangle size={20} /> 3. Disparar
                    </div>
                    <p className="text-sm text-red-700">Feche os dedos sobre o dedão dentro de <strong>2 segundos</strong>.</p>
                 </div>
            </div>
        </div>
    );
};

export default LiveHandTracker;
