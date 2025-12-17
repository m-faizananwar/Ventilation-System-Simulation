import React, { Suspense, useState, useEffect, createContext, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { House } from './House';
import { World } from './World';
import { Player } from './Player';
import './App.css';
import { Physics } from '@react-three/rapier';

// Create context for interaction state
export const InteractionContext = createContext({
    showTooltip: false,
    tooltipText: '',
    setTooltip: () => { },
    nearbyDoor: null,
    setNearbyDoor: () => { },
});

export const useInteraction = () => useContext(InteractionContext);

function App() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipText, setTooltipText] = useState('');
    const [nearbyDoor, setNearbyDoor] = useState(null);

    const setTooltip = (show, text = '') => {
        setShowTooltip(show);
        setTooltipText(text);
    };

    // Listen for tooltip events from InteractiveDoor
    useEffect(() => {
        const handleTooltipEvent = (e) => {
            setShowTooltip(e.detail.show);
            setTooltipText(e.detail.text);
        };
        window.addEventListener('showInteractionTooltip', handleTooltipEvent);
        return () => window.removeEventListener('showInteractionTooltip', handleTooltipEvent);
    }, []);

    return (
        <InteractionContext.Provider value={{
            showTooltip,
            tooltipText,
            setTooltip,
            nearbyDoor,
            setNearbyDoor
        }}>
            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                    { name: 'jump', keys: ['Space'] },
                    { name: 'run', keys: ['Shift'] },
                    { name: 'interact', keys: ['e', 'E'] },
                ]}
            >
                <div id="canvas-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    <Canvas
                        camera={{ fov: 75, position: [0, 2, 20], near: 0.1, far: 1000 }}
                        shadows
                        gl={{ antialias: true, alpha: false }}
                    >
                        <color attach="background" args={['#87CEEB']} />

                        {/* Essential Lighting */}
                        <ambientLight intensity={0.6} />
                        <directionalLight
                            position={[50, 50, 25]}
                            intensity={1.2}
                            castShadow
                            shadow-mapSize-width={2048}
                            shadow-mapSize-height={2048}
                            shadow-camera-far={200}
                            shadow-camera-left={-50}
                            shadow-camera-right={50}
                            shadow-camera-top={50}
                            shadow-camera-bottom={-50}
                        />
                        <hemisphereLight args={['#87CEEB', '#3A5F0B', 0.5]} />

                        <Suspense fallback={null}>
                            <Physics gravity={[0, -9.81, 0]}>
                                <World />
                                <House position={[0, 0, 0]} />
                                <Player />
                            </Physics>

                            <Environment preset="sunset" />
                        </Suspense>
                    </Canvas>
                </div>
            </KeyboardControls>

            {/* Crosshair */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '4px',
                background: 'white',
                borderRadius: '50%',
                pointerEvents: 'none',
                boxShadow: '0 0 4px rgba(0,0,0,0.5)'
            }} />

            {/* Interaction Tooltip - Roblox Style */}
            {showTooltip && (
                <div style={{
                    position: 'absolute',
                    top: '58%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(180deg, rgba(40, 40, 45, 0.95) 0%, rgba(25, 25, 30, 0.98) 100%)',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontFamily: '"Segoe UI", Arial, sans-serif',
                    fontWeight: '500',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    {/* Key Icon */}
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(76, 175, 80, 0.4)'
                    }}>
                        E
                    </div>
                    <span style={{ letterSpacing: '0.3px' }}>{tooltipText}</span>
                </div>
            )}

            {/* Instructions */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'white',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px',
                borderRadius: '5px'
            }}>
                Click to Start | WASD to Move | E to Interact
            </div>
        </InteractionContext.Provider>
    );
}

export default App;