import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Fan({ position, rotation, isOn }) {
    const bladesRef = useRef();

    useFrame((state, delta) => {
        if (isOn && bladesRef.current) {
            bladesRef.current.rotation.z -= 15 * delta;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* --- EXHAUST FAN BOX HOUSING --- */}
            {/* Main casing box (embedded in wall) */}
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[1.0, 1.0, 0.2]} />
                <meshStandardMaterial color="#DDDDDD" metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Inner frame (circular hole for fan) */}
            <mesh position={[0, 0, 0.11]} receiveShadow>
                <ringGeometry args={[0.35, 0.45, 32]} />
                <meshStandardMaterial color="#AAAAAA" side={THREE.DoubleSide} />
            </mesh>

            {/* --- FAN BLADES --- */}
            <group ref={bladesRef} position={[0, 0, 0.1]}>
                {/* Hub */}
                <mesh>
                    <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>

                {/* 5 Blades */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <mesh
                        key={i}
                        rotation={[0, 0.3, (i * Math.PI * 2) / 5]}
                        position={[0, 0, 0]}
                    >
                        {/* Blade shape */}
                        <boxGeometry args={[0.15, 0.4, 0.02]} />
                        <meshStandardMaterial color="#555555" />

                        {/* Translate blade to pivot around hub correctly */}
                        <group position={[0, 0.2, 0]} />
                    </mesh>
                ))}

                {/* Corrected blades using a group pivot approach isn't needed if we just offset geometry or position 
                   Let's do manual positioning for blades relative to center
                */}
                {Array.from({ length: 5 }).map((_, i) => {
                    const angle = (i * Math.PI * 2) / 5;
                    return (
                        <group key={i} rotation={[0, 0, angle]}>
                            <mesh position={[0, 0.22, 0]} rotation={[0.4, 0, 0]}>
                                <boxGeometry args={[0.12, 0.4, 0.02]} />
                                <meshStandardMaterial color="#444" metalness={0.5} />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* --- SAFETY GRILL (Front) --- */}
            <group position={[0, 0, 0.15]}>
                {/* Concentric rings */}
                {[0.1, 0.2, 0.3, 0.4].map((r, i) => (
                    <mesh key={i} rotation={[0, 0, 0]}>
                        <torusGeometry args={[r, 0.005, 8, 32]} />
                        <meshStandardMaterial color="#888" />
                    </mesh>
                ))}
                {/* Cross lines */}
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.8, 0.01, 0.01]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]}>
                    <boxGeometry args={[0.8, 0.01, 0.01]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
            </group>

            {/* --- STATUS INDICATOR (LED) --- */}
            <mesh position={[0.4, -0.4, 0.12]}>
                <sphereGeometry args={[0.03]} />
                <meshStandardMaterial
                    color={isOn ? "#00FF00" : "#330000"}
                    emissive={isOn ? "#00FF00" : "#000000"}
                    emissiveIntensity={isOn ? 1 : 0}
                />
            </mesh>
        </group>
    );
}