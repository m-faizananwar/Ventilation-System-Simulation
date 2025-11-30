import React from 'react';
import { DoubleSide } from 'three';

// Colors from sample.scss
const COLORS = {
    bg1: '#181a19',
    green1: '#546b5a',
    green5: '#111419',
    white1: '#dfddd6',
    neon: '#abf1f1',
    red1: '#e02e24',
    blue1: '#1896de',
};

function Wall({ position, args, color = COLORS.white1, rotation = [0, 0, 0] }) {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function Floor({ position, args, color = COLORS.green5 }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={args} />
            <meshStandardMaterial color={color} side={DoubleSide} />
        </mesh>
    )
}

export function House(props) {
    return (
        <group {...props}>
            {/* --- ENTRANCE HALL --- */}
            {/* Floor */}
            <Floor position={[0, 0.01, 5]} args={[10, 10]} color={COLORS.green5} />

            {/* Walls */}
            <Wall position={[-5, 2.5, 5]} args={[0.5, 5, 10]} color={COLORS.green1} /> {/* Left */}
            <Wall position={[5, 2.5, 5]} args={[0.5, 5, 10]} color={COLORS.green1} /> {/* Right */}
            <Wall position={[0, 2.5, 10]} args={[10, 5, 0.5]} color={COLORS.green1} /> {/* Front (Entrance) */}

            {/* Doorway to Living Room */}
            <Wall position={[-3.5, 2.5, 0]} args={[3, 5, 0.5]} color={COLORS.green1} />
            <Wall position={[3.5, 2.5, 0]} args={[3, 5, 0.5]} color={COLORS.green1} />
            <Wall position={[0, 4, 0]} args={[4, 2, 0.5]} color={COLORS.green1} />

            {/* --- LIVING ROOM --- */}
            {/* Floor */}
            <Floor position={[0, 0.01, -5]} args={[20, 10]} color={COLORS.bg1} />

            {/* Walls */}
            <Wall position={[-10, 2.5, -5]} args={[0.5, 5, 10]} color={COLORS.white1} /> {/* Left */}
            <Wall position={[10, 2.5, -5]} args={[0.5, 5, 10]} color={COLORS.white1} /> {/* Right */}
            <Wall position={[0, 2.5, -10]} args={[20, 5, 0.5]} color={COLORS.white1} /> {/* Back */}

            {/* Ceiling (for both) */}
            <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color={COLORS.green5} side={DoubleSide} />
            </mesh>

            {/* --- DECOR / FURNITURE --- */}
            {/* Neon Light Strip */}
            <mesh position={[0, 4.5, -9.9]}>
                <boxGeometry args={[18, 0.1, 0.1]} />
                <meshBasicMaterial color={COLORS.neon} />
            </mesh>

            {/* Table */}
            <mesh position={[0, 1, -5]}>
                <cylinderGeometry args={[2, 2, 0.2, 32]} />
                <meshStandardMaterial color={COLORS.red1} />
            </mesh>
            <mesh position={[0, 0.5, -5]}>
                <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Art Piece */}
            <mesh position={[-9.9, 2.5, -5]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[3, 3]} />
                <meshStandardMaterial color={COLORS.blue1} emissive={COLORS.blue1} emissiveIntensity={0.5} />
            </mesh>

        </group>
    );
}
