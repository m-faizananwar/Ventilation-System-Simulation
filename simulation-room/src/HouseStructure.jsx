import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Cylinder } from '@react-three/drei';

// ============================================
// IMPROVED STRUCTURE COMPONENTS
// ============================================

// Interior Wall Colors
const INTERIOR_WALL_COLOR = '#FAF9F6'; // Off-white / Warm white
const EXTERIOR_WALL_COLOR = '#F5E6C8'; // Cream / Beige
const TRIM_COLOR = '#FFFFFF'; // Pure white for trim
const WOOD_TRIM_COLOR = '#5C4033'; // Dark wood brown

// Floor Colors by Room Type
export const FLOOR_COLORS = {
    living: '#D4A574', // Warm wood
    bedroom: '#C9A86C', // Lighter wood
    bathroom: '#E0E0E0', // Light tile
    kitchen: '#BFBFBF', // Gray tile
    basement: '#555555', // Concrete
    carpet: '#8B7355', // Carpet brown
};

// Base Wall Component with improved materials
export const Wall = ({
    position,
    args,
    color = INTERIOR_WALL_COLOR,
    rotation = [0, 0, 0],
    opacity = 1,
    exterior = false
}) => {
    const wallColor = exterior ? EXTERIOR_WALL_COLOR : color;
    return (
        <RigidBody type="fixed" colliders="cuboid">
            <Box args={args} position={position} rotation={rotation} castShadow receiveShadow>
                <meshStandardMaterial
                    color={wallColor}
                    transparent={opacity < 1}
                    opacity={opacity}
                    roughness={exterior ? 0.9 : 0.7}
                />
            </Box>
        </RigidBody>
    );
};

