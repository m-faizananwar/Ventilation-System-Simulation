import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

// Simple Fire Particle System
function FireParticles({ active }) {
    const particles = useRef([]);
    const count = 20;

    useFrame((state, delta) => {
        if (!active) return;
        // Update particles would go here, for now we will use a simple oscillating light
    });

    return (
        <group>
            {active && (
                <>
                    <pointLight position={[0, 0.5, 0]} color="#FF4500" intensity={2} distance={5} castShadow />
                    <mesh position={[0, 0.2, 0]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color="#FF4500" emissive="#FF0000" emissiveIntensity={2} transparent opacity={0.8} />
                    </mesh>
                </>
            )}
        </group>
    );
}

export function Hearth({ position, rotation, active, onToggle }) {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Chimney/Fireplace Structure */}
            <mesh position={[0, 1.5, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[2, 3, 1]} />
                <meshStandardMaterial color="#4A4A4A" roughnes={0.9} />
            </mesh>

            {/* Base/Hearth */}
            <mesh position={[0, 0.2, 0.5]} castShadow receiveShadow>
                <boxGeometry args={[2, 0.4, 1]} />
                <meshStandardMaterial color="#2F2F2F" roughnes={0.9} />
            </mesh>

            {/* Firebox */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[1.2, 1.2, 0.8]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Fire Visuals */}
            <group position={[0, 0.5, 0]}>
                <FireParticles active={active} />
            </group>

            {/* Logs */}
            <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.2]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.8]} />
                <meshStandardMaterial color="#3E2723" />
            </mesh>
            <mesh position={[0, 0.65, 0]} rotation={[0, 2, -0.2]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.8]} />
                <meshStandardMaterial color="#3E2723" />
            </mesh>

            {/* Hover Indicator */}
            {hovered && (
                <mesh position={[0, 2.8, 0]}>
                    <sphereGeometry args={[0.1]} />
                    <meshBasicMaterial color="white" />
                </mesh>
            )}
        </group>
    );
}

export function Heater({ position, rotation, active, onToggle }) {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Main Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[1.2, 1, 0.3]} />
                <meshStandardMaterial color="white" metalness={0.1} />
            </mesh>

            {/* Fins */}
            {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
                <mesh key={i} position={[x, 0.5, 0.16]}>
                    <boxGeometry args={[0.1, 0.8, 0.05]} />
                    <meshStandardMaterial color="#EEE" />
                </mesh>
            ))}

            {/* Status Light/Coils */}
            <mesh position={[0.5, 0.2, 0.15]}>
                <circleGeometry args={[0.05]} />
                <meshStandardMaterial
                    color={active ? "orange" : "gray"}
                    emissive={active ? "orange" : "black"}
                    emissiveIntensity={active ? 2 : 0}
                />
            </mesh>

            {/* Heat Haze/Light */}
            {active && (
                <pointLight position={[0, 0.5, 0.5]} color="orange" intensity={1} distance={2} />
            )}
        </group>
    );
}
