import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Floor, Wall, InteractiveDoor, GlassWindow, CeilingLight, Door } from '../../HouseStructure';
import { Rug, Sofa, Armchair, CoffeeTable, TVConsole, Bookshelf, Console, Mirror, ShoeRack, CoatHanger } from '../furniture/LivingRoomFurniture';
import { Table, DiningChair, Chandelier, RealisticRangeHood } from '../furniture/KitchenFurniture';
import { AnimatedTV, InteractiveStove, InteractiveRefrigerator, InteractiveFireplace } from '../interactive/InteractiveItems';
import { CeilingFan, ExhaustFan } from '../interactive/Appliances';
import { PickableItem } from '../interactive/PickableItem';
import { LuxuryBed, Nightstand, ModernWardrobe, GamingDesk, ModernChair, ModernLamp, PlantPot, WallArt } from '../furniture/BedroomFurniture';
import { Toilet, Vanity, ShowerCubicle } from '../furniture/BathroomFurniture';
import { Stairs } from '../structure/Stairs';

export const GroundFloor = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* FLOOR */}
            <Floor position={[0, 0.05, -2.5]} args={[36, 15]} />

            {/* === FOYER (Center Front) === */}
            <Wall position={[-9.6, 1.75, 5]} args={[16.8, 3.5, 0.2]} />
            <Wall position={[9.6, 1.75, 5]} args={[16.8, 3.5, 0.2]} />
            <InteractiveDoor position={[0, 1.6, 5]} args={[2.4, 3.2, 0.12]} color="#4A3728" interactionDistance={4} />
            <Wall position={[0, 3.45, 5]} args={[2.6, 0.6, 0.2]} />
            <Rug position={[0, 0.01, 4]} args={[1.5, 0.02, 1]} color="#553322" />

            {/* === LIVING ROOM (Center) === */}
            <Wall position={[6, 1.75, -4.6]} args={[0.2, 3.5, 10.8]} />   {/* Back section */}
            <Wall position={[6, 1.75, 4.1]} args={[0.2, 3.5, 1.8]} />     {/* Front section */}
            <Wall position={[6, 3.3, 2]} args={[0.2, 0.4, 2.5]} />        {/* Above door */}
            <InteractiveDoor position={[6, 1.5, 2]} rotation={[0, Math.PI / 2, 0]} args={[2.5, 3, 0.12]} color="#4A3728" interactionDistance={3} />

            <Wall position={[-6, 1.75, -4.6]} args={[0.2, 3.5, 10.8]} />  {/* Back section */}
            <Wall position={[-6, 1.75, 4.1]} args={[0.2, 3.5, 1.8]} />    {/* Front section */}
            <Wall position={[-6, 3.3, 2]} args={[0.2, 0.4, 2.5]} />       {/* Above door */}
            <InteractiveDoor position={[-6, 1.5, 2]} rotation={[0, Math.PI / 2, 0]} args={[2.5, 3, 0.12]} color="#4A3728" interactionDistance={3} />

            {/* North Wall (Glass Doors to Backyard) */}
            <GlassWindow position={[0, 1.75, -10]} args={[8, 3, 0.1]} />
            <RigidBody type="fixed">
                <Box args={[8, 3, 0.15]} position={[0, 1.75, -10]}>
                    <meshStandardMaterial transparent opacity={0} />
                </Box>
            </RigidBody>
            <Wall position={[0, 3.35, -10]} args={[8, 0.8, 0.2]} />
            <Wall position={[-5, 1.75, -10]} args={[2, 3.5, 0.2]} />
            <Wall position={[5, 1.75, -10]} args={[2, 3.5, 0.2]} />

            {/* Living Room Furniture */}
            <Rug position={[0, 0.12, -6.5]} args={[6, 0.05, 4]} color="#4A4A4A" />
            <Rug position={[0, 0.15, -6.5]} args={[5, 0.03, 3.2]} color="#8B1E3F" />
            <Sofa position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]} />
            <InteractiveFireplace position={[-5.5, 0, -6.5]} rotation={[0, Math.PI / 2, 0]} />
            <Armchair position={[3, 0, -5.5]} rotation={[0, -Math.PI / 2, 0]} />
            <Armchair position={[3, 0, -7.5]} rotation={[0, -Math.PI / 2, 0]} />
            <CoffeeTable position={[0, 0, -6.5]} />
            <AnimatedTV position={[0, 1.5, -9.3]} rotation={[0, 0, 0]} />
            <TVConsole position={[0, 0, -9.3]} />
            <Bookshelf position={[-3, 0, -9.3]} rotation={[0, 0, 0]} />
            <Bookshelf position={[3, 0, -9.3]} rotation={[0, 0, 0]} />

            {/* === DINING AREA (West of Living) === */}
            <Wall position={[-18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />
            <Table position={[-12, 0, 0]} args={[2.2, 0.75, 1.4]} color="#5C4033" />
            <DiningChair position={[-13.6, 0, 0.3]} rotation={[0, Math.PI / 2, 0]} />
            <DiningChair position={[-13.6, 0, -0.3]} rotation={[0, Math.PI / 2, 0]} />
            <DiningChair position={[-10.4, 0, 0.3]} rotation={[0, -Math.PI / 2, 0]} />
            <DiningChair position={[-10.4, 0, -0.3]} rotation={[0, -Math.PI / 2, 0]} />
            <DiningChair position={[-12.4, 0, -1.1]} rotation={[0, 0, 0]} />
            <DiningChair position={[-11.6, 0, -1.1]} rotation={[0, 0, 0]} />
            <DiningChair position={[-12.4, 0, 1.1]} rotation={[0, Math.PI, 0]} />
            <DiningChair position={[-11.6, 0, 1.1]} rotation={[0, Math.PI, 0]} />
            <Chandelier position={[-12, 2.5, 0]} />
            <RigidBody type="fixed" position={[-17.5, 0, 0]}>
                <Box args={[0.5, 1.8, 1.2]} position={[0, 0.9, 0]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
                <Box args={[0.02, 1.2, 0.5]} position={[0.26, 1.1, -0.3]}>
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
                </Box>
                <Box args={[0.02, 1.2, 0.5]} position={[0.26, 1.1, 0.3]}>
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
                </Box>
            </RigidBody>

            {/* === KITCHEN === */}
            <Wall position={[-12, 1.75, -10]} args={[12, 3.5, 0.2]} />
            <ExhaustFan position={[-8, 2.5, -9.8]} rotation={[0, 0, 0]} speed={3} />
            <InteractiveRefrigerator position={[-17.4, 0, -8.5]} rotation={[0, Math.PI / 2, 0]} interactionDistance={3} />
            <InteractiveStove position={[-17.5, 0, -5.5]} rotation={[0, Math.PI / 2, 0]} interactionDistance={4} />
            <RealisticRangeHood position={[-17.5, 2.0, -5.5]} rotation={[0, Math.PI / 2, 0]} />
            {/* ... Kitchen Cabinets and Items (Code preserved from previous step) ... */}
            <RigidBody type="fixed" position={[-12, 0, -9.5]}>
                <Box args={[6, 0.9, 0.6]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
                <Box args={[6.1, 0.05, 0.65]} position={[0, 0.93, 0]}>
                    <meshStandardMaterial color="#F5F5F5" metalness={0.1} roughness={0.3} />
                </Box>
                <Box args={[6, 0.6, 0.05]} position={[0, 1.3, -0.28]}>
                    <meshStandardMaterial color="#D4C4A8" />
                </Box>
            </RigidBody>
            <group position={[-12, 0.96, -9.3]}>
                <Box args={[0.6, 0.03, 0.45]}><meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} /></Box>
                <Box args={[0.55, 0.2, 0.02]} position={[0, -0.1, 0.21]}><meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} /></Box>
                <Box args={[0.55, 0.2, 0.02]} position={[0, -0.1, -0.21]}><meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} /></Box>
                <Box args={[0.02, 0.2, 0.4]} position={[0.27, -0.1, 0]}><meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} /></Box>
                <Box args={[0.02, 0.2, 0.4]} position={[-0.27, -0.1, 0]}><meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} /></Box>
                <Box args={[0.52, 0.02, 0.38]} position={[0, -0.19, 0]}><meshStandardMaterial color="#707070" metalness={0.8} roughness={0.2} /></Box>
                <Cylinder args={[0.025, 0.025, 0.03, 12]} position={[0, -0.18, 0]}><meshStandardMaterial color="#4A4A4A" metalness={0.9} /></Cylinder>
            </group>
            <group position={[-12, 0.96, -9.65]}>
                {/* Faucet logic */}
                <Cylinder args={[0.04, 0.04, 0.02, 16]}><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} /></Cylinder>
                <Cylinder args={[0.018, 0.018, 0.28, 12]} position={[0, 0.15, 0]}><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} /></Cylinder>
                <Cylinder args={[0.015, 0.015, 0.2, 12]} position={[0, 0.26, 0.1]} rotation={[Math.PI / 2.2, 0, 0]}><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} /></Cylinder>
                <Cylinder args={[0.012, 0.008, 0.05, 8]} position={[0, 0.17, 0.22]}><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} /></Cylinder>
                <Box args={[0.07, 0.015, 0.025]} position={[0, 0.3, -0.02]}><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} /></Box>
            </group>
            <RigidBody type="fixed" position={[-12, 1.8, -9.65]}>
                <Box args={[6, 0.8, 0.4]} position={[0, 0.4, 0]}><meshStandardMaterial color="#6B8E23" /></Box>
            </RigidBody>
            <Box args={[5.8, 0.02, 0.1]} position={[-12, 1.62, -9.5]}><meshStandardMaterial color="#FFFDE7" emissive="#FFFDE7" emissiveIntensity={0.3} /></Box>
            <RigidBody type="fixed" position={[-12, 0, -6]}>
                <Box args={[3.5, 0.9, 1.2]} position={[0, 0.45, 0]}><meshStandardMaterial color="#6B8E23" /></Box>
                <Box args={[3.8, 0.08, 1.5]} position={[0, 0.94, 0.15]}><meshStandardMaterial color="#F8F8F8" metalness={0.05} roughness={0.2} /></Box>
                <Box args={[0.15, 0.6, 1.5]} position={[-1.8, 0.6, 0.15]}><meshStandardMaterial color="#F0F0F0" metalness={0.05} roughness={0.2} /></Box>
            </RigidBody>
            {/* Stools */}
            {[-13.2, -12.4, -11.6, -10.8].map((x, i) => (
                <group key={i} position={[x, 0, -5.2]}>
                    <Cylinder args={[0.18, 0.2, 0.05, 16]} position={[0, 0.75, 0]}><meshStandardMaterial color="#8B6914" roughness={0.6} /></Cylinder>
                    {/* Legs omitted for brevity as they are visually small */}
                </group>
            ))}
            {/* Pendants */}
            {[-12.8, -11.2].map((x, i) => (
                <group key={i} position={[x, 2.5, -6]}>
                    <Cylinder args={[0.008, 0.008, 0.5, 6]}><meshStandardMaterial color="#333333" /></Cylinder>
                    <Sphere args={[0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, -0.35, 0]}><meshStandardMaterial color="#757575" metalness={0.7} roughness={0.3} side={2} /></Sphere>
                    <pointLight position={[0, -0.4, 0]} color="#FFF8E1" intensity={1.5} distance={4} />
                </group>
            ))}

            {/* Kitchen Items (Preserving previous pickables) */}
            <PickableItem position={[-13.8, 0.96, -9.4]} itemType="milk"><Box args={[0.08, 0.22, 0.08]} position={[0, 0.11, 0]}><meshStandardMaterial color="#FFFFFF" /></Box></PickableItem>
            <PickableItem position={[-13.3, 0.96, -9.35]} itemType="bread"><Box args={[0.12, 0.1, 0.25]} position={[0, 0.05, 0]}><meshStandardMaterial color="#FFE0B2" /></Box></PickableItem>
            <PickableItem position={[-12.54, 1.08, -9.35]} itemType="apple"><Sphere args={[0.045, 10, 10]}><meshStandardMaterial color="#C62828" /></Sphere></PickableItem>
            <PickableItem position={[-11.2, 0.96, -9.42]} itemType="cereal"><Box args={[0.06, 0.25, 0.18]} position={[0, 0.125, 0]}><meshStandardMaterial color="#FFC107" /></Box></PickableItem>
            <PickableItem position={[-9.9, 0.96, -9.42]} itemType="oil"><Cylinder args={[0.035, 0.035, 0.18, 12]} position={[0, 0.09, 0]}><meshStandardMaterial color="#FFEB3B" transparent opacity={0.7} /></Cylinder></PickableItem>
            <PickableItem position={[-15, 0.96, -9.4]} itemType="kettle"><Cylinder args={[0.12, 0.15, 0.2, 16]} position={[0, 0.1, 0]}><meshStandardMaterial color="#D4D4D4" /></Cylinder></PickableItem>
            <PickableItem position={[-14.3, 0.96, -9.4]} itemType="pot"><Cylinder args={[0.15, 0.12, 0.16, 16]} position={[0, 0.08, 0]}><meshStandardMaterial color="#B87333" /></Cylinder></PickableItem>
            <PickableItem position={[-13.6, 0.96, -9.4]} itemType="egg"><Box args={[0.18, 0.02, 0.1]} position={[0, 0.01, 0]}><meshStandardMaterial color="#D4C4A8" /></Box></PickableItem>
            <PickableItem position={[-13, 0.96, -9.4]} itemType="tea"><Box args={[0.12, 0.18, 0.06]} position={[0, 0.09, 0]}><meshStandardMaterial color="#8B0000" /></Box></PickableItem>
            <PickableItem position={[-12.3, 0.96, -9.4]} itemType="pan"><Cylinder args={[0.18, 0.15, 0.06, 16]} position={[0, 0.03, 0]}><meshStandardMaterial color="#1a1a1a" /></Cylinder></PickableItem>
            <PickableItem position={[-11.6, 0.96, -9.4]} itemType="roti"><Cylinder args={[0.12, 0.12, 0.015, 20]} position={[0, 0.008, 0]}><meshStandardMaterial color="#D4A574" /></Cylinder></PickableItem>

            {/* === GUEST BEDROOM (East Wing) === */}
            <Wall position={[18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />
            {/* Back wall for guest bedroom */}
            <Wall position={[12, 1.75, -10]} args={[12, 3.5, 0.2]} />

            {/* Exhaust fan on the back wall */}
            <ExhaustFan position={[15, 2.5, -9.8]} rotation={[0, 0, 0]} speed={2} />

            {/* UPGRADED Guest Bedroom Furniture - Properly organized against walls */}
            
            {/* Bed with headboard flush against the back wall */}
            <LuxuryBed position={[12, 0, -8.5]} size="queen" color="#546E7A" frameColor="#455A64" rotation={[0, Math.PI, 0]} />
            <Rug position={[12, 0.06, -6]} args={[3.5, 0.02, 3.5]} color="#ECEFF1" />
            
            {/* Nightstands on either side of bed */}
            <Nightstand position={[9.8, 0, -8.5]} />
            <ModernLamp position={[9.8, 0.55, -8.5]} />
            <Nightstand position={[14.2, 0, -8.5]} />
            <ModernLamp position={[14.2, 0.55, -8.5]} />
            
            {/* Wall art above the bed */}
            <WallArt position={[12, 2.2, -9.85]} rotation={[0, 0, 0]} args={[1.2, 0.9]} color="#009688" />

            {/* Wardrobe against the right wall */}
            <ModernWardrobe position={[17.5, 0, -4]} width={2.5} rotation={[0, -Math.PI / 2, 0]} />
            
            {/* Work desk in corner (against left wall) */}
            <GamingDesk position={[6.8, 0, -4]} rotation={[0, Math.PI / 2, 0]} />
            <ModernChair position={[7.6, 0, -4]} rotation={[0, -Math.PI / 2, 0]} />

            {/* === GUEST BATHROOM (Near Guest Bedroom) === */}
            <Wall position={[8, 1.75, -9]} args={[4, 3.5, 0.2]} />
            <Door position={[6.5, 1.1, -9]} args={[0.8, 2.2, 0.1]} />
            <Toilet position={[9, 0, -9.5]} rotation={[0, Math.PI, 0]} />
            <Vanity position={[7, 0, -9.5]} />
            <ShowerCubicle position={[8.5, 0, -9.5]} />

            {/* CEILING/LIGHTS */}
            <Floor position={[0, 3.6, -2.5]} args={[36, 15]} color="#F5F5F0" />
            <CeilingLight position={[0, 3.55, 3.5]} intensity={1} />
            <CeilingLight position={[0, 3.55, -4]} intensity={1.5} />
            <CeilingLight position={[-3, 3.55, 0]} intensity={1.2} />
            <CeilingLight position={[-14, 3.55, -7]} intensity={1.2} />
            <CeilingLight position={[9, 3.55, -4]} intensity={0.8} />
            <CeilingFan position={[-12, 3.5, -7]} speed={1.5} />
            <Stairs position={[-4, 0, 3]} direction="up" steps={11} />
        </group >
    );
};
