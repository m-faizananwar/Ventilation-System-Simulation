import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Fan({ position, rotation, isOn }) {
    const bladesRef = useRef();
    const glowRef = useRef();

    useFrame((state, delta) => {
        if (isOn && bladesRef.current) {
            bladesRef.current.rotation.z -= 8 * delta;
        }
        
        // Pulsing glow effect when on
        if (isOn && glowRef.current) {
            glowRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Mounting Bracket */}
            <mesh position={[0, 0, -0.15]} castShadow>
                <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
                <meshStandardMaterial color="#2C2C2C" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Motor Housing */}
            <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Ventilation Grills on Motor */}
            {[0.1, 0, -0.1].map((z, i) => (
                <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.01, 8, 32]} />
                    <meshStandardMaterial color="#4A4A4A" metalness={0.7} roughness={0.4} />
                </mesh>
            ))}

            {/* Front Protective Cage */}
            <group position={[0, 0, 0.25]}>
                {/* Outer Ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <torusGeometry args={[0.7, 0.03, 16, 64]} />
                    <meshStandardMaterial color="#E0E0E0" metalness={0.6} roughness={0.3} />
                </mesh>
                
                {/* Concentric Guard Rings */}
                {[0.5, 0.35, 0.2].map((radius, i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[radius, 0.015, 12, 48]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={0.5} roughness={0.4} />
                    </mesh>
                ))}
                
                {/* Cross Bars */}
                <mesh rotation={[0, 0, 0]} castShadow>
                    <boxGeometry args={[1.4, 0.025, 0.025]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <boxGeometry args={[1.4, 0.025, 0.025]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
                    <boxGeometry args={[1.4, 0.025, 0.025]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]} castShadow>
                    <boxGeometry args={[1.4, 0.025, 0.025]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.5} roughness={0.4} />
                </mesh>
            </group>

            {/* Rear Protective Cage */}
            <group position={[0, 0, -0.25]}>
                <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <torusGeometry args={[0.7, 0.03, 16, 64]} />
                    <meshStandardMaterial color="#E0E0E0" metalness={0.6} roughness={0.3} />
                </mesh>
                {[0.5, 0.35].map((radius, i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[radius, 0.015, 12, 48]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={0.5} roughness={0.4} />
                    </mesh>
                ))}
            </group>

            {/* Blades Group */}
            <group ref={bladesRef} position={[0, 0, 0.15]}>
                {/* Central Hub */}
                <mesh castShadow>
                    <cylinderGeometry args={[0.12, 0.12, 0.15, 32]} />
                    <meshStandardMaterial color="#FFFFFF" metalness={0.3} roughness={0.5} />
                </mesh>
                
                {/* Hub Detail */}
                <mesh position={[0, 0.08, 0]} castShadow>
                    <cylinderGeometry args={[0.08, 0.12, 0.02, 32]} />
                    <meshStandardMaterial color="#CCCCCC" metalness={0.4} roughness={0.4} />
                </mesh>

                {/* 4 Realistic Blades */}
                {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                    <group key={i} rotation={[0, 0, angle]}>
                        {/* Main Blade Body */}
                        <mesh position={[0.3, 0, 0]} rotation={[0.15, 0, -0.05]} castShadow>
                            <boxGeometry args={[0.6, 0.02, 0.15]} />
                            <meshStandardMaterial 
                                color="#D3D3D3" 
                                metalness={0.7} 
                                roughness={0.2}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                        
                        {/* Blade Edge */}
                        <mesh position={[0.6, 0, 0]} rotation={[0.15, 0, -0.05]} castShadow>
                            <boxGeometry args={[0.02, 0.025, 0.16]} />
                            <meshStandardMaterial 
                                color="#A0A0A0" 
                                metalness={0.8} 
                                roughness={0.3}
                            />
                        </mesh>
                        
                        {/* Blade Reinforcement */}
                        <mesh position={[0.3, -0.01, 0]} rotation={[0.15, 0, -0.05]}>
                            <boxGeometry args={[0.5, 0.01, 0.03]} />
                            <meshStandardMaterial 
                                color="#B0B0B0" 
                                metalness={0.6} 
                                roughness={0.4}
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Status Light */}
            <mesh position={[0, 0, 0.42]}>
                <circleGeometry args={[0.04, 16]} />
                <meshStandardMaterial 
                    color={isOn ? "#00FF00" : "#003300"}
                    emissive={isOn ? "#00FF00" : "#000000"}
                    emissiveIntensity={isOn ? 2 : 0}
                />
            </mesh>

            {/* Light when fan is on */}
            {isOn && (
                <pointLight 
                    ref={glowRef}
                    position={[0, 0, 0.5]} 
                    color="#00FF00" 
                    intensity={1.5} 
                    distance={3}
                    castShadow
                />
            )}

            {/* Air Flow Effect (Invisible cone showing airflow) */}
            {isOn && (
                <mesh position={[0, 0, 1.5]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[1, 3, 16, 1, true]} />
                    <meshStandardMaterial 
                        color="#FFFFFF"
                        transparent
                        opacity={0.05}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
        </group>
    );
}