import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

// --- LUXURY BED - More Realistic ---
export const LuxuryBed = ({ position, size = "queen", color = "#1a237e", frameColor = "#3E2723", rotation = [0, 0, 0] }) => {
    const width = size === "king" ? 2.2 : size === "queen" ? 1.8 : 1.5;
    const length = 2.2;

    return (
        <group position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Solid Wood Platform Base */}
                <Box args={[width + 0.1, 0.25, length + 0.1]} position={[0, 0.125, 0]}>
                    <meshStandardMaterial color={frameColor} roughness={0.5} metalness={0.1} />
                </Box>
                
                {/* Decorative base trim */}
                <Box args={[width + 0.15, 0.08, length + 0.15]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#2D2016" roughness={0.4} />
                </Box>
                
                {/* Sturdy wooden legs */}
                {[[-width / 2, -length / 2], [width / 2, -length / 2],
                [-width / 2, length / 2], [width / 2, length / 2]].map(([x, z], i) => (
                    <Box key={i} args={[0.08, 0.08, 0.08]} position={[x, 0.02, z]}>
                        <meshStandardMaterial color="#1a1a1a" metalness={0.3} />
                    </Box>
                ))}

                {/* Premium Mattress - layered for realism */}
                <Box args={[width - 0.05, 0.18, length - 0.05]} position={[0, 0.34, 0]}>
                    <meshStandardMaterial color="#F5F5F5" roughness={0.95} />
                </Box>
                {/* Mattress quilting texture simulation */}
                <Box args={[width - 0.08, 0.02, length - 0.08]} position={[0, 0.44, 0]}>
                    <meshStandardMaterial color="#FAFAFA" roughness={0.9} />
                </Box>

                {/* Fitted Sheet */}
                <Box args={[width - 0.06, 0.02, length - 0.2]} position={[0, 0.46, 0.05]}>
                    <meshStandardMaterial color="#E8E8E8" roughness={0.85} />
                </Box>

                {/* Duvet / Comforter with realistic folds */}
                <Box args={[width + 0.1, 0.12, length - 0.4]} position={[0, 0.52, 0.15]}>
                    <meshStandardMaterial color={color} roughness={0.85} />
                </Box>
                {/* Duvet fold at top */}
                <Box args={[width + 0.1, 0.08, 0.3]} position={[0, 0.48, -0.6]}>
                    <meshStandardMaterial color="#FAFAFA" roughness={0.9} />
                </Box>
                
                {/* Throw blanket at foot - textured */}
                <Box args={[width * 0.8, 0.04, 0.5]} position={[0, 0.56, 0.7]}>
                    <meshStandardMaterial color="#78909C" roughness={0.95} />
                </Box>
                {/* Blanket fringe detail */}
                <Box args={[width * 0.82, 0.02, 0.08]} position={[0, 0.55, 0.95]}>
                    <meshStandardMaterial color="#607D8B" roughness={1} />
                </Box>

                {/* Upholstered Tufted Headboard */}
                <Box args={[width + 0.3, 1.3, 0.18]} position={[0, 0.9, -length / 2 - 0.09]}>
                    <meshStandardMaterial color={color} roughness={0.75} />
                </Box>
                {/* Headboard padding effect */}
                <Box args={[width + 0.25, 1.2, 0.02]} position={[0, 0.92, -length / 2 + 0.01]}>
                    <meshStandardMaterial color={color} roughness={0.8} />
                </Box>
                
                {/* Diamond tufting pattern */}
                {[0, 1, 2, 3].map((row) => (
                    [-0.5, 0, 0.5].map((x, col) => (
                        <group key={`tuft-${row}-${col}`}>
                            <Sphere args={[0.025, 12, 12]} position={[x * (width / 1.5), 0.5 + row * 0.28, -length / 2]}>
                                <meshStandardMaterial color="#37474F" metalness={0.3} />
                            </Sphere>
                        </group>
                    ))
                ))}

                {/* Euro Pillows - Large back pillows */}
                <Box args={[width * 0.38, 0.35, 0.12]} position={[-width * 0.26, 0.62, -length / 2 + 0.28]} rotation={[0.25, 0, 0]}>
                    <meshStandardMaterial color="#ECEFF1" roughness={0.85} />
                </Box>
                <Box args={[width * 0.38, 0.35, 0.12]} position={[width * 0.26, 0.62, -length / 2 + 0.28]} rotation={[0.25, 0, 0]}>
                    <meshStandardMaterial color="#ECEFF1" roughness={0.85} />
                </Box>
                
                {/* Sleeping Pillows - Front */}
                <Box args={[width * 0.35, 0.22, 0.15]} position={[-width * 0.26, 0.58, -length / 2 + 0.48]} rotation={[0.15, 0.05, 0]}>
                    <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
                </Box>
                <Box args={[width * 0.35, 0.22, 0.15]} position={[width * 0.26, 0.58, -length / 2 + 0.48]} rotation={[0.15, -0.05, 0]}>
                    <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
                </Box>
                
                {/* Decorative Accent Pillows */}
                <Box args={[0.25, 0.25, 0.08]} position={[0, 0.58, -length / 2 + 0.55]} rotation={[0.1, 0.15, 0.05]}>
                    <meshStandardMaterial color="#455A64" roughness={0.8} />
                </Box>
            </RigidBody>
        </group>
    );
};

