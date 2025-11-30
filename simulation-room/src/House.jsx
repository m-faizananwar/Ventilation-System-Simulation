import React from 'react';
import { DoubleSide } from 'three';

// Modern Luxury Colors
const COLORS = {
    floorWood: '#8B5A2B', // Oak/Teak
    floorTile: '#E0E0E0', // White Marble
    wallWhite: '#F5F5F5', // Off-white
    wallAccent: '#708090', // Slate Grey
    ceiling: '#FFFFFF',
    furnitureDark: '#2F4F4F', // Dark Slate Grey
    furnitureLight: '#D3D3D3', // Light Grey
    wood: '#A0522D', // Sienna
    glass: '#ADD8E6', // Light Blue transparent-ish
};

function Wall({ position, args, color = COLORS.wallWhite, rotation = [0, 0, 0] }) {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
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

function FurnitureBox({ position, args, color }) {
    return (
        <mesh position={position}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export function House(props) {
    return (
        <group {...props}>
            {/* --- LIVING ROOM (Central) --- */}
            {/* Floor (20x20) */}
            <Floor position={[0, 0.01, 0]} args={[20, 20]} color={COLORS.floorWood} />

            {/* Ceiling */}
            <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
            </mesh>

            {/* Walls */}
            <Wall position={[-10, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Left */}
            <Wall position={[10, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Right */}
            <Wall position={[0, 2.5, 10]} args={[20, 5, 0.5]} color={COLORS.wallAccent} /> {/* Front (Entrance side) */}
            <Wall position={[0, 2.5, -10]} args={[20, 5, 0.5]} color={COLORS.wallWhite} /> {/* Back */}

            {/* Entrance Doorway */}
            <mesh position={[0, 2, 10.1]}>
                <boxGeometry args={[4, 4, 0.6]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Furniture: Sofa */}
            <FurnitureBox position={[0, 0.5, -5]} args={[6, 1, 2]} color={COLORS.furnitureDark} />
            <FurnitureBox position={[-3.5, 0.75, -5]} args={[1, 1.5, 2]} color={COLORS.furnitureDark} />
            <FurnitureBox position={[3.5, 0.75, -5]} args={[1, 1.5, 2]} color={COLORS.furnitureDark} />
            <FurnitureBox position={[0, 1.25, -6]} args={[6, 1.5, 0.5]} color={COLORS.furnitureDark} />

            {/* Furniture: Coffee Table */}
            <FurnitureBox position={[0, 0.5, -2]} args={[3, 0.5, 2]} color={COLORS.wood} />

            {/* --- KITCHEN (Right Side) --- */}
            <group position={[15, 0, 0]}>
                <Floor position={[0, 0.01, 0]} args={[10, 20]} color={COLORS.floorTile} />
                {/* Ceiling */}
                <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 20]} />
                    <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
                </mesh>

                {/* Walls */}
                <Wall position={[5, 2.5, 0]} args={[0.5, 5, 20]} color={COLORS.wallWhite} /> {/* Far Right */}
                <Wall position={[0, 2.5, -10]} args={[10, 5, 0.5]} color={COLORS.wallWhite} /> {/* Back */}
                <Wall position={[0, 2.5, 10]} args={[10, 5, 0.5]} color={COLORS.wallWhite} /> {/* Front */}

                {/* Kitchen Island */}
                <FurnitureBox position={[0, 1, 0]} args={[3, 2, 6]} color={COLORS.wallAccent} />
                <FurnitureBox position={[0, 2.05, 0]} args={[3.2, 0.1, 6.2]} color="white" /> {/* Countertop */}
            </group>

            {/* --- BEDROOM (Left Side) --- */}
            <group position={[-15, 0, -5]}>
                <Floor position={[0, 0.01, 0]} args={[10, 10]} color={COLORS.floorWood} />
                {/* Ceiling */}
                <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
                </mesh>

                {/* Walls */}
                <Wall position={[-5, 2.5, 0]} args={[0.5, 5, 10]} color={COLORS.wallAccent} /> {/* Far Left */}
                <Wall position={[0, 2.5, -5]} args={[10, 5, 0.5]} color={COLORS.wallWhite} /> {/* Back */}
                <Wall position={[0, 2.5, 5]} args={[10, 5, 0.5]} color={COLORS.wallWhite} /> {/* Front (Door wall) */}

                {/* Doorway */}
                <mesh position={[2, 2, 5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[3, 4, 1]} />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* Bed */}
                <FurnitureBox position={[0, 0.5, -2]} args={[4, 1, 5]} color={COLORS.furnitureLight} />
                <FurnitureBox position={[0, 1, -4]} args={[4, 1, 0.5]} color={COLORS.wood} /> {/* Headboard */}
            </group>

            {/* --- BATHROOM (Left Side, Front) --- */}
            <group position={[-15, 0, 5]}>
                <Floor position={[0, 0.01, 0]} args={[10, 10]} color={COLORS.floorTile} />
                {/* Ceiling */}
                <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <meshStandardMaterial color={COLORS.ceiling} side={DoubleSide} />
                </mesh>

                {/* Walls */}
                <Wall position={[-5, 2.5, 0]} args={[0.5, 5, 10]} color={COLORS.wallWhite} /> {/* Far Left */}
                <Wall position={[0, 2.5, 5]} args={[10, 5, 0.5]} color={COLORS.wallWhite} /> {/* Front */}
                <Wall position={[5, 2.5, 0]} args={[0.5, 5, 10]} color={COLORS.wallWhite} /> {/* Right (Shared with Living) */}

                {/* Doorway */}
                <mesh position={[2, 2, -5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[3, 4, 1]} />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* Bathtub */}
                <FurnitureBox position={[-3, 0.75, 0]} args={[2, 1.5, 4]} color="white" />
            </group>

        </group>
    );
}
