import React from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Shed, BBQGrill, OutdoorTable } from '../furniture/OutdoorFurniture';

export const Exterior = () => {
    return (
        <group>
            {/* ============ SYMMETRIC PATHWAYS ============ */}
            <RigidBody type="fixed">
                {/* Main walkway - centered, leading to front porch */}
                <Box args={[4, 0.1, 12]} position={[0, 0.06, 12]} receiveShadow>
                    <meshStandardMaterial color="#555555" roughness={0.9} />
                </Box>

                {/* Porch connection - widens at the porch */}
                <Box args={[6, 0.1, 4]} position={[0, 0.06, 7.5]} receiveShadow>
                    <meshStandardMaterial color="#555555" roughness={0.9} />
                </Box>
            </RigidBody>

            {/* Gate posts removed for cleaner entrance */}

            {/* ============ FRONT PORCH ============ */}
            <group position={[0, 0, 6]}>
                {/* Porch floor */}
                <RigidBody type="fixed">
                    <Box args={[6, 0.2, 3]} position={[0, 0.1, 0]} receiveShadow>
                        <meshStandardMaterial color="#8B7355" roughness={0.85} />
                    </Box>
                </RigidBody>

                {/* Porch steps */}
                <RigidBody type="fixed">
                    <Box args={[4, 0.15, 0.4]} position={[0, -0.08, 1.7]} receiveShadow>
                        <meshStandardMaterial color="#8B7355" roughness={0.85} />
                    </Box>
                    <Box args={[4, 0.15, 0.4]} position={[0, -0.23, 2.1]} receiveShadow>
                        <meshStandardMaterial color="#8B7355" roughness={0.85} />
                    </Box>
                </RigidBody>

                {/* Porch columns */}
                {[[-2.5, 1.4], [2.5, 1.4]].map(([x, z], i) => (
                    <Cylinder key={i} args={[0.15, 0.15, 3.3, 16]} position={[x, 1.65, z]}>
                        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
                    </Cylinder>
                ))}

                {/* Porch roof */}
                <RigidBody type="fixed">
                    <Box args={[6.5, 0.2, 3.5]} position={[0, 3.4, 0.5]}>
                        <meshStandardMaterial color="#5D4038" roughness={0.9} />
                    </Box>
                </RigidBody>

                {/* Porch light */}
                <mesh position={[0, 2.8, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#FFFEF0" emissive="#FFF8DC" emissiveIntensity={0.8} />
                </mesh>
                <pointLight position={[0, 2.5, 0]} intensity={1} distance={8} color="#FFF8DC" />
            </group>

            {/* Front Lawn - path lights removed for cleaner look */}

            {/* Backyard */}
            <group position={[0, 0, -15]}>
                {/* Patio concrete slab */}
                <RigidBody type="fixed">
                    <Box args={[8, 0.1, 6]} position={[0, 0, 0]} receiveShadow>
                        <meshStandardMaterial color="#888" roughness={0.8} />
                    </Box>
                </RigidBody>

                {/* BBQ Grill (corner) */}
                <BBQGrill position={[3, 0, -2]} />

                {/* Outdoor table set */}
                <OutdoorTable position={[-1, 0, -1]} />

                {/* Garden area */}
                <RigidBody type="fixed">
                    <Box args={[6, 0.1, 8]} position={[-6, 0, -2]} receiveShadow>
                        <meshStandardMaterial color="#3A5F0B" roughness={0.95} />
                    </Box>
                </RigidBody>

                {/* Shed (far left corner) */}
                <Shed position={[-8, 0, -5]} />
            </group>
        </group>
    );
};
