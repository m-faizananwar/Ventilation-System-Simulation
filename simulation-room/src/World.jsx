import React from 'react';
import { Stars, Sky, Cloud } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// Realistic Tree Component
function Tree({ position }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, 2, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.4, 0.5, 4, 12]} />
                    <meshStandardMaterial
                        color="#4A3728"
                        roughness={0.9}
                        normalScale={new THREE.Vector2(0.5, 0.5)}
                    />
                </mesh>
            </RigidBody>

            {/* Bark texture detail */}
            {[1, 2, 3].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.45, 0.05, 8, 12]} />
                    <meshStandardMaterial color="#3A2718" roughness={1} />
                </mesh>
            ))}

            {/* Foliage - Multiple layers for realism */}
            <mesh position={[0, 5, 0]} castShadow>
                <coneGeometry args={[2.5, 3, 8]} />
                <meshStandardMaterial
                    color="#2D5016"
                    roughness={0.9}
                />
            </mesh>
            <mesh position={[0, 6.5, 0]} castShadow>
                <coneGeometry args={[2, 2.5, 8]} />
                <meshStandardMaterial
                    color="#3A6B1E"
                    roughness={0.85}
                />
            </mesh>
            <mesh position={[0, 7.5, 0]} castShadow>
                <coneGeometry args={[1.5, 2, 8]} />
                <meshStandardMaterial
                    color="#4A8226"
                    roughness={0.8}
                />
            </mesh>
        </group>
    );
}

// Street Lamp
function StreetLamp({ position }) {
    return (
        <group position={position}>
            {/* Pole */}
            <mesh position={[0, 2.5, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.1, 5, 16]} />
                <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Lamp Head */}
            <mesh position={[0, 5.2, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.7} roughness={0.4} />
            </mesh>

            {/* Light Bulb */}
            <mesh position={[0, 5, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color="#FFF8DC"
                    emissive="#FFF8DC"
                    emissiveIntensity={1}
                />
            </mesh>

            {/* Point Light */}
            <pointLight
                position={[0, 5, 0]}
                color="#FFF8DC"
                intensity={2}
                distance={15}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
        </group>
    );
}

// Realistic Bushes
function Bush({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            {[0, 1, 2].map((i) => {
                const angle = (i * Math.PI * 2) / 3;
                const radius = 0.3;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]}
                        castShadow
                    >
                        <sphereGeometry args={[0.5, 12, 12]} />
                        <meshStandardMaterial color="#2D5016" roughness={0.95} />
                    </mesh>
                );
            })}
        </group>
    );
}

