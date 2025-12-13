import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Fan } from './Fan';
import { Sensor } from './Sensor';
import * as THREE from 'three';

const MATERIALS = {
    // Wood materials
    floorWood: new THREE.MeshStandardMaterial({
        color: '#8B5A2B',
        roughness: 0.8,
        metalness: 0.1,
    }),
    darkWood: new THREE.MeshStandardMaterial({
        color: '#4A2511',
        roughness: 0.6,
        metalness: 0.05,
    }),
    
    // Wall materials
    wallWhite: new THREE.MeshStandardMaterial({
        color: '#F5F5F5',
        roughness: 0.9,
        metalness: 0.0,
    }),
    wallAccent: new THREE.MeshStandardMaterial({
        color: '#D4C5B9',
        roughness: 0.85,
        metalness: 0.0,
    }),
    
    // Ceiling
    ceiling: new THREE.MeshStandardMaterial({
        color: '#FAFAFA',
        roughness: 0.95,
        metalness: 0.0,
    }),
    
    // Glass
    glass: new THREE.MeshPhysicalMaterial({
        color: '#ADD8E6',
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
    }),
    
    // Metal
    metal: new THREE.MeshStandardMaterial({
        color: '#8C8C8C',
        roughness: 0.3,
        metalness: 0.9,
    }),
    
    // Fabrics
    fabricGray: new THREE.MeshStandardMaterial({
        color: '#696969',
        roughness: 0.95,
        metalness: 0.0,
    }),
    fabricBeige: new THREE.MeshStandardMaterial({
        color: '#D2B48C',
        roughness: 0.95,
        metalness: 0.0,
    }),
    fabricBlue: new THREE.MeshStandardMaterial({
        color: '#4682B4',
        roughness: 0.9,
        metalness: 0.0,
    }),
    
    // Marble
    marble: new THREE.MeshStandardMaterial({
        color: '#F0F0F0',
        roughness: 0.2,
        metalness: 0.1,
    }),
    
    // Carpet
    carpet: new THREE.MeshStandardMaterial({
        color: '#8B7355',
        roughness: 1.0,
        metalness: 0.0,
    }),
    
    // Door
    door: new THREE.MeshStandardMaterial({
        color: '#654321',
        roughness: 0.6,
        metalness: 0.1,
    }),
};

function Wall({ position, args, material = MATERIALS.wallWhite, rotation = [0, 0, 0] }) {
    return (
        <mesh position={position} rotation={rotation} material={material} receiveShadow castShadow>
            <boxGeometry args={args} />
        </mesh>
    );
}

function Floor({ position, args, material = MATERIALS.floorWood, rotation = [-Math.PI / 2, 0, 0] }) {
    return (
        <mesh position={position} rotation={rotation} material={material} receiveShadow>
            <planeGeometry args={args} />
        </mesh>
    );
}

function Window({ position, rotation = [0, 0, 0] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Frame */}
            <mesh material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[2.5, 3, 0.2]} />
            </mesh>
            {/* Glass Panes */}
            <mesh position={[0, 0.75, 0]} material={MATERIALS.glass}>
                <boxGeometry args={[2.3, 1.4, 0.05]} />
            </mesh>
            <mesh position={[0, -0.75, 0]} material={MATERIALS.glass}>
                <boxGeometry args={[2.3, 1.4, 0.05]} />
            </mesh>
            {/* Divider */}
            <mesh position={[0, 0, 0]} material={MATERIALS.darkWood}>
                <boxGeometry args={[2.5, 0.1, 0.15]} />
            </mesh>
        </group>
    );
}

function Door({ position, rotation = [0, 0, 0], open = false }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Door Frame */}
            <mesh position={[0, 2, 0]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[1.2, 4, 0.2]} />
            </mesh>
            {/* Door Panel */}
            <mesh 
                position={[open ? 0.5 : 0, 2, 0.1]} 
                rotation={[0, open ? Math.PI / 2 : 0, 0]} 
                material={MATERIALS.door}
                castShadow
            >
                <boxGeometry args={[1, 3.8, 0.1]} />
            </mesh>
            {/* Door Handle */}
            <mesh position={[open ? 0.5 : 0.4, 2, 0.2]} material={MATERIALS.metal}>
                <cylinderGeometry args={[0.05, 0.05, 0.3]} />
            </mesh>
        </group>
    );
}

