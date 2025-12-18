import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

// --- LUXURY BED ---
export const LuxuryBed = ({ position, size = "queen", color = "#1a237e", frameColor = "#3E2723" }) => {
    const width = size === "king" ? 2.2 : size === "queen" ? 1.8 : 1.5;
    const length = 2.2;
    const height = 0.5;

    return (
        <group position={position}>
            <RigidBody type="fixed">
                {/* Platform Base with legs */}
                <Box args={[width, 0.2, length]} position={[0, 0.2, 0]}>
                    <meshStandardMaterial color={frameColor} roughness={0.6} />
                </Box>
                {[[-width / 2 + 0.1, -length / 2 + 0.1], [width / 2 - 0.1, -length / 2 + 0.1],
                [-width / 2 + 0.1, length / 2 - 0.1], [width / 2 - 0.1, length / 2 - 0.1]].map(([x, z], i) => (
                    <Cylinder key={i} args={[0.04, 0.03, 0.2, 8]} position={[x, 0.05, z]}>
                        <meshStandardMaterial color="#212121" metalness={0.8} />
                    </Cylinder>
                ))}

                {/* Thick Mattress */}
                <Box args={[width - 0.1, 0.25, length - 0.1]} position={[0, 0.425, 0]}>
                    <meshStandardMaterial color="#EEEEEE" roughness={0.8} />
                </Box>

                {/* Duvet / Comforter (Draped effect simulated by slightly larger top layer) */}
                <Box args={[width, 0.15, length]} position={[0, 0.48, 0.05]}>
                    <meshStandardMaterial color={color} roughness={0.9} />
                </Box>
                {/* Folded Throw Blanket at foot */}
                <Box args={[width + 0.05, 0.05, 0.8]} position={[0, 0.56, 0.6]}>
                    <meshStandardMaterial color="#BDBDBD" roughness={1} />
                </Box>

                {/* Tufted Headboard */}
                <Box args={[width + 0.2, 1.2, 0.15]} position={[0, 0.8, -length / 2 - 0.075]}>
                    <meshStandardMaterial color={color} roughness={0.8} />
                </Box>
                {/* Tufting buttons detail */}
                {[0, 1, 2].map((row) => (
                    [-0.6, -0.3, 0, 0.3, 0.6].map((x, col) => (
                        <Sphere key={`${row}-${col}`} args={[0.02, 8, 8]} position={[x * (width / 1.6), 0.5 + row * 0.3, -length / 2]} >
                            <meshStandardMaterial color="#0d1b5e" />
                        </Sphere>
                    ))
                ))}

                {/* Pillows - Plump and layered */}
                {/* Back row */}
                <Box args={[width * 0.4, 0.3, 0.15]} position={[-width * 0.25, 0.65, -length / 2 + 0.3]} rotation={[0.2, 0, 0]}>
                    <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
                </Box>
                <Box args={[width * 0.4, 0.3, 0.15]} position={[width * 0.25, 0.65, -length / 2 + 0.3]} rotation={[0.2, 0, 0]}>
                    <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
                </Box>
                {/* Front row - Decorative */}
                <Box args={[width * 0.3, 0.2, 0.1]} position={[-width * 0.25, 0.6, -length / 2 + 0.5]} rotation={[0.1, 0, 0.1]}>
                    <meshStandardMaterial color="#BDBDBD" />
                </Box>
                <Box args={[width * 0.3, 0.2, 0.1]} position={[width * 0.25, 0.6, -length / 2 + 0.5]} rotation={[0.1, 0, -0.1]}>
                    <meshStandardMaterial color="#BDBDBD" />
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
            <Cylinder args={[0.08, 0.1, 0.05, 16]} position={[0, 0.025, 0]}>
                <meshStandardMaterial color="#212121" />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 0.3, 8]} position={[0, 0.15, 0]}>
                <meshStandardMaterial color="#B0BEC5" metalness={0.8} />
            </Cylinder>
        </RigidBody>
        {/* Shade */}
        <Cylinder args={[0.15, 0.2, 0.25, 16, 1, true]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#FAFAFA" side={2} transparent opacity={0.9} />
        </Cylinder>
        <pointLight position={[0, 0.4, 0]} color="#FFF8E1" intensity={0.5} distance={3} />
    </group>
);

export const PlantPot = ({ position, scale = 1 }) => (
    <group position={position} scale={[scale, scale, scale]}>
        <RigidBody type="fixed">
            {/* Pot */}
            <Cylinder args={[0.2, 0.15, 0.3, 12]} position={[0, 0.15, 0]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Cylinder>
            {/* Soil */}
            <Cylinder args={[0.18, 0.18, 0.02, 12]} position={[0, 0.28, 0]}>
                <meshStandardMaterial color="#3E2723" />
            </Cylinder>
        </RigidBody>
        {/* Leaves (Simple localized geometry) */}
        {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, 0.5, 0]} rotation={[0.5, i * Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.02]} />
                <meshStandardMaterial color="#4CAF50" />
            </mesh>
        ))}
    </group>
);

export const WallArt = ({ position, rotation = [0, 0, 0], args = [1, 1.2], color = "#333" }) => (
    <group position={position} rotation={rotation}>
        {/* Frame */}
        <Box args={[args[0] + 0.05, args[1] + 0.05, 0.04]}>
            <meshStandardMaterial color="#212121" />
        </Box>
        {/* Canvas */}
        <Box args={[args[0], args[1], 0.05]} position={[0, 0, 0.01]}>
            <meshStandardMaterial color={color} />
        </Box>
    </group>
);

// --- RE-EXPORT BASIC ITEMS NEEDED FOR COMPATIBILITY OR EXTENSION ---
export const Nightstand = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.5, 0.5, 0.4]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        <Box args={[0.45, 0.15, 0.38]} position={[0, 0.3, 0.02]}>
            <meshStandardMaterial color="#4E342E" />{/* Drawer */}
        </Box>
        <Box args={[0.04, 0.04, 0.02]} position={[0, 0.3, 0.2]}>
            <meshStandardMaterial color="#FFD700" metalness={0.8} />{/* Knob */}
        </Box>
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