// --- MODERN WARDROBE ---
export const ModernWardrobe = ({ position, width = 2.0, height = 2.4, depth = 0.65, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Main Carcass */}
                <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
                    <meshStandardMaterial color="#3E2723" roughness={0.7} />
                </Box>

                {/* Trim/Frame */}
                <Box args={[width + 0.05, height + 0.05, depth - 0.1]} position={[0, height / 2, 0]}>
                    <meshStandardMaterial color="#212121" metalness={0.5} roughness={0.4} />
                </Box>

                {/* Sliding Doors */}
                {/* Left Door - Wood/Matte */}
                <Box args={[width / 2 + 0.02, height - 0.1, 0.04]} position={[-width / 4, height / 2, depth / 2 + 0.02]}>
                    <meshStandardMaterial color="#5D4037" roughness={0.6} />
                </Box>
                {/* Right Door - Mirror */}
                <Box args={[width / 2 + 0.02, height - 0.1, 0.04]} position={[width / 4, height / 2, depth / 2 + 0.06]}>
                    <meshStandardMaterial color="#E0F7FA" metalness={0.9} roughness={0.05} />
                </Box>

                {/* Handles */}
                <Box args={[0.02, 0.4, 0.02]} position={[-0.1, height / 2, depth / 2 + 0.05]}>
                    <meshStandardMaterial color="#111" metalness={0.8} />
                </Box>
                <Box args={[0.02, 0.4, 0.02]} position={[0.1, height / 2, depth / 2 + 0.09]}>
                    <meshStandardMaterial color="#111" metalness={0.8} />
                </Box>
            </RigidBody>
        </group>
    );
};

