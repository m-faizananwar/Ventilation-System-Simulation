import React from 'react';
import { DoubleSide } from 'three';

const COLORS = {
    floorWood: '#8B5A2B',
    floorTile: '#E0E0E0',
    wallWhite: '#F5F5F5',
    wallAccent: '#708090',
    ceiling: '#FFFFFF',
    roof: '#2F4F4F',
    glass: '#ADD8E6',
    door: '#8B4513',
    frame: '#333333',
    grass: '#4caf50',
};

function Wall({ position, args, color = COLORS.wallWhite, rotation = [0, 0, 0], opacity = 1, transparent = false }) {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} opacity={opacity} transparent={transparent} />
        </mesh>
    );
}

function Floor({ position, args, color = COLORS.floorWood }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={args} />
            <meshStandardMaterial color={color} side={DoubleSide} />
        </mesh>
    )
}

function Window({ position, args }) {
    return (
        <group position={position}>
            {/* Frame */}
            <mesh>
                <boxGeometry args={[args[0], args[1], 0.2]} />
                <meshStandardMaterial color={COLORS.frame} />
            </mesh>
            {/* Glass */}
            <mesh>
                <boxGeometry args={[args[0] - 0.2, args[1] - 0.2, 0.1]} />
                <meshStandardMaterial color={COLORS.glass} opacity={0.3} transparent />
            </mesh>
        </group>
    )
}

function Door({ position, args, open = false }) {
    return (
        <group position={position}>
            {/* Frame */}
            <mesh position={[0, args[1] / 2, 0]}>
                <boxGeometry args={[args[0] + 0.2, args[1] + 0.2, 0.3]} />
                <meshStandardMaterial color={COLORS.frame} />
            </mesh>
            {/* Door Panel */}
            <mesh position={[open ? args[0] / 2 : 0, args[1] / 2, 0]} rotation={[0, open ? Math.PI / 2 : 0, 0]}>
                <boxGeometry args={[args[0], args[1], 0.1]} />
                <meshStandardMaterial color={COLORS.door} />
            </mesh>
        </group>
    )
}

function Stairs({ position, steps = 10, height = 5, width = 2, length = 5 }) {
    const stepHeight = height / steps;
    const stepLength = length / steps;

    return (
        <group position={position}>
            {Array.from({ length: steps }).map((_, i) => (
                <mesh key={i} position={[0, i * stepHeight + stepHeight / 2, i * stepLength]}>
                    <boxGeometry args={[width, stepHeight, stepLength]} />
                    <meshStandardMaterial color={COLORS.floorWood} />
                </mesh>
            ))}
        </group>
    )
}

export function House(props) {
    return (
        <group {...props}>
            {/* ================= GROUND FLOOR ================= */}
            <group position={[0, 0, 0]}>
                {/* Floor */}
                <Floor position={[0, 0.01, 0]} args={[20, 20]} color={COLORS.floorWood} />
                <Floor position={[15, 0.01, 0]} args={[10, 20]} color={COLORS.floorTile} /> {/* Garage/Kitchen */}

                {/* Ceiling */}
                <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[40, 20]} />
                    <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
                </mesh>

                {/* Walls */}
                <Wall position={[-10, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Left */}
                <Wall position={[20, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Right */}
                <Wall position={[5, 2.5, -10]} args={[30, 5, 0.5]} color={COLORS.wallWhite} /> {/* Back */}

                {/* Front Wall with Door and Window */}
                <Wall position={[-5, 2.5, 10]} args={[10, 5, 0.5]} color={COLORS.wallAccent} />
                <Wall position={[10, 2.5, 10]} args={[20, 5, 0.5]} color={COLORS.wallAccent} />
                <Wall position={[2.5, 4, 10]} args={[5, 2, 0.5]} color={COLORS.wallAccent} />

                {/* Main Door */}
                <Door position={[2.5, 0, 10]} args={[3, 4]} />

                {/* Living Room Window */}
                <Window position={[-5, 2.5, 10]} args={[4, 3]} />

                {/* Interior Walls */}
                <Wall position={[5, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Separating Garage/Kitchen */}

                {/* Garage Door */}
                <Door position={[15, 0, 10]} args={[8, 4]} />

                {/* Stairs to First Floor */}
                <Stairs position={[-8, 0, -5]} steps={15} height={5} width={3} length={8} />
            </group>

            {/* ================= FIRST FLOOR ================= */}
            <group position={[0, 5, 0]}>
                {/* Floor */}
                <Floor position={[0, 0.01, 0]} args={[20, 20]} color={COLORS.floorWood} />

                {/* Ceiling */}
                <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
                </mesh>

                {/* Walls */}
                <Wall position={[-10, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Left */}
                <Wall position={[10, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Right */}
                <Wall position={[0, 2.5, -10]} args={[20, 5, 0.5]} color={COLORS.wallWhite} /> {/* Back */}
                <Wall position={[0, 2.5, 10]} args={[20, 5, 0.5]} color={COLORS.wallAccent} /> {/* Front */}

                {/* Windows */}
                <Window position={[-5, 2.5, 10]} args={[3, 3]} />
                <Window position={[5, 2.5, 10]} args={[3, 3]} />

                {/* Interior Walls (Bedrooms) */}
                <Wall position={[0, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Divider */}

                {/* Stairs to Roof */}
                <Stairs position={[-8, 0, -5]} steps={15} height={5} width={3} length={8} />
            </group>

            {/* ================= ROOFTOP ================= */}
            <group position={[0, 10, 0]}>
                {/* Floor */}
                <Floor position={[0, 0.01, 0]} args={[20, 20]} color="#555" />

                {/* Railings */}
                <Wall position={[-10, 0.5, 0]} args={[0.2, 1, 20]} color="#333" />
                <Wall position={[10, 0.5, 0]} args={[0.2, 1, 20]} color="#333" />
                <Wall position={[0, 0.5, 10]} args={[20, 1, 0.2]} color="#333" />
                <Wall position={[0, 0.5, -10]} args={[20, 1, 0.2]} color="#333" />

                {/* Rooftop Garden / Seating */}
                <FurnitureBox position={[5, 0.5, 5]} args={[4, 1, 4]} color={COLORS.grass} /> {/* Planter */}
                <FurnitureBox position={[-5, 0.5, 5]} args={[2, 0.5, 2]} color={COLORS.furnitureDark} /> {/* Seat */}
            </group>

            {/* ================= GARDEN ================= */}
            <group position={[0, 0, 20]}>
                {/* Flower Beds */}
                <FurnitureBox position={[-15, 0.2, 0]} args={[8, 0.4, 8]} color={COLORS.grass} />
                <FurnitureBox position={[25, 0.2, 0]} args={[8, 0.4, 8]} color={COLORS.grass} />

                {/* Flowers */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh key={i} position={[-15 + (Math.random() - 0.5) * 6, 0.5, (Math.random() - 0.5) * 6]}>
                        <sphereGeometry args={[0.2]} />
                        <meshStandardMaterial color={Math.random() > 0.5 ? "red" : "yellow"} />
                    </mesh>
                ))}
            </group>

        </group>
    );
}

function FurnitureBox({ position, args, color }) {
    return (
        <mesh position={position}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
