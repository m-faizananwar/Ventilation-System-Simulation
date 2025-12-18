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
            <ExhaustFan position={[8, 2.5, -9.8]} rotation={[0, 0, 0]} speed={2} />

            {/* UPGRADED Guest Bedroom Furniture - Properly organized against walls */}
            
            {/* === BED AREA (Against back wall, centered) === */}
            <LuxuryBed position={[12, 0, -8.5]} size="queen" color="#546E7A" frameColor="#455A64" rotation={[0, 0, 0]} />
            
            {/* Large area rug under bed */}
            <Rug position={[12, 0.06, -6.5]} args={[5, 0.02, 5]} color="#37474F" />
            {/* Accent rug on top */}
            <Rug position={[12, 0.08, -5.5]} args={[3, 0.02, 2.5]} color="#ECEFF1" />
            
            {/* Nightstands on either side of bed */}
            <Nightstand position={[9.6, 0, -8.5]} />
            <ModernLamp position={[9.6, 0.55, -8.5]} />
            <Nightstand position={[14.4, 0, -8.5]} />
            <ModernLamp position={[14.4, 0.55, -8.5]} />
            
            {/* Wall art above the bed - Triptych style */}
            <WallArt position={[10.5, 2.2, -9.85]} rotation={[0, 0, 0]} args={[0.7, 0.9]} color="#00796B" />
            <WallArt position={[12, 2.2, -9.85]} rotation={[0, 0, 0]} args={[0.7, 0.9]} color="#004D40" />
            <WallArt position={[13.5, 2.2, -9.85]} rotation={[0, 0, 0]} args={[0.7, 0.9]} color="#00897B" />

            {/* === WARDROBE AREA (Right wall) === */}
            <ModernWardrobe position={[17.3, 0, -6]} width={2.5} rotation={[0, -Math.PI / 2, 0]} />
            
            {/* Full length mirror next to wardrobe */}
            <Mirror position={[17.85, 1.2, -3]} rotation={[0, -Math.PI / 2, 0]} args={[0.6, 1.8]} />
            
            {/* === WORK/STUDY AREA (Left side near entrance) === */}
            <GamingDesk position={[7, 0, -4]} rotation={[0, Math.PI / 2, 0]} />
            <ModernChair position={[7.8, 0, -4]} rotation={[0, -Math.PI / 2, 0]} color="#455A64" />
            
            {/* Bookshelf near desk */}
            <Bookshelf position={[6.3, 0, -6.5]} rotation={[0, Math.PI / 2, 0]} />
            
            {/* === SEATING/READING AREA (Corner) === */}
            <Armchair position={[16, 0, -1.5]} rotation={[0, -Math.PI * 0.75, 0]} />
            {/* Elegant round side table */}
            <RigidBody type="fixed" position={[15, 0, -0.5]}>
                {/* Table top - marble look */}
                <Cylinder args={[0.3, 0.3, 0.025, 24]} position={[0, 0.52, 0]}>
                    <meshStandardMaterial color="#ECEFF1" metalness={0.1} roughness={0.3} />
                </Cylinder>
                {/* Gold rim */}
                <Cylinder args={[0.31, 0.31, 0.01, 24]} position={[0, 0.51, 0]}>
                    <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
                </Cylinder>
                {/* Pedestal */}
                <Cylinder args={[0.08, 0.12, 0.45, 16]} position={[0, 0.27, 0]}>
                    <meshStandardMaterial color="#37474F" metalness={0.6} roughness={0.3} />
                </Cylinder>
                {/* Base */}
                <Cylinder args={[0.22, 0.22, 0.04, 24]} position={[0, 0.02, 0]}>
                    <meshStandardMaterial color="#263238" metalness={0.5} roughness={0.4} />
                </Cylinder>
            </RigidBody>
            
            {/* === PLANTS & DECORATIONS === */}
            {/* Corner plant */}
            <PlantPot position={[17, 0, -9]} scale={1.3} />
            {/* Plant near window/entrance */}
            <PlantPot position={[6.5, 0, -1.5]} scale={1} />
            
            {/* Woven storage basket */}
            <RigidBody type="fixed" position={[17, 0, -1]}>
                {/* Basket body - woven texture simulated */}
                <Cylinder args={[0.28, 0.22, 0.38, 16]} position={[0, 0.19, 0]}>
                    <meshStandardMaterial color="#A1887F" roughness={0.95} />
                </Cylinder>
                {/* Basket rim */}
                <Cylinder args={[0.29, 0.28, 0.04, 16]} position={[0, 0.39, 0]}>
                    <meshStandardMaterial color="#8D6E63" roughness={0.9} />
                </Cylinder>
                {/* Decorative bands */}
                <Cylinder args={[0.285, 0.285, 0.02, 16]} position={[0, 0.28, 0]}>
                    <meshStandardMaterial color="#6D4C41" roughness={0.85} />
                </Cylinder>
                <Cylinder args={[0.26, 0.26, 0.02, 16]} position={[0, 0.12, 0]}>
                    <meshStandardMaterial color="#6D4C41" roughness={0.85} />
                </Cylinder>
            </RigidBody>
            
            {/* Modern wall clock */}
            <group position={[17.85, 2.5, -6]} rotation={[0, -Math.PI / 2, 0]}>
                {/* Clock frame */}
                <Cylinder args={[0.28, 0.28, 0.04, 32]}>
                    <meshStandardMaterial color="#212121" metalness={0.3} roughness={0.5} />
                </Cylinder>
                {/* Clock face */}
                <Cylinder args={[0.25, 0.25, 0.02, 32]} position={[0, 0, 0.02]}>
                    <meshStandardMaterial color="#FAFAFA" roughness={0.3} />
                </Cylinder>
                {/* Hour markers */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                    <Box key={i} args={[i % 3 === 0 ? 0.03 : 0.015, i % 3 === 0 ? 0.012 : 0.008, 0.005]} 
                         position={[Math.sin(angle * Math.PI / 180) * 0.2, Math.cos(angle * Math.PI / 180) * 0.2, 0.035]}>
                        <meshStandardMaterial color="#1a1a1a" />
                    </Box>
                ))}
                {/* Hour hand */}
                <Box args={[0.015, 0.12, 0.008]} position={[0.03, 0.04, 0.04]} rotation={[0, 0, -0.4]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Box>
                {/* Minute hand */}
                <Box args={[0.01, 0.16, 0.006]} position={[-0.02, 0.06, 0.045]} rotation={[0, 0, 0.8]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Box>
                {/* Center cap */}
                <Cylinder args={[0.015, 0.015, 0.015, 12]} position={[0, 0, 0.045]}>
                    <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
                </Cylinder>
            </group>
            
            {/* Modern digital alarm clock on right nightstand */}
            <group position={[14.4, 0.56, -8.3]}>
                {/* Clock body */}
                <Box args={[0.14, 0.08, 0.06]}>
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
                </Box>
                {/* Display */}
                <Box args={[0.11, 0.05, 0.005]} position={[0, 0.005, 0.031]}>
                    <meshStandardMaterial color="#001a00" />
                </Box>
                {/* LED digits glow */}
                <Box args={[0.09, 0.04, 0.002]} position={[0, 0.005, 0.034]}>
                    <meshStandardMaterial color="#00E676" emissive="#00E676" emissiveIntensity={0.8} />
                </Box>
                {/* Stand */}
                <Box args={[0.1, 0.015, 0.04]} position={[0, -0.045, -0.01]}>
                    <meshStandardMaterial color="#263238" roughness={0.4} />
                </Box>
            </group>
            
            {/* Realistic book stack on left nightstand */}
            <group position={[9.6, 0.56, -8.3]}>
                {/* Bottom book - hardcover */}
                <Box args={[0.16, 0.035, 0.22]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#1565C0" roughness={0.7} />
                </Box>
                <Box args={[0.155, 0.03, 0.005]} position={[0, 0, 0.108]}>
                    <meshStandardMaterial color="#0D47A1" roughness={0.6} />
                </Box>
                {/* Middle book */}
                <Box args={[0.15, 0.028, 0.2]} position={[-0.005, 0.032, 0]}>
                    <meshStandardMaterial color="#B71C1C" roughness={0.75} />
                </Box>
                {/* Top book - slightly askew */}
                <Box args={[0.14, 0.025, 0.19]} position={[0.01, 0.06, 0.01]} rotation={[0, 0.1, 0]}>
                    <meshStandardMaterial color="#1B5E20" roughness={0.7} />
                </Box>
                {/* Reading glasses on top */}
                <group position={[0, 0.085, 0.02]} rotation={[0.1, 0.2, 0]}>
                    <Cylinder args={[0.025, 0.025, 0.005, 16]} position={[-0.035, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
                        <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
                    </Cylinder>
                    <Cylinder args={[0.025, 0.025, 0.005, 16]} position={[0.035, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
                        <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
                    </Cylinder>
                    <Box args={[0.02, 0.003, 0.003]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#1a1a1a" metalness={0.4} />
                    </Box>
                </group>
            </group>
            
            {/* Ceiling fan for the bedroom */}
            <CeilingFan position={[12, 3.5, -5]} speed={1.2} />
            
            {/* Wall-mounted TV across from bed */}
            <AnimatedTV position={[12, 1.8, 4.8]} rotation={[0, Math.PI, 0]} />
            
            {/* Modern TV console/media unit */}
            <RigidBody type="fixed" position={[12, 0, 4.5]}>
                {/* Main body - floating style */}
                <Box args={[1.9, 0.5, 0.42]} position={[0, 0.35, 0]}>
                    <meshStandardMaterial color="#37474F" roughness={0.4} />
                </Box>
                {/* Top surface - wood accent */}
                <Box args={[1.92, 0.025, 0.44]} position={[0, 0.615, 0]}>
                    <meshStandardMaterial color="#5D4037" roughness={0.5} />
                </Box>
                {/* Drawer fronts - different finishes */}
                <Box args={[0.58, 0.2, 0.025]} position={[-0.48, 0.4, 0.215]}>
                    <meshStandardMaterial color="#455A64" roughness={0.35} />
                </Box>
                <Box args={[0.58, 0.2, 0.025]} position={[0.48, 0.4, 0.215]}>
                    <meshStandardMaterial color="#455A64" roughness={0.35} />
                </Box>
                {/* Center open shelf */}
                <Box args={[0.5, 0.2, 0.38]} position={[0, 0.4, 0]}>
                    <meshStandardMaterial color="#263238" roughness={0.5} />
                </Box>
                {/* Minimalist handles */}
                <Box args={[0.08, 0.008, 0.015]} position={[-0.48, 0.4, 0.235]}>
                    <meshStandardMaterial color="#90A4AE" metalness={0.8} roughness={0.2} />
                </Box>
                <Box args={[0.08, 0.008, 0.015]} position={[0.48, 0.4, 0.235]}>
                    <meshStandardMaterial color="#90A4AE" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Legs - hairpin style */}
                {[[-0.85, -0.18], [0.85, -0.18], [-0.85, 0.18], [0.85, 0.18]].map(([x, z], i) => (
                    <Cylinder key={i} args={[0.012, 0.012, 0.15, 8]} position={[x, 0.075, z]}>
                        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
                    </Cylinder>
                ))}
            </RigidBody>
            
            {/* Decorative items on TV console */}
            <PlantPot position={[11.2, 0.64, 4.5]} scale={0.5} />
            
            {/* Elegant photo frame */}
            <group position={[12.8, 0.72, 4.5]}>
                {/* Frame */}
                <Box args={[0.18, 0.24, 0.025]}>
                    <meshStandardMaterial color="#5D4037" roughness={0.5} />
                </Box>
                {/* Mat */}
                <Box args={[0.14, 0.2, 0.005]} position={[0, 0, 0.016]}>
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} />
                </Box>
                {/* Photo */}
                <Box args={[0.1, 0.14, 0.003]} position={[0, 0, 0.02]}>
                    <meshStandardMaterial color="#BDBDBD" roughness={0.6} />
                </Box>
                {/* Stand */}
                <Box args={[0.12, 0.003, 0.08]} position={[0, -0.12, -0.04]} rotation={[-0.3, 0, 0]}>
                    <meshStandardMaterial color="#4E342E" roughness={0.5} />
                </Box>
            </group>
            
            {/* Decorative candles */}
            <group position={[12.3, 0.64, 4.55]}>
                <Cylinder args={[0.025, 0.025, 0.12, 12]} position={[0, 0.06, 0]}>
                    <meshStandardMaterial color="#ECEFF1" roughness={0.6} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.08, 12]} position={[0.08, 0.04, 0]}>
                    <meshStandardMaterial color="#BCAAA4" roughness={0.6} />
                </Cylinder>
            </group>

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
            <CeilingLight position={[12, 3.55, -5]} intensity={1} />
            <CeilingFan position={[-12, 3.5, -7]} speed={1.5} />

            {/* TV Lounge Exhaust Fan */}
            <ExhaustFan position={[0, 2.5, -9.8]} rotation={[0, 0, 0]} speed={1.5} />
        </group >
    );
};
