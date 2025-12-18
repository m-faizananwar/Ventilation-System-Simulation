import React, { useState, useRef, useEffect } from 'react';
import { Box, Cylinder, Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated TV component with screen effects - Optimized
export const AnimatedTV = ({ position, rotation = [0, 0, 0] }) => {
    const [isOn, setIsOn] = useState(true);
    const [isNearby, setIsNearby] = useState(false);
    const screenRef = useRef();
    const groupRef = useRef();
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const frameCounter = useRef(0);
    const tvPosCache = useRef(new THREE.Vector3());

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Throttle proximity checks to every 10 frames
        frameCounter.current++;
        const shouldCheck = frameCounter.current >= 10;
        if (shouldCheck) frameCounter.current = 0;

        if (shouldCheck) {
            groupRef.current.getWorldPosition(tvPosCache.current);
            const distance = camera.position.distanceTo(tvPosCache.current);
            const isClose = distance < 4;

            let isLookingAt = false;
            if (isClose && screenRef.current) {
                raycaster.setFromCamera({ x: 0, y: 0 }, camera);
                const intersects = raycaster.intersectObject(screenRef.current, false);
                isLookingAt = intersects.length > 0;
            }

            const nowNearby = isClose && isLookingAt;
            if (nowNearby !== isNearby) setIsNearby(nowNearby);
        }

        // Handle E key
        const { interact } = getKeys();
        if (isNearby && interact && !lastInteract.current) {
            setIsOn(prev => !prev);
        }
        lastInteract.current = interact;

        // Simplified screen animation (less frequent updates)
        if (isOn && screenRef.current && screenRef.current.material && frameCounter.current === 0) {
            const t = state.clock.elapsedTime;
            const r = Math.sin(t * 0.5) * 0.3 + 0.4;
            const g = Math.sin(t * 0.7) * 0.3 + 0.4;
            const b = Math.sin(t * 0.9) * 0.3 + 0.5;
            screenRef.current.material.emissive.setRGB(r, g, b);
        }
    });

    // Tooltip effect
    useEffect(() => {
        if (isNearby) {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: true, text: isOn ? 'Press E to turn off TV' : 'Press E to turn on TV' }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: false }
            }));
        }
    }, [isNearby, isOn]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* TV Frame */}
                <Box args={[2, 1.2, 0.08]}>
                    <meshStandardMaterial color="#111" />
                </Box>
                {/* Screen */}
                <Box ref={screenRef} args={[1.9, 1.1, 0.01]} position={[0, 0, 0.05]}>
                    <meshStandardMaterial
                        color={isOn ? "#111" : "#0a0a0a"}
                        emissive={isOn ? "#446688" : "#000000"}
                        emissiveIntensity={isOn ? 0.5 : 0}
                    />
                </Box>
                {/* TV light glow when on */}
                {isOn && (
                    <pointLight position={[0, 0, 0.5]} color="#6688AA" intensity={0.3} distance={3} />
                )}
            </RigidBody>
        </group>
    );
};

