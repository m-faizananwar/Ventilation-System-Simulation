import React from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Stairs = ({ position, direction = "up", steps = 10 }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {Array.from({ length: steps }).map((_, i) => (
                <Box key={i} args={[1.2, 0.2, 0.3]} position={[0, i * 0.35, direction === "up" ? -i * 0.3 : i * 0.3]}>
                    <meshStandardMaterial color="#8B7355" />
                </Box>
            ))}
            {/* Railings */}
            <Box args={[0.05, steps * 0.35 + 0.5, 0.05]} position={[-0.6, (steps * 0.35) / 2, direction === "up" ? -(steps * 0.3) / 2 : (steps * 0.3) / 2]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            <Box args={[0.05, steps * 0.35 + 0.5, 0.05]} position={[0.6, (steps * 0.35) / 2, direction === "up" ? -(steps * 0.3) / 2 : (steps * 0.3) / 2]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
        </RigidBody>
    </group>
);
