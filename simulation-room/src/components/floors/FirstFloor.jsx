import React from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Floor, Wall, Door, GlassWindow, CeilingLight } from '../../HouseStructure';
import { Bed, Nightstand, Wardrobe, Desk, Chair, BunkBed, FilingCabinet, PCSetup } from '../furniture/BedroomFurniture';
import { AnimatedTV } from '../interactive/InteractiveItems';
import { Armchair, Bookshelf } from '../furniture/LivingRoomFurniture';
import { Bathtub, Vanity, ShowerCubicle, Toilet } from '../furniture/BathroomFurniture';

export const FirstFloor = () => {
    return (
        <group position={[0, 3.8, 0]}>
            {/* Floor */}
            {/* Floor - Expanded */}
            <Floor position={[0, 0.05, -2.5]} args={[36, 15]} color="#B8860B" />

            {/* Exterior Walls */}
            {/* Exterior Walls - Expanded to 28m */}
            <Wall position={[0, 1.75, 5]} args={[36, 3.5, 0.2]} />
            <Wall position={[0, 1.75, -10]} args={[36, 3.5, 0.2]} />
            <Wall position={[-18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />
            <Wall position={[18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            {/* === MASTER BEDROOM (Back, above Living Room) === */}
            <Wall position={[0, 1.75, -5]} args={[12, 3.5, 0.2]} />
            <Door position={[-5.5, 1.1, -5]} args={[1, 2.2, 0.1]} />

            {/* Balcony sliding doors */}
            <GlassWindow position={[0, 1.5, -10]} args={[3, 2.8, 0.1]} />

            <Bed position={[3, 0, -7.5]} size="king" color="#880000" />
            <Nightstand position={[1, 0, -6.5]} />
            <Nightstand position={[5, 0, -6.5]} />
            <AnimatedTV position={[-3, 1.5, -7.5]} rotation={[0, Math.PI / 2, 0]} />
            <Armchair position={[-2, 0, -9]} rotation={[0, Math.PI / 4, 0]} />

            {/* Walk-in Closet */}
            <Wall position={[5, 1.75, -8]} args={[0.2, 3.5, 4]} />
            <Door position={[5, 1.1, -6.5]} args={[0.8, 2.2, 0.1]} />
            <Wardrobe position={[7, 0, -7]} />
            <Wardrobe position={[9, 0, -7]} />

            {/* === MASTER BATHROOM (Connected to closet) === */}
            <Wall position={[7, 1.75, -9]} args={[6, 3.5, 0.2]} />
            <Door position={[6, 1.1, -9]} args={[0.8, 2.2, 0.1]} />

            <Bathtub position={[8, 0, -9.5]} />
            <Vanity position={[6.5, 0, -9.7]} double={true} />
            <ShowerCubicle position={[9, 0, -9.5]} />
            <Toilet position={[9.5, 0, -9.5]} rotation={[0, -Math.PI / 2, 0]} />

            {/* === CHILDREN'S BEDROOM (Front, above Guest Room) === */}
            <Wall position={[5, 1.75, 0]} args={[0.2, 3.5, 10]} />
            <Door position={[5, 1.1, -2]} args={[0.8, 2.2, 0.1]} />

            <BunkBed position={[8, 0, 2]} />
            <Desk position={[8, 0, -1]} rotation={[0, Math.PI, 0]} />
            <Chair position={[8, 0, 0]} />
            <Bookshelf position={[9.5, 0, -1]} rotation={[0, -Math.PI / 2, 0]} />
            {/* Toy chest */}
            <RigidBody type="fixed" position={[9, 0, 4]}>
                <Box args={[0.8, 0.5, 0.5]} position={[0, 0.25, 0]}>
                    <meshStandardMaterial color="#AA6633" />
                </Box>
            </RigidBody>

            {/* === HOME OFFICE / STUDY (Near landing) === */}
            <Wall position={[-5, 1.75, 0]} args={[0.2, 3.5, 10]} />
            <Door position={[-5, 1.1, -2]} args={[0.8, 2.2, 0.1]} />

            <Desk position={[-8, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
            <PCSetup position={[-8, 0.75, -2]} />
            <Chair position={[-7, 0, -2]} rotation={[0, -Math.PI / 2, 0]} />
            <FilingCabinet position={[-9.5, 0, -1]} />
            <Bookshelf position={[-9.5, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
            <Bookshelf position={[-9.5, 0, 3]} rotation={[0, Math.PI / 2, 0]} />

            {/* Landing / Hallway area - Stair opening */}
            <Floor position={[-4, 0.05, 3]} args={[2, 4]} color="#555" />

            {/* Balcony (Outside Master Bedroom) */}
            <RigidBody type="fixed">
                <Box args={[4, 0.2, 2]} position={[0, 0, -11.5]}>
                    <meshStandardMaterial color="#666" />
                </Box>
                {/* Railing */}
                <Box args={[4, 1, 0.1]} position={[0, 0.5, -12.4]}>
                    <meshStandardMaterial color="#333" metalness={0.5} />
                </Box>
                <Box args={[0.1, 1, 2]} position={[-2, 0.5, -11.5]}>
                    <meshStandardMaterial color="#333" metalness={0.5} />
                </Box>
                <Box args={[0.1, 1, 2]} position={[2, 0.5, -11.5]}>
                    <meshStandardMaterial color="#333" metalness={0.5} />
                </Box>
            </RigidBody>

            {/* ============ PROPER GABLED ROOF ============ */}
            <RigidBody type="fixed">
                {/* Main roof - front slope */}
                <mesh position={[0, 5.5, 3]} rotation={[Math.PI * 0.2, 0, 0]}>
                    <boxGeometry args={[38, 0.3, 12]} />
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </mesh>
                {/* Main roof - back slope */}
                <mesh position={[0, 5.5, -8]} rotation={[-Math.PI * 0.2, 0, 0]}>
                    <boxGeometry args={[38, 0.3, 12]} />
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </mesh>

                {/* Roof ridge (top beam) */}
                <Box args={[38, 0.4, 0.4]} position={[0, 7.2, -2.5]}>
                    <meshStandardMaterial color="#4A3528" roughness={0.8} />
                </Box>

                {/* Left gable (triangular end) */}
                <mesh position={[-18, 5.5, -2.5]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[11, 4, 0.3]} />
                    <meshStandardMaterial color="#F5E6C8" roughness={0.85} />
                </mesh>
                {/* Right gable (triangular end) */}
                <mesh position={[18, 5.5, -2.5]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[11, 4, 0.3]} />
                    <meshStandardMaterial color="#F5E6C8" roughness={0.85} />
                </mesh>

                {/* Eaves (roof overhang) - front */}
                <Box args={[39, 0.15, 1]} position={[0, 3.8, 5.8]}>
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </Box>
                {/* Eaves - back */}
                <Box args={[39, 0.15, 1]} position={[0, 3.8, -10.8]}>
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </Box>

                {/* Chimney */}
                <Box args={[1.2, 3, 1]} position={[4, 7, -6]}>
                    <meshStandardMaterial color="#8B4513" roughness={0.95} />
                </Box>
                {/* Chimney cap */}
                <Box args={[1.4, 0.15, 1.2]} position={[4, 8.55, -6]}>
                    <meshStandardMaterial color="#555" roughness={0.9} />
                </Box>
            </RigidBody>

            {/* Ceiling lights for first floor */}
            <CeilingLight position={[0, 3.4, -7.5]} intensity={1.5} />
            <CeilingLight position={[8, 3.4, 2]} intensity={1} />
            <CeilingLight position={[-8, 3.4, 2]} intensity={1} />
        </group>
    );
};
