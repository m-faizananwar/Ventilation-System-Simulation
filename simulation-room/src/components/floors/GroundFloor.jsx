import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Floor, Wall, InteractiveDoor, GlassWindow, CeilingLight, Door } from '../../HouseStructure';
import { Rug, Sofa, Armchair, CoffeeTable, TVConsole, Bookshelf, Console, Mirror, ShoeRack, CoatHanger } from '../furniture/LivingRoomFurniture';
import { Table, DiningChair, Chandelier, RealisticRangeHood } from '../furniture/KitchenFurniture';
import { AnimatedTV, InteractiveStove, InteractiveRefrigerator, InteractiveFireplace } from '../interactive/InteractiveItems';
import { CeilingFan, ExhaustFan } from '../interactive/Appliances';
import { PickableItem } from '../interactive/PickableItem';
import { Bed, Nightstand, Wardrobe, Desk, Chair } from '../furniture/BedroomFurniture';
import { Toilet, Vanity, ShowerCubicle } from '../furniture/BathroomFurniture';
import { Stairs } from '../structure/Stairs';

export const GroundFloor = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* FLOOR */}
            {/* FLOOR - expanded to 36m width */}
            <Floor position={[0, 0.05, -2.5]} args={[36, 15]} />

            {/* === FOYER (Center Front) === */}
            {/* Front wall - LEFT section (width 16.8, pos -9.6) */}
            <Wall position={[-9.6, 1.75, 5]} args={[16.8, 3.5, 0.2]} />
            {/* Front wall - RIGHT section (width 16.8, pos 9.6) */}
            <Wall position={[9.6, 1.75, 5]} args={[16.8, 3.5, 0.2]} />
            {/* MAIN ENTRANCE - Interactive Door (taller, opens with E key) */}
            <InteractiveDoor position={[0, 1.6, 5]} args={[2.4, 3.2, 0.12]} color="#4A3728" interactionDistance={4} />
            {/* Wall above door */}
            <Wall position={[0, 3.45, 5]} args={[2.6, 0.6, 0.2]} />

            {/* Foyer Furniture - kept minimal */}
            <Rug position={[0, 0.01, 4]} args={[1.5, 0.02, 1]} color="#553322" />

            {/* === LIVING ROOM (Center) === */}
            {/* East wall (to Guest Bedroom) - moved out to x=6 to restore lounge size */}
            <Wall position={[6, 1.75, -4.6]} args={[0.2, 3.5, 10.8]} />   {/* Back section */}
            <Wall position={[6, 1.75, 4.1]} args={[0.2, 3.5, 1.8]} />     {/* Front section */}
            <Wall position={[6, 3.3, 2]} args={[0.2, 0.4, 2.5]} />        {/* Above door */}
            <InteractiveDoor position={[6, 1.5, 2]} rotation={[0, Math.PI / 2, 0]} args={[2.5, 3, 0.12]} color="#4A3728" interactionDistance={3} />

            {/* West wall (to Dining/Kitchen) - moved out to x=-6 to restore lounge size */}
            <Wall position={[-6, 1.75, -4.6]} args={[0.2, 3.5, 10.8]} />  {/* Back section */}
            <Wall position={[-6, 1.75, 4.1]} args={[0.2, 3.5, 1.8]} />    {/* Front section */}
            <Wall position={[-6, 3.3, 2]} args={[0.2, 0.4, 2.5]} />       {/* Above door */}
            <InteractiveDoor position={[-6, 1.5, 2]} rotation={[0, Math.PI / 2, 0]} args={[2.5, 3, 0.12]} color="#4A3728" interactionDistance={3} />

            {/* North Wall (Glass Doors to Backyard) */}
            <GlassWindow position={[0, 1.75, -10]} args={[8, 3, 0.1]} />
            {/* Invisible collision barrier behind glass */}
            <RigidBody type="fixed">
                <Box args={[8, 3, 0.15]} position={[0, 1.75, -10]}>
                    <meshStandardMaterial transparent opacity={0} />
                </Box>
            </RigidBody>
            {/* Wall above glass window to ceiling */}
            <Wall position={[0, 3.35, -10]} args={[8, 0.8, 0.2]} />
            <Wall position={[-5, 1.75, -10]} args={[2, 3.5, 0.2]} />
            <Wall position={[5, 1.75, -10]} args={[2, 3.5, 0.2]} />

            {/* Living Room Furniture - arranged facing TV */}
            {/* Large carpet - charcoal grey outer */}
            <Rug position={[0, 0.12, -6.5]} args={[6, 0.05, 4]} color="#4A4A4A" />
            {/* Inner accent - rich burgundy red */}
            <Rug position={[0, 0.15, -6.5]} args={[5, 0.03, 3.2]} color="#8B1E3F" />

            {/* Main sofa facing TV */}
            <Sofa position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]} />
            {/* Fireplace on west wall - moved to x=-5.5 (for wall at -6) */}
            <InteractiveFireplace position={[-5.5, 0, -6.5]} rotation={[0, Math.PI / 2, 0]} />
            {/* Armchairs on the right */}
            <Armchair position={[3, 0, -5.5]} rotation={[0, -Math.PI / 2, 0]} />
            <Armchair position={[3, 0, -7.5]} rotation={[0, -Math.PI / 2, 0]} />
            {/* Coffee table in center */}
            <CoffeeTable position={[0, 0, -6.5]} />

            {/* Entertainment (Back/North Wall) */}
            <AnimatedTV position={[0, 1.5, -9.3]} rotation={[0, 0, 0]} />
            <TVConsole position={[0, 0, -9.3]} />
            <Bookshelf position={[-3, 0, -9.3]} rotation={[0, 0, 0]} />
            <Bookshelf position={[3, 0, -9.3]} rotation={[0, 0, 0]} />

            {/* === DINING AREA (West of Living) === */}
            {/* Outer Walls - Expanded to x=±14 */}
            {/* Outer Walls - Expanded to x=\u00B118 */}
            <Wall position={[-18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            {/* Dining Table - centered in dining area */}
            <Table position={[-12, 0, 0]} args={[2.2, 0.75, 1.4]} color="#5C4033" />

            {/* Dining Chairs - properly spaced around table */}
            {/* Two chairs on each long side, one on each short end */}
            {/* Left side chairs (facing right) */}
            <DiningChair position={[-13.6, 0, 0.3]} rotation={[0, Math.PI / 2, 0]} />
            <DiningChair position={[-13.6, 0, -0.3]} rotation={[0, Math.PI / 2, 0]} />
            {/* Right side chairs (facing left) */}
            <DiningChair position={[-10.4, 0, 0.3]} rotation={[0, -Math.PI / 2, 0]} />
            <DiningChair position={[-10.4, 0, -0.3]} rotation={[0, -Math.PI / 2, 0]} />
            {/* Back chairs (facing front) */}
            <DiningChair position={[-12.4, 0, -1.1]} rotation={[0, 0, 0]} />
            <DiningChair position={[-11.6, 0, -1.1]} rotation={[0, 0, 0]} />
            {/* Front chairs (facing back) */}
            <DiningChair position={[-12.4, 0, 1.1]} rotation={[0, Math.PI, 0]} />
            <DiningChair position={[-11.6, 0, 1.1]} rotation={[0, Math.PI, 0]} />

            <Chandelier position={[-12, 2.5, 0]} />

            {/* Crockery Cabinet - moved to wall, away from table */}
            <RigidBody type="fixed" position={[-17.5, 0, 0]}>
                <Box args={[0.5, 1.8, 1.2]} position={[0, 0.9, 0]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
                {/* Glass doors */}
                <Box args={[0.02, 1.2, 0.5]} position={[0.26, 1.1, -0.3]}>
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
                </Box>
                <Box args={[0.02, 1.2, 0.5]} position={[0.26, 1.1, 0.3]}>
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
                </Box>
            </RigidBody>

            {/* === KITCHEN (North-West Corner - L-Shape against walls) === */}

            {/* --- KITCHEN BACK WALL (North Wall at z=-10) - Single solid wall --- */}
            <Wall position={[-12, 1.75, -10]} args={[12, 3.5, 0.2]} />

            {/* Wall-Mounted Exhaust Ventilation Fan - on kitchen back wall */}
            <ExhaustFan position={[-8, 2.5, -9.8]} rotation={[0, 0, 0]} speed={3} />

            {/* --- SIDE WALL (West Wall at x=-18) - Stove & Refrigerator --- */}
            {/* Interactive Refrigerator - against west wall, facing room */}
            <InteractiveRefrigerator position={[-17.4, 0, -8.5]} rotation={[0, Math.PI / 2, 0]} interactionDistance={3} />

            {/* Interactive Stove with animated burners - attached to west wall */}
            <InteractiveStove position={[-17.5, 0, -5.5]} rotation={[0, Math.PI / 2, 0]} interactionDistance={4} />
            {/* Realistic Range Hood above stove - attached to wall */}
            <RealisticRangeHood position={[-17.5, 2.0, -5.5]} rotation={[0, Math.PI / 2, 0]} />

            {/* ===== MODERN KITCHEN DESIGN ===== */}

            {/* === WALL CABINETS (Along back wall) === */}
            {/* Lower cabinets - olive green */}
            <RigidBody type="fixed" position={[-12, 0, -9.5]}>
                {/* Cabinet base */}
                <Box args={[6, 0.9, 0.6]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
                {/* Marble countertop */}
                <Box args={[6.1, 0.05, 0.65]} position={[0, 0.93, 0]}>
                    <meshStandardMaterial color="#F5F5F5" metalness={0.1} roughness={0.3} />
                </Box>
                {/* Backsplash */}
                <Box args={[6, 0.6, 0.05]} position={[0, 1.3, -0.28]}>
                    <meshStandardMaterial color="#D4C4A8" />
                </Box>
            </RigidBody>

            {/* Modern Kitchen Sink - visible above counter */}
            <group position={[-12, 0.96, -9.3]}>
                {/* Sink rim/edge - visible from above */}
                <Box args={[0.6, 0.03, 0.45]}>
                    <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Sink basin walls */}
                <Box args={[0.55, 0.2, 0.02]} position={[0, -0.1, 0.21]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                <Box args={[0.55, 0.2, 0.02]} position={[0, -0.1, -0.21]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                <Box args={[0.02, 0.2, 0.4]} position={[0.27, -0.1, 0]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                <Box args={[0.02, 0.2, 0.4]} position={[-0.27, -0.1, 0]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                {/* Sink bottom */}
                <Box args={[0.52, 0.02, 0.38]} position={[0, -0.19, 0]}>
                    <meshStandardMaterial color="#707070" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Drain */}
                <Cylinder args={[0.025, 0.025, 0.03, 12]} position={[0, -0.18, 0]}>
                    <meshStandardMaterial color="#4A4A4A" metalness={0.9} />
                </Cylinder>
            </group>

            {/* Modern Gooseneck Faucet */}
            <group position={[-12, 0.96, -9.65]}>
                {/* Faucet base plate */}
                <Cylinder args={[0.04, 0.04, 0.02, 16]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Faucet vertical neck */}
                <Cylinder args={[0.018, 0.018, 0.28, 12]} position={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Gooseneck curve */}
                <Cylinder args={[0.015, 0.015, 0.2, 12]} position={[0, 0.26, 0.1]} rotation={[Math.PI / 2.2, 0, 0]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Spout end */}
                <Cylinder args={[0.012, 0.008, 0.05, 8]} position={[0, 0.17, 0.22]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Lever handle */}
                <Box args={[0.07, 0.015, 0.025]} position={[0, 0.3, -0.02]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Box>
            </group>

            {/* Upper cabinets - olive green */}
            <RigidBody type="fixed" position={[-12, 1.8, -9.65]}>
                <Box args={[6, 0.8, 0.4]} position={[0, 0.4, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
            </RigidBody>

            {/* Under-cabinet lighting strip */}
            <Box args={[5.8, 0.02, 0.1]} position={[-12, 1.62, -9.5]}>
                <meshStandardMaterial color="#FFFDE7" emissive="#FFFDE7" emissiveIntensity={0.3} />
            </Box>

            {/* === KITCHEN ISLAND WITH MARBLE TOP === */}
            <RigidBody type="fixed" position={[-12, 0, -6]}>
                {/* Island base - olive green */}
                <Box args={[3.5, 0.9, 1.2]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
                {/* Marble countertop - extends on one side */}
                <Box args={[3.8, 0.08, 1.5]} position={[0, 0.94, 0.15]}>
                    <meshStandardMaterial color="#F8F8F8" metalness={0.05} roughness={0.2} />
                </Box>
                {/* Marble side extension (for seating) */}
                <Box args={[0.15, 0.6, 1.5]} position={[-1.8, 0.6, 0.15]}>
                    <meshStandardMaterial color="#F0F0F0" metalness={0.05} roughness={0.2} />
                </Box>
            </RigidBody>

            {/* === BAR STOOLS (4 stools along island) === */}
            {[-13.2, -12.4, -11.6, -10.8].map((x, i) => (
                <group key={i} position={[x, 0, -5.2]}>
                    {/* Stool seat - wooden */}
                    <Cylinder args={[0.18, 0.2, 0.05, 16]} position={[0, 0.75, 0]}>
                        <meshStandardMaterial color="#8B6914" roughness={0.6} />
                    </Cylinder>
                    {/* Metal legs */}
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[-0.1, 0.38, -0.1]} rotation={[0.1, 0, 0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[0.1, 0.38, -0.1]} rotation={[0.1, 0, -0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[-0.1, 0.38, 0.1]} rotation={[-0.1, 0, 0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[0.1, 0.38, 0.1]} rotation={[-0.1, 0, -0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                </group>
            ))}

            {/* === PENDANT LIGHTS ABOVE ISLAND === */}
            {[-12.8, -11.2].map((x, i) => (
                <group key={i} position={[x, 2.5, -6]}>
                    {/* Cord */}
                    <Cylinder args={[0.008, 0.008, 0.5, 6]}>
                        <meshStandardMaterial color="#333333" />
                    </Cylinder>
                    {/* Dome shade */}
                    <Sphere args={[0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, -0.35, 0]}>
                        <meshStandardMaterial color="#757575" metalness={0.7} roughness={0.3} side={2} />
                    </Sphere>
                    {/* Light */}
                    <pointLight position={[0, -0.4, 0]} color="#FFF8E1" intensity={1.5} distance={4} />
                </group>
            ))}

            {/* === REALISTIC KITCHEN ITEMS ON BACK COUNTER === */}

            {/* Grocery bag with items peeking out */}
            <group position={[-14.5, 0.96, -9.35]}>
                {/* Paper bag */}
                <Box args={[0.2, 0.25, 0.12]} position={[0, 0.13, 0]}>
                    <meshStandardMaterial color="#C4A776" roughness={0.9} />
                </Box>
                {/* Celery sticking out */}
                <Cylinder args={[0.015, 0.015, 0.15, 6]} position={[-0.05, 0.3, 0]} rotation={[0.1, 0, 0.15]}>
                    <meshStandardMaterial color="#8BC34A" />
                </Cylinder>
                {/* Baguette sticking out */}
                <Cylinder args={[0.025, 0.02, 0.18, 8]} position={[0.05, 0.32, 0.02]} rotation={[-0.1, 0, -0.1]}>
                    <meshStandardMaterial color="#D4A574" roughness={0.7} />
                </Cylinder>
            </group>

            {/* Milk carton - PICKABLE */}
            <PickableItem position={[-13.8, 0.96, -9.4]} itemType="milk">
                <Box args={[0.08, 0.22, 0.08]} position={[0, 0.11, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                </Box>
                <Box args={[0.06, 0.03, 0.06]} position={[0, 0.23, 0]}>
                    <meshStandardMaterial color="#1976D2" />
                </Box>
                <Box args={[0.075, 0.1, 0.001]} position={[0, 0.1, 0.041]}>
                    <meshStandardMaterial color="#42A5F5" />
                </Box>
            </PickableItem>

            {/* Bread loaf - PICKABLE */}
            <PickableItem position={[-13.3, 0.96, -9.35]} itemType="bread">
                <Box args={[0.12, 0.1, 0.25]} position={[0, 0.05, 0]}>
                    <meshStandardMaterial color="#FFE0B2" transparent opacity={0.7} />
                </Box>
                <Box args={[0.1, 0.08, 0.22]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#D7A86E" roughness={0.8} />
                </Box>
                <Box args={[0.08, 0.01, 0.01]} position={[0, 0.08, 0.12]}>
                    <meshStandardMaterial color="#F44336" />
                </Box>
            </PickableItem>

            {/* Fruit bowl */}
            <group position={[-12.5, 0.96, -9.35]}>
                {/* Bowl */}
                <Cylinder args={[0.15, 0.12, 0.08, 16]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#ECEFF1" />
                </Cylinder>
                {/* Green Apple (static) */}
                <Sphere args={[0.04, 10, 10]} position={[0.04, 0.11, 0.03]}>
                    <meshStandardMaterial color="#43A047" roughness={0.4} />
                </Sphere>
                {/* Orange */}
                <Sphere args={[0.045, 10, 10]} position={[0, 0.13, -0.04]}>
                    <meshStandardMaterial color="#FF9800" roughness={0.5} />
                </Sphere>
                {/* Banana */}
                <Cylinder args={[0.02, 0.015, 0.12, 6]} position={[0.06, 0.1, -0.02]} rotation={[0.3, 0.5, 0.2]}>
                    <meshStandardMaterial color="#FFEB3B" roughness={0.6} />
                </Cylinder>
            </group>

            {/* Red apple - PICKABLE */}
            <PickableItem position={[-12.54, 1.08, -9.35]} itemType="apple">
                <Sphere args={[0.045, 10, 10]}>
                    <meshStandardMaterial color="#C62828" roughness={0.4} />
                </Sphere>
            </PickableItem>

            {/* Coffee maker */}
            <group position={[-11.8, 0.96, -9.45]}>
                {/* Base */}
                <Box args={[0.2, 0.05, 0.15]} position={[0, 0.025, 0]}>
                    <meshStandardMaterial color="#212121" />
                </Box>
                {/* Carafe */}
                <Cylinder args={[0.06, 0.05, 0.12, 12]} position={[0, 0.11, 0.02]}>
                    <meshStandardMaterial color="#111111" transparent opacity={0.8} />
                </Cylinder>
                {/* Top unit */}
                <Box args={[0.18, 0.15, 0.12]} position={[0, 0.13, -0.02]}>
                    <meshStandardMaterial color="#212121" />
                </Box>
            </group>

            {/* Cereal box - PICKABLE */}
            <PickableItem position={[-11.2, 0.96, -9.42]} itemType="cereal">
                <Box args={[0.06, 0.25, 0.18]} position={[0, 0.125, 0]}>
                    <meshStandardMaterial color="#FFC107" />
                </Box>
                <Box args={[0.001, 0.15, 0.12]} position={[0.031, 0.12, 0]}>
                    <meshStandardMaterial color="#FF5722" />
                </Box>
            </PickableItem>

            {/* Cutting board with knife */}
            <group position={[-10.5, 0.96, -9.38]}>
                <Box args={[0.25, 0.015, 0.18]} rotation={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#A1887F" roughness={0.7} />
                </Box>
                {/* Knife */}
                <Box args={[0.18, 0.003, 0.025]} position={[0.05, 0.015, 0.04]}>
                    <meshStandardMaterial color="#BDBDBD" metalness={0.8} />
                </Box>
                <Box args={[0.06, 0.012, 0.02]} position={[-0.06, 0.015, 0.04]}>
                    <meshStandardMaterial color="#5D4037" />
                </Box>
            </group>

            {/* Cooking oil bottle - PICKABLE */}
            <PickableItem position={[-9.9, 0.96, -9.42]} itemType="oil">
                <Cylinder args={[0.035, 0.035, 0.18, 12]} position={[0, 0.09, 0]}>
                    <meshStandardMaterial color="#FFEB3B" transparent opacity={0.7} />
                </Cylinder>
                <Cylinder args={[0.015, 0.015, 0.03, 8]} position={[0, 0.19, 0]}>
                    <meshStandardMaterial color="#795548" />
                </Cylinder>
            </PickableItem>

            {/* Spice jars */}
            {[-9.5, -9.3, -9.1].map((x, i) => (
                <group key={i} position={[x, 0.96, -9.42]}>
                    <Cylinder args={[0.025, 0.025, 0.08, 10]} position={[0, 0.04, 0]}>
                        <meshStandardMaterial color={['#8D6E63', '#F57C00', '#C62828'][i]} />
                    </Cylinder>
                    <Cylinder args={[0.027, 0.027, 0.015, 10]} position={[0, 0.085, 0]}>
                        <meshStandardMaterial color="#616161" metalness={0.7} />
                    </Cylinder>
                </group>
            ))}

            {/* === CHAI MAKING UTENSILS (On back counter near stove) === */}

            {/* Tea Kettle - PICKABLE - Large and visible */}
            <PickableItem position={[-15, 0.96, -9.4]} itemType="kettle">
                {/* Kettle body */}
                <Cylinder args={[0.12, 0.15, 0.2, 16]} position={[0, 0.1, 0]}>
                    <meshStandardMaterial color="#D4D4D4" metalness={0.95} roughness={0.05} />
                </Cylinder>
                {/* Lid */}
                <Cylinder args={[0.09, 0.1, 0.03, 16]} position={[0, 0.22, 0]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Lid knob */}
                <Sphere args={[0.025, 12, 12]} position={[0, 0.26, 0]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Sphere>
                {/* Spout */}
                <Cylinder args={[0.025, 0.035, 0.12, 10]} position={[0.16, 0.14, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <meshStandardMaterial color="#D4D4D4" metalness={0.95} />
                </Cylinder>
                {/* Handle */}
                <Box args={[0.03, 0.14, 0.03]} position={[-0.15, 0.12, 0]}>
                    <meshStandardMaterial color="#2a2a2a" />
                </Box>
            </PickableItem>

            {/* Chai Patila (Copper Pot) - PICKABLE */}
            <PickableItem position={[-14.3, 0.96, -9.4]} itemType="pot">
                {/* Pot body - copper colored */}
                <Cylinder args={[0.15, 0.12, 0.16, 16]} position={[0, 0.08, 0]}>
                    <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.2} />
                </Cylinder>
                {/* Pot rim */}
                <Cylinder args={[0.16, 0.16, 0.02, 16]} position={[0, 0.17, 0]}>
                    <meshStandardMaterial color="#CD7F32" metalness={0.7} />
                </Cylinder>
                {/* Handle left */}
                <Box args={[0.06, 0.03, 0.025]} position={[-0.18, 0.12, 0]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Box>
                {/* Handle right */}
                <Box args={[0.06, 0.03, 0.025]} position={[0.18, 0.12, 0]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Box>
            </PickableItem>

            {/* Eggs (3 eggs on tray) - PICKABLE */}
            <PickableItem position={[-13.6, 0.96, -9.4]} itemType="egg">
                {/* Egg tray */}
                <Box args={[0.18, 0.02, 0.1]} position={[0, 0.01, 0]}>
                    <meshStandardMaterial color="#D4C4A8" />
                </Box>
                {/* Egg 1 */}
                <Sphere args={[0.04, 12, 12]} scale={[1, 1.4, 1]} position={[-0.05, 0.07, 0]}>
                    <meshStandardMaterial color="#FFF8DC" roughness={0.5} />
                </Sphere>
                {/* Egg 2 */}
                <Sphere args={[0.04, 12, 12]} scale={[1, 1.4, 1]} position={[0.05, 0.07, 0]}>
                    <meshStandardMaterial color="#F5F5DC" roughness={0.5} />
                </Sphere>
            </PickableItem>

            {/* Tea Packet (Tapal/Lipton style) - PICKABLE */}
            <PickableItem position={[-13, 0.96, -9.4]} itemType="tea">
                <Box args={[0.12, 0.18, 0.06]} position={[0, 0.09, 0]}>
                    <meshStandardMaterial color="#8B0000" />
                </Box>
                {/* Gold label */}
                <Box args={[0.1, 0.12, 0.001]} position={[0, 0.09, 0.031]}>
                    <meshStandardMaterial color="#FFD700" metalness={0.3} />
                </Box>
            </PickableItem>

            {/* Frying Pan (Karahi) - PICKABLE */}
            <PickableItem position={[-12.3, 0.96, -9.4]} itemType="pan">
                {/* Pan base */}
                <Cylinder args={[0.18, 0.15, 0.06, 16]} position={[0, 0.03, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
                </Cylinder>
                {/* Pan inner */}
                <Cylinder args={[0.16, 0.13, 0.04, 16]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#2a2a2a" metalness={0.8} />
                </Cylinder>
                {/* Pan handle */}
                <Box args={[0.25, 0.025, 0.04]} position={[0.28, 0.04, 0]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Box>
            </PickableItem>

            {/* Roti/Chapati (Stack of 3) - PICKABLE */}
            <PickableItem position={[-11.6, 0.96, -9.4]} itemType="roti">
                {/* Roti 1 */}
                <Cylinder args={[0.12, 0.12, 0.015, 20]} position={[0, 0.008, 0]}>
                    <meshStandardMaterial color="#D4A574" roughness={0.9} />
                </Cylinder>
                {/* Roti 2 */}
                <Cylinder args={[0.11, 0.11, 0.015, 20]} position={[0.01, 0.023, 0.01]}>
                    <meshStandardMaterial color="#C49A6C" roughness={0.9} />
                </Cylinder>
                {/* Roti 3 */}
                <Cylinder args={[0.1, 0.1, 0.015, 20]} position={[-0.01, 0.038, -0.01]}>
                    <meshStandardMaterial color="#D4A574" roughness={0.9} />
                </Cylinder>
            </PickableItem>

            {/* === ITEMS ON KITCHEN ISLAND === */}

            {/* Coffee mug - PICKABLE */}
            <PickableItem position={[-12.5, 1.02, -6.2]} itemType="mug">
                <Cylinder args={[0.04, 0.035, 0.08, 12]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                </Cylinder>
                <Box args={[0.015, 0.04, 0.03]} position={[0.045, 0.04, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                </Box>
            </PickableItem>

            {/* Paper towel roll - PICKABLE */}
            <PickableItem position={[-11.5, 1.02, -6.3]} itemType="tissue">
                <Cylinder args={[0.05, 0.05, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#FAFAFA" />
                </Cylinder>
                <Cylinder args={[0.02, 0.02, 0.21, 8]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#A1887F" />
                </Cylinder>
            </PickableItem>

            {/* Cookie plate - PICKABLE */}
            <PickableItem position={[-10.8, 1.02, -6.2]} itemType="cookies">
                <Cylinder args={[0.1, 0.1, 0.015, 16]} position={[0, 0.008, 0]}>
                    <meshStandardMaterial color="#ECEFF1" />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.01, 10]} position={[-0.03, 0.02, 0]}>
                    <meshStandardMaterial color="#D4A574" roughness={0.8} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.01, 10]} position={[0.03, 0.02, 0.02]}>
                    <meshStandardMaterial color="#C49A6C" roughness={0.8} />
                </Cylinder>
                <Cylinder args={[0.025, 0.025, 0.01, 10]} position={[0, 0.025, -0.02]}>
                    <meshStandardMaterial color="#8D6E63" roughness={0.8} />
                </Cylinder>
            </PickableItem>

            {/* Glass of water */}
            <group position={[-13.2, 1.02, -6.15]}>
                <Cylinder args={[0.03, 0.025, 0.1, 12]} position={[0, 0.05, 0]}>
                    <meshStandardMaterial color="#E3F2FD" transparent opacity={0.4} />
                </Cylinder>
            </group>

            {/* === GUEST BEDROOM (East Wing) === */}
            {/* Only the outer east wall - entrance is from living room's east wall */}
            {/* Outer Walls - Expanded to x=\u00B114 */}
            {/* Outer Walls - Expanded to x=\u00B118 */}
            <Wall position={[18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            <Bed position={[12, 0, -3]} size="queen" color="#3366AA" />
            <Nightstand position={[10.8, 0, -2]} />
            <Nightstand position={[10.8, 0, -4]} />
            <Wardrobe position={[14, 0, -7]} />
            <Desk position={[10, 0, -8.5]} rotation={[0, -Math.PI / 2, 0]} />
            <Chair position={[10.8, 0, -8.5]} rotation={[0, Math.PI / 2, 0]} />

            {/* === GUEST BATHROOM (Near Guest Bedroom) === */}
            <Wall position={[8, 1.75, -9]} args={[4, 3.5, 0.2]} />
            <Door position={[6.5, 1.1, -9]} args={[0.8, 2.2, 0.1]} />

            <Toilet position={[9, 0, -9.5]} rotation={[0, Math.PI, 0]} />
            <Vanity position={[7, 0, -9.5]} />
            <ShowerCubicle position={[8.5, 0, -9.5]} />

            {/* CEILING - Expanded */}
            <Floor position={[0, 3.6, -2.5]} args={[36, 15]} color="#F5F5F0" />

            {/* ===== CEILING LIGHTS ===== */}
            <CeilingLight position={[0, 3.55, 3.5]} intensity={1} /> {/* Foyer */}
            <CeilingLight position={[0, 3.55, -4]} intensity={1.5} /> {/* Living Room */}
            <CeilingLight position={[-3, 3.55, 0]} intensity={1.2} /> {/* Dining (chandelier exists but add ambient) */}
            <CeilingLight position={[-14, 3.55, -7]} intensity={1.2} /> {/* Kitchen */}
            <CeilingLight position={[9, 3.55, -4]} intensity={0.8} /> {/* Guest Bedroom */}

            {/* Kitchen Ceiling Ventilation Fan */}
            <CeilingFan position={[-12, 3.5, -7]} speed={1.5} />

            {/* STAIRS to First Floor */}
            <Stairs position={[-4, 0, 3]} direction="up" steps={11} />
        </group >
    );
};