// Realistic Sofa
function Sofa({ position, rotation = [0, 0, 0] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Base */}
            <mesh position={[0, 0.3, 0]} material={MATERIALS.fabricGray} castShadow>
                <boxGeometry args={[3, 0.6, 1.2]} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.9, -0.5]} material={MATERIALS.fabricGray} castShadow>
                <boxGeometry args={[3, 1.2, 0.2]} />
            </mesh>
            {/* Left Armrest */}
            <mesh position={[-1.4, 0.7, 0]} material={MATERIALS.fabricGray} castShadow>
                <boxGeometry args={[0.2, 1, 1.2]} />
            </mesh>
            {/* Right Armrest */}
            <mesh position={[1.4, 0.7, 0]} material={MATERIALS.fabricGray} castShadow>
                <boxGeometry args={[0.2, 1, 1.2]} />
            </mesh>
            {/* Cushions */}
            {[-0.8, 0, 0.8].map((x, i) => (
                <mesh key={i} position={[x, 0.65, 0]} material={MATERIALS.fabricBeige} castShadow>
                    <boxGeometry args={[0.7, 0.15, 0.7]} />
                </mesh>
            ))}
        </group>
    );
}

// Coffee Table
function CoffeeTable({ position }) {
    return (
        <group position={position}>
            {/* Table Top */}
            <mesh position={[0, 0.5, 0]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[2, 0.1, 1]} />
            </mesh>
            {/* Legs */}
            {[[-0.85, -0.35], [0.85, -0.35], [-0.85, 0.35], [0.85, 0.35]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.25, z]} material={MATERIALS.darkWood} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 0.5]} />
                </mesh>
            ))}
        </group>
    );
}

// Dining Table
function DiningTable({ position }) {
    return (
        <group position={position}>
            {/* Table Top */}
            <mesh position={[0, 1.2, 0]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[3, 0.1, 1.5]} />
            </mesh>
            {/* Legs */}
            {[[-1.3, -0.65], [1.3, -0.65], [-1.3, 0.65], [1.3, 0.65]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.6, z]} material={MATERIALS.darkWood} castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 1.2]} />
                </mesh>
            ))}
        </group>
    );
}

// Chair
function Chair({ position, rotation = [0, 0, 0] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Seat */}
            <mesh position={[0, 0.7, 0]} material={MATERIALS.fabricBlue} castShadow>
                <boxGeometry args={[0.6, 0.1, 0.6]} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 1.2, -0.25]} material={MATERIALS.fabricBlue} castShadow>
                <boxGeometry args={[0.6, 1, 0.1]} />
            </mesh>
            {/* Legs */}
            {[[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.35, z]} material={MATERIALS.darkWood} castShadow>
                    <cylinderGeometry args={[0.04, 0.04, 0.7]} />
                </mesh>
            ))}
        </group>
    );
}

// TV Stand
function TVStand({ position }) {
    return (
        <group position={position}>
            {/* Main Cabinet */}
            <mesh position={[0, 0.4, 0]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[3, 0.8, 0.6]} />
            </mesh>
            {/* TV Screen */}
            <mesh position={[0, 1.5, -0.25]} material={MATERIALS.metal}>
                <boxGeometry args={[2, 1.2, 0.1]} />
            </mesh>
            <mesh position={[0, 1.5, -0.2]}>
                <planeGeometry args={[1.8, 1]} />
                <meshStandardMaterial color="#000" emissive="#111" />
            </mesh>
        </group>
    );
}

