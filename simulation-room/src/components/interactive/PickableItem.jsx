import React, { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

// Stove burner positions for burning detection (stove is at -17.5, 0, -5.5)
const STOVE_POSITION = [-17.5, 1.0, -5.5];
const BURN_RADIUS = 1.5;
// Items that don't burn (metal utensils)
const FIREPROOF_ITEMS = ['kettle', 'pot', 'pan', 'mug'];


// Track which item is currently being held globally
let globalHeldItem = null;

// Track if any stove burner is on (shared across PickableItems)
let globalStoveBurnerOn = false;

// Listen for stove burner state events
if (typeof window !== 'undefined' && !window._pickableItemStoveListener) {
    window.addEventListener('stoveBurnerState', (e) => {
        if (e.detail && typeof e.detail.anyBurnerOn === 'boolean') {
            globalStoveBurnerOn = e.detail.anyBurnerOn;
        }
    });
    window._pickableItemStoveListener = true;
}

export const PickableItem = ({ children, position: initialPosition, itemType, pickupDistance = 2.5 }) => {
    const [isPickedUp, setIsPickedUp] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(initialPosition);
    const [isBurning, setIsBurning] = useState(false);
    const [burnProgress, setBurnProgress] = useState(0);
    const [isDestroyed, setIsDestroyed] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const groupRef = useRef();
    const flameRefs = [useRef(), useRef(), useRef()];
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastGrab = useRef(false);
    const burnTime = useRef(0);
    const isNearbyRef = useRef(false);
    const isLookingAtRef = useRef(false);
    const frameCounter = useRef(0);


    useFrame((state, delta) => {
        if (isDestroyed) return;
        if (!groupRef.current || isPickedUp) return;

        // Throttle expensive calculations to every 5 frames
        frameCounter.current++;
        if (frameCounter.current < 5 && !isBurning) return;
        frameCounter.current = 0;

        // Check distance to player based on current position
        const itemPos = new THREE.Vector3(...currentPosition);
        const distance = camera.position.distanceTo(itemPos);
        isNearbyRef.current = distance < pickupDistance;

        // Check if player is looking at this item (relaxed angle for kitchen table)
        if (isNearbyRef.current) {
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            const toItem = new THREE.Vector3().subVectors(itemPos, camera.position).normalize();
            // Allow a wider angle for picking up (0.90 instead of 0.95)
            isLookingAtRef.current = cameraDirection.dot(toItem) > 0.90;
        } else {
            isLookingAtRef.current = false;
        }

        // Update hint visibility
        const shouldShow = isNearbyRef.current && isLookingAtRef.current && !isBurning && !isDestroyed;
        if (shouldShow !== showHint) {
            setShowHint(shouldShow);
        }

        // Check for G key press - only pickup if looking at item and nothing else is held
        const { grab } = getKeys();
        if (grab && !lastGrab.current && isNearbyRef.current && isLookingAtRef.current && !isBurning && !isDestroyed && globalHeldItem === null) {
            setIsPickedUp(true);
            globalHeldItem = itemType; // Lock pickup to this item
            window.dispatchEvent(new CustomEvent('itemPickup', {
                detail: { type: itemType, position: currentPosition }
            }));
        }
        lastGrab.current = grab;


        // Check if near stove (burning detection) - but NOT for fireproof items
        // Only burn if at least one stove burner is ON
        if (!isPickedUp && !isBurning && !FIREPROOF_ITEMS.includes(itemType)) {
            const stovePos = new THREE.Vector3(...STOVE_POSITION);
            const distanceToStove = itemPos.distanceTo(stovePos);
            if (distanceToStove < BURN_RADIUS && globalStoveBurnerOn) {
                setIsBurning(true);
            }
        }

        // Burning animation - only update if burning
        if (isBurning) {
            burnTime.current += delta;
            const newProgress = Math.min(1, burnTime.current / 3);
            if (Math.abs(newProgress - burnProgress) > 0.05) {
                setBurnProgress(newProgress);
            }

            // Animate flames
            flameRefs.forEach((ref, i) => {
                if (ref.current) {
                    ref.current.scale.y = 0.5 + Math.sin(state.clock.elapsedTime * 10 + i) * 0.3;
                    ref.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 8 + i * 2) * 0.05;
                }
            });

            // Destroy after burning
            if (burnTime.current > 3) {
                setIsDestroyed(true);
            }
        }
    });


    // Listen for drop event - calculate new drop position
    useEffect(() => {
        const handleDrop = (e) => {
            if (e.detail?.type === itemType) {
                const direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                // Drop item 1.5 units in front at surface level (y=1.0 for stove/counter height)
                const dropPos = [
                    camera.position.x + direction.x * 1.5,
                    1.0, // Fixed surface height (stove top / counter level)
                    camera.position.z + direction.z * 1.5
                ];

                setCurrentPosition(dropPos);
                setIsPickedUp(false);
                globalHeldItem = null; // Release the lock so other items can be picked up
            }
        };
        window.addEventListener('itemDrop', handleDrop);
        return () => window.removeEventListener('itemDrop', handleDrop);
    }, [itemType, camera]);

    // Reset globalHeldItem if destroyed
    useEffect(() => {
        if (isDestroyed && globalHeldItem === itemType) {
            globalHeldItem = null;
        }
    }, [isDestroyed, itemType]);

    // Listen for global G key to drop when holding
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key === 'g' || e.key === 'G') && isPickedUp) {
                window.dispatchEvent(new CustomEvent('itemDrop', { detail: { type: itemType } }));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPickedUp, itemType]);

    if (isPickedUp || isDestroyed) return null;

    return (
        <group ref={groupRef} position={currentPosition}>
            {/* Item with burn effect */}
            <group scale={isBurning ? [1 - burnProgress * 0.5, 1 - burnProgress * 0.5, 1 - burnProgress * 0.5] : [1, 1, 1]}>
                {children}
            </group>

            {/* Simplified Fire effect - optimized */}
            {isBurning && (
                <group>
                    {/* 3 simple flames */}
                    {[0, 1, 2].map((i) => (
                        <mesh
                            key={`flame-${i}`}
                            ref={flameRefs[i]}
                            position={[(i - 1) * 0.05, 0.08, 0]}
                        >
                            <coneGeometry args={[0.03, 0.12, 6]} />
                            <meshBasicMaterial
                                color={i === 1 ? "#FF4400" : "#FF8800"}
                                transparent
                                opacity={0.9}
                            />
                        </mesh>
                    ))}

                    {/* Single light for glow */}
                    <pointLight position={[0, 0.1, 0]} color="#FF4500" intensity={2} distance={1.5} />

                    {/* Single smoke */}
                    <mesh position={[0, 0.25 + burnProgress * 0.3, 0]}>
                        <sphereGeometry args={[0.06, 6, 6]} />
                        <meshBasicMaterial color="#555555" transparent opacity={0.4} />
                    </mesh>
                </group>
            )}

            {/* Pickup hint - only shows when looking at item */}
            {showHint && (
                <sprite position={[0, 0.3, 0]} scale={[0.5, 0.15, 1]}>
                    <spriteMaterial color="#00FF00" opacity={0.9} transparent />
                </sprite>
            )}
        </group>
    );
};