// Exterior Wall with foundation detail
export const ExteriorWall = ({ position, args, color = EXTERIOR_WALL_COLOR }) => {
    const [width, height, depth] = args;
    const foundationHeight = 0.3;

    return (
        <group position={position}>
            {/* Main wall */}
            <RigidBody type="fixed" colliders="cuboid">
                <Box args={args} position={[0, 0, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color={color} roughness={0.85} />
                </Box>
            </RigidBody>
            {/* Foundation strip at bottom */}
            <Box
                args={[width + 0.1, foundationHeight, depth + 0.1]}
                position={[0, -height / 2 + foundationHeight / 2, 0]}
            >
                <meshStandardMaterial color="#555555" roughness={0.95} />
            </Box>
        </group>
    );
};

// Improved Floor Component with better colors
export const Floor = ({
    position,
    args,
    color = FLOOR_COLORS.living,
    rotation = [-Math.PI / 2, 0, 0],
    type = 'living' // 'living', 'bedroom', 'bathroom', 'kitchen', 'basement'
}) => {
    const floorColor = FLOOR_COLORS[type] || color;
    return (
        <RigidBody type="fixed" colliders="cuboid">
            <Box args={[args[0], args[1], 0.2]} position={position} rotation={rotation} receiveShadow>
                <meshStandardMaterial color={floorColor} roughness={0.85} />
            </Box>
        </RigidBody>
    );
};

// Door with Frame - looks like a real door with trim
export const Door = ({
    position,
    args = [1, 2.2, 0.1],
    color = '#6B4423', // Rich wood color
    frameColor = TRIM_COLOR
}) => {
    const [width, height, depth] = args;
    const frameWidth = 0.08;

    return (
        <group position={position}>
            {/* Door frame - top */}
            <Box args={[width + frameWidth * 2, frameWidth, depth + 0.02]} position={[0, height / 2, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.5} />
            </Box>
            {/* Door frame - left */}
            <Box args={[frameWidth, height, depth + 0.02]} position={[-width / 2 - frameWidth / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.5} />
            </Box>
            {/* Door frame - right */}
            <Box args={[frameWidth, height, depth + 0.02]} position={[width / 2 + frameWidth / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.5} />
            </Box>
            {/* Door panel */}
            <Box args={args} position={[0, 0, 0]} castShadow>
                <meshStandardMaterial color={color} roughness={0.6} />
            </Box>
            {/* Door knob */}
            <mesh position={[width / 2 - 0.12, 0, depth / 2 + 0.02]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Door panels (decorative grooves) */}
            <Box args={[width * 0.35, height * 0.25, 0.02]} position={[-width * 0.2, height * 0.25, depth / 2 + 0.01]}>
                <meshStandardMaterial color={color} roughness={0.5} />
            </Box>
            <Box args={[width * 0.35, height * 0.25, 0.02]} position={[width * 0.2, height * 0.25, depth / 2 + 0.01]}>
                <meshStandardMaterial color={color} roughness={0.5} />
            </Box>
            <Box args={[width * 0.35, height * 0.25, 0.02]} position={[-width * 0.2, -height * 0.2, depth / 2 + 0.01]}>
                <meshStandardMaterial color={color} roughness={0.5} />
            </Box>
            <Box args={[width * 0.35, height * 0.25, 0.02]} position={[width * 0.2, -height * 0.2, depth / 2 + 0.01]}>
                <meshStandardMaterial color={color} roughness={0.5} />
            </Box>
        </group>
    );
};

// Interactive Door - with open/close animation and E key interaction
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const InteractiveDoor = ({
    position,
    args = [2, 2.8, 0.1], // Bigger door by default
    color = '#6B4423',
    frameColor = TRIM_COLOR,
    interactionDistance = 3,
    onOpenChange,
}) => {
    const [width, height, depth] = args;
    const frameWidth = 0.1;
    const [isOpen, setIsOpen] = useState(false);
    const [isNearby, setIsNearby] = useState(false);
    const doorRef = useRef();
    const groupRef = useRef();
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);

    // Check proximity and handle E key
    useFrame(() => {
        if (!groupRef.current) return;

        const doorPos = groupRef.current.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(doorPos);

        const wasNearby = isNearby;
        const nowNearby = distance < interactionDistance;

        if (nowNearby !== wasNearby) {
            setIsNearby(nowNearby);
        }

        // Handle E key press
        const { interact } = getKeys();
        if (nowNearby && interact && !lastInteract.current) {
            setIsOpen(prev => !prev);
            if (onOpenChange) onOpenChange(!isOpen);
        }
        lastInteract.current = interact;
    });

    // Animate door rotation
    useFrame((_, delta) => {
        if (!doorRef.current) return;
        const targetRotation = isOpen ? -Math.PI / 2 : 0;
        doorRef.current.rotation.y += (targetRotation - doorRef.current.rotation.y) * delta * 5;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Door frame (stays fixed) */}
            <Box args={[width + frameWidth * 2 + 0.2, frameWidth * 1.5, depth + 0.1]} position={[0, height / 2 + frameWidth / 2, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.4} />
            </Box>
            <Box args={[frameWidth, height, depth + 0.1]} position={[-width / 2 - frameWidth / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.4} />
            </Box>
            <Box args={[frameWidth, height, depth + 0.1]} position={[width / 2 + frameWidth / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.4} />
            </Box>

            {/* Door panel (rotates from hinge side) */}
            <group ref={doorRef} position={[-width / 2, 0, 0]}>
                <Box args={[width, height, depth]} position={[width / 2, 0, 0]} castShadow>
                    <meshStandardMaterial color={color} roughness={0.5} />
                </Box>
                {/* Door knob */}
                <mesh position={[width - 0.15, 0, depth / 2 + 0.03]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Knob on other side */}
                <mesh position={[width - 0.15, 0, -depth / 2 - 0.03]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Decorative panels */}
                <Box args={[width * 0.4, height * 0.28, 0.02]} position={[width * 0.3, height * 0.22, depth / 2 + 0.01]}>
                    <meshStandardMaterial color={color} roughness={0.4} />
                </Box>
                <Box args={[width * 0.4, height * 0.28, 0.02]} position={[width * 0.7, height * 0.22, depth / 2 + 0.01]}>
                    <meshStandardMaterial color={color} roughness={0.4} />
                </Box>
                <Box args={[width * 0.4, height * 0.28, 0.02]} position={[width * 0.3, -height * 0.18, depth / 2 + 0.01]}>
                    <meshStandardMaterial color={color} roughness={0.4} />
                </Box>
                <Box args={[width * 0.4, height * 0.28, 0.02]} position={[width * 0.7, -height * 0.18, depth / 2 + 0.01]}>
                    <meshStandardMaterial color={color} roughness={0.4} />
                </Box>
            </group>

            {/* Proximity indicator (shows tooltip externally via context) */}
            <ProximityTooltip isNearby={isNearby} isOpen={isOpen} />
        </group>
    );
};

// Helper component to show tooltip
const ProximityTooltip = ({ isNearby, isOpen }) => {
    useEffect(() => {
        // We need to communicate with App.jsx - using window for simplicity
        if (isNearby) {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: true, text: isOpen ? 'Press E to close door' : 'Press E to open door' }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: false, text: '' }
            }));
        }
    }, [isNearby, isOpen]);

    return null;
};

// Window with Frame - glass + white trim
export const GlassWindow = ({ position, args, frameColor = TRIM_COLOR }) => {
    const [width, height, depth] = args;
    const frameWidth = 0.1;

    return (
        <group position={position}>
            {/* Window frame - outer */}
            <Box args={[width + frameWidth * 2, height + frameWidth * 2, depth + 0.05]} position={[0, 0, 0]}>
                <meshStandardMaterial color={frameColor} roughness={0.4} />
            </Box>
            {/* Glass pane */}
            <Box args={[width, height, depth]} position={[0, 0, 0.01]}>
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.35}
                    roughness={0.05}
                    metalness={0.9}
                />
            </Box>
            {/* Cross dividers (like traditional windows) */}
            <Box args={[frameWidth / 2, height, depth + 0.02]} position={[0, 0, 0.02]}>
                <meshStandardMaterial color={frameColor} roughness={0.4} />
            </Box>
            <Box args={[width, frameWidth / 2, depth + 0.02]} position={[0, 0, 0.02]}>
                <meshStandardMaterial color={frameColor} roughness={0.4} />
            </Box>
            {/* Window sill */}
            <Box args={[width + frameWidth * 3, 0.08, 0.15]} position={[0, -height / 2 - 0.04, depth / 2 + 0.05]}>
                <meshStandardMaterial color={frameColor} roughness={0.5} />
            </Box>
        </group>
    );
};

// Baseboard - runs along wall/floor junction
export const Baseboard = ({ position, length, rotation = [0, 0, 0], color = WOOD_TRIM_COLOR }) => {
    return (
        <Box args={[length, 0.1, 0.02]} position={position} rotation={rotation}>
            <meshStandardMaterial color={color} roughness={0.6} />
        </Box>
    );
};

// Crown Molding - runs along wall/ceiling junction  
export const CrownMolding = ({ position, length, rotation = [0, 0, 0], color = TRIM_COLOR }) => {
    return (
        <Box args={[length, 0.08, 0.08]} position={position} rotation={rotation}>
            <meshStandardMaterial color={color} roughness={0.5} />
        </Box>
    );
};

// Ceiling Light Fixture
export const CeilingLight = ({ position, intensity = 1 }) => {
    return (
        <group position={position}>
            {/* Base plate */}
            <Cylinder args={[0.15, 0.15, 0.03, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#888" metalness={0.6} roughness={0.3} />
            </Cylinder>
            {/* Light bulb cover */}
            <mesh position={[0, -0.15, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color="#FFFEF0"
                    emissive="#FFF8DC"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            {/* Actual light */}
            <pointLight
                position={[0, -0.2, 0]}
                intensity={intensity}
                distance={10}
                color="#FFF8DC"
                castShadow
            />
        </group>
    );
};
