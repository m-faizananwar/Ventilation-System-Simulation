import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function Sensor({ position, rotation, type, value, label }) {
    const displayRef = useRef();
    const ledRef = useRef();

    // Determine status based on value
    const getStatus = () => {
        if (type === 'co2') {
            if (value < 600) return { color: '#00FF00', text: 'GOOD', emissive: 0.5 };
            if (value < 1000) return { color: '#FFAA00', text: 'WARN', emissive: 1.0 };
            return { color: '#FF0000', text: 'CRITICAL', emissive: 1.5 };
        }
        if (type === 'pm25') {
            if (value < 35) return { color: '#00FF00', text: 'GOOD', emissive: 0.5 };
            if (value < 75) return { color: '#FFAA00', text: 'WARN', emissive: 1.0 };
            return { color: '#FF0000', text: 'CRITICAL', emissive: 1.5 };
        }
        if (type === 'smog') {
            if (value < 50) return { color: '#00FF00', text: 'GOOD', emissive: 0.5 };
            if (value < 150) return { color: '#FFAA00', text: 'WARN', emissive: 1.0 };
            return { color: '#FF0000', text: 'CRITICAL', emissive: 1.5 };
        }
        return { color: '#00FF00', text: 'GOOD', emissive: 0.5 };
    };

    const status = getStatus();

    // Pulsing LED effect for critical status
    useFrame((state) => {
        if (ledRef.current && status.text === 'CRITICAL') {
            const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5;
            ledRef.current.material.emissiveIntensity = status.emissive + pulse;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Main Housing - Industrial Design */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.6, 1.2, 0.25]} />
                <meshStandardMaterial 
                    color="#2A2A2A" 
                    metalness={0.6} 
                    roughness={0.4}
                />
            </mesh>

            {/* Front Panel */}
            <mesh position={[0, 0, 0.13]} castShadow>
                <boxGeometry args={[0.55, 1.15, 0.02]} />
                <meshStandardMaterial 
                    color="#3A3A3A" 
                    metalness={0.5} 
                    roughness={0.5}
                />
            </mesh>

            {/* Display Screen */}
            <mesh position={[0, 0.25, 0.145]}>
                <planeGeometry args={[0.45, 0.5]} />
                <meshStandardMaterial 
                    color="#000033" 
                    emissive="#000033"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Display Border/Bezel */}
            <mesh position={[0, 0.25, 0.14]}>
                <boxGeometry args={[0.48, 0.53, 0.01]} />
                <meshStandardMaterial 
                    color="#1A1A1A" 
                    metalness={0.7} 
                    roughness={0.3}
                />
            </mesh>

            {/* Value Display */}
            <Text
                position={[0, 0.35, 0.15]}
                fontSize={0.15}
                color={status.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.005}
                outlineColor="#000000"
            >
                {Math.round(value)}
            </Text>

            {/* Label Text */}
            <Text
                position={[0, 0.15, 0.15]}
                fontSize={0.08}
                color="#CCCCCC"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>

            {/* Status LED Indicators */}
            <group position={[0, -0.15, 0.145]}>
                {/* LED Housing */}
                <mesh position={[0, 0, -0.005]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.03, 32]} />
                    <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
                </mesh>
                
                {/* LED Light */}
                <mesh ref={ledRef}>
                    <circleGeometry args={[0.1, 32]} />
                    <meshStandardMaterial 
                        color={status.color}
                        emissive={status.color}
                        emissiveIntensity={status.emissive}
                    />
                </mesh>
                
                {/* LED Glow */}
                <pointLight 
                    color={status.color} 
                    intensity={status.emissive * 0.5} 
                    distance={1.5}
                />
            </group>

            {/* Status Text */}
            <Text
                position={[0, -0.35, 0.15]}
                fontSize={0.06}
                color={status.color}
                anchorX="center"
                anchorY="middle"
            >
                {status.text}
            </Text>

            {/* Ventilation Slots */}
            {[-0.5, -0.4, -0.3].map((y, i) => (
                <mesh key={i} position={[0, y, 0.145]}>
                    <planeGeometry args={[0.4, 0.03]} />
                    <meshStandardMaterial color="#1A1A1A" />
                </mesh>
            ))}

            {/* Mounting Screws */}
            {[
                [-0.25, 0.55],
                [0.25, 0.55],
                [-0.25, -0.55],
                [0.25, -0.55]
            ].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0.14]} castShadow>
                    <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
                    <meshStandardMaterial color="#4A4A4A" metalness={0.9} roughness={0.2} />
                </mesh>
            ))}

            {/* Brand/Model Badge */}
            <mesh position={[0, 0.5, 0.145]}>
                <planeGeometry args={[0.3, 0.08]} />
                <meshStandardMaterial color="#1A1A1A" />
            </mesh>
            <Text
                position={[0, 0.5, 0.15]}
                fontSize={0.04}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
            >
                AIR-SENSE PRO
            </Text>

            {/* Sensor Type Icon Area */}
            <mesh position={[0, 0.05, 0.145]}>
                <circleGeometry args={[0.08, 32]} />
                <meshStandardMaterial 
                    color="#1A1A1A" 
                    emissive="#0A0A0A"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Connection Port at Bottom */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.15, 16]} />
                <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Cable */}
            <mesh position={[0, -0.7, -0.1]} rotation={[Math.PI / 4, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
                <meshStandardMaterial color="#1A1A1A" />
            </mesh>
        </group>
    );
}