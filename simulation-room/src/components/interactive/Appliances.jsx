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
