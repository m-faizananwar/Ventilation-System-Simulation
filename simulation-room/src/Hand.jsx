import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

// Minecraft-style first-person hand - simple blocky arm
export function Hand({ heldItem }) {
    const handRef = useRef();
    const [isSwinging, setIsSwinging] = useState(false);
    const swingProgress = useRef(0);
    const idleTime = useRef(0);

    // Idle bob and swing animation
    useFrame((state, delta) => {
        if (!handRef.current) return;

        idleTime.current += delta;

        // Subtle idle bobbing
        const bobY = Math.sin(idleTime.current * 1.5) * 0.01;

        // Swing animation when picking up
        if (isSwinging) {
            swingProgress.current = Math.min(1, swingProgress.current + delta * 6);
            if (swingProgress.current >= 1) {
                setIsSwinging(false);
                swingProgress.current = 0;
            }
        }

        // Punch swing motion
        const swingAngle = Math.sin(swingProgress.current * Math.PI) * 0.5;

        handRef.current.position.y = -0.3 + bobY;
        handRef.current.rotation.x = -0.2 + swingAngle;
    });

    // Trigger swing when grabbing
    useEffect(() => {
        if (heldItem) {
            setIsSwinging(true);
        }
    }, [heldItem]);

    // Render held item
    const renderHeldItem = () => {
        if (!heldItem) return null;

        const itemType = heldItem.type;

        switch (itemType) {
            case 'milk':
                return (
                    <group position={[0, 0.35, 0]}>
                        <Box args={[0.1, 0.22, 0.1]}>
                            <meshStandardMaterial color="#FFFFFF" />
                        </Box>
                        <Box args={[0.08, 0.03, 0.08]} position={[0, 0.12, 0]}>
                            <meshStandardMaterial color="#1976D2" />
                        </Box>
                    </group>
                );
            case 'bread':
                return (
                    <Box args={[0.1, 0.08, 0.18]} position={[0, 0.32, 0]}>
                        <meshStandardMaterial color="#D7A86E" />
                    </Box>
                );
            case 'mug':
                return (
                    <Box args={[0.08, 0.1, 0.08]} position={[0, 0.3, 0]}>
                        <meshStandardMaterial color="#FFFFFF" />
                    </Box>
                );
            case 'apple':
                return (
                    <Box args={[0.08, 0.08, 0.08]} position={[0, 0.3, 0]}>
                        <meshStandardMaterial color="#C62828" />
                    </Box>
                );
            case 'cereal':
                return (
                    <Box args={[0.06, 0.2, 0.14]} position={[0, 0.35, 0]}>
                        <meshStandardMaterial color="#FFC107" />
                    </Box>
                );
            case 'oil':
                return (
                    <Box args={[0.06, 0.15, 0.06]} position={[0, 0.3, 0]}>
                        <meshStandardMaterial color="#FFEB3B" transparent opacity={0.8} />
                    </Box>
                );
            case 'tissue':
                return (
                    <Box args={[0.08, 0.15, 0.08]} position={[0, 0.32, 0]}>
                        <meshStandardMaterial color="#FAFAFA" />
                    </Box>
                );
            case 'cookies':
                return (
                    <group position={[0, 0.28, 0]}>
                        <Box args={[0.12, 0.02, 0.12]}>
                            <meshStandardMaterial color="#ECEFF1" />
                        </Box>
                        <Box args={[0.04, 0.02, 0.04]} position={[0, 0.02, 0]}>
                            <meshStandardMaterial color="#D4A574" />
                        </Box>
                    </group>
                );
            case 'kettle':
                return (
                    <group position={[0, 0.32, 0]}>
                        <Box args={[0.1, 0.12, 0.1]}>
                            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
                        </Box>
                    </group>
                );
            case 'pot':
                return (
                    <group position={[0, 0.3, 0]}>
                        <Box args={[0.12, 0.1, 0.12]}>
                            <meshStandardMaterial color="#B87333" metalness={0.7} />
                        </Box>
                    </group>
                );
            case 'egg':
                return (
                    <Box args={[0.06, 0.08, 0.06]} position={[0, 0.28, 0]}>
                        <meshStandardMaterial color="#F5F5DC" />
                    </Box>
                );
            case 'tea':
                return (
                    <Box args={[0.06, 0.1, 0.04]} position={[0, 0.3, 0]}>
                        <meshStandardMaterial color="#8B0000" />
                    </Box>
                );
            case 'pan':
                return (
                    <group position={[0, 0.26, 0]}>
                        <Box args={[0.15, 0.02, 0.15]}>
                            <meshStandardMaterial color="#2F2F2F" metalness={0.8} />
                        </Box>
                    </group>
                );
            case 'roti':
                return (
                    <Box args={[0.12, 0.01, 0.12]} position={[0, 0.26, 0]}>
                        <meshStandardMaterial color="#D4A574" />
                    </Box>
                );
            default:
                return (
                    <Box args={[0.1, 0.1, 0.1]} position={[0, 0.3, 0]}>
                        <meshStandardMaterial color="#888888" />
                    </Box>
                );
        }
    };

    return (
        <group ref={handRef} position={[0.35, -0.3, -0.5]}>
            {/* Simple Minecraft arm - just one block */}
            <Box args={[0.12, 0.5, 0.12]} position={[0, 0, 0]} rotation={[0.3, -0.1, 0.15]}>
                <meshStandardMaterial color="#C6A07C" />
            </Box>

            {/* Sleeve at the top */}
            <Box args={[0.13, 0.1, 0.13]} position={[0, -0.22, 0.02]} rotation={[0.3, -0.1, 0.15]}>
                <meshStandardMaterial color="#4AA02C" />
            </Box>

            {/* Held item */}
            {renderHeldItem()}

            {/* Light for visibility */}
            <pointLight position={[0, 0.1, 0.2]} intensity={0.4} distance={1.5} />
        </group>
    );
}

export default Hand;
