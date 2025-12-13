import React, { Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { House } from './House';
import { World } from './World';
import { Player } from './Player';
import { Overlay } from './Overlay';
import './App.css';
import { Physics } from '@react-three/rapier';

// Realistic fog simulation component
function FogSimulation({ fogIntensity, setFogIntensity, setSensors, setFanOn, fanOn }) {
    useFrame((state, delta) => {
        let newFog = fogIntensity;

        if (fanOn) {
            // Fans clear fog at realistic rate (15% per second)
            newFog -= 0.15 * delta;
        } else {
            // Natural slow dissipation (2% per second)
            newFog -= 0.02 * delta;
        }

        // Clamp fog intensity
        newFog = Math.max(0, Math.min(1, newFog));

        if (Math.abs(newFog - fogIntensity) > 0.001) {
            setFogIntensity(newFog);
        }

        // Realistic sensor calculations
        // CO2: Normal is 400ppm, dangerous is 1200+ppm
        const co2 = 400 + (newFog * 850); // 400-1250 ppm range
        
        // PM2.5: Safe is <35, unhealthy is >75 µg/m³
        const pm25 = 10 + (newFog * 150); // 10-160 µg/m³ range
        
        // AQI: Good is 0-50, moderate 51-100, unhealthy 101-150, very unhealthy 151+
        const smog = newFog * 300; // 0-300 AQI range

        setSensors({ co2, pm25, smog });

        // Automatic fan control based on thresholds
        // Turn ON if CO2 > 800 OR PM2.5 > 50 OR AQI > 100
        // Turn OFF if all values are safe: CO2 < 500 AND PM2.5 < 25 AND AQI < 40
        if (!fanOn && (co2 > 800 || pm25 > 50 || smog > 100)) {
            setFanOn(true);
        } else if (fanOn && co2 < 500 && pm25 < 25 && smog < 40) {
            setFanOn(false);
        }
    });

    return null;
}

function App() {
    const [fogIntensity, setFogIntensity] = useState(0);
    const [fanOn, setFanOn] = useState(false);
    const [sensors, setSensors] = useState({ co2: 400, pm25: 10, smog: 0 });
    const [isInstructionsVisible, setInstructionsVisible] = useState(true);
    const [isPointerLocked, setIsPointerLocked] = useState(false);

    const handleSimulateFog = () => {
        setFogIntensity(1.0); // Maximum pollution
    };

    const handleStartSimulation = () => {
        setInstructionsVisible(false);
        // Pointer lock will be handled by clicking on canvas
    };

    return (
        <>
            <Overlay
                fogIntensity={fogIntensity}
                sensors={sensors}
                fanOn={fanOn}
                onToggleFog={handleSimulateFog}
            />

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
                        
                        <FogSimulation
                            fogIntensity={fogIntensity}
                            setFogIntensity={setFogIntensity}
                            setSensors={setSensors}
                            setFanOn={setFanOn}
                            fanOn={fanOn}
                        />

                        {/* Realistic Volumetric Fog */}
                        {fogIntensity > 0.01 && (
                            <fog 
                                attach="fog" 
                                args={[
                                    '#CCCCCC', // Fog color (grayish)
                                    2, // Near distance
                                    30 - (fogIntensity * 20) // Far distance (closer when more fog)
                                ]} 
                            />
                        )}

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
                                <House position={[0, 0, 0]} fanOn={fanOn} sensors={sensors} />
                                <Player />
                            </Physics>

                            <Environment preset="sunset" />
                        </Suspense>
                    </Canvas>
                </div>
            </KeyboardControls>

            {/* Instructions Overlay - Outside Canvas */}
            {isInstructionsVisible && (
                <div 
                    onClick={handleStartSimulation}
                    style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0, 0, 0, 0.9)',
                            color: 'white',
                            padding: '40px',
                            borderRadius: '20px',
                            fontFamily: 'Arial, sans-serif',
                            textAlign: 'center',
                            cursor: 'pointer',
                            zIndex: 2000,
                            maxWidth: '500px',
                            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.8)',
                            border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <h1 style={{ 
                            margin: '0 0 30px 0',
                            fontSize: '2em',
                            background: 'linear-gradient(90deg, #4AF, #F4A)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            🏠 Smart Home Air Quality System
                        </h1>
                        
                        <div style={{ 
                            textAlign: 'left', 
                            marginBottom: '30px',
                            fontSize: '1.1em',
                            lineHeight: '1.8'
                        }}>
                            <div style={{ marginBottom: '15px' }}>
                                <strong>🎮 Controls:</strong>
                            </div>
                            <div style={{ marginLeft: '20px', color: '#CCC' }}>
                                <div>• <strong>WASD / Arrow Keys</strong> - Move</div>
                                <div>• <strong>Mouse</strong> - Look around</div>
                                <div>• <strong>SPACE</strong> - Jump</div>
                                <div>• <strong>SHIFT</strong> - Sprint</div>
                            </div>
                            
                            <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                                <strong>🌫️ Simulation:</strong>
                            </div>
                            <div style={{ marginLeft: '20px', color: '#CCC' }}>
                                <div>• Monitor real-time air quality</div>
                                <div>• Watch automatic fan activation</div>
                                <div>• Test pollution scenarios</div>
                            </div>
                        </div>
                        
                        <div style={{
                            padding: '15px',
                            background: 'linear-gradient(135deg, #4488FF, #0044CC)',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '1.2em',
                            marginTop: '20px'
                        }}>
                            CLICK TO START
                        </div>
                    </div>
                )}

            {!isInstructionsVisible && (
                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '0.95em',
                    pointerEvents: 'none',
                    zIndex: 100,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    WASD - Move | Mouse - Look | SPACE - Jump | SHIFT - Sprint | ESC - Release Mouse
                </div>
            )}
        </>
    );
}

export default App;