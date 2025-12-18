import React from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Toilet = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Base */}
            <Box args={[0.4, 0.35, 0.5]} position={[0, 0.175, 0]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
            {/* Seat */}
            <Cylinder args={[0.2, 0.2, 0.05, 16]} position={[0, 0.4, 0.05]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Cylinder>
            {/* Tank */}
            <Box args={[0.35, 0.4, 0.15]} position={[0, 0.45, -0.2]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
        </RigidBody>
    </group>
);

export const Vanity = ({ position, double = false }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[double ? 1.6 : 0.8, 0.8, 0.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Sink basin(s) */}
        <Cylinder args={[0.15, 0.15, 0.05, 16]} position={[double ? -0.4 : 0, 0.82, 0]}>
            <meshStandardMaterial color="#EEEEEE" />
        </Cylinder>
        {double && (
            <Cylinder args={[0.15, 0.15, 0.05, 16]} position={[0.4, 0.82, 0]}>
                <meshStandardMaterial color="#EEEEEE" />
            </Cylinder>
        )}
        {/* Mirror */}
        <Box args={[double ? 1.5 : 0.7, 0.8, 0.05]} position={[0, 1.3, -0.2]}>
            <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
        </Box>
    </RigidBody>
);

export const Bathtub = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Outer shell */}
        <Box args={[0.8, 0.6, 1.7]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Inner basin (darker) */}
        <Box args={[0.6, 0.4, 1.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#DDDDDD" />
        </Box>
    </RigidBody>
);

export const ShowerCubicle = ({ position }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {/* Base */}
            <Box args={[1, 0.1, 1]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#EEEEEE" />
            </Box>
            {/* Glass walls */}
            <Box args={[1, 2, 0.05]} position={[0, 1, 0.475]}>
                <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
            </Box>
            <Box args={[0.05, 2, 1]} position={[0.475, 1, 0]}>
                <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
            </Box>
        </RigidBody>
        {/* Shower head */}
        <mesh position={[-0.3, 2, -0.3]}>
            <cylinderGeometry args={[0.08, 0.1, 0.05, 16]} />
            <meshStandardMaterial color="#888" metalness={0.8} />
        </mesh>
    </group>
);

export const WashingMachine = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.6, 0.85, 0.6]} position={[0, 0.425, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Door */}
        <Cylinder args={[0.2, 0.2, 0.05, 16]} position={[0, 0.5, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#333" />
        </Cylinder>
    </RigidBody>
);
