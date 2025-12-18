import React from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Floor, Wall, Door, GlassWindow, CeilingLight } from '../../HouseStructure';
import { LuxuryBed, Nightstand, ModernWardrobe, GamingDesk, ModernChair, BunkBed, FilingCabinet, PlantPot, ModernLamp, WallArt } from '../furniture/BedroomFurniture';
import { AnimatedTV } from '../interactive/InteractiveItems';
import { Armchair, Bookshelf, Rug } from '../furniture/LivingRoomFurniture';
import { Bathtub, Vanity, ShowerCubicle, Toilet } from '../furniture/BathroomFurniture';
import { SwitchBoard, PowerSocket, RoomHeater } from '../interactive/Appliances';

export const FirstFloor = () => {
    return (
        <group position={[0, 3.8, 0]}>
            {/* Floor */}
            <Floor position={[0, 0.05, -2.5]} args={[36, 15]} color="#D4C4A8" />{/* Warmer Carpet Tone */}

            {/* Exterior Walls */}
            <Wall position={[0, 1.75, 5]} args={[36, 3.5, 0.2]} />
            <Wall position={[0, 1.75, -10]} args={[36, 3.5, 0.2]} />
            <Wall position={[-18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />
            <Wall position={[18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            {/* === MASTER BEDROOM (Back, above Living Room) === */}
            {/* Layout updated for Hotel luxury feel */}
            <Wall position={[0, 1.75, -5]} args={[12, 3.5, 0.2]} />
            <Door position={[-5.5, 1.1, -5]} args={[1, 2.2, 0.1]} />

            {/* Balcony sliding doors */}
            <GlassWindow position={[0, 1.5, -10]} args={[3, 2.8, 0.1]} />

            {/* Centerpiece Bed */}
            <LuxuryBed position={[0, 0, -7.5]} size="king" color="#1A237E" frameColor="#212121" />
            <Rug position={[0, 0.06, -7.5]} args={[4, 0.02, 3]} color="#E0E0E0" />

            {/* Bedside Setup */}
            <Nightstand position={[-1.6, 0, -7.5]} />
            <ModernLamp position={[-1.6, 0.55, -7.5]} />
            <Nightstand position={[1.6, 0, -7.5]} />
            <ModernLamp position={[1.6, 0.55, -7.5]} />

            {/* Seating Area */}
            <Armchair position={[-4, 0, -9]} rotation={[0, Math.PI / 4, 0]} />
            <PlantPot position={[-5, 0, -9.5]} scale={1.2} />
            
            {/* Room Heater - near seating area */}
            <RoomHeater position={[-3, 0, -6]} rotation={[0, Math.PI / 2, 0]} />

            {/* Media Wall */}
            <AnimatedTV position={[3.5, 1.5, -6]} rotation={[0, -Math.PI / 2, 0]} />
            <WallArt position={[0, 2, -5.2]} rotation={[0, 0, 0]} args={[1.5, 0.8]} color="#3949AB" />

            {/* Master Bedroom Switch Board - near door */}
            <SwitchBoard position={[-4.5, 1.2, -5.15]} rotation={[0, 0, 0]} roomName="Master Bedroom" />
            <PowerSocket position={[-1.8, 0.4, -9.85]} rotation={[0, Math.PI, 0]} /> {/* Near nightstand */}
            <PowerSocket position={[1.8, 0.4, -9.85]} rotation={[0, Math.PI, 0]} /> {/* Near nightstand */}
            <PowerSocket position={[3.2, 0.4, -5.15]} rotation={[0, 0, 0]} /> {/* Near TV */}

            {/* Walk-in Closet */}
            <Wall position={[5, 1.75, -8]} args={[0.2, 3.5, 4]} />
            <Door position={[5, 1.1, -6.5]} args={[0.8, 2.2, 0.1]} />
            <ModernWardrobe position={[7, 0, -7]} width={2.5} rotation={[0, Math.PI, 0]} />
            <ModernWardrobe position={[9, 0, -7]} width={2.5} rotation={[0, Math.PI, 0]} />
            <Rug position={[8, 0.06, -7.5]} args={[2, 0.02, 4]} color="#F5F5F5" />

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

            {/* Playful & Functional Layout */}
            <BunkBed position={[8, 0, 3.5]} />
            {/* Gaming Station */}
            <GamingDesk position={[8, 0, -1]} rotation={[0, Math.PI, 0]} />
            <ModernChair position={[8.8, 0, -1]} rotation={[0, -Math.PI / 2, 0]} color="#D32F2F" />

            <Bookshelf position={[9.5, 0, 1.5]} rotation={[0, -Math.PI / 2, 0]} />
            <Rug position={[8, 0.06, 1]} args={[2.5, 0.02, 2.5]} color="#4CAF50" />

            {/* Decor */}
            <WallArt position={[9.9, 1.8, 1]} rotation={[0, -Math.PI / 2, 0]} args={[0.8, 1]} color="#FF9800" />
            <PlantPot position={[6, 0, 4]} />

            {/* Children's Room Switch Board */}
            <SwitchBoard position={[5.15, 1.2, -1]} rotation={[0, Math.PI / 2, 0]} roomName="Children's Room" />
            <PowerSocket position={[5.15, 0.4, 2]} rotation={[0, Math.PI / 2, 0]} /> {/* Near bed */}
            <PowerSocket position={[9.85, 0.4, -1]} rotation={[0, -Math.PI / 2, 0]} /> {/* Near desk */}
            
            {/* Children's Room Heater */}
            <RoomHeater position={[6.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

            {/* Toy chest */}
            <RigidBody type="fixed" position={[9, 0, 4]}>
                <Box args={[0.8, 0.5, 0.5]} position={[0, 0.25, 0]}>
                    <meshStandardMaterial color="#AA6633" />
                </Box>
            </RigidBody>

            {/* === HOME OFFICE / STUDY (Near landing) === */}
            <Wall position={[-5, 1.75, 0]} args={[0.2, 3.5, 10]} />
            <Door position={[-5, 1.1, -2]} args={[0.8, 2.2, 0.1]} />

            {/* Serious Work Setup */}
            <GamingDesk position={[-8, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
            <ModernChair position={[-7.2, 0, -2]} rotation={[0, -Math.PI / 2, 0]} />

            <FilingCabinet position={[-9.5, 0, -1]} />
            <Bookshelf position={[-9.5, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
            <Bookshelf position={[-9.5, 0, 3]} rotation={[0, Math.PI / 2, 0]} />
            <PlantPot position={[-6, 0, 4]} scale={1.2} />

            {/* Office Switch Board */}
            <SwitchBoard position={[-5.15, 1.2, -1]} rotation={[0, -Math.PI / 2, 0]} roomName="Home Office" />
            <PowerSocket position={[-9.85, 0.4, -2]} rotation={[0, Math.PI / 2, 0]} /> {/* Near desk */}
            <PowerSocket position={[-5.15, 0.4, 2]} rotation={[0, -Math.PI / 2, 0]} /> {/* General use */}
            
            {/* Home Office Heater */}
            <RoomHeater position={[-6.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

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
            {/* (Kept same as before) */}
            <RigidBody type="fixed">
                <mesh position={[0, 5.5, 3]} rotation={[Math.PI * 0.2, 0, 0]}>
                    <boxGeometry args={[38, 0.3, 12]} />
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </mesh>
                <mesh position={[0, 5.5, -8]} rotation={[-Math.PI * 0.2, 0, 0]}>
                    <boxGeometry args={[38, 0.3, 12]} />
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </mesh>
                <Box args={[38, 0.4, 0.4]} position={[0, 7.2, -2.5]}>
                    <meshStandardMaterial color="#4A3528" roughness={0.8} />
                </Box>
                <mesh position={[-18, 5.5, -2.5]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[11, 4, 0.3]} />
                    <meshStandardMaterial color="#F5E6C8" roughness={0.85} />
                </mesh>
                <mesh position={[18, 5.5, -2.5]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[11, 4, 0.3]} />
                    <meshStandardMaterial color="#F5E6C8" roughness={0.85} />
                </mesh>
                <Box args={[39, 0.15, 1]} position={[0, 3.8, 5.8]}>
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </Box>
                <Box args={[39, 0.15, 1]} position={[0, 3.8, -10.8]}>
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </Box>
                <Box args={[1.2, 3, 1]} position={[4, 7, -6]}>
                    <meshStandardMaterial color="#8B4513" roughness={0.95} />
                </Box>
                <Box args={[1.4, 0.15, 1.2]} position={[4, 8.55, -6]}>
                    <meshStandardMaterial color="#555" roughness={0.9} />
                </Box>
            </RigidBody>

            {/* Ceiling lights for first floor */}
            <CeilingLight position={[0, 3.4, -7.5]} intensity={1.5} color="#FFEB3B" />
            <CeilingLight position={[8, 3.4, 2]} intensity={1.2} />
            <CeilingLight position={[-8, 3.4, 2]} intensity={1.2} />
        </group>
    );
};