// Interactive Refrigerator with opening doors and food inside - Optimized
export const InteractiveRefrigerator = ({ position, rotation = [0, 0, 0], interactionDistance = 3 }) => {
    const [freezerOpen, setFreezerOpen] = useState(false);
    const [fridgeOpen, setFridgeOpen] = useState(false);
    const [isNearby, setIsNearby] = useState(false);
    const groupRef = useRef();
    const fridgeRef = useRef();
    const freezerDoorRef = useRef();
    const fridgeDoorRef = useRef();
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const frameCounter = useRef(0);
    const posCache = useRef(new THREE.Vector3());

    // Handle keyboard input for individual door control
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isNearby) return;

            if (e.key === '1') {
                setFreezerOpen(prev => !prev);
            } else if (e.key === '2') {
                setFridgeOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isNearby]);

    useFrame((state, delta) => {
        if (!groupRef.current || !fridgeRef.current) return;

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
                const intersects = raycaster.intersectObject(fridgeRef.current, false);
                isLookingAt = intersects.length > 0;
            }

            const nowNearby = isClose && isLookingAt;
            if (nowNearby !== isNearby) {
                setIsNearby(nowNearby);
            }
        }

        // Handle E key press - toggle both doors
        const { interact } = getKeys();
        if (isNearby && interact && !lastInteract.current) {
            const bothOpen = freezerOpen && fridgeOpen;
            setFreezerOpen(!bothOpen);
            setFridgeOpen(!bothOpen);
        }
        lastInteract.current = interact;

        // Animate freezer door (top) - swings down
        const freezerTarget = freezerOpen ? -Math.PI / 3 : 0;
        if (freezerDoorRef.current) {
            freezerDoorRef.current.rotation.x += (freezerTarget - freezerDoorRef.current.rotation.x) * 0.1;
        }

        // Animate fridge door (bottom) - swings open
        const fridgeTarget = fridgeOpen ? Math.PI / 2 : 0;
        if (fridgeDoorRef.current) {
            fridgeDoorRef.current.rotation.y += (fridgeTarget - fridgeDoorRef.current.rotation.y) * 0.1;
        }
    });

    // Control panel effect
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('showFridgeControl', {
            detail: {
                show: isNearby,
                freezerOpen,
                fridgeOpen
            }
        }));
    }, [isNearby, freezerOpen, fridgeOpen]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Hollow shell structure - so interior is visible */}
                {/* Back panel */}
                <Box ref={fridgeRef} args={[1.0, 2.2, 0.1]} position={[0, 1.1, -0.375]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Left side panel */}
                <Box args={[0.1, 2.2, 0.85]} position={[-0.45, 1.1, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Right side panel */}
                <Box args={[0.1, 2.2, 0.85]} position={[0.45, 1.1, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Top panel */}
                <Box args={[1.0, 0.1, 0.85]} position={[0, 2.15, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Bottom panel */}
                <Box args={[1.0, 0.1, 0.85]} position={[0, 0.05, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Division line between freezer and fridge */}
                <Box args={[0.82, 0.04, 0.75]} position={[0, 1.55, 0]}>
                    <meshStandardMaterial color="#555555" metalness={0.6} />
                </Box>
            </RigidBody>

            {/* Freezer Door (top) */}
            <group ref={freezerDoorRef} position={[0, 2.15, 0.42]}>
                <Box args={[0.98, 0.55, 0.05]} position={[0, -0.275, 0]}>
                    <meshStandardMaterial color="#D8D8D8" metalness={0.5} roughness={0.3} />
                </Box>
                <Box args={[0.3, 0.03, 0.05]} position={[0, -0.5, 0.03]}>
                    <meshStandardMaterial color="#888888" metalness={0.8} />
                </Box>
            </group>

            {/* Fridge Door (bottom) */}
            <group ref={fridgeDoorRef} position={[0.48, 0, 0.42]}>
                <Box args={[0.98, 1.25, 0.05]} position={[-0.49, 0.78, 0]}>
                    <meshStandardMaterial color="#E0E0E0" metalness={0.5} roughness={0.3} />
                </Box>
                <Box args={[0.03, 0.25, 0.05]} position={[-0.95, 1.0, 0.03]}>
                    <meshStandardMaterial color="#888888" metalness={0.8} />
                </Box>
            </group>

            {/* Freezer Interior */}
            {freezerOpen && (
                <group>
                    {/* Freezer floor - items sit on this */}
                    <Box args={[0.76, 0.03, 0.5]} position={[0, 1.58, -0.05]}>
                        <meshStandardMaterial color="#E0EEF2" />
                    </Box>

                    {/* Freezer interior walls - icy white */}
                    <Box args={[0.76, 0.5, 0.02]} position={[0, 1.82, -0.28]}>
                        <meshStandardMaterial color="#E8F4F8" />
                    </Box>
                    <Box args={[0.02, 0.5, 0.45]} position={[-0.37, 1.82, -0.05]}>
                        <meshStandardMaterial color="#E0F0F5" />
                    </Box>
                    <Box args={[0.02, 0.5, 0.45]} position={[0.37, 1.82, -0.05]}>
                        <meshStandardMaterial color="#E0F0F5" />
                    </Box>

                    {/* Frozen food package 1 - pizza box (sitting on floor) */}
                    <group position={[-0.2, 1.62, -0.08]}>
                        <Box args={[0.18, 0.04, 0.18]}>
                            <meshStandardMaterial color="#E53935" />
                        </Box>
                        <Box args={[0.14, 0.005, 0.14]} position={[0, 0.023, 0]}>
                            <meshStandardMaterial color="#FFEB3B" />
                        </Box>
                    </group>

                    {/* Frozen food package 2 - vegetables bag (standing on floor) */}
                    <group position={[0.05, 1.67, -0.08]}>
                        <Box args={[0.1, 0.12, 0.05]}>
                            <meshStandardMaterial color="#4CAF50" transparent opacity={0.9} />
                        </Box>
                    </group>

                    {/* Ice cream container (on floor) */}
                    <group position={[0.25, 1.64, -0.1]}>
                        <Cylinder args={[0.055, 0.055, 0.09, 12]}>
                            <meshStandardMaterial color="#5D4037" />
                        </Cylinder>
                        <Cylinder args={[0.057, 0.057, 0.015, 12]} position={[0, 0.05, 0]}>
                            <meshStandardMaterial color="#795548" />
                        </Cylinder>
                    </group>

                    {/* Subtle cold light */}
                    <pointLight position={[0, 1.85, 0]} color="#E8F4FF" intensity={0.6} distance={0.8} />
                </group>
            )}

            {/* Fridge Interior */}
            {fridgeOpen && (
                <group>
                    {/* White interior back */}
                    <Box args={[0.78, 1.4, 0.02]} position={[0, 0.78, -0.3]}>
                        <meshBasicMaterial color="#F8F8F8" />
                    </Box>

                    {/* Glass shelves - simplified */}
                    <Box args={[0.72, 0.015, 0.45]} position={[0, 0.35, -0.05]}>
                        <meshBasicMaterial color="#D0E8F0" transparent opacity={0.4} />
                    </Box>
                    <Box args={[0.72, 0.015, 0.45]} position={[0, 0.75, -0.05]}>
                        <meshBasicMaterial color="#D0E8F0" transparent opacity={0.4} />
                    </Box>
                    <Box args={[0.72, 0.015, 0.45]} position={[0, 1.15, -0.05]}>
                        <meshBasicMaterial color="#D0E8F0" transparent opacity={0.4} />
                    </Box>

                    {/* Simplified fridge items - fewer objects */}
                    {/* Milk carton */}
                    <Box args={[0.08, 0.24, 0.08]} position={[-0.25, 0.5, -0.1]}>
                        <meshBasicMaterial color="#FFFFFF" />
                    </Box>

                    {/* Orange juice bottle */}
                    <mesh position={[-0.05, 0.47, -0.1]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.2, 6]} />
                        <meshBasicMaterial color="#FF9800" />
                    </mesh>

                    {/* Egg carton */}
                    <Box args={[0.18, 0.06, 0.1]} position={[0.2, 0.4, -0.08]}>
                        <meshBasicMaterial color="#D7CCC8" />
                    </Box>

                    {/* Lettuce - simplified */}
                    <mesh position={[-0.22, 0.86, -0.1]}>
                        <sphereGeometry args={[0.08, 6, 6]} />
                        <meshBasicMaterial color="#81C784" />
                    </mesh>

                    {/* Tomato */}
                    <mesh position={[0, 0.82, -0.08]}>
                        <sphereGeometry args={[0.05, 6, 6]} />
                        <meshBasicMaterial color="#E53935" />
                    </mesh>

                    {/* Apple */}
                    <mesh position={[-0.2, 1.22, -0.1]}>
                        <sphereGeometry args={[0.055, 6, 6]} />
                        <meshBasicMaterial color="#C62828" />
                    </mesh>

                    {/* Subtle interior light - reduced intensity */}
                    <pointLight position={[0, 1.3, -0.1]} color="#FFFEF0" intensity={0.8} distance={1} />
                </group>
            )}
        </group>
    );
};

// Interactive Stove with animated burner flames
export const InteractiveStove = ({ position, rotation = [0, 0, 0], interactionDistance = 3 }) => {
    const [burnersOn, setBurnersOn] = useState([false, false, false, false]);
    const [isNearby, setIsNearby] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const groupRef = useRef();
    const stoveRef = useRef();
    const flameRefs = [useRef(), useRef(), useRef(), useRef()];
    const lightRefs = [useRef(), useRef(), useRef(), useRef()];
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);

    // Burner positions (larger stove) and labels
    const burnerPositions = [
        [-0.35, 1.02, -0.25],  // Front left (1)
        [0.35, 1.02, -0.25],   // Front right (2)
        [-0.35, 1.02, 0.25],   // Back left (3)
        [0.35, 1.02, 0.25]     // Back right (4)
    ];

    // Handle keyboard input for individual burner control
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showMenu) return;

            const key = e.key;
            if (key >= '1' && key <= '4') {
                const burnerIndex = parseInt(key) - 1;
                setBurnersOn(prev => {
                    const newState = [...prev];
                    newState[burnerIndex] = !newState[burnerIndex];
                    return newState;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showMenu]);

    const frameCounter = useRef(0);
    const posCache = useRef(new THREE.Vector3());

    useFrame((state, delta) => {
        if (!groupRef.current || !stoveRef.current) return;

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
                const intersects = raycaster.intersectObject(stoveRef.current, false);
                isLookingAt = intersects.length > 0;
            }

            const nowNearby = isClose && isLookingAt;
            if (nowNearby !== isNearby) {
                setIsNearby(nowNearby);
                setShowMenu(nowNearby);
            }
        }

        // Handle E key press - toggle all burners
        const { interact } = getKeys();
        if (isNearby && interact && !lastInteract.current) {
            const allOn = burnersOn.every(b => b);
            setBurnersOn(allOn ? [false, false, false, false] : [true, true, true, true]);
        }
        lastInteract.current = interact;

        // Animate flames when burners are on (simplified - only when visible)
        if (burnersOn.some(b => b)) {
            const t = state.clock.elapsedTime * 10;
            burnersOn.forEach((isOn, i) => {
                if (isOn && flameRefs[i].current) {
                    flameRefs[i].current.scale.setScalar(1 + Math.sin(t + i) * 0.15);
                }
            });
        }
    });

    // Stove control panel effect
    useEffect(() => {
        // Dispatch stove control panel event for visual UI
        window.dispatchEvent(new CustomEvent('showStoveControl', {
            detail: {
                show: isNearby,
                burners: burnersOn
            }
        }));
        // Dispatch global event for PickableItem burning logic
        window.dispatchEvent(new CustomEvent('stoveBurnerState', {
            detail: {
                anyBurnerOn: burnersOn.some(Boolean)
            }
        }));
    }, [isNearby, burnersOn]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Stove Body - Larger size */}
                <Box ref={stoveRef} args={[1.2, 1.0, 0.8]} position={[0, 0.5, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
                </Box>

                {/* Oven Door */}
                <Box args={[0.9, 0.5, 0.05]} position={[0, 0.35, 0.42]}>
                    <meshStandardMaterial color="#222222" metalness={0.4} roughness={0.5} />
                </Box>
                {/* Oven Door Handle */}
                <Box args={[0.6, 0.04, 0.04]} position={[0, 0.55, 0.46]}>
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Oven Window */}
                <Box args={[0.5, 0.3, 0.02]} position={[0, 0.3, 0.44]}>
                    <meshStandardMaterial color="#111111" metalness={0.5} transparent opacity={0.7} />
                </Box>

                {/* Cooktop surface */}
                <Box args={[1.15, 0.04, 0.75]} position={[0, 1.0, 0]}>
                    <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.3} />
                </Box>

                {/* Control Knobs */}
                {[-0.4, -0.15, 0.15, 0.4].map((x, i) => (
                    <Cylinder key={i} args={[0.04, 0.04, 0.03, 16]} position={[x, 0.75, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color={burnersOn[i] ? "#ff4400" : "#444444"} metalness={0.6} />
                    </Cylinder>
                ))}
            </RigidBody>

            {/* Burner Grates and Flames */}
            {burnerPositions.map(([x, y, z], i) => (
                <group key={i}>
                    {/* Burner Ring - horizontal */}
                    <mesh position={[x, y - 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.12, 0.02, 8, 24]} />
                        <meshStandardMaterial color="#333333" metalness={0.5} />
                    </mesh>

                    {/* Grate */}
                    <Box args={[0.25, 0.02, 0.02]} position={[x, y, z]}>
                        <meshStandardMaterial color="#222222" metalness={0.4} />
                    </Box>
                    <Box args={[0.02, 0.02, 0.25]} position={[x, y, z]}>
                        <meshStandardMaterial color="#222222" metalness={0.4} />
                    </Box>

                    {/* Flame - only visible when burner is on - HORIZONTAL */}
                    {burnersOn[i] && (
                        <>
                            {/* Blue flame ring - horizontal */}
                            <mesh ref={flameRefs[i]} position={[x, y + 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[0.1, 0.02, 8, 32]} />
                                <meshStandardMaterial
                                    color="#3388ff"
                                    emissive="#2266ff"
                                    emissiveIntensity={3}
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>
                            {/* Inner orange flame ring - horizontal */}
                            <mesh position={[x, y + 0.025, z]} rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[0.08, 0.015, 8, 32]} />
                                <meshStandardMaterial
                                    color="#ff6600"
                                    emissive="#ff4400"
                                    emissiveIntensity={2.5}
                                    transparent
                                    opacity={0.85}
                                />
                            </mesh>
                            {/* Point light for flame glow */}
                            <pointLight
                                ref={lightRefs[i]}
                                position={[x, y + 0.08, z]}
                                color="#ff6633"
                                intensity={1.5}
                                distance={2}
                            />
                        </>
                    )}
                </group>
            ))}
        </group>
    );
};