// --- GAMING DESK SETUP ---
export const GamingDesk = ({ position, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Desk Surface - Carbon Fiber look */}
                <Box args={[1.6, 0.08, 0.8]} position={[0, 0.75, 0]}>
                    <meshStandardMaterial color="#111111" roughness={0.4} />
                </Box>
                {/* Legs - Z shape or sturdy metal */}
                <Box args={[0.08, 0.75, 0.6]} position={[-0.7, 0.375, 0]}>
                    <meshStandardMaterial color="#CC0000" metalness={0.6} />
                </Box>
                <Box args={[0.08, 0.75, 0.6]} position={[0.7, 0.375, 0]}>
                    <meshStandardMaterial color="#CC0000" metalness={0.6} />
                </Box>
                {/* Crossbar */}
                <Box args={[1.4, 0.05, 0.05]} position={[0, 0.4, -0.2]}>
                    <meshStandardMaterial color="#222" />
                </Box>

                {/* Mousepad - Extended RGB */}
                <Box args={[1.4, 0.005, 0.5]} position={[0, 0.795, 0.1]}>
                    <meshStandardMaterial color="#1a1a1a" />
                </Box>
                <Box args={[1.42, 0.004, 0.52]} position={[0, 0.792, 0.1]}>
                    <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.8} />
                </Box>
            </RigidBody>

            {/* PC Tower - Glass side panel & RGB */}
            <group position={[0.6, 1.05, 0.2]}>
                <RigidBody type="fixed">
                    <Box args={[0.22, 0.5, 0.45]}>
                        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
                    </Box>
                    {/* RGB Fans inside */}
                    <Cylinder args={[0.05, 0.05, 0.02, 12]} position={[-0.11, 0, -0.1]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial color="#FF00FF" emissive="#FF00FF" emissiveIntensity={2} />
                    </Cylinder>
                    <Cylinder args={[0.05, 0.05, 0.02, 12]} position={[-0.11, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={2} />
                    </Cylinder>
                </RigidBody>
            </group>

            {/* Monitors - Dual Setup */}
            <group position={[0, 0.79, -0.15]}>
                {/* Main Monitor */}
                <group position={[0, 0.25, 0.1]}>
                    <Box args={[0.6, 0.35, 0.02]}>
                        <meshStandardMaterial color="#000" />
                    </Box>
                    <Box args={[0.58, 0.33, 0.01]} position={[0, 0, 0.01]}>
                        <meshStandardMaterial color="#1a237e" emissive="#283593" emissiveIntensity={0.5} />
                    </Box>
                    {/* Stand */}
                    <Box args={[0.05, 0.15, 0.05]} position={[0, -0.2, -0.05]} rotation={[-0.2, 0, 0]}>
                        <meshStandardMaterial color="#222" />
                    </Box>
                </group>
                {/* Secondary Monitor - Vertical or Angled */}
                <group position={[-0.65, 0.25, 0.2]} rotation={[0, 0.3, 0]}>
                    <Box args={[0.6, 0.35, 0.02]}>
                        <meshStandardMaterial color="#000" />
                    </Box>
                    <Box args={[0.58, 0.33, 0.01]} position={[0, 0, 0.01]}>
                        <meshStandardMaterial color="#222" />
                    </Box>
                    <Box args={[0.05, 0.15, 0.05]} position={[0, -0.2, -0.05]}>
                        <meshStandardMaterial color="#222" />
                    </Box>
                </group>
            </group>

            {/* Peripherals */}
            <RigidBody type="fixed">
                {/* Keyboard */}
                <Box args={[0.45, 0.02, 0.15]} position={[0, 0.81, 0.2]}>
                    <meshStandardMaterial color="#111" />
                </Box>
                {/* Backlight */}
                <Box args={[0.45, 0.01, 0.15]} position={[0, 0.815, 0.2]}>
                    <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} transparent opacity={0.2} />
                </Box>

                {/* Mouse */}
                <Box args={[0.08, 0.03, 0.12]} position={[0.35, 0.81, 0.2]}>
                    <meshStandardMaterial color="#111" />
                </Box>
            </RigidBody>

            {/* Ambient LED Strip behind desk */}
            <pointLight position={[0, 0.8, -0.4]} color="#aa00ff" intensity={1} distance={2} />
        </group>
    );
};

