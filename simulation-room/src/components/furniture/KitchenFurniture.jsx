import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Table = ({ position, args = [1.5, 0.8, 0.8], color = "#4A3728" }) => (
    <RigidBody type="fixed" position={position}>
        {/* Tabletop - thicker for realism */}
        <Box args={[args[0], 0.06, args[2]]} position={[0, args[1], 0]}>
            <meshStandardMaterial color={color} roughness={0.4} />
        </Box>
        {/* Tabletop edge trim */}
        <Box args={[args[0] + 0.02, 0.03, args[2] + 0.02]} position={[0, args[1] - 0.03, 0]}>
            <meshStandardMaterial color={color} roughness={0.5} />
        </Box>
        {/* Legs - tapered elegant wooden legs */}
        <mesh position={[args[0] / 2 - 0.1, args[1] / 2, args[2] / 2 - 0.1]}>
            <cylinderGeometry args={[0.04, 0.06, args[1], 6]} />
            <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        <mesh position={[-args[0] / 2 + 0.1, args[1] / 2, args[2] / 2 - 0.1]}>
            <cylinderGeometry args={[0.04, 0.06, args[1], 6]} />
            <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        <mesh position={[args[0] / 2 - 0.1, args[1] / 2, -args[2] / 2 + 0.1]}>
            <cylinderGeometry args={[0.04, 0.06, args[1], 6]} />
            <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        <mesh position={[-args[0] / 2 + 0.1, args[1] / 2, -args[2] / 2 + 0.1]}>
            <cylinderGeometry args={[0.04, 0.06, args[1], 6]} />
            <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        {/* Support rails under table */}
        <Box args={[args[0] - 0.3, 0.04, 0.04]} position={[0, args[1] - 0.15, args[2] / 2 - 0.1]}>
            <meshStandardMaterial color={color} roughness={0.5} />
        </Box>
        <Box args={[args[0] - 0.3, 0.04, 0.04]} position={[0, args[1] - 0.15, -args[2] / 2 + 0.1]}>
            <meshStandardMaterial color={color} roughness={0.5} />
        </Box>
    </RigidBody>
);

export const KitchenCounter = ({ position, args }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={args}>
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
        </Box>
    </RigidBody>
);

export const DiningChair = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Seat */}
            <Box args={[0.42, 0.04, 0.42]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            {/* Seat cushion */}
            <Box args={[0.38, 0.03, 0.38]} position={[0, 0.48, 0]}>
                <meshStandardMaterial color="#8B6914" />
            </Box>
            {/* Backrest frame */}
            <Box args={[0.42, 0.55, 0.04]} position={[0, 0.78, -0.19]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            {/* Backrest cushion */}
            <Box args={[0.36, 0.4, 0.02]} position={[0, 0.75, -0.16]}>
                <meshStandardMaterial color="#8B6914" />
            </Box>
            {/* Legs - tapered wooden legs */}
            {[[-0.17, -0.17], [-0.17, 0.17], [0.17, -0.17], [0.17, 0.17]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.225, z]}>
                    <cylinderGeometry args={[0.02, 0.028, 0.45, 6]} />
                    <meshStandardMaterial color="#5C4033" />
                </mesh>
            ))}
            {/* Cross supports between legs */}
            <Box args={[0.34, 0.02, 0.02]} position={[0, 0.15, -0.17]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            <Box args={[0.34, 0.02, 0.02]} position={[0, 0.15, 0.17]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
        </RigidBody>
    </group>
);

// Realistic Range Hood with lighting
export const RealisticRangeHood = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Main hood body - trapezoid shape */}
            <Box args={[1.3, 0.15, 0.9]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#CCCCCC" metalness={0.7} roughness={0.3} />
            </Box>
            {/* Hood canopy */}
            <Box args={[1.2, 0.4, 0.8]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#AAAAAA" metalness={0.6} roughness={0.3} />
            </Box>
            {/* Vent chimney */}
            <Box args={[0.4, 0.8, 0.3]} position={[0, 0.65, 0]}>
                <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.4} />
            </Box>

            {/* Vent slats */}
            {[-0.3, 0, 0.3].map((x, i) => (
                <Box key={i} args={[0.25, 0.02, 0.6]} position={[x, -0.05, 0]}>
                    <meshStandardMaterial color="#666666" metalness={0.6} />
                </Box>
            ))}

            {/* Hood lights */}
            <Box args={[0.1, 0.05, 0.1]} position={[-0.3, -0.1, 0]}>
                <meshStandardMaterial color="#FFFFCC" emissive="#FFFF99" emissiveIntensity={0.5} />
            </Box>
            <Box args={[0.1, 0.05, 0.1]} position={[0.3, -0.1, 0]}>
                <meshStandardMaterial color="#FFFFCC" emissive="#FFFF99" emissiveIntensity={0.5} />
            </Box>
        </RigidBody>

        {/* Subtle down lighting */}
        <pointLight position={[0, -0.2, 0]} color="#FFFEF0" intensity={0.5} distance={3} />
    </group>
);

export const Sink = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Counter section */}
        <Box args={[1, 0.9, 0.6]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Basin */}
        <Box args={[0.5, 0.2, 0.4]} position={[0, 0.85, 0]}>
            <meshStandardMaterial color="#DDDDDD" />
        </Box>
        {/* Faucet */}
        <Cylinder args={[0.02, 0.02, 0.25, 8]} position={[0, 1.05, -0.15]}>
            <meshStandardMaterial color="#888" metalness={0.9} />
        </Cylinder>
    </RigidBody>
);

export const Chandelier = ({ position }) => (
    <group position={position}>
        {/* Base */}
        <mesh>
            <cylinderGeometry args={[0.3, 0.4, 0.2, 16]} />
            <meshStandardMaterial color="#B8860B" metalness={0.8} />
        </mesh>
        {/* Arms and lights */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
                <group key={i}>
                    <mesh position={[Math.cos(angle) * 0.4, -0.1, Math.sin(angle) * 0.4]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial color="#FFFFEE" emissive="#FFFF88" emissiveIntensity={0.8} />
                    </mesh>
                </group>
            );
        })}
        <pointLight color="#FFF8DC" intensity={2} distance={8} position={[0, -0.2, 0]} />
    </group>
);