// Interactive Fireplace component with on/off toggle
export const InteractiveFireplace = ({ position, rotation = [0, 0, 0], interactionDistance = 3 }) => {
    const [isOn, setIsOn] = useState(true);
    const [isNearby, setIsNearby] = useState(false);
    const groupRef = useRef();
    const fireplaceRef = useRef();
    const flame1Ref = useRef();
    const flame2Ref = useRef();
    const flame3Ref = useRef();
    const flame4Ref = useRef();
    const light1Ref = useRef();
    const light2Ref = useRef();
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const timeRef = useRef(0);

    // Check proximity, look direction, handle E key, AND animate fire
    useFrame((state, delta) => {
        if (!groupRef.current || !fireplaceRef.current) return;

        const fireplacePos = groupRef.current.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(fireplacePos);

        // Check if player is nearby
        const isClose = distance < interactionDistance;

        // Check if player is looking at the fireplace
        let isLookingAt = false;
        if (isClose) {
            raycaster.setFromCamera({ x: 0, y: 0 }, camera);
            const intersects = raycaster.intersectObject(fireplaceRef.current, true);
            isLookingAt = intersects.length > 0;
        }

        const wasNearby = isNearby;
        const nowNearby = isClose && isLookingAt;

        if (nowNearby !== wasNearby) {
            setIsNearby(nowNearby);
        }

        // Handle E key press
        const { interact } = getKeys();
        if (nowNearby && interact && !lastInteract.current) {
            setIsOn(prev => !prev);
        }
        lastInteract.current = interact;

        // ANIMATE FIRE when on
        if (isOn) {
            timeRef.current += delta * 8; // Speed of flickering
            const t = timeRef.current;

            // Animate main flame
            if (flame1Ref.current) {
                flame1Ref.current.scale.x = 1 + Math.sin(t * 3.7) * 0.15;
                flame1Ref.current.scale.y = 1 + Math.sin(t * 4.3) * 0.2;
                flame1Ref.current.position.x = Math.sin(t * 2.1) * 0.05;
            }
            // Animate left flame
            if (flame2Ref.current) {
                flame2Ref.current.scale.x = 1 + Math.sin(t * 4.1 + 1) * 0.2;
                flame2Ref.current.scale.y = 1 + Math.sin(t * 3.5 + 1) * 0.25;
            }
            // Animate right flame
            if (flame3Ref.current) {
                flame3Ref.current.scale.x = 1 + Math.sin(t * 3.9 + 2) * 0.2;
                flame3Ref.current.scale.y = 1 + Math.sin(t * 4.7 + 2) * 0.25;
            }
            // Animate inner flame
            if (flame4Ref.current) {
                flame4Ref.current.scale.y = 1 + Math.sin(t * 5.2) * 0.3;
            }
            // Flicker lights
            if (light1Ref.current) {
                light1Ref.current.intensity = 4 + Math.sin(t * 6) * 1.5;
            }
            if (light2Ref.current) {
                light2Ref.current.intensity = 2.5 + Math.sin(t * 7 + 0.5) * 1;
            }
        }
    });

    // Tooltip effect
    useEffect(() => {
        if (isNearby) {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: true, text: isOn ? 'Press E to turn off fire' : 'Press E to light fire' }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: false }
            }));
        }
    }, [isNearby, isOn]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Fireplace frame - sides, top, back (OPEN FRONT for fire visibility) */}
            <RigidBody type="fixed">
                {/* Left pillar */}
                <Box args={[0.3, 1.5, 0.5]} position={[-0.85, 0.75, 0]}>
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </Box>
                {/* Right pillar */}
                <Box args={[0.3, 1.5, 0.5]} position={[0.85, 0.75, 0]}>
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </Box>
                {/* Top bar */}
                <Box ref={fireplaceRef} args={[2, 0.3, 0.5]} position={[0, 1.65, 0]}>
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </Box>
                {/* Back wall (deep inside) */}
                <Box args={[1.4, 1.2, 0.15]} position={[0, 0.6, -0.2]}>
                    <meshStandardMaterial color="#1a1a1a" roughness={1} />
                </Box>
            </RigidBody>

            {/* Mantle (top shelf) */}
            <Box args={[2.4, 0.15, 0.7]} position={[0, 1.85, 0.1]}>
                <meshStandardMaterial color="#5C4033" roughness={0.6} />
            </Box>

            {/* Hearth (floor in front) */}
            <Box args={[2.2, 0.08, 0.9]} position={[0, 0.04, 0.4]}>
                <meshStandardMaterial color="#555555" roughness={0.85} />
            </Box>

            {/* Logs (always visible) */}
            <mesh position={[-0.25, 0.12, 0.1]} rotation={[0, 0.4, Math.PI / 12]}>
                <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
                <meshStandardMaterial color="#3D2817" roughness={0.95} />
            </mesh>
            <mesh position={[0.25, 0.12, 0.1]} rotation={[0, -0.4, -Math.PI / 12]}>
                <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
                <meshStandardMaterial color="#3D2817" roughness={0.95} />
            </mesh>
            <mesh position={[0, 0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
                <meshStandardMaterial color="#4A3020" roughness={0.95} />
            </mesh>

            {/* FEROCIOUS FIRE - only visible when on */}
            {isOn && (
                <>
                    {/* Large main flame - bright orange - positioned FORWARD */}
                    <mesh ref={flame1Ref} position={[0, 0.6, 0.5]}>
                        <coneGeometry args={[0.35, 0.9, 8]} />
                        <meshStandardMaterial color="#FF6600" emissive="#FF4400" emissiveIntensity={3} transparent opacity={0.95} />
                    </mesh>
                    {/* Secondary flames - left */}
                    <mesh ref={flame2Ref} position={[-0.25, 0.5, 0.45]}>
                        <coneGeometry args={[0.22, 0.7, 6]} />
                        <meshStandardMaterial color="#FF8800" emissive="#FF5500" emissiveIntensity={2.5} transparent opacity={0.9} />
                    </mesh>
                    {/* Secondary flames - right */}
                    <mesh ref={flame3Ref} position={[0.25, 0.5, 0.45]}>
                        <coneGeometry args={[0.22, 0.7, 6]} />
                        <meshStandardMaterial color="#FF8800" emissive="#FF5500" emissiveIntensity={2.5} transparent opacity={0.9} />
                    </mesh>
                    {/* Inner yellow/white hot flames */}
                    <mesh ref={flame4Ref} position={[0, 0.5, 0.55]}>
                        <coneGeometry args={[0.18, 0.6, 6]} />
                        <meshStandardMaterial color="#FFDD00" emissive="#FFCC00" emissiveIntensity={4} transparent opacity={0.85} />
                    </mesh>
                    {/* Glowing ember base - red hot coals */}
                    <mesh position={[0, 0.12, 0.45]}>
                        <boxGeometry args={[0.8, 0.12, 0.35]} />
                        <meshStandardMaterial color="#FF3300" emissive="#FF0000" emissiveIntensity={2.5} />
                    </mesh>
                    {/* Flickering fire lights */}
                    <pointLight ref={light1Ref} position={[0, 0.6, 0.6]} color="#FF6600" intensity={5} distance={10} />
                    <pointLight ref={light2Ref} position={[0, 0.3, 0.5]} color="#FF4400" intensity={3} distance={8} />
                </>
            )}

            {/* Chimney going up through ceiling */}
            <Box args={[0.8, 4, 0.5]} position={[0, 3.8, 0]}>
                <meshStandardMaterial color="#8B7355" roughness={0.9} />
            </Box>
        </group>
    );
};
