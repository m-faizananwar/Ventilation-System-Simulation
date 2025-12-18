import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSimulation } from './SimulationContext';

// Smoke particle system for rooms
export const SmokeEffect = ({ position, intensity = 1, spread = 3 }) => {
    const { smokeLevel, chimneyBlocked, alarmActive } = useSimulation();
    const particlesRef = useRef();
    const particleCount = 200;
    
    // Only show smoke when there's smoke level or chimney is blocked
    const showSmoke = smokeLevel > 0 || chimneyBlocked;
    
    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const lifetimes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            // Random initial positions
            positions[i * 3] = (Math.random() - 0.5) * spread;
            positions[i * 3 + 1] = Math.random() * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
            
            // Random velocities (mostly upward)
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
            
            lifetimes[i] = Math.random();
        }
        
        return { positions, velocities, lifetimes };
    }, [spread]);
    
    useFrame((state, delta) => {
        if (!particlesRef.current || !showSmoke) return;
        
        const positions = particlesRef.current.geometry.attributes.position.array;
        const effectiveIntensity = (smokeLevel / 100) * intensity;
        
        for (let i = 0; i < particleCount; i++) {
            // Update lifetime
            particles.lifetimes[i] += delta * 0.3;
            
            if (particles.lifetimes[i] > 1) {
                // Reset particle
                particles.lifetimes[i] = 0;
                positions[i * 3] = (Math.random() - 0.5) * spread;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
            } else {
                // Move particle upward with some drift
                positions[i * 3] += particles.velocities[i * 3] * effectiveIntensity;
                positions[i * 3 + 1] += particles.velocities[i * 3 + 1] * effectiveIntensity * 2;
                positions[i * 3 + 2] += particles.velocities[i * 3 + 2] * effectiveIntensity;
                
                // Add some turbulence
                positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
                positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.002;
            }
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });
    
    if (!showSmoke) return null;
    
    return (
        <points ref={particlesRef} position={position}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#555555"
                transparent
                opacity={0.4 * (smokeLevel / 100)}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

// Smoke overlay effect for the whole room
export const RoomSmokeOverlay = ({ position, size = [10, 4, 10] }) => {
    const { smokeLevel } = useSimulation();
    const meshRef = useRef();
    
    useFrame((state) => {
        if (!meshRef.current) return;
        // Subtle movement
        meshRef.current.material.opacity = (smokeLevel / 100) * 0.3;
    });
    
    if (smokeLevel <= 0) return null;
    
    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={size} />
            <meshBasicMaterial 
                color="#444444"
                transparent
                opacity={0.1}
                side={THREE.BackSide}
                depthWrite={false}
            />
        </mesh>
    );
};

// Fire/explosion effect for appliances
export const ExplosionEffect = ({ position, active }) => {
    const sparksRef = useRef();
    const fireRef = useRef();
    const sparkCount = 50;
    
    const sparks = useMemo(() => {
        const positions = new Float32Array(sparkCount * 3);
        const velocities = new Float32Array(sparkCount * 3);
        
        for (let i = 0; i < sparkCount; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
            
            // Outward velocities
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.1 + 0.05;
            velocities[i * 3] = Math.cos(angle) * speed;
            velocities[i * 3 + 1] = Math.random() * 0.1;
            velocities[i * 3 + 2] = Math.sin(angle) * speed;
        }
        
        return { positions, velocities };
    }, []);
    
    useFrame((state, delta) => {
        if (!sparksRef.current || !active) return;
        
        const positions = sparksRef.current.geometry.attributes.position.array;
        
        for (let i = 0; i < sparkCount; i++) {
            positions[i * 3] += sparks.velocities[i * 3];
            positions[i * 3 + 1] += sparks.velocities[i * 3 + 1] - delta * 0.5;
            positions[i * 3 + 2] += sparks.velocities[i * 3 + 2];
            
            // Reset if too far
            const dist = Math.sqrt(
                positions[i * 3] ** 2 + 
                positions[i * 3 + 1] ** 2 + 
                positions[i * 3 + 2] ** 2
            );
            if (dist > 1 || positions[i * 3 + 1] < -0.5) {
                positions[i * 3] = (Math.random() - 0.5) * 0.1;
                positions[i * 3 + 1] = Math.random() * 0.1;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
            }
        }
        
        sparksRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Flicker fire light
        if (fireRef.current) {
            fireRef.current.intensity = 1 + Math.random() * 0.5;
        }
    });
    
    if (!active) return null;
    
    return (
        <group position={position}>
            {/* Sparks */}
            <points ref={sparksRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={sparkCount}
                        array={sparks.positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#FF6600"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
            
            {/* Fire glow */}
            <pointLight 
                ref={fireRef}
                color="#FF4400" 
                intensity={1.5} 
                distance={3}
            />
            
            {/* Smoke rising from explosion */}
            <SmokeEffect position={[0, 0.5, 0]} intensity={2} spread={0.5} />
        </group>
    );
};

export default SmokeEffect;
