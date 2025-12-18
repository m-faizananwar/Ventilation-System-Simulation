import React from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Bed = ({ position, size = "queen", color = "#3344AA" }) => {
    const width = size === "king" ? 2 : size === "queen" ? 1.8 : 1.5;
    return (
        <RigidBody type="fixed" position={position}>
            {/* Frame */}
            <Box args={[width, 0.3, 2.2]} position={[0, 0.15, 0]}>
                <meshStandardMaterial color="#654321" />
            </Box>
            {/* Mattress */}
            <Box args={[width - 0.1, 0.25, 2.1]} position={[0, 0.42, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Pillows */}
            <Box args={[width * 0.35, 0.1, 0.3]} position={[-width * 0.25, 0.6, -0.8]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
            <Box args={[width * 0.35, 0.1, 0.3]} position={[width * 0.25, 0.6, -0.8]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
            {/* Headboard */}
            <Box args={[width, 0.8, 0.1]} position={[0, 0.7, -1.05]}>
                <meshStandardMaterial color="#654321" />
            </Box>
        </RigidBody>
    );
};

export const BunkBed = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Bottom bed frame */}
        <Box args={[1.2, 0.15, 2]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[1.1, 0.15, 1.9]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#4477BB" />
        </Box>
        {/* Top bed frame */}
        <Box args={[1.2, 0.15, 2]} position={[0, 1.6, 0]}>
            <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[1.1, 0.15, 1.9]} position={[0, 1.75, 0]}>
            <meshStandardMaterial color="#BB7744" />
        </Box>
        {/* Posts */}
        {[[-0.55, -0.9], [-0.55, 0.9], [0.55, -0.9], [0.55, 0.9]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.05, 0.05, 2.2, 8]} position={[x, 1.1, z]}>
                <meshStandardMaterial color="#8B4513" />
            </Cylinder>
        ))}
        {/* Ladder */}
        <Box args={[0.05, 1.3, 0.3]} position={[0.6, 0.95, 0.85]}>
            <meshStandardMaterial color="#8B4513" />
        </Box>
    </RigidBody>
);

export const Nightstand = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.5, 0.5, 0.4]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {/* Lamp */}
        <Cylinder args={[0.08, 0.1, 0.3, 16]} position={[0, 0.65, 0]}>
            <meshStandardMaterial color="#DDBB88" />
        </Cylinder>
        <mesh position={[0, 0.85, 0]}>
            <coneGeometry args={[0.15, 0.2, 16]} />
            <meshStandardMaterial color="#FFFFEE" emissive="#FFFF88" emissiveIntensity={0.3} />
        </mesh>
        <pointLight position={[0, 0.8, 0]} intensity={0.5} distance={3} color="#FFF8DC" />
    </RigidBody>
);

export const Wardrobe = ({ position, args = [1.5, 2.2, 0.6] }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={args} position={[0, args[1] / 2, 0]}>
            <meshStandardMaterial color="#4A3728" />
        </Box>
        {/* Door handles */}
        <Box args={[0.05, 0.15, 0.05]} position={[-0.2, args[1] / 2, args[2] / 2 + 0.03]}>
            <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
        <Box args={[0.05, 0.15, 0.05]} position={[0.2, args[1] / 2, args[2] / 2 + 0.03]}>
            <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
    </RigidBody>
);

export const Desk = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Desktop */}
            <Box args={[1.2, 0.05, 0.6]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            {/* Legs */}
            <Box args={[0.05, 0.75, 0.6]} position={[-0.55, 0.375, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            <Box args={[0.05, 0.75, 0.6]} position={[0.55, 0.375, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
        </RigidBody>
    </group>
);

export const Chair = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            <Box args={[0.45, 0.05, 0.45]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#333" />
            </Box>
            <Box args={[0.45, 0.4, 0.05]} position={[0, 0.65, -0.2]}>
                <meshStandardMaterial color="#333" />
            </Box>
            {/* Legs */}
            {[[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].map(([x, z], i) => (
                <Cylinder key={i} args={[0.02, 0.02, 0.45, 8]} position={[x, 0.225, z]}>
                    <meshStandardMaterial color="#555" metalness={0.6} />
                </Cylinder>
            ))}
        </RigidBody>
    </group>
);

export const FilingCabinet = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.5, 1.2, 0.6]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#666" metalness={0.4} />
        </Box>
    </RigidBody>
);

export const PCSetup = ({ position }) => (
    <group position={position}>
        {/* Monitor */}
        <Box args={[0.6, 0.4, 0.03]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#222" />
        </Box>
        <Box args={[0.55, 0.35, 0.01]} position={[0, 0.3, 0.02]}>
            <meshStandardMaterial color="#334455" emissive="#223344" emissiveIntensity={0.2} />
        </Box>
        {/* Stand */}
        <Box args={[0.1, 0.1, 0.08]} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#333" />
        </Box>
        {/* Keyboard */}
        <Box args={[0.4, 0.02, 0.15]} position={[0, 0.01, 0.25]}>
            <meshStandardMaterial color="#333" />
        </Box>
    </group>
);
