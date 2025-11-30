import React from 'react';
import { DoubleSide } from 'three';

// Premium Palace Colors
const COLORS = {
    floor: '#1a1a1a', // Dark marble
    wall: '#f5f5dc', // Beige/Cream
    ceiling: '#111419', // Dark
    gold: '#ffd700', // Gold accents
    red: '#8b0000', // Royal Red
    pillar: '#e0e0e0', // Marble white
    neon: '#abf1f1', // Subtle neon
};

function Wall({ position, args, color = COLORS.wall, rotation = [0, 0, 0] }) {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function Floor({ position, args, color = COLORS.floor }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={args} />
            <meshStandardMaterial color={color} side={DoubleSide} roughness={0.1} metalness={0.1} />
        </mesh>
    )
}

function Pillar({ position }) {
    return (
        <group position={position}>
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 10, 32]} />
                <meshStandardMaterial color={COLORS.pillar} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[2, 1, 2]} />
                <meshStandardMaterial color={COLORS.gold} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 9.5, 0]}>
                <boxGeometry args={[2, 1, 2]} />
                <meshStandardMaterial color={COLORS.gold} metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    )
}

export function House(props) {
    return (
        <group {...props}>
            {/* --- GRAND HALL --- */}
            {/* Floor (40x60) */}
            <Floor position={[0, 0.01, 0]} args={[40, 60]} color={COLORS.floor} />

            {/* Ceiling */}
            <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[40, 60]} />
                <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
            </mesh>

            {/* Walls */}
            <Wall position={[-20, 5, 0]} args={[1, 10, 60]} color={COLORS.wall} /> {/* Left */}
            <Wall position={[20, 5, 0]} args={[1, 10, 60]} color={COLORS.wall} /> {/* Right */}
            <Wall position={[0, 5, 30]} args={[40, 10, 1]} color={COLORS.wall} /> {/* Entrance Wall */}
            <Wall position={[0, 5, -30]} args={[40, 10, 1]} color={COLORS.wall} /> {/* Back Wall (Throne) */}

            {/* Entrance Doorway */}
            <mesh position={[0, 3, 30.1]}>
                <boxGeometry args={[8, 6, 0.5]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Pillars (Rows) */}
            {Array.from({ length: 6 }).map((_, i) => (
                <React.Fragment key={i}>
                    <Pillar position={[-12, 0, -20 + i * 8]} />
                    <Pillar position={[12, 0, -20 + i * 8]} />
                </React.Fragment>
            ))}

            {/* --- THRONE AREA --- */}
            <group position={[0, 0, -25]}>
                {/* Platform */}
                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[10, 2, 6]} />
                    <meshStandardMaterial color={COLORS.red} />
                </mesh>
                {/* Steps */}
                <mesh position={[0, 0.25, 4]}>
                    <boxGeometry args={[10, 0.5, 2]} />
                    <meshStandardMaterial color={COLORS.red} />
                </mesh>

                {/* Throne Chair */}
                <mesh position={[0, 3, 0]}>
                    <boxGeometry args={[2, 3, 2]} />
                    <meshStandardMaterial color={COLORS.gold} metalness={1} roughness={0.1} />
                </mesh>
                <mesh position={[0, 4.5, -0.9]}>
                    <boxGeometry args={[2, 4, 0.2]} />
                    <meshStandardMaterial color={COLORS.gold} metalness={1} roughness={0.1} />
                </mesh>
            </group>

            {/* --- DECOR --- */}
            {/* Red Carpet */}
            <mesh position={[0, 0.02, 5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[6, 45]} />
                <meshStandardMaterial color={COLORS.red} />
            </mesh>

            {/* Chandeliers / Lights */}
            <pointLight position={[0, 8, 0]} intensity={0.8} distance={20} color={COLORS.gold} />
            <pointLight position={[0, 8, 15]} intensity={0.8} distance={20} color={COLORS.gold} />
            <pointLight position={[0, 8, -15]} intensity={0.8} distance={20} color={COLORS.gold} />

        </group>
    );
}
