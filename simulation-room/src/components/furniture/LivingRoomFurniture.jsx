import React from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Sofa = ({ position, rotation = [0, 0, 0], color = "#553333" }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Base seat */}
            <Box args={[2.5, 0.5, 0.8]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Backrest */}
            <Box args={[2.5, 0.8, 0.2]} position={[0, 0.5, -0.3]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Armrests */}
            <Box args={[0.2, 0.6, 0.8]} position={[-1.15, 0.4, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            <Box args={[0.2, 0.6, 0.8]} position={[1.15, 0.4, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
        </RigidBody>
    </group>
);

export const Armchair = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            <Box args={[0.8, 0.4, 0.8]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#664444" />
            </Box>
            <Box args={[0.8, 0.5, 0.15]} position={[0, 0.45, -0.32]}>
                <meshStandardMaterial color="#664444" />
            </Box>
            <Box args={[0.1, 0.3, 0.8]} position={[-0.35, 0.35, 0]}>
                <meshStandardMaterial color="#664444" />
            </Box>
            <Box args={[0.1, 0.3, 0.8]} position={[0.35, 0.35, 0]}>
                <meshStandardMaterial color="#664444" />
            </Box>
        </RigidBody>
    </group>
);

export const CoffeeTable = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[1.2, 0.05, 0.8]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} roughness={0.1} />
        </Box>
        {/* Metal Legs */}
        {[[-0.5, -0.3], [-0.5, 0.3], [0.5, -0.3], [0.5, 0.3]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.02, 0.02, 0.4, 8]} position={[x, 0.2, z]}>
                <meshStandardMaterial color="#333" metalness={0.8} />
            </Cylinder>
        ))}
    </RigidBody>
);

export const TVConsole = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[2.5, 0.5, 0.5]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#333" />
        </Box>
    </RigidBody>
);

export const Bookshelf = ({ position, rotation = [0, 0, 0] }) => (
    <RigidBody type="fixed" position={position} rotation={rotation}>
        <Box args={[0.8, 2, 0.3]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {/* Books (colored blocks) */}
        {[0.3, 0.7, 1.1, 1.5].map((y, i) => (
            <Box key={i} args={[0.7, 0.15, 0.25]} position={[0, y + 0.1, 0.03]}>
                <meshStandardMaterial color={["#AA3333", "#3333AA", "#33AA33", "#AA8833"][i]} />
            </Box>
        ))}
    </RigidBody>
);

export const Console = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[1, 0.8, 0.35]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {/* Decorative items */}
        <Box args={[0.15, 0.25, 0.1]} position={[-0.3, 0.92, 0]}>
            <meshStandardMaterial color="#228833" />
        </Box>
        <Cylinder args={[0.05, 0.08, 0.08, 8]} position={[0.3, 0.88, 0]}>
            <meshStandardMaterial color="#B8860B" metalness={0.6} />
        </Cylinder>
    </RigidBody>
);

export const Mirror = ({ position, rotation = [0, 0, 0] }) => (
    <Box args={[0.8, 1.2, 0.05]} position={position} rotation={rotation}>
        <meshStandardMaterial color="#87CEEB" metalness={0.95} roughness={0.05} />
    </Box>
);

export const ShoeRack = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[1, 0.8, 0.35]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#654321" />
        </Box>
    </RigidBody>
);

export const CoatHanger = ({ position }) => (
    <group position={position}>
        <Box args={[0.8, 0.1, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {[-0.3, 0, 0.3].map((x, i) => (
            <mesh key={i} position={[x, -0.1, 0.05]}>
                <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
                <meshStandardMaterial color="#888" metalness={0.8} />
            </mesh>
        ))}
    </group>
);

export const Rug = ({ position, args = [3, 0.02, 2], color = "#8B4513" }) => (
    <Box args={args} position={position}>
        <meshStandardMaterial color={color} roughness={0.95} />
    </Box>
);
