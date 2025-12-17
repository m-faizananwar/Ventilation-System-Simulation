import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { House } from './House';
import { World } from './World';
import { Player } from './Player';
// Overlay removed
import './App.css';
import { Physics } from '@react-three/rapier';

// FogSimulation removed

function App() {
    // State and handlers removed


    const handleStartSimulation = () => {
        // Pointer lock will be handled by clicking on canvas
    };

    // toggleAppliance removed

    return (
        <>
            {/* Overlay removed */}

            {/* Crosshair removed */}

            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                    { name: 'jump', keys: ['Space'] },
                    { name: 'run', keys: ['Shift'] },
                ]}
            >
                <div id="canvas-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    <Canvas
                        camera={{ fov: 75, position: [0, 2, 20], near: 0.1, far: 1000 }}
                        shadows
                        gl={{ antialias: true, alpha: false }}
                    >
                        <color attach="background" args={['#87CEEB']} />

                        {/* Fog removed */}

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

            {/* Instructions Overlay Removed */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'white',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px',
                borderRadius: '5px'
            }}>
                Click to Start | WASD to Move
            </div>
        </>
    );
}

export default App;