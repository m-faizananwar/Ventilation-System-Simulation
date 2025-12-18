import React from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Floor, Wall, Door } from '../../HouseStructure';
import { Car } from '../furniture/OutdoorFurniture';
import { WashingMachine } from '../furniture/BathroomFurniture';
import { Stairs } from '../structure/Stairs';

export const Basement = () => {
    return (
        <group position={[0, -3.5, 0]}>
            <Floor position={[0, 0.05, -2.5]} args={[20, 15]} color="#555555" />

            {/* Walls */}
            <Wall position={[0, 1.75, 5]} args={[20, 3.5, 0.2]} color="#444444" />
            <Wall position={[0, 1.75, -10]} args={[20, 3.5, 0.2]} color="#444444" />
            <Wall position={[-10, 1.75, -2.5]} args={[0.2, 3.5, 15]} color="#444444" />
            <Wall position={[10, 1.75, -2.5]} args={[0.2, 3.5, 15]} color="#444444" />

            {/* === GARAGE (Left side) === */}
            <Wall position={[0, 1.75, -2.5]} args={[0.2, 3.5, 15]} color="#444" />

            {/* Car spaces */}
            <Car position={[-5, 0.5, -5]} color="#2244AA" />
            <Car position={[-5, 0.5, 0]} color="#882222" />

            {/* Wall rack (bicycle, tools) */}
            <RigidBody type="fixed" position={[-9.5, 1.5, -8]}>
                <Box args={[0.1, 1.5, 2]}>
                    <meshStandardMaterial color="#666" metalness={0.5} />
                </Box>
            </RigidBody>

            {/* Car charger */}
            <RigidBody type="fixed" position={[-9.5, 1, -3]}>
                <Box args={[0.2, 0.8, 0.3]}>
                    <meshStandardMaterial color="#333" />
                </Box>
                <Box args={[0.15, 0.1, 0.05]} position={[0.05, 0, 0.18]}>
                    <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.5} />
                </Box>
            </RigidBody>

            {/* Garage door (simplified) */}
            <Box args={[5, 2.5, 0.1]} position={[-5, 1.25, 5.05]}>
                <meshStandardMaterial color="#555" metalness={0.3} />
            </Box>

            {/* === LAUNDRY ROOM (Right side) === */}
            <Door position={[0.5, 1.1, -2.5]} args={[0.8, 2.2, 0.1]} />

            <WashingMachine position={[3, 0, -8]} />
            <WashingMachine position={[4, 0, -8]} />

            {/* Utility sink */}
            <RigidBody type="fixed" position={[6, 0, -8]}>
                <Box args={[0.6, 0.9, 0.5]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#AAA" />
                </Box>
            </RigidBody>

            {/* Shelves with detergents */}
            <RigidBody type="fixed" position={[8, 1.2, -9.5]}>
                <Box args={[3, 0.1, 0.4]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
            </RigidBody>
            <RigidBody type="fixed" position={[8, 1.8, -9.5]}>
                <Box args={[3, 0.1, 0.4]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
            </RigidBody>

            {/* Ironing board (folded) */}
            <Box args={[0.1, 1.2, 0.4]} position={[9.5, 0.6, -5]}>
                <meshStandardMaterial color="#888" />
            </Box>

            {/* Stairs from Kitchen */}
            <Stairs position={[2, 0, 3]} direction="up" steps={10} />

            {/* Ceiling */}
            <Floor position={[0, 3.4, -2.5]} args={[20, 15]} color="#444" />
        </group>
    );
};
