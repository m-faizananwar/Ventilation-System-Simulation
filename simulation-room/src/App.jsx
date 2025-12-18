import React, { Suspense, useState, useEffect, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { House } from './House';
import { World } from './World';
import { Player } from './Player';
import './App.css';
import { Physics } from '@react-three/rapier';
import { Hand } from './Hand';
import { SimulationProvider } from './components/simulation/SimulationContext';
import SimulationControlMenu from './components/simulation/SimulationControlMenu';

// Create context for interaction state
export const InteractionContext = createContext({
    showTooltip: false,
    tooltipText: '',
    setTooltip: () => { },
    nearbyDoor: null,
    setNearbyDoor: () => { },
});

export const useInteraction = () => useContext(InteractionContext);

// Hand overlay that follows camera for first-person view
function HandOverlay({ heldItem }) {
    const { camera } = useThree();
    const groupRef = React.useRef();

    useFrame(() => {
        if (groupRef.current) {
            // Position hand relative to camera
            groupRef.current.position.copy(camera.position);
            groupRef.current.rotation.copy(camera.rotation);
        }
    });

    return (
        <group ref={groupRef}>
            <Hand heldItem={heldItem} />
        </group>
    );
}

function App() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipText, setTooltipText] = useState('');
    const [nearbyDoor, setNearbyDoor] = useState(null);

    // Stove control panel state
    const [showStovePanel, setShowStovePanel] = useState(false);
    const [stoveBurners, setStoveBurners] = useState([false, false, false, false]);

    // Fridge control panel state
    const [showFridgePanel, setShowFridgePanel] = useState(false);
    const [fridgeState, setFridgeState] = useState({ freezerOpen: false, fridgeOpen: false });

    // Item pickup state
    const [heldItem, setHeldItem] = useState(null);

    const setTooltip = (show, text = '') => {
        setShowTooltip(show);
        setTooltipText(text);
    };

    // Listen for tooltip and appliance control events
    useEffect(() => {
        const handleTooltipEvent = (e) => {
            // Don't show regular tooltip when panels are active
            if (!e.detail.isStove && !showFridgePanel) {
                setShowTooltip(e.detail.show);
                setTooltipText(e.detail.text);
            }
        };

        // Listen for stove control panel events
        const handleStoveEvent = (e) => {
            setShowStovePanel(e.detail.show);
            if (e.detail.burners) {
                setStoveBurners(e.detail.burners);
            }
        };

        // Listen for fridge control panel events
        const handleFridgeEvent = (e) => {
            setShowFridgePanel(e.detail.show);
            setFridgeState({
                freezerOpen: e.detail.freezerOpen,
                fridgeOpen: e.detail.fridgeOpen
            });
        };

        // Listen for item pickup/drop events
        const handlePickup = (e) => {
            setHeldItem(e.detail);
        };
        const handleDrop = () => {
            setHeldItem(null);
        };

        window.addEventListener('showInteractionTooltip', handleTooltipEvent);
        window.addEventListener('showStoveControl', handleStoveEvent);
        window.addEventListener('showFridgeControl', handleFridgeEvent);
        window.addEventListener('itemPickup', handlePickup);
        window.addEventListener('itemDrop', handleDrop);
        return () => {
            window.removeEventListener('showInteractionTooltip', handleTooltipEvent);
            window.removeEventListener('showStoveControl', handleStoveEvent);
            window.removeEventListener('showFridgeControl', handleFridgeEvent);
            window.removeEventListener('itemPickup', handlePickup);
            window.removeEventListener('itemDrop', handleDrop);
        };
    }, [showFridgePanel]);

    return (
        <SimulationProvider>
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
                    { name: 'grab', keys: ['g', 'G'] },
                ]}
            >
                <div id="canvas-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    <Canvas
                        camera={{ fov: 75, position: [0, 2, 20], near: 0.1, far: 500 }}
                        shadows="soft"
                        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
                        dpr={[0.75, 1]}
                    >
                        <color attach="background" args={['#87CEEB']} />

                        {/* Essential Lighting */}
                        <ambientLight intensity={0.6} />
                        <directionalLight
                            position={[50, 50, 25]}
                            intensity={1.2}
                            castShadow
                            shadow-mapSize-width={512}
                            shadow-mapSize-height={512}
                            shadow-camera-far={100}
                            shadow-camera-left={-30}
                            shadow-camera-right={30}
                            shadow-camera-top={30}
                            shadow-camera-bottom={-30}
                        />
                        <hemisphereLight args={['#87CEEB', '#3A5F0B', 0.5]} />

                        <Suspense fallback={null}>
                            <Physics gravity={[0, -9.81, 0]}>
                                <World />
                                <House position={[0, 0, 0]} />
                                <Player />
                            </Physics>

                            <Environment preset="sunset" />

                            {/* First-person hand overlay */}
                            <HandOverlay heldItem={heldItem} />
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

            {/* Stove Control Panel */}
            {showStovePanel && (
                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(180deg, rgba(30, 30, 35, 0.95) 0%, rgba(20, 20, 25, 0.98) 100%)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    fontFamily: '"Segoe UI", Arial, sans-serif',
                    pointerEvents: 'none',
                    border: '2px solid rgba(255, 100, 50, 0.3)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255, 100, 0, 0.2)',
                    backdropFilter: 'blur(12px)',
                    minWidth: '280px'
                }}>
                    {/* Header */}
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '16px',
                        color: '#ff8844',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        🔥 Stove Control
                    </div>

                    {/* Burner Grid 2x2 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginBottom: '16px'
                    }}>
                        {['Back Left', 'Back Right', 'Front Left', 'Front Right'].map((label, displayIndex) => {
                            // Map display order to actual burner indices
                            const burnerIndex = [2, 3, 0, 1][displayIndex];
                            const isOn = stoveBurners[burnerIndex];
                            return (
                                <div key={displayIndex} style={{
                                    background: isOn
                                        ? 'linear-gradient(135deg, rgba(255, 100, 0, 0.3) 0%, rgba(255, 50, 0, 0.4) 100%)'
                                        : 'rgba(60, 60, 65, 0.5)',
                                    border: isOn
                                        ? '2px solid rgba(255, 150, 50, 0.6)'
                                        : '2px solid rgba(100, 100, 105, 0.4)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    textAlign: 'center',
                                    transition: 'all 0.2s ease'
                                }}>
                                    {/* Burner Visual */}
                                    <div style={{
                                        fontSize: '24px',
                                        marginBottom: '6px'
                                    }}>
                                        {isOn ? '🔥' : '⚫'}
                                    </div>
                                    {/* Label */}
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#aaa',
                                        marginBottom: '4px'
                                    }}>
                                        {label}
                                    </div>
                                    {/* Key + Status */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        <div style={{
                                            width: '22px',
                                            height: '22px',
                                            background: isOn
                                                ? 'linear-gradient(135deg, #ff6600 0%, #ff4400 100%)'
                                                : 'linear-gradient(135deg, #555 0%, #444 100%)',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                            {burnerIndex + 1}
                                        </div>
                                        <span style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: isOn ? '#ff8844' : '#666'
                                        }}>
                                            {isOn ? 'ON' : 'OFF'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Controls Hint */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        fontSize: '12px',
                        color: '#888',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '12px'
                    }}>
                        <span><strong style={{ color: '#4CAF50' }}>1-4</strong> Toggle Burner</span>
                        <span><strong style={{ color: '#4CAF50' }}>E</strong> Toggle All</span>
                    </div>
                </div>
            )}

            {/* Fridge Control Panel */}
            {showFridgePanel && (
                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(180deg, rgba(30, 40, 50, 0.95) 0%, rgba(20, 30, 40, 0.98) 100%)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    fontFamily: '"Segoe UI", Arial, sans-serif',
                    pointerEvents: 'none',
                    border: '2px solid rgba(100, 180, 255, 0.3)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(100, 180, 255, 0.2)',
                    backdropFilter: 'blur(12px)',
                    minWidth: '240px'
                }}>
                    {/* Header */}
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '16px',
                        color: '#88CCFF',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        ❄️ Refrigerator
                    </div>

                    {/* Freezer Section */}
                    <div style={{
                        background: fridgeState.freezerOpen
                            ? 'linear-gradient(135deg, rgba(100, 180, 255, 0.3) 0%, rgba(50, 150, 255, 0.4) 100%)'
                            : 'rgba(60, 60, 65, 0.5)',
                        border: fridgeState.freezerOpen
                            ? '2px solid rgba(100, 200, 255, 0.6)'
                            : '2px solid rgba(100, 100, 105, 0.4)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{ fontSize: '24px' }}>
                            {fridgeState.freezerOpen ? '📂' : '🧊'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Freezer</div>
                            <div style={{ fontSize: '11px', color: fridgeState.freezerOpen ? '#88CCFF' : '#888' }}>
                                {fridgeState.freezerOpen ? 'OPEN' : 'CLOSED'}
                            </div>
                        </div>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            background: fridgeState.freezerOpen
                                ? 'linear-gradient(135deg, #44AAFF 0%, #2288FF 100%)'
                                : 'linear-gradient(135deg, #555 0%, #444 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            1
                        </div>
                    </div>

                    {/* Fridge Section */}
                    <div style={{
                        background: fridgeState.fridgeOpen
                            ? 'linear-gradient(135deg, rgba(100, 255, 150, 0.3) 0%, rgba(50, 200, 100, 0.4) 100%)'
                            : 'rgba(60, 60, 65, 0.5)',
                        border: fridgeState.fridgeOpen
                            ? '2px solid rgba(100, 255, 150, 0.6)'
                            : '2px solid rgba(100, 100, 105, 0.4)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{ fontSize: '24px' }}>
                            {fridgeState.fridgeOpen ? '📂' : '🥗'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Fridge</div>
                            <div style={{ fontSize: '11px', color: fridgeState.fridgeOpen ? '#88FF88' : '#888' }}>
                                {fridgeState.fridgeOpen ? 'OPEN' : 'CLOSED'}
                            </div>
                        </div>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            background: fridgeState.fridgeOpen
                                ? 'linear-gradient(135deg, #44FF88 0%, #22CC66 100%)'
                                : 'linear-gradient(135deg, #555 0%, #444 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            2
                        </div>
                    </div>

                    {/* Controls Hint */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        fontSize: '12px',
                        color: '#888',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '12px'
                    }}>
                        <span><strong style={{ color: '#4CAF50' }}>1</strong> Freezer</span>
                        <span><strong style={{ color: '#4CAF50' }}>2</strong> Fridge</span>
                        <span><strong style={{ color: '#4CAF50' }}>E</strong> Toggle All</span>
                    </div>
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
            
            {/* Simulation Control Menu */}
            <SimulationControlMenu />
        </InteractionContext.Provider>
        </SimulationProvider>
    );
}

export default App;