// Bookshelf
function Bookshelf({ position }) {
    const bookColors = ['#8B0000', '#00008B', '#006400', '#8B4513', '#4B0082'];
    return (
        <group position={position}>
            {/* Main Structure */}
            <mesh material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[2, 3, 0.5]} />
            </mesh>
            {/* Shelves */}
            {[0, 1, 2].map((level) => (
                <mesh key={level} position={[0, -1 + level * 1, 0]} material={MATERIALS.darkWood} castShadow>
                    <boxGeometry args={[1.9, 0.05, 0.45]} />
                </mesh>
            ))}
            {/* Books */}
            {Array.from({ length: 15 }).map((_, i) => (
                <mesh 
                    key={i} 
                    position={[
                        -0.8 + (i % 5) * 0.4,
                        -0.7 + Math.floor(i / 5) * 1,
                        0.1
                    ]}
                    castShadow
                >
                    <boxGeometry args={[0.3, 0.8, 0.15]} />
                    <meshStandardMaterial color={bookColors[i % bookColors.length]} />
                </mesh>
            ))}
        </group>
    );
}

// Kitchen Counter
function KitchenCounter({ position }) {
    return (
        <group position={position}>
            {/* Counter Top */}
            <mesh position={[0, 1.3, 0]} material={MATERIALS.marble} castShadow>
                <boxGeometry args={[6, 0.1, 1]} />
            </mesh>
            {/* Cabinets */}
            <mesh position={[0, 0.65, 0]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[6, 1.3, 1]} />
            </mesh>
            {/* Upper Cabinets */}
            <mesh position={[0, 2.5, -0.4]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[6, 1.5, 0.5]} />
            </mesh>
            {/* Sink */}
            <mesh position={[1, 1.4, 0]} material={MATERIALS.metal}>
                <boxGeometry args={[0.8, 0.3, 0.6]} />
            </mesh>
        </group>
    );
}

// Bed
function Bed({ position, rotation = [0, 0, 0] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Mattress */}
            <mesh position={[0, 0.6, 0]} material={MATERIALS.fabricBeige} castShadow>
                <boxGeometry args={[2.5, 0.4, 3.5]} />
            </mesh>
            {/* Headboard */}
            <mesh position={[0, 1.2, -1.7]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[2.5, 1.6, 0.2]} />
            </mesh>
            {/* Bed Frame */}
            <mesh position={[0, 0.2, 0]} material={MATERIALS.darkWood} castShadow>
                <boxGeometry args={[2.6, 0.4, 3.6]} />
            </mesh>
            {/* Pillows */}
            {[-0.6, 0.6].map((x, i) => (
                <mesh key={i} position={[x, 0.85, -1.3]} material={MATERIALS.fabricBlue} castShadow>
                    <boxGeometry args={[0.6, 0.2, 0.4]} />
                </mesh>
            ))}
        </group>
    );
}

// Lamp
function Lamp({ position }) {
    return (
        <group position={position}>
            {/* Base */}
            <mesh position={[0, 0.1, 0]} material={MATERIALS.metal} castShadow>
                <cylinderGeometry args={[0.15, 0.15, 0.05]} />
            </mesh>
            {/* Pole */}
            <mesh position={[0, 0.5, 0]} material={MATERIALS.metal} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.8]} />
            </mesh>
            {/* Shade */}
            <mesh position={[0, 1, 0]} material={MATERIALS.fabricBeige} castShadow>
                <cylinderGeometry args={[0.3, 0.2, 0.4]} />
            </mesh>
            {/* Light */}
            <pointLight position={[0, 0.9, 0]} intensity={0.5} distance={5} color="#FFF8DC" castShadow />
        </group>
    );
}

// Carpet/Rug
function Rug({ position, size = [4, 3] }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={size} />
            <meshStandardMaterial {...MATERIALS.carpet} />
        </mesh>
    );
}

