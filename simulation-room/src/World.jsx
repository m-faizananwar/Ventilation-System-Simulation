import React from 'react';
import { Stars } from '@react-three/drei';

export function World(props) {
    return (
        <group {...props}>
            {/* Dark Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#0a0a0a" />
            </mesh>

            {/* Night Sky */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Neon Trees / Pillars */}
            {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const radius = 30 + Math.random() * 20;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <group position={[x, 0, z]} key={i}>
                        <mesh position={[0, 5, 0]}>
                            <boxGeometry args={[1, 10, 1]} />
                            <meshStandardMaterial color="#191d20" />
                        </mesh>
                        <mesh position={[0, 10, 0]}>
                            <boxGeometry args={[1.2, 0.2, 1.2]} />
                            <meshBasicMaterial color="#abf1f1" />
                        </mesh>
                    </group>
                )
            })}
        </group>
    );
}
