import React from 'react';
import { Stars, Sky } from '@react-three/drei';

export function World(props) {
    return (
        <group {...props}>
            {/* Grass Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#4caf50" />
            </mesh>

            {/* Street */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 40]}>
                <planeGeometry args={[200, 20]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Driveway */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, -0.04, 20]}>
                <planeGeometry args={[10, 30]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* Pathway to Entrance */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 20]}>
                <planeGeometry args={[4, 30]} />
                <meshStandardMaterial color="#777" />
            </mesh>

            {/* Fence (Simple representation) */}
            <group>
                {/* Front Fence Left */}
                <mesh position={[-25, 1, 30]}>
                    <boxGeometry args={[50, 2, 0.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Front Fence Right */}
                <mesh position={[35, 1, 30]}>
                    <boxGeometry args={[30, 2, 0.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Left Fence */}
                <mesh position={[-50, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[60, 2, 0.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Right Fence */}
                <mesh position={[50, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[60, 2, 0.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Back Fence */}
                <mesh position={[0, 1, -30]}>
                    <boxGeometry args={[100, 2, 0.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </group>

            {/* Sky & Environment */}
            <Sky sunPosition={[100, 20, 100]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Trees */}
            {Array.from({ length: 10 }).map((_, i) => {
                const x = Math.random() * 80 - 40;
                const z = Math.random() * 40 - 20;
                // Avoid house area
                if (Math.abs(x) < 25 && Math.abs(z) < 15) return null;

                return (
                    <group position={[x, 0, z]} key={i}>
                        <mesh position={[0, 2, 0]}>
                            <cylinderGeometry args={[0.5, 0.5, 4]} />
                            <meshStandardMaterial color="#8B4513" />
                        </mesh>
                        <mesh position={[0, 5, 0]}>
                            <coneGeometry args={[3, 4, 8]} />
                            <meshStandardMaterial color="darkgreen" />
                        </mesh>
                    </group>
                )
            })}
        </group>
    );
}