export function House({ fanOn, sensors, ...props }) {
    return (
        <group {...props}>
            <RigidBody type="fixed" colliders="cuboid">
                {/* ================= GROUND FLOOR ================= */}
                <group position={[0, 0, 0]}>
                    {/* Floor */}
                    <Floor position={[0, 0.01, 0]} args={[20, 20]} material={MATERIALS.floorWood} />
                    
                    {/* Ceiling */}
                    <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.ceiling} receiveShadow>
                        <planeGeometry args={[20, 20]} />
                    </mesh>

                    {/* Walls */}
                    <Wall position={[-10, 2.5, 0]} args={[0.3, 5, 20]} material={MATERIALS.wallWhite} />
                    <Wall position={[10, 2.5, 0]} args={[0.3, 5, 20]} material={MATERIALS.wallWhite} />
                    <Wall position={[0, 2.5, -10]} args={[20, 5, 0.3]} material={MATERIALS.wallWhite} />
                    
                    {/* Front Wall with Door Opening */}
                    <Wall position={[-6, 2.5, 10]} args={[8, 5, 0.3]} material={MATERIALS.wallAccent} />
                    <Wall position={[6, 2.5, 10]} args={[8, 5, 0.3]} material={MATERIALS.wallAccent} />
                    <Wall position={[0, 4.2, 10]} args={[4, 1.6, 0.3]} material={MATERIALS.wallAccent} />
                    
                    {/* Interior Walls */}
                    <Wall position={[0, 2.5, 0]} args={[0.3, 5, 10]} material={MATERIALS.wallWhite} /> {/* Living/Kitchen Divider */}
                    <Wall position={[-5, 2.5, 5]} args={[10, 5, 0.3]} material={MATERIALS.wallWhite} /> {/* Bedroom Wall */}
                </group>
            </RigidBody>

            {/* Non-Physics Elements */}
            <group>
                {/* ================= ENTRANCE ================= */}
                <Door position={[0, 0, 10]} open={true} />
                <Window position={[-7, 2.5, 10]} />
                <Window position={[7, 2.5, 10]} />
                
                {/* ================= LIVING ROOM ================= */}
                <Rug position={[-3, 0.02, 0]} size={[6, 5]} />
                <Sofa position={[-4, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
                <CoffeeTable position={[-2, 0, 0]} />
                <TVStand position={[-7, 0, 0]} />
                <Lamp position={[-1, 0, -3]} />
                <Lamp position={[-7, 0, -3]} />
                
                {/* ================= DINING AREA ================= */}
                <DiningTable position={[3, 0, -5]} />
                <Chair position={[1.5, 0, -5]} rotation={[0, Math.PI / 2, 0]} />
                <Chair position={[4.5, 0, -5]} rotation={[0, -Math.PI / 2, 0]} />
                <Chair position={[3, 0, -6.2]} />
                <Chair position={[3, 0, -3.8]} rotation={[0, Math.PI, 0]} />
                
                {/* ================= KITCHEN ================= */}
                <KitchenCounter position={[5, 0, 5]} />
                
                {/* ================= BEDROOM ================= */}
                <Bed position={[-5, 0, 7]} rotation={[0, -Math.PI / 2, 0]} />
                <Bookshelf position={[-8, 1.5, 7]} />
                <Lamp position={[-3, 0, 8.5]} />
                
                {/* Windows */}
                <Window position={[-10, 2.5, -5]} rotation={[0, Math.PI / 2, 0]} />
                <Window position={[-10, 2.5, 5]} rotation={[0, Math.PI / 2, 0]} />
                <Window position={[10, 2.5, -5]} rotation={[0, -Math.PI / 2, 0]} />
                <Window position={[10, 2.5, 5]} rotation={[0, -Math.PI / 2, 0]} />
                
                {/* ================= VENTILATION SYSTEM ================= */}
                <Fan position={[8, 4.5, 8]} rotation={[0, -Math.PI / 2, 0]} isOn={fanOn} />
                <Fan position={[-8, 4.5, -8]} rotation={[0, Math.PI / 2, 0]} isOn={fanOn} />
                <Fan position={[0, 4.8, 0]} rotation={[Math.PI / 2, 0, 0]} isOn={fanOn} />
                
                {/* ================= SENSORS ================= */}
                <Sensor position={[-9.7, 2.5, -7]} rotation={[0, Math.PI / 2, 0]} type="co2" value={sensors.co2} label="CO2" />
                <Sensor position={[-9.7, 2.5, -5]} rotation={[0, Math.PI / 2, 0]} type="pm25" value={sensors.pm25} label="PM2.5" />
                <Sensor position={[-9.7, 2.5, -3]} rotation={[0, Math.PI / 2, 0]} type="smog" value={sensors.smog} label="Smog" />
            </group>
        </group>
    );
}