import React from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Table } from './KitchenFurniture';

export const Car = ({ position, color = "#2244AA" }) => (
    <RigidBody type="fixed" position={position}>
        {/* Body */}
        <Box args={[1.8, 0.8, 4]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Box>
        {/* Cabin */}
        <Box args={[1.6, 0.6, 1.8]} position={[0, 1, -0.3]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Box>
        {/* Windows */}
        <Box args={[1.55, 0.5, 1.7]} position={[0, 1, -0.3]}>
            <meshStandardMaterial color="#333" transparent opacity={0.7} />
        </Box>
        {/* Wheels */}
        {[[-0.9, -1.2], [-0.9, 1.2], [0.9, -1.2], [0.9, 1.2]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.3, 0.3, 0.2, 16]} position={[x, 0.3, z]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#111" />
            </Cylinder>
        ))}
    </RigidBody>
);

export const Shed = ({ position }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {/* Walls */}
            <Box args={[3, 2.5, 0.1]} position={[0, 1.25, -1.45]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[3, 2.5, 0.1]} position={[0, 1.25, 1.45]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.1, 2.5, 3]} position={[-1.45, 1.25, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.1, 2.5, 3]} position={[1.45, 1.25, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            {/* Roof */}
            <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[2.5, 1.5, 4]} />
                <meshStandardMaterial color="#555" />
            </mesh>
        </RigidBody>
    </group>
);

export const BBQGrill = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.8, 0.9, 0.5]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#222" />
        </Box>
        <Box args={[0.75, 0.05, 0.45]} position={[0, 0.92, 0]}>
            <meshStandardMaterial color="#444" metalness={0.6} />
        </Box>
    </RigidBody>
);

export const OutdoorTable = ({ position }) => (
    <group position={position}>
        <Table position={[0, 0, 0]} args={[1.2, 0.7, 1.2]} color="#888" />
        {/* Umbrella */}
        <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[1.2, 0.3, 8]} />
            <meshStandardMaterial color="#CC4444" />
        </mesh>
        <Cylinder args={[0.03, 0.03, 1, 8]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#888" />
        </Cylinder>
    </group>
);