// --- MODERN CHAIR ---
export const ModernChair = ({ position, rotation = [0, 0, 0], color = "#212121" }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Star Base */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
                <Box key={i} args={[0.35, 0.05, 0.05]} position={[Math.cos(angle * Math.PI / 180) * 0.2, 0.05, Math.sin(angle * Math.PI / 180) * 0.2]} rotation={[0, -angle * Math.PI / 180, 0]}>
                    <meshStandardMaterial color="#DDD" metalness={0.8} />
                </Box>
            ))}
            {/* Center Piston */}
            <Cylinder args={[0.04, 0.04, 0.4, 8]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#111" />
            </Cylinder>

            {/* Seat */}
            <Box args={[0.5, 0.1, 0.5]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color={color} />
            </Box>

            {/* Ergonomic Backrest */}
            <Box args={[0.45, 0.6, 0.05]} position={[0, 0.8, -0.2]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Headrest */}
            <Box args={[0.3, 0.15, 0.05]} position={[0, 1.2, -0.2]}>
                <meshStandardMaterial color={color} />
            </Box>

            {/* Armrests */}
            <Box args={[0.05, 0.3, 0.3]} position={[-0.25, 0.65, 0]}>
                <meshStandardMaterial color="#111" />
            </Box>
            <Box args={[0.05, 0.3, 0.3]} position={[0.25, 0.65, 0]}>
                <meshStandardMaterial color="#111" />
            </Box>
        </RigidBody>
    </group>
);

// --- BUNK BED (Updated) ---
export const BunkBed = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Frame Structure - Colorful for kids */}
        {/* Posts */}
        {[[-0.6, -1], [-0.6, 1], [0.6, -1], [0.6, 1]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.05, 0.05, 2.4, 8]} position={[x, 1.2, z]}>
                <meshStandardMaterial color="#FFA000" />
            </Cylinder>
        ))}

        {/* Bottom Bunk */}
        <Box args={[1.3, 0.2, 2.1]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#F57C00" />
        </Box>
        <Box args={[1.2, 0.15, 2.0]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#FFF" />{/* Mattress */}
        </Box>
        <Box args={[1.25, 0.05, 1.5]} position={[0, 0.5, 0.2]}>
            <meshStandardMaterial color="#1976D2" />{/* Blanket */}
        </Box>

        {/* Top Bunk */}
        <Box args={[1.3, 0.2, 2.1]} position={[0, 1.6, 0]}>
            <meshStandardMaterial color="#F57C00" />
        </Box>
        <Box args={[1.2, 0.15, 2.0]} position={[0, 1.75, 0]}>
            <meshStandardMaterial color="#FFF" />{/* Mattress */}
        </Box>
        <Box args={[1.25, 0.05, 1.5]} position={[0, 1.8, 0.2]}>
            <meshStandardMaterial color="#C62828" />{/* Blanket */}
        </Box>

        {/* Safety Rails Top */}
        <Box args={[1.3, 0.4, 0.05]} position={[0, 1.9, -1.05]}>
            <meshStandardMaterial color="#FFA000" />
        </Box>
        <Box args={[1.3, 0.4, 0.05]} position={[0, 1.9, 1.05]}>
            <meshStandardMaterial color="#FFA000" />
        </Box>

        {/* Ladder */}
        <group position={[0.7, 0, 0.5]}>
            <Cylinder args={[0.03, 0.03, 2.4, 8]} position={[0, 1.2, -0.2]}>
                <meshStandardMaterial color="#5D4037" />
            </Cylinder>
            <Cylinder args={[0.03, 0.03, 2.4, 8]} position={[0, 1.2, 0.2]}>
                <meshStandardMaterial color="#5D4037" />
            </Cylinder>
            {[0.4, 0.8, 1.2, 1.6, 2.0].map((y, i) => (
                <Box key={i} args={[0.05, 0.05, 0.4]} position={[0, y, 0]}>
                    <meshStandardMaterial color="#5D4037" />
                </Box>
            ))}
        </group>
    </RigidBody>
);


// --- DECOR ---
export const ModernLamp = ({ position }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {/* Weighted base - brushed metal */}
            <Cylinder args={[0.1, 0.12, 0.03, 20]} position={[0, 0.015, 0]}>
                <meshStandardMaterial color="#37474F" metalness={0.7} roughness={0.3} />
            </Cylinder>
            {/* Base detail ring */}
            <Cylinder args={[0.11, 0.11, 0.008, 20]} position={[0, 0.035, 0]}>
                <meshStandardMaterial color="#263238" metalness={0.8} roughness={0.2} />
            </Cylinder>
            {/* Stem - brushed nickel */}
            <Cylinder args={[0.018, 0.018, 0.32, 12]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#90A4AE" metalness={0.85} roughness={0.15} />
            </Cylinder>
            {/* Stem joint/detail */}
            <Sphere args={[0.025, 12, 12]} position={[0, 0.36, 0]}>
                <meshStandardMaterial color="#78909C" metalness={0.8} roughness={0.2} />
            </Sphere>
        </RigidBody>
        {/* Fabric Shade - tapered drum style */}
        <Cylinder args={[0.12, 0.16, 0.22, 24, 1, true]} position={[0, 0.48, 0]}>
            <meshStandardMaterial color="#FFF8E1" side={2} transparent opacity={0.85} roughness={0.9} />
        </Cylinder>
        {/* Shade top rim */}
        <Cylinder args={[0.12, 0.12, 0.01, 24]} position={[0, 0.59, 0]}>
            <meshStandardMaterial color="#E0E0E0" roughness={0.8} />
        </Cylinder>
        {/* Shade bottom rim */}
        <Cylinder args={[0.16, 0.16, 0.01, 24]} position={[0, 0.37, 0]}>
            <meshStandardMaterial color="#E0E0E0" roughness={0.8} />
        </Cylinder>
        {/* Warm glow */}
        <pointLight position={[0, 0.48, 0]} color="#FFF3E0" intensity={0.8} distance={4} />
    </group>
);

export const PlantPot = ({ position, scale = 1 }) => (
    <group position={position} scale={[scale, scale, scale]}>
        <RigidBody type="fixed">
            {/* Modern ceramic pot */}
            <Cylinder args={[0.18, 0.14, 0.28, 16]} position={[0, 0.14, 0]}>
                <meshStandardMaterial color="#ECEFF1" roughness={0.4} />
            </Cylinder>
            {/* Pot rim */}
            <Cylinder args={[0.19, 0.18, 0.03, 16]} position={[0, 0.29, 0]}>
                <meshStandardMaterial color="#E0E0E0" roughness={0.3} />
            </Cylinder>
            {/* Pot base */}
            <Cylinder args={[0.12, 0.14, 0.02, 16]} position={[0, 0.01, 0]}>
                <meshStandardMaterial color="#BDBDBD" roughness={0.5} />
            </Cylinder>
            {/* Rich soil */}
            <Cylinder args={[0.16, 0.16, 0.04, 16]} position={[0, 0.26, 0]}>
                <meshStandardMaterial color="#3E2723" roughness={0.95} />
            </Cylinder>
            {/* Decorative pebbles on soil */}
            {[[-0.06, 0.05], [0.08, 0.02], [0, -0.06], [-0.04, -0.03]].map(([x, z], i) => (
                <Sphere key={i} args={[0.02, 8, 8]} position={[x, 0.29, z]}>
                    <meshStandardMaterial color="#9E9E9E" roughness={0.7} />
                </Sphere>
            ))}
        </RigidBody>
        {/* Realistic Plant - Snake Plant / Sansevieria style */}
        {[0, 0.8, 1.6, 2.4, 3.2].map((angle, i) => (
            <group key={i} rotation={[0, angle, 0]}>
                <Box args={[0.06, 0.45 + i * 0.08, 0.015]} position={[0.05 * (i % 2 === 0 ? 1 : -1), 0.5 + i * 0.04, 0]} rotation={[0.1 * (i % 2 === 0 ? 1 : -1), 0, 0.05 * (i % 2 === 0 ? 1 : -1)]}>
                    <meshStandardMaterial color="#2E7D32" roughness={0.7} />
                </Box>
                {/* Yellow edge detail */}
                <Box args={[0.005, 0.43 + i * 0.08, 0.016]} position={[0.05 * (i % 2 === 0 ? 1 : -1) + 0.03, 0.5 + i * 0.04, 0]} rotation={[0.1 * (i % 2 === 0 ? 1 : -1), 0, 0.05 * (i % 2 === 0 ? 1 : -1)]}>
                    <meshStandardMaterial color="#C0CA33" roughness={0.6} />
                </Box>
            </group>
        ))}
    </group>
);

export const WallArt = ({ position, rotation = [0, 0, 0], args = [1, 1.2], color = "#333" }) => (
    <group position={position} rotation={rotation}>
        {/* Elegant frame - multiple layers for depth */}
        <Box args={[args[0] + 0.1, args[1] + 0.1, 0.06]}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
        </Box>
        {/* Inner frame detail */}
        <Box args={[args[0] + 0.06, args[1] + 0.06, 0.02]} position={[0, 0, 0.025]}>
            <meshStandardMaterial color="#424242" roughness={0.4} />
        </Box>
        {/* Mat/passepartout */}
        <Box args={[args[0] + 0.02, args[1] + 0.02, 0.01]} position={[0, 0, 0.035]}>
            <meshStandardMaterial color="#FAFAFA" roughness={0.9} />
        </Box>
        {/* Canvas/artwork */}
        <Box args={[args[0] - 0.08, args[1] - 0.08, 0.02]} position={[0, 0, 0.04]}>
            <meshStandardMaterial color={color} roughness={0.6} />
        </Box>
        {/* Glass reflection simulation */}
        <Box args={[args[0] - 0.02, args[1] - 0.02, 0.003]} position={[0, 0, 0.055]}>
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.08} metalness={0.9} roughness={0.1} />
        </Box>
    </group>
);

// --- RE-EXPORT BASIC ITEMS NEEDED FOR COMPATIBILITY OR EXTENSION ---
export const Nightstand = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Main body - solid wood */}
        <Box args={[0.5, 0.52, 0.42]} position={[0, 0.26, 0]}>
            <meshStandardMaterial color="#4E342E" roughness={0.6} />
        </Box>
        {/* Top surface - slightly larger */}
        <Box args={[0.54, 0.025, 0.46]} position={[0, 0.535, 0]}>
            <meshStandardMaterial color="#5D4037" roughness={0.5} />
        </Box>
        {/* Top edge trim */}
        <Box args={[0.52, 0.015, 0.44]} position={[0, 0.51, 0]}>
            <meshStandardMaterial color="#3E2723" roughness={0.55} />
        </Box>
        {/* Drawer - recessed */}
        <Box args={[0.44, 0.16, 0.03]} position={[0, 0.32, 0.21]}>
            <meshStandardMaterial color="#6D4C41" roughness={0.65} />
        </Box>
        {/* Drawer detail lines */}
        <Box args={[0.42, 0.005, 0.01]} position={[0, 0.38, 0.225]}>
            <meshStandardMaterial color="#3E2723" roughness={0.5} />
        </Box>
        <Box args={[0.42, 0.005, 0.01]} position={[0, 0.26, 0.225]}>
            <meshStandardMaterial color="#3E2723" roughness={0.5} />
        </Box>
        {/* Modern handle - bar style */}
        <Box args={[0.12, 0.015, 0.02]} position={[0, 0.32, 0.24]}>
            <meshStandardMaterial color="#9E9E9E" metalness={0.85} roughness={0.15} />
        </Box>
        {/* Lower shelf/cubby */}
        <Box args={[0.46, 0.015, 0.38]} position={[0, 0.1, 0]}>
            <meshStandardMaterial color="#5D4037" roughness={0.6} />
        </Box>
        {/* Legs - tapered */}
        {[[-0.22, -0.18], [0.22, -0.18], [-0.22, 0.18], [0.22, 0.18]].map(([x, z], i) => (
            <Box key={i} args={[0.04, 0.06, 0.04]} position={[x, 0.03, z]}>
                <meshStandardMaterial color="#3E2723" roughness={0.5} />
            </Box>
        ))}
    </RigidBody>
);

export const Desk = ({ position, rotation = [0, 0, 0] }) => (
    // Simple desk re-export if needed, or replace with GamingDesk
    <GamingDesk position={position} rotation={rotation} />
);

export const Chair = ({ position, rotation = [0, 0, 0] }) => (
    // Simple chair re-export or replacement
    <ModernChair position={position} rotation={rotation} />
);

export const Bed = ({ position, size, color }) => (
    <LuxuryBed position={position} size={size} color={color} />
);

export const Wardrobe = ({ position }) => (
    <ModernWardrobe position={position} />
);

export const FilingCabinet = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.5, 1.2, 0.6]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#9E9E9E" metalness={0.4} />
        </Box>
        {[0.2, 0.5, 0.8, 1.1].map((y, i) => (
            <Box key={i} args={[0.4, 0.25, 0.02]} position={[0, y, 0.3]}>
                <meshStandardMaterial color="#E0E0E0" />
            </Box>
        ))}
    </RigidBody>
);

export const PCSetup = ({ position }) => (
    // Deprecated in favor of integrated GamingDesk, but keeping for compatibility if referenced elsewhere
    <group position={position} visible={false} />
);