// Mailbox
function Mailbox({ position }) {
    return (
        <group position={position}>
            {/* Post */}
            <mesh position={[0, 0.6, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
                <meshStandardMaterial color="#4A3728" />
            </mesh>

            {/* Box */}
            <mesh position={[0, 1.3, 0]} castShadow>
                <boxGeometry args={[0.4, 0.3, 0.6]} />
                <meshStandardMaterial color="#CC0000" metalness={0.4} roughness={0.6} />
            </mesh>

            {/* Flag */}
            <mesh position={[0.25, 1.4, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
                <boxGeometry args={[0.15, 0.03, 0.1]} />
                <meshStandardMaterial color="#FF0000" />
            </mesh>
        </group>
    );
}

// FlowerPatch removed

export function World(props) {
    return (
        <group {...props}>
            <RigidBody type="fixed" colliders="cuboid">
                {/* Main Ground - Grass */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                    <planeGeometry args={[300, 300]} />
                    <meshStandardMaterial
                        color="#3A5F0B"
                        roughness={0.95}
                    />
                </mesh>

                {/* Dirt patches removed */}

                {/* Main Street (Asphalt) */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 50]} receiveShadow>
                    <planeGeometry args={[300, 25]} />
                    <meshStandardMaterial
                        color="#2A2A2A"
                        roughness={0.9}
                    />
                </mesh>

                {/* Road Lines */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <mesh
                        key={i}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[-145 + i * 10, -0.03, 50]}
                        receiveShadow
                    >
                        <planeGeometry args={[5, 0.3]} />
                        <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.2} />
                    </mesh>
                ))}

                {/* Sidewalks */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 38]} receiveShadow>
                    <planeGeometry args={[300, 2]} />
                    <meshStandardMaterial color="#CCCCCC" roughness={0.7} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 62]} receiveShadow>
                    <planeGeometry args={[300, 2]} />
                    <meshStandardMaterial color="#CCCCCC" roughness={0.7} />
                </mesh>

                {/* Driveway */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 25]} receiveShadow>
                    <planeGeometry args={[6, 25]} />
                    <meshStandardMaterial color="#4A4A4A" roughness={0.8} />
                </mesh>

                {/* Pathway to Front Door */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 15]} receiveShadow>
                    <planeGeometry args={[2, 5]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </mesh>

                {/* Garden Beds */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-15, 0, 8]} receiveShadow>
                    <planeGeometry args={[8, 6]} />
                    <meshStandardMaterial color="#6B4423" roughness={1} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, 0, 8]} receiveShadow>
                    <planeGeometry args={[8, 6]} />
                    <meshStandardMaterial color="#6B4423" roughness={1} />
                </mesh>
            </RigidBody>

            {/* Fence - Realistic White Picket Fence */}
            <group>
                {/* Front Fence Posts */}
                {Array.from({ length: 20 }).map((_, i) => {
                    const x = -50 + i * 5;
                    if (Math.abs(x) < 4) return null; // Gap for entrance
                    return (
                        <group key={`front-${i}`} position={[x, 0, 35]}>
                            <mesh position={[0, 0.6, 0]} castShadow>
                                <boxGeometry args={[0.15, 1.2, 0.15]} />
                                <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
                            </mesh>
                            <mesh position={[0, 1.3, 0]} castShadow>
                                <coneGeometry args={[0.1, 0.2, 4]} />
                                <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
                            </mesh>
                        </group>
                    );
                })}

                {/* Fence Rails */}
                <mesh position={[0, 0.5, 35]} castShadow>
                    <boxGeometry args={[100, 0.1, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
                </mesh>
                <mesh position={[0, 0.9, 35]} castShadow>
                    <boxGeometry args={[100, 0.1, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
                </mesh>
            </group>

            {/* Trees around property */}
            <Tree position={[-35, 0, -10]} />
            <Tree position={[-30, 0, 20]} />
            <Tree position={[35, 0, -15]} />
            <Tree position={[30, 0, 25]} />
            <Tree position={[-40, 0, -25]} />
            <Tree position={[40, 0, -25]} />

            {/* Street Trees */}
            {Array.from({ length: 6 }).map((_, i) => (
                <Tree key={i} position={[-75 + i * 30, 0, 65]} />
            ))}

            {/* Bushes along fence */}
            <Bush position={[-20, 0, 33]} scale={1.2} />
            <Bush position={[-10, 0, 33]} />
            <Bush position={[10, 0, 33]} />
            <Bush position={[20, 0, 33]} scale={1.2} />

            {/* Garden Flowers - Removed */}

            {/* Mailbox */}
            <Mailbox position={[-5, 0, 35]} />

            {/* Street Lamps */}
            <StreetLamp position={[-40, 0, 63]} />
            <StreetLamp position={[-10, 0, 63]} />
            <StreetLamp position={[20, 0, 63]} />
            <StreetLamp position={[50, 0, 63]} />

            {/* Sky & Atmosphere */}
            <Sky
                distance={450000}
                sunPosition={[100, 20, 100]}
                inclination={0.6}
                azimuth={0.25}
            />

            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            {/* Ambient Clouds */}
            {/* Ambient Clouds - Removed */}
        </group>
    );
}