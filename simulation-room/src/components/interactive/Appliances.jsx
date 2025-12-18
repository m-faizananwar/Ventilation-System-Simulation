import React, { useState, useRef, useEffect } from 'react';
import { Box, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated Ceiling Ventilation Fan for Kitchen
export const CeilingFan = ({ position, speed = 1 }) => {
    const fanRef = useRef();

    useFrame((state) => {
        if (!fanRef.current) return;
        // Rotate the fan blades
        fanRef.current.rotation.y += 0.08 * speed;
    });

    return (
        <group position={position}>
            {/* Ceiling mount */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.1, 12]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Down rod */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                <meshStandardMaterial color="#CCCCCC" metalness={0.6} />
            </mesh>
            {/* Motor housing */}
            <mesh position={[0, -0.4, 0]}>
                <cylinderGeometry args={[0.18, 0.15, 0.15, 12]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Fan blades group - this rotates */}
            <group ref={fanRef} position={[0, -0.45, 0]}>
                {/* 4 fan blades */}
                {[0, 1, 2, 3].map((i) => {
                    const angle = (i / 4) * Math.PI * 2;
                    return (
                        <group key={i} rotation={[0, angle, 0]}>
                            {/* Blade arm */}
                            <mesh position={[0.35, 0, 0]} rotation={[0, 0, 0.05]}>
                                <boxGeometry args={[0.55, 0.02, 0.12]} />
                                <meshStandardMaterial color="#D2B48C" roughness={0.7} />
                            </mesh>
                        </group>
                    );
                })}
            </group>
            {/* Light fixture at bottom */}
            <mesh position={[0, -0.55, 0]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial
                    color="#FFFEF0"
                    emissive="#FFF8DC"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            <pointLight position={[0, -0.6, 0]} color="#FFF8DC" intensity={0.8} distance={5} />
        </group>
    );
};

// Wall-Mounted Exhaust Ventilation Fan - Interactive (Click to toggle)
export const ExhaustFan = ({ position, rotation = [0, 0, 0], speed = 2, interactionDistance = 3 }) => {
    const bladeRef = useRef();
    const groupRef = useRef();
    const fanRef = useRef();
    const [isOn, setIsOn] = useState(false);
    const [isNearby, setIsNearby] = useState(false);
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const frameCounter = useRef(0);
    const posCache = useRef(new THREE.Vector3());
    const currentSpeed = useRef(0);

    useFrame(() => {
        if (!bladeRef.current || !groupRef.current || !fanRef.current) return;

        // Throttle proximity checks to every 10 frames
        frameCounter.current++;
        const shouldCheck = frameCounter.current >= 10;
        if (shouldCheck) frameCounter.current = 0;

        if (shouldCheck) {
            groupRef.current.getWorldPosition(posCache.current);
            const distance = camera.position.distanceTo(posCache.current);
            const isClose = distance < interactionDistance;

            let isLookingAt = false;
            if (isClose) {
                raycaster.setFromCamera({ x: 0, y: 0 }, camera);
                const intersects = raycaster.intersectObject(fanRef.current, true);
                isLookingAt = intersects.length > 0;
            }

            const nowNearby = isClose && isLookingAt;
            if (nowNearby !== isNearby) {
                setIsNearby(nowNearby);
            }
        }

        // Handle E key press - toggle fan
        const { interact } = getKeys();
        if (isNearby && interact && !lastInteract.current) {
            setIsOn(prev => !prev);
        }
        lastInteract.current = interact;

        // Smooth speed transition (ramp up/down)
        const targetSpeed = isOn ? speed : 0;
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.02;

        // Spin the exhaust fan blades
        bladeRef.current.rotation.z += 0.1 * currentSpeed.current;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <group ref={fanRef}>
                {/* Outer square housing/frame - light gray */}
                <Box args={[0.7, 0.7, 0.12]}>
                    <meshStandardMaterial color="#D0D0D0" />
                </Box>

                {/* Inner circular recessed area (dark black) */}
                <mesh position={[0, 0, 0.04]}>
                    <circleGeometry args={[0.28, 32]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>

                {/* Circular rim around opening */}
                <mesh position={[0, 0, 0.05]}>
                    <torusGeometry args={[0.28, 0.02, 12, 32]} />
                    <meshStandardMaterial color="#C0C0C0" />
                </mesh>

                {/* Spinning blades group */}
                <group ref={bladeRef} position={[0, 0, 0.06]}>
                    {/* 5 wide paddle-shaped fan blades - light gray/white */}
                    {[0, 1, 2, 3, 4].map((i) => {
                        const angle = (i / 5) * Math.PI * 2;
                        return (
                            <group key={i} rotation={[0, 0, angle]}>
                                {/* Wide paddle blade */}
                                <mesh position={[0.15, 0, 0]} rotation={[0.15, 0, 0]}>
                                    <boxGeometry args={[0.22, 0.12, 0.015]} />
                                    <meshStandardMaterial color="#E8E8E8" />
                                </mesh>
                                {/* Blade tip (slightly wider) */}
                                <mesh position={[0.24, 0, 0.005]} rotation={[0.2, 0, 0]}>
                                    <boxGeometry args={[0.08, 0.14, 0.012]} />
                                    <meshStandardMaterial color="#E0E0E0" />
                                </mesh>
                            </group>
                        );
                    })}

                    {/* Large center hub - light gray */}
                    <mesh position={[0, 0, 0.015]}>
                        <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
                        <meshStandardMaterial color="#D8D8D8" />
                    </mesh>
                    {/* Center hub cap */}
                    <mesh position={[0, 0, 0.04]}>
                        <sphereGeometry args={[0.025, 16, 16]} />
                        <meshStandardMaterial color="#C0C0C0" />
                    </mesh>
                </group>

                {/* Power indicator LED */}
                <mesh position={[0.25, -0.25, 0.07]}>
                    <sphereGeometry args={[0.015, 8, 8]} />
                    <meshStandardMaterial
                        color={isOn ? "#00ff00" : "#333333"}
                        emissive={isOn ? "#00ff00" : "#000000"}
                        emissiveIntensity={isOn ? 0.5 : 0}
                    />
                </mesh>

                {/* Bottom label area */}
                <Box args={[0.25, 0.06, 0.02]} position={[0, -0.28, 0.07]}>
                    <meshStandardMaterial color="#B0B0B0" />
                </Box>
            </group>

            {/* Interaction prompt */}
            {isNearby && (
                <Html position={[0, 0.5, 0.1]} center>
                    <div style={{
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        Press <span style={{
                            background: '#444',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid #666'
                        }}>E</span> to {isOn ? 'turn OFF' : 'turn ON'} fan
                    </div>
                </Html>
            )}
        </group>
    );
};

// Interactive Wall Switch Board with Light and Fan Controls
export const SwitchBoard = ({ position, rotation = [0, 0, 0], interactionDistance = 2.5, numSwitches = 4, hasSocket = true, roomName = "Room" }) => {
    const groupRef = useRef();
    const boardRef = useRef();
    const [switches, setSwitches] = useState(Array(numSwitches).fill(false));
    const [isNearby, setIsNearby] = useState(false);
    const [hoveredSwitch, setHoveredSwitch] = useState(-1);
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const frameCounter = useRef(0);
    const posCache = useRef(new THREE.Vector3());

    const switchLabels = ['Light 1', 'Light 2', 'Fan', 'Exhaust'];

    useFrame(() => {
        if (!groupRef.current || !boardRef.current) return;

        frameCounter.current++;
        const shouldCheck = frameCounter.current >= 8;
        if (shouldCheck) frameCounter.current = 0;

        if (shouldCheck) {
            groupRef.current.getWorldPosition(posCache.current);
            const distance = camera.position.distanceTo(posCache.current);
            const isClose = distance < interactionDistance;

            let isLookingAt = false;
            if (isClose) {
                raycaster.setFromCamera({ x: 0, y: 0 }, camera);
                const intersects = raycaster.intersectObject(boardRef.current, true);
                isLookingAt = intersects.length > 0;
            }

            const nowNearby = isClose && isLookingAt;
            if (nowNearby !== isNearby) {
                setIsNearby(nowNearby);
                if (!nowNearby) setHoveredSwitch(-1);
            }
        }

        // Handle number keys 1-4 to toggle individual switches
        if (isNearby) {
            const { interact } = getKeys();
            
            // Cycle through switches with E key
            if (interact && !lastInteract.current) {
                const nextSwitch = (hoveredSwitch + 1) % numSwitches;
                setHoveredSwitch(nextSwitch);
                setSwitches(prev => {
                    const newState = [...prev];
                    newState[nextSwitch] = !newState[nextSwitch];
                    return newState;
                });
            }
            lastInteract.current = interact;
        }
    });

    // Handle keyboard number inputs
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isNearby) return;
            const key = parseInt(e.key);
            if (key >= 1 && key <= numSwitches) {
                const idx = key - 1;
                setHoveredSwitch(idx);
                setSwitches(prev => {
                    const newState = [...prev];
                    newState[idx] = !newState[idx];
                    return newState;
                });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isNearby, numSwitches]);

    const boardHeight = hasSocket ? 0.28 : 0.22;
    const boardWidth = 0.12 + numSwitches * 0.055;

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <group ref={boardRef}>
                {/* Main switch board plate - modular design */}
                <Box args={[boardWidth, boardHeight, 0.02]}>
                    <meshStandardMaterial color="#FAFAFA" roughness={0.3} />
                </Box>
                
                {/* Outer frame/border */}
                <Box args={[boardWidth + 0.01, boardHeight + 0.01, 0.015]} position={[0, 0, -0.003]}>
                    <meshStandardMaterial color="#E0E0E0" roughness={0.4} />
                </Box>
                
                {/* Inner recessed area for switches */}
                <Box args={[boardWidth - 0.02, boardHeight - 0.04, 0.005]} position={[0, hasSocket ? 0.02 : 0, 0.008]}>
                    <meshStandardMaterial color="#F5F5F5" roughness={0.35} />
                </Box>

                {/* Individual Rocker Switches */}
                {switches.map((isOn, i) => {
                    const xPos = (i - (numSwitches - 1) / 2) * 0.05;
                    const isHovered = hoveredSwitch === i;
                    return (
                        <group key={i} position={[xPos, hasSocket ? 0.04 : 0.02, 0.012]}>
                            {/* Switch housing */}
                            <Box args={[0.04, 0.06, 0.015]}>
                                <meshStandardMaterial 
                                    color={isHovered ? "#E3F2FD" : "#FFFFFF"} 
                                    roughness={0.25} 
                                />
                            </Box>
                            
                            {/* Rocker switch - tilts based on state */}
                            <group rotation={[isOn ? -0.15 : 0.15, 0, 0]}>
                                <Box args={[0.032, 0.045, 0.012]} position={[0, 0, 0.01]}>
                                    <meshStandardMaterial 
                                        color={isOn ? "#4CAF50" : "#ECEFF1"} 
                                        roughness={0.2}
                                        metalness={0.1}
                                    />
                                </Box>
                                {/* Switch line indicator */}
                                <Box args={[0.015, 0.003, 0.002]} position={[0, isOn ? 0.012 : -0.012, 0.018]}>
                                    <meshStandardMaterial color={isOn ? "#81C784" : "#B0BEC5"} />
                                </Box>
                            </group>
                            
                            {/* LED indicator */}
                            <mesh position={[0, -0.038, 0.012]}>
                                <sphereGeometry args={[0.004, 8, 8]} />
                                <meshStandardMaterial 
                                    color={isOn ? "#4CAF50" : "#424242"}
                                    emissive={isOn ? "#4CAF50" : "#000000"}
                                    emissiveIntensity={isOn ? 1 : 0}
                                />
                            </mesh>
                            
                            {/* Switch number label */}
                            <Box args={[0.012, 0.008, 0.001]} position={[0, -0.048, 0.011]}>
                                <meshStandardMaterial color="#757575" />
                            </Box>
                        </group>
                    );
                })}

                {/* Power Socket (if enabled) */}
                {hasSocket && (
                    <group position={[0, -0.08, 0.01]}>
                        {/* Socket outer frame */}
                        <Box args={[0.055, 0.045, 0.008]}>
                            <meshStandardMaterial color="#FAFAFA" roughness={0.3} />
                        </Box>
                        {/* Socket inner face */}
                        <Box args={[0.045, 0.035, 0.006]} position={[0, 0, 0.004]}>
                            <meshStandardMaterial color="#F0F0F0" roughness={0.4} />
                        </Box>
                        {/* Three pin holes - Indian style */}
                        {/* Top ground pin */}
                        <mesh position={[0, 0.008, 0.01]}>
                            <cylinderGeometry args={[0.004, 0.004, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial color="#1a1a1a" />
                        </mesh>
                        {/* Left live pin */}
                        <mesh position={[-0.012, -0.006, 0.01]}>
                            <cylinderGeometry args={[0.003, 0.003, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial color="#1a1a1a" />
                        </mesh>
                        {/* Right neutral pin */}
                        <mesh position={[0.012, -0.006, 0.01]}>
                            <cylinderGeometry args={[0.003, 0.003, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial color="#1a1a1a" />
                        </mesh>
                    </group>
                )}

                {/* Mounting screws */}
                {[[-boardWidth/2 + 0.015, boardHeight/2 - 0.015], [boardWidth/2 - 0.015, boardHeight/2 - 0.015],
                  [-boardWidth/2 + 0.015, -boardHeight/2 + 0.015], [boardWidth/2 - 0.015, -boardHeight/2 + 0.015]].map(([x, y], i) => (
                    <group key={i} position={[x, y, 0.011]}>
                        <mesh>
                            <cylinderGeometry args={[0.006, 0.006, 0.004, 12]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial color="#9E9E9E" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Screw slot */}
                        <Box args={[0.008, 0.002, 0.001]} position={[0, 0, 0.003]}>
                            <meshStandardMaterial color="#616161" />
                        </Box>
                    </group>
                ))}
            </group>

            {/* Interaction UI */}
            {isNearby && (
                <Html position={[0, boardHeight/2 + 0.08, 0.03]} center>
                    <div style={{
                        background: 'rgba(0,0,0,0.85)',
                        color: 'white',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontFamily: 'Arial, sans-serif',
                        minWidth: '140px'
                    }}>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid #444', paddingBottom: '6px' }}>
                            {roomName} Switches
                        </div>
                        {switches.map((isOn, i) => (
                            <div key={i} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '4px',
                                padding: '3px 6px',
                                background: hoveredSwitch === i ? 'rgba(76,175,80,0.3)' : 'transparent',
                                borderRadius: '4px'
                            }}>
                                <span>
                                    <span style={{ 
                                        background: '#555', 
                                        padding: '1px 6px', 
                                        borderRadius: '3px',
                                        marginRight: '6px',
                                        fontSize: '11px'
                                    }}>{i + 1}</span>
                                    {switchLabels[i] || `Switch ${i + 1}`}
                                </span>
                                <span style={{ 
                                    color: isOn ? '#4CAF50' : '#f44336',
                                    fontWeight: 'bold',
                                    fontSize: '11px'
                                }}>
                                    {isOn ? 'ON' : 'OFF'}
                                </span>
                            </div>
                        ))}
                        <div style={{ marginTop: '8px', fontSize: '11px', color: '#aaa', textAlign: 'center' }}>
                            Press <span style={{ background: '#444', padding: '2px 6px', borderRadius: '3px' }}>1-4</span> to toggle
                        </div>
                    </div>
                </Html>
            )}

            {/* Ambient light when switches are on */}
            {switches.some(s => s) && (
                <pointLight 
                    position={[0, 0, 0.1]} 
                    color="#4CAF50" 
                    intensity={0.1} 
                    distance={0.5} 
                />
            )}
        </group>
    );
};

// Double Socket Power Outlet
export const PowerSocket = ({ position, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Socket plate */}
            <Box args={[0.09, 0.14, 0.015]}>
                <meshStandardMaterial color="#FAFAFA" roughness={0.3} />
            </Box>
            {/* Frame */}
            <Box args={[0.095, 0.145, 0.01]} position={[0, 0, -0.003]}>
                <meshStandardMaterial color="#E0E0E0" roughness={0.4} />
            </Box>
            
            {/* Top socket */}
            <group position={[0, 0.035, 0.008]}>
                <Box args={[0.055, 0.045, 0.008]}>
                    <meshStandardMaterial color="#F5F5F5" roughness={0.35} />
                </Box>
                {/* Three pin holes */}
                <mesh position={[0, 0.008, 0.008]}>
                    <cylinderGeometry args={[0.004, 0.004, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                <mesh position={[-0.012, -0.006, 0.008]}>
                    <cylinderGeometry args={[0.003, 0.003, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                <mesh position={[0.012, -0.006, 0.008]}>
                    <cylinderGeometry args={[0.003, 0.003, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
            </group>
            
            {/* Bottom socket */}
            <group position={[0, -0.035, 0.008]}>
                <Box args={[0.055, 0.045, 0.008]}>
                    <meshStandardMaterial color="#F5F5F5" roughness={0.35} />
                </Box>
                <mesh position={[0, 0.008, 0.008]}>
                    <cylinderGeometry args={[0.004, 0.004, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                <mesh position={[-0.012, -0.006, 0.008]}>
                    <cylinderGeometry args={[0.003, 0.003, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                <mesh position={[0.012, -0.006, 0.008]}>
                    <cylinderGeometry args={[0.003, 0.003, 0.008, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
            </group>
            
            {/* Mounting screws */}
            {[[0, 0.06], [0, -0.06]].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0.01]}>
                    <cylinderGeometry args={[0.005, 0.005, 0.004, 12]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#9E9E9E" metalness={0.8} roughness={0.2} />
                </mesh>
            ))}
        </group>
    );
};

// Realistic Convection Panel Heater - Interactive with visible heating elements
export const RoomHeater = ({ position, rotation = [0, 0, 0], interactionDistance = 2.5 }) => {
    const groupRef = useRef();
    const heaterRef = useRef();
    const [isOn, setIsOn] = useState(false);
    const [heatLevel, setHeatLevel] = useState(1); // 1-3 heat levels
    const [isNearby, setIsNearby] = useState(false);
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const frameCounter = useRef(0);
    const posCache = useRef(new THREE.Vector3());
    const glowIntensity = useRef(0);
    const pulsePhase = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current || !heaterRef.current) return;

        frameCounter.current++;
        const shouldCheck = frameCounter.current >= 10;
        if (shouldCheck) frameCounter.current = 0;

        if (shouldCheck) {
            groupRef.current.getWorldPosition(posCache.current);
            const distance = camera.position.distanceTo(posCache.current);
            const isClose = distance < interactionDistance;

            let isLookingAt = false;
            if (isClose) {
                raycaster.setFromCamera({ x: 0, y: 0 }, camera);
                const intersects = raycaster.intersectObject(heaterRef.current, true);
                isLookingAt = intersects.length > 0;
            }

            const nowNearby = isClose && isLookingAt;
            if (nowNearby !== isNearby) {
                setIsNearby(nowNearby);
            }
        }

        // Handle E key press - cycle through: OFF -> Level 1 -> Level 2 -> Level 3 -> OFF
        const { interact } = getKeys();
        if (isNearby && interact && !lastInteract.current) {
            if (!isOn) {
                setIsOn(true);
                setHeatLevel(1);
            } else if (heatLevel < 3) {
                setHeatLevel(prev => prev + 1);
            } else {
                setIsOn(false);
                setHeatLevel(1);
            }
        }
        lastInteract.current = interact;

        // Smooth glow transition with subtle pulse when on
        const targetGlow = isOn ? heatLevel * 0.4 : 0;
        glowIntensity.current += (targetGlow - glowIntensity.current) * 0.03;
        
        // Subtle heating element pulse effect
        if (isOn) {
            pulsePhase.current += delta * 2;
        }
    });

    const heaterWidth = 0.6;
    const heaterHeight = 0.5;
    const heaterDepth = 0.1;
    const elementCount = 6;
    const pulseValue = isOn ? Math.sin(pulsePhase.current) * 0.1 + 0.9 : 0;

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <group ref={heaterRef}>
                {/* Main body - sleek white panel design */}
                <Box args={[heaterWidth, heaterHeight, heaterDepth]} position={[0, heaterHeight/2 + 0.08, 0]}>
                    <meshStandardMaterial color="#F5F5F5" roughness={0.3} metalness={0.1} />
                </Box>
                
                {/* Front panel frame - darker accent */}
                <Box args={[heaterWidth + 0.02, heaterHeight + 0.02, 0.005]} position={[0, heaterHeight/2 + 0.08, heaterDepth/2 + 0.003]}>
                    <meshStandardMaterial color="#E0E0E0" roughness={0.4} />
                </Box>

                {/* Ventilation grille at top - where hot air comes out */}
                <group position={[0, heaterHeight + 0.02, heaterDepth/2 - 0.02]}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Box key={i} args={[heaterWidth - 0.08, 0.008, 0.025]} position={[0, -i * 0.012, 0]}>
                            <meshStandardMaterial 
                                color="#333333" 
                                roughness={0.7}
                                emissive={isOn ? "#FF4500" : "#000000"}
                                emissiveIntensity={glowIntensity.current * 0.2 * pulseValue}
                            />
                        </Box>
                    ))}
                </group>

                {/* Visible heating elements through front grille */}
                <group position={[0, heaterHeight/2 + 0.08, heaterDepth/2 - 0.01]}>
                    {/* Heating element grille */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Box key={i} args={[heaterWidth - 0.06, 0.012, 0.008]} position={[0, (i - 3.5) * 0.045, 0]}>
                            <meshStandardMaterial color="#2C2C2C" roughness={0.8} />
                        </Box>
                    ))}
                    
                    {/* Glowing heating coils behind grille */}
                    {Array.from({ length: elementCount }).map((_, i) => {
                        const yPos = (i - (elementCount - 1) / 2) * 0.06;
                        const activeElement = isOn && i < heatLevel * 2;
                        return (
                            <group key={i} position={[0, yPos, -0.02]}>
                                {/* Coil element */}
                                <mesh>
                                    <torusGeometry args={[0.015, 0.003, 8, 32, Math.PI * 8]} />
                                    <meshStandardMaterial 
                                        color={activeElement ? "#FF6B35" : "#444444"}
                                        emissive={activeElement ? "#FF4500" : "#000000"}
                                        emissiveIntensity={activeElement ? glowIntensity.current * pulseValue : 0}
                                        roughness={0.6}
                                    />
                                </mesh>
                                {/* Horizontal heating wire */}
                                <mesh position={[0, 0, 0]}>
                                    <boxGeometry args={[heaterWidth - 0.12, 0.006, 0.006]} />
                                    <meshStandardMaterial 
                                        color={activeElement ? "#FF8C00" : "#555555"}
                                        emissive={activeElement ? "#FF4500" : "#000000"}
                                        emissiveIntensity={activeElement ? glowIntensity.current * 1.2 * pulseValue : 0}
                                        roughness={0.5}
                                        metalness={0.3}
                                    />
                                </mesh>
                            </group>
                        );
                    })}
                </group>

                {/* Bottom intake grille */}
                <group position={[0, 0.12, heaterDepth/2 - 0.02]}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Box key={i} args={[heaterWidth - 0.08, 0.006, 0.02]} position={[0, -i * 0.01, 0]}>
                            <meshStandardMaterial color="#444444" roughness={0.7} />
                        </Box>
                    ))}
                </group>

                {/* Feet/stand */}
                {[[-heaterWidth/2 + 0.06, 0], [heaterWidth/2 - 0.06, 0]].map(([x, z], i) => (
                    <group key={i} position={[x, 0, z]}>
                        {/* Foot */}
                        <Box args={[0.08, 0.08, 0.12]}>
                            <meshStandardMaterial color="#2C2C2C" roughness={0.7} />
                        </Box>
                        {/* Rubber pad */}
                        <Box args={[0.07, 0.01, 0.11]} position={[0, -0.035, 0]}>
                            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                        </Box>
                    </group>
                ))}

                {/* Control Panel - Right side */}
                <group position={[heaterWidth/2 - 0.08, heaterHeight/2 + 0.08, heaterDepth/2 + 0.02]}>
                    {/* Panel background */}
                    <Box args={[0.12, 0.2, 0.015]}>
                        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
                    </Box>
                    
                    {/* Power button - large circular */}
                    <group position={[0, 0.06, 0.01]}>
                        <mesh>
                            <cylinderGeometry args={[0.025, 0.025, 0.01, 24]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial 
                                color={isOn ? "#333333" : "#222222"} 
                                roughness={0.4}
                                metalness={0.2}
                            />
                        </mesh>
                        {/* Power symbol */}
                        <mesh position={[0, 0, 0.006]}>
                            <ringGeometry args={[0.008, 0.012, 16, 1, 0, Math.PI * 1.5]} />
                            <meshStandardMaterial 
                                color={isOn ? "#FF4500" : "#666666"}
                                emissive={isOn ? "#FF4500" : "#000000"}
                                emissiveIntensity={isOn ? 0.8 : 0}
                            />
                        </mesh>
                        <Box args={[0.004, 0.012, 0.002]} position={[0, 0.006, 0.006]}>
                            <meshStandardMaterial 
                                color={isOn ? "#FF4500" : "#666666"}
                                emissive={isOn ? "#FF4500" : "#000000"}
                                emissiveIntensity={isOn ? 0.8 : 0}
                            />
                        </Box>
                    </group>

                    {/* Heat level selector - 3 buttons */}
                    {[1, 2, 3].map((level) => (
                        <group key={level} position={[-0.03 + (level - 1) * 0.03, -0.02, 0.01]}>
                            <mesh>
                                <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} rotation={[Math.PI / 2, 0, 0]} />
                                <meshStandardMaterial 
                                    color={isOn && heatLevel >= level ? "#FF6B35" : "#444444"}
                                    emissive={isOn && heatLevel >= level ? "#FF4500" : "#000000"}
                                    emissiveIntensity={isOn && heatLevel >= level ? 0.6 : 0}
                                    roughness={0.5}
                                />
                            </mesh>
                            {/* Level number indicator */}
                            <Box args={[0.006, 0.008, 0.001]} position={[0, 0, 0.005]}>
                                <meshStandardMaterial color="#888888" />
                            </Box>
                        </group>
                    ))}

                    {/* Temperature display (digital style) */}
                    <group position={[0, -0.06, 0.008]}>
                        <Box args={[0.06, 0.025, 0.005]}>
                            <meshStandardMaterial color="#111111" />
                        </Box>
                        {/* Display segments showing temperature */}
                        <Box args={[0.05, 0.018, 0.002]} position={[0, 0, 0.004]}>
                            <meshStandardMaterial 
                                color={isOn ? "#FF3300" : "#220000"}
                                emissive={isOn ? "#FF3300" : "#000000"}
                                emissiveIntensity={isOn ? 0.8 : 0}
                            />
                        </Box>
                    </group>

                    {/* Timer dial */}
                    <mesh position={[0, -0.085, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.008, 20]} />
                        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.3} />
                    </mesh>
                    <Box args={[0.002, 0.01, 0.002]} position={[0, -0.078, 0.015]}>
                        <meshStandardMaterial color="#CCCCCC" />
                    </Box>
                </group>

                {/* Safety tip-over switch indicator */}
                <mesh position={[-heaterWidth/2 + 0.05, 0.1, heaterDepth/2]}>
                    <sphereGeometry args={[0.008, 8, 8]} />
                    <meshStandardMaterial 
                        color={isOn ? "#00FF00" : "#444444"}
                        emissive={isOn ? "#00FF00" : "#000000"}
                        emissiveIntensity={isOn ? 0.5 : 0}
                    />
                </mesh>

                {/* Brand label */}
                <Box args={[0.08, 0.015, 0.002]} position={[0, 0.12, heaterDepth/2 + 0.005]}>
                    <meshStandardMaterial color="#CCCCCC" metalness={0.5} roughness={0.3} />
                </Box>

                {/* Power cord with plug */}
                <group position={[-heaterWidth/2 + 0.05, 0.05, -heaterDepth/2]}>
                    <mesh rotation={[0.5, 0, 0]}>
                        <cylinderGeometry args={[0.008, 0.008, 0.2, 8]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                    </mesh>
                    {/* Cord strain relief */}
                    <mesh position={[0, 0.08, 0.02]}>
                        <cylinderGeometry args={[0.012, 0.012, 0.03, 8]} rotation={[0.5, 0, 0]} />
                        <meshStandardMaterial color="#2C2C2C" roughness={0.8} />
                    </mesh>
                </group>
            </group>

            {/* Heat glow effect when on - warm ambient light */}
            {isOn && (
                <>
                    <pointLight 
                        position={[0, heaterHeight/2 + 0.1, heaterDepth/2 + 0.1]} 
                        color="#FF6B35" 
                        intensity={heatLevel * 0.4 * pulseValue} 
                        distance={1.5 + heatLevel * 0.5} 
                    />
                    {/* Secondary warm glow */}
                    <pointLight 
                        position={[0, heaterHeight + 0.05, 0]} 
                        color="#FF8C42" 
                        intensity={heatLevel * 0.2} 
                        distance={2 + heatLevel} 
                    />
                </>
            )}

            {/* Interaction prompt */}
            {isNearby && (
                <Html position={[0, heaterHeight + 0.25, 0]} center>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(50,50,50,0.95) 100%)',
                        color: 'white',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center',
                        minWidth: '140px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ 
                            fontWeight: 'bold', 
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ fontSize: '16px' }}>🔥</span>
                            Panel Heater
                        </div>
                        <div style={{ 
                            color: isOn ? '#FF6B35' : '#888',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {isOn ? `HEATING - Level ${heatLevel}` : 'OFF'}
                        </div>
                        {/* Heat level bars */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '6px',
                            marginBottom: '10px'
                        }}>
                            {[1, 2, 3].map(level => (
                                <div key={level} style={{
                                    width: '28px',
                                    height: '8px',
                                    background: isOn && heatLevel >= level 
                                        ? `linear-gradient(90deg, #FF4500, #FF6B35)` 
                                        : '#333',
                                    borderRadius: '4px',
                                    boxShadow: isOn && heatLevel >= level 
                                        ? '0 0 8px rgba(255,107,53,0.5)' 
                                        : 'none',
                                    transition: 'all 0.3s ease'
                                }} />
                            ))}
                        </div>
                        {/* Temperature indicator */}
                        {isOn && (
                            <div style={{ 
                                fontSize: '11px', 
                                color: '#FF8C42',
                                marginBottom: '8px'
                            }}>
                                ~{18 + heatLevel * 4}°C target
                            </div>
                        )}
                        <div style={{ fontSize: '11px', color: '#aaa' }}>
                            Press <span style={{ 
                                background: 'linear-gradient(135deg, #555, #444)', 
                                padding: '3px 10px', 
                                borderRadius: '4px',
                                border: '1px solid #666'
                            }}>E</span> to {isOn ? (heatLevel < 3 ? 'increase heat' : 'turn OFF') : 'turn ON'}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
};
