import React from 'react';
import { Wall, Floor, Door, GlassWindow, CeilingLight, FLOOR_COLORS, InteractiveDoor } from './HouseStructure';
import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

// --- Furniture Components ---

const Sofa = ({ position, rotation = [0, 0, 0], color = "#553333" }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Base seat */}
            <Box args={[2.5, 0.5, 0.8]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Backrest */}
            <Box args={[2.5, 0.8, 0.2]} position={[0, 0.5, -0.3]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Armrests */}
            <Box args={[0.2, 0.6, 0.8]} position={[-1.15, 0.4, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            <Box args={[0.2, 0.6, 0.8]} position={[1.15, 0.4, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
        </RigidBody>
    </group>
);

const Armchair = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            <Box args={[0.8, 0.4, 0.8]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#664444" />
            </Box>
            <Box args={[0.8, 0.5, 0.15]} position={[0, 0.45, -0.32]}>
                <meshStandardMaterial color="#664444" />
            </Box>
            <Box args={[0.1, 0.3, 0.8]} position={[-0.35, 0.35, 0]}>
                <meshStandardMaterial color="#664444" />
            </Box>
            <Box args={[0.1, 0.3, 0.8]} position={[0.35, 0.35, 0]}>
                <meshStandardMaterial color="#664444" />
            </Box>
        </RigidBody>
    </group>
);

const Table = ({ position, args = [1.5, 0.8, 0.8], color = "#4A3728" }) => (
    <RigidBody type="fixed" position={position}>
        {/* Top */}
        <Box args={[args[0], 0.05, args[2]]} position={[0, args[1], 0]}>
            <meshStandardMaterial color={color} />
        </Box>
        {/* Legs */}
        <Box args={[0.1, args[1], 0.1]} position={[args[0] / 2 - 0.1, args[1] / 2, args[2] / 2 - 0.1]}><meshStandardMaterial color={color} /></Box>
        <Box args={[0.1, args[1], 0.1]} position={[-args[0] / 2 + 0.1, args[1] / 2, args[2] / 2 - 0.1]}><meshStandardMaterial color={color} /></Box>
        <Box args={[0.1, args[1], 0.1]} position={[args[0] / 2 - 0.1, args[1] / 2, -args[2] / 2 + 0.1]}><meshStandardMaterial color={color} /></Box>
        <Box args={[0.1, args[1], 0.1]} position={[-args[0] / 2 + 0.1, args[1] / 2, -args[2] / 2 + 0.1]}><meshStandardMaterial color={color} /></Box>
    </RigidBody>
);

const CoffeeTable = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[1.2, 0.05, 0.8]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} roughness={0.1} />
        </Box>
        {/* Metal Legs */}
        {[[-0.5, -0.3], [-0.5, 0.3], [0.5, -0.3], [0.5, 0.3]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.02, 0.02, 0.4, 8]} position={[x, 0.2, z]}>
                <meshStandardMaterial color="#333" metalness={0.8} />
            </Cylinder>
        ))}
    </RigidBody>
);

const KitchenCounter = ({ position, args }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={args}>
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
        </Box>
    </RigidBody>
);

const Bed = ({ position, size = "queen", color = "#3344AA" }) => {
    const width = size === "king" ? 2 : size === "queen" ? 1.8 : 1.5;
    return (
        <RigidBody type="fixed" position={position}>
            {/* Frame */}
            <Box args={[width, 0.3, 2.2]} position={[0, 0.15, 0]}>
                <meshStandardMaterial color="#654321" />
            </Box>
            {/* Mattress */}
            <Box args={[width - 0.1, 0.25, 2.1]} position={[0, 0.42, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Pillows */}
            <Box args={[width * 0.35, 0.1, 0.3]} position={[-width * 0.25, 0.6, -0.8]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
            <Box args={[width * 0.35, 0.1, 0.3]} position={[width * 0.25, 0.6, -0.8]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
            {/* Headboard */}
            <Box args={[width, 0.8, 0.1]} position={[0, 0.7, -1.05]}>
                <meshStandardMaterial color="#654321" />
            </Box>
        </RigidBody>
    );
};

const BunkBed = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Bottom bed frame */}
        <Box args={[1.2, 0.15, 2]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[1.1, 0.15, 1.9]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#4477BB" />
        </Box>
        {/* Top bed frame */}
        <Box args={[1.2, 0.15, 2]} position={[0, 1.6, 0]}>
            <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[1.1, 0.15, 1.9]} position={[0, 1.75, 0]}>
            <meshStandardMaterial color="#BB7744" />
        </Box>
        {/* Posts */}
        {[[-0.55, -0.9], [-0.55, 0.9], [0.55, -0.9], [0.55, 0.9]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.05, 0.05, 2.2, 8]} position={[x, 1.1, z]}>
                <meshStandardMaterial color="#8B4513" />
            </Cylinder>
        ))}
        {/* Ladder */}
        <Box args={[0.05, 1.3, 0.3]} position={[0.6, 0.95, 0.85]}>
            <meshStandardMaterial color="#8B4513" />
        </Box>
    </RigidBody>
);

const Nightstand = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.5, 0.5, 0.4]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {/* Lamp */}
        <Cylinder args={[0.08, 0.1, 0.3, 16]} position={[0, 0.65, 0]}>
            <meshStandardMaterial color="#DDBB88" />
        </Cylinder>
        <mesh position={[0, 0.85, 0]}>
            <coneGeometry args={[0.15, 0.2, 16]} />
            <meshStandardMaterial color="#FFFFEE" emissive="#FFFF88" emissiveIntensity={0.3} />
        </mesh>
        <pointLight position={[0, 0.8, 0]} intensity={0.5} distance={3} color="#FFF8DC" />
    </RigidBody>
);

const Wardrobe = ({ position, args = [1.5, 2.2, 0.6] }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={args} position={[0, args[1] / 2, 0]}>
            <meshStandardMaterial color="#4A3728" />
        </Box>
        {/* Door handles */}
        <Box args={[0.05, 0.15, 0.05]} position={[-0.2, args[1] / 2, args[2] / 2 + 0.03]}>
            <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
        <Box args={[0.05, 0.15, 0.05]} position={[0.2, args[1] / 2, args[2] / 2 + 0.03]}>
            <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
    </RigidBody>
);

const Desk = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Desktop */}
            <Box args={[1.2, 0.05, 0.6]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            {/* Legs */}
            <Box args={[0.05, 0.75, 0.6]} position={[-0.55, 0.375, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            <Box args={[0.05, 0.75, 0.6]} position={[0.55, 0.375, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
        </RigidBody>
    </group>
);

const Chair = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            <Box args={[0.45, 0.05, 0.45]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#333" />
            </Box>
            <Box args={[0.45, 0.4, 0.05]} position={[0, 0.65, -0.2]}>
                <meshStandardMaterial color="#333" />
            </Box>
            {/* Legs */}
            {[[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].map(([x, z], i) => (
                <Cylinder key={i} args={[0.02, 0.02, 0.45, 8]} position={[x, 0.225, z]}>
                    <meshStandardMaterial color="#555" metalness={0.6} />
                </Cylinder>
            ))}
        </RigidBody>
    </group>
);

const DiningChair = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            <Box args={[0.45, 0.05, 0.45]} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            <Box args={[0.45, 0.5, 0.05]} position={[0, 0.75, -0.2]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            {[[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].map(([x, z], i) => (
                <Cylinder key={i} args={[0.025, 0.025, 0.45, 8]} position={[x, 0.225, z]}>
                    <meshStandardMaterial color="#5C4033" />
                </Cylinder>
            ))}
        </RigidBody>
    </group>
);

// Animated TV component with screen effects
const AnimatedTV = ({ position, rotation = [0, 0, 0] }) => {
    const [isOn, setIsOn] = useState(true);
    const [isNearby, setIsNearby] = useState(false);
    const screenRef = useRef();
    const groupRef = useRef();
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const tvPos = groupRef.current.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(tvPos);
        const isClose = distance < 4;

        // Raycast check
        let isLookingAt = false;
        if (isClose && screenRef.current) {
            raycaster.setFromCamera({ x: 0, y: 0 }, camera);
            const intersects = raycaster.intersectObject(screenRef.current, true);
            isLookingAt = intersects.length > 0;
        }

        const nowNearby = isClose && isLookingAt;
        if (nowNearby !== isNearby) setIsNearby(nowNearby);

        // Handle E key
        const { interact } = getKeys();
        if (nowNearby && interact && !lastInteract.current) {
            setIsOn(prev => !prev);
        }
        lastInteract.current = interact;

        // Animate screen colors when on
        if (isOn && screenRef.current && screenRef.current.material) {
            timeRef.current += delta;
            const t = timeRef.current;

            // Color cycling effect (simulating video content)
            const r = Math.sin(t * 0.7) * 0.3 + 0.4;
            const g = Math.sin(t * 0.9 + 1) * 0.3 + 0.4;
            const b = Math.sin(t * 1.1 + 2) * 0.3 + 0.5;

            screenRef.current.material.emissive.setRGB(r, g, b);
            screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 15) * 0.1; // Subtle flicker
        }
    });

    // Tooltip effect
    useEffect(() => {
        if (isNearby) {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: true, text: isOn ? 'Press E to turn off TV' : 'Press E to turn on TV' }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: false }
            }));
        }
    }, [isNearby, isOn]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* TV Frame */}
                <Box args={[2, 1.2, 0.08]}>
                    <meshStandardMaterial color="#111" />
                </Box>
                {/* Screen */}
                <Box ref={screenRef} args={[1.9, 1.1, 0.01]} position={[0, 0, 0.05]}>
                    <meshStandardMaterial
                        color={isOn ? "#111" : "#0a0a0a"}
                        emissive={isOn ? "#446688" : "#000000"}
                        emissiveIntensity={isOn ? 0.5 : 0}
                    />
                </Box>
                {/* TV light glow when on */}
                {isOn && (
                    <pointLight position={[0, 0, 0.5]} color="#6688AA" intensity={0.3} distance={3} />
                )}
            </RigidBody>
        </group>
    );
};

const TVConsole = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[2.5, 0.5, 0.5]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#333" />
        </Box>
    </RigidBody>
);

const Bookshelf = ({ position, rotation = [0, 0, 0] }) => (
    <RigidBody type="fixed" position={position} rotation={rotation}>
        <Box args={[0.8, 2, 0.3]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {/* Books (colored blocks) */}
        {[0.3, 0.7, 1.1, 1.5].map((y, i) => (
            <Box key={i} args={[0.7, 0.15, 0.25]} position={[0, y + 0.1, 0.03]}>
                <meshStandardMaterial color={["#AA3333", "#3333AA", "#33AA33", "#AA8833"][i]} />
            </Box>
        ))}
    </RigidBody>
);

const Refrigerator = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.9, 1.8, 0.7]} position={[0, 0.9, 0]}>
            <meshStandardMaterial color="#CCCCCC" metalness={0.3} roughness={0.3} />
        </Box>
        {/* Handles */}
        <Box args={[0.03, 0.3, 0.05]} position={[-0.3, 1.2, 0.38]}>
            <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
        <Box args={[0.03, 0.2, 0.05]} position={[-0.3, 0.5, 0.38]}>
            <meshStandardMaterial color="#888" metalness={0.8} />
        </Box>
    </RigidBody>
);

const Stove = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Base */}
        <Box args={[0.8, 0.9, 0.6]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#222" />
        </Box>
        {/* Cooktop */}
        <Box args={[0.75, 0.02, 0.55]} position={[0, 0.91, 0]}>
            <meshStandardMaterial color="#111" />
        </Box>
        {/* Burners */}
        {[[-0.2, -0.15], [0.2, -0.15], [-0.2, 0.15], [0.2, 0.15]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.08, 0.08, 0.01, 16]} position={[x, 0.92, z]}>
                <meshStandardMaterial color="#333" />
            </Cylinder>
        ))}
    </RigidBody>
);

const RangeHood = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.9, 0.4, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#666" metalness={0.6} />
        </Box>
    </RigidBody>
);

const Sink = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Counter section */}
        <Box args={[1, 0.9, 0.6]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Basin */}
        <Box args={[0.5, 0.2, 0.4]} position={[0, 0.85, 0]}>
            <meshStandardMaterial color="#DDDDDD" />
        </Box>
        {/* Faucet */}
        <Cylinder args={[0.02, 0.02, 0.25, 8]} position={[0, 1.05, -0.15]}>
            <meshStandardMaterial color="#888" metalness={0.9} />
        </Cylinder>
    </RigidBody>
);

const Toilet = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Base */}
            <Box args={[0.4, 0.35, 0.5]} position={[0, 0.175, 0]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
            {/* Seat */}
            <Cylinder args={[0.2, 0.2, 0.05, 16]} position={[0, 0.4, 0.05]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Cylinder>
            {/* Tank */}
            <Box args={[0.35, 0.4, 0.15]} position={[0, 0.45, -0.2]}>
                <meshStandardMaterial color="#FFFFFF" />
            </Box>
        </RigidBody>
    </group>
);

const Vanity = ({ position, double = false }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[double ? 1.6 : 0.8, 0.8, 0.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Sink basin(s) */}
        <Cylinder args={[0.15, 0.15, 0.05, 16]} position={[double ? -0.4 : 0, 0.82, 0]}>
            <meshStandardMaterial color="#EEEEEE" />
        </Cylinder>
        {double && (
            <Cylinder args={[0.15, 0.15, 0.05, 16]} position={[0.4, 0.82, 0]}>
                <meshStandardMaterial color="#EEEEEE" />
            </Cylinder>
        )}
        {/* Mirror */}
        <Box args={[double ? 1.5 : 0.7, 0.8, 0.05]} position={[0, 1.3, -0.2]}>
            <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
        </Box>
    </RigidBody>
);

const Bathtub = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        {/* Outer shell */}
        <Box args={[0.8, 0.6, 1.7]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Inner basin (darker) */}
        <Box args={[0.6, 0.4, 1.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#DDDDDD" />
        </Box>
    </RigidBody>
);

const ShowerCubicle = ({ position }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {/* Base */}
            <Box args={[1, 0.1, 1]} position={[0, 0.05, 0]}>
                <meshStandardMaterial color="#EEEEEE" />
            </Box>
            {/* Glass walls */}
            <Box args={[1, 2, 0.05]} position={[0, 1, 0.475]}>
                <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
            </Box>
            <Box args={[0.05, 2, 1]} position={[0.475, 1, 0]}>
                <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
            </Box>
        </RigidBody>
        {/* Shower head */}
        <mesh position={[-0.3, 2, -0.3]}>
            <cylinderGeometry args={[0.08, 0.1, 0.05, 16]} />
            <meshStandardMaterial color="#888" metalness={0.8} />
        </mesh>
    </group>
);

const WashingMachine = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.6, 0.85, 0.6]} position={[0, 0.425, 0]}>
            <meshStandardMaterial color="#FFFFFF" />
        </Box>
        {/* Door */}
        <Cylinder args={[0.2, 0.2, 0.05, 16]} position={[0, 0.5, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#333" />
        </Cylinder>
    </RigidBody>
);

const Chandelier = ({ position }) => (
    <group position={position}>
        {/* Base */}
        <mesh>
            <cylinderGeometry args={[0.3, 0.4, 0.2, 16]} />
            <meshStandardMaterial color="#B8860B" metalness={0.8} />
        </mesh>
        {/* Arms and lights */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
                <group key={i}>
                    <mesh position={[Math.cos(angle) * 0.4, -0.1, Math.sin(angle) * 0.4]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial color="#FFFFEE" emissive="#FFFF88" emissiveIntensity={0.8} />
                    </mesh>
                </group>
            );
        })}
        <pointLight color="#FFF8DC" intensity={2} distance={8} position={[0, -0.2, 0]} />
    </group>
);

const Console = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[1, 0.8, 0.35]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {/* Decorative items */}
        <Box args={[0.15, 0.25, 0.1]} position={[-0.3, 0.92, 0]}>
            <meshStandardMaterial color="#228833" />
        </Box>
        <Cylinder args={[0.05, 0.08, 0.08, 8]} position={[0.3, 0.88, 0]}>
            <meshStandardMaterial color="#B8860B" metalness={0.6} />
        </Cylinder>
    </RigidBody>
);

const Mirror = ({ position, rotation = [0, 0, 0] }) => (
    <Box args={[0.8, 1.2, 0.05]} position={position} rotation={rotation}>
        <meshStandardMaterial color="#87CEEB" metalness={0.95} roughness={0.05} />
    </Box>
);

const ShoeRack = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[1, 0.8, 0.35]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#654321" />
        </Box>
    </RigidBody>
);

const CoatHanger = ({ position }) => (
    <group position={position}>
        <Box args={[0.8, 0.1, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#5C4033" />
        </Box>
        {[-0.3, 0, 0.3].map((x, i) => (
            <mesh key={i} position={[x, -0.1, 0.05]}>
                <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
                <meshStandardMaterial color="#888" metalness={0.8} />
            </mesh>
        ))}
    </group>
);

// Interactive Fireplace component with on/off toggle
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

const InteractiveFireplace = ({ position, rotation = [0, 0, 0], interactionDistance = 3 }) => {
    const [isOn, setIsOn] = useState(true);
    const [isNearby, setIsNearby] = useState(false);
    const groupRef = useRef();
    const fireplaceRef = useRef();
    const flame1Ref = useRef();
    const flame2Ref = useRef();
    const flame3Ref = useRef();
    const flame4Ref = useRef();
    const light1Ref = useRef();
    const light2Ref = useRef();
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const timeRef = useRef(0);

    // Check proximity, look direction, handle E key, AND animate fire
    useFrame((state, delta) => {
        if (!groupRef.current || !fireplaceRef.current) return;

        const fireplacePos = groupRef.current.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(fireplacePos);

        // Check if player is nearby
        const isClose = distance < interactionDistance;

        // Check if player is looking at the fireplace
        let isLookingAt = false;
        if (isClose) {
            raycaster.setFromCamera({ x: 0, y: 0 }, camera);
            const intersects = raycaster.intersectObject(fireplaceRef.current, true);
            isLookingAt = intersects.length > 0;
        }

        const wasNearby = isNearby;
        const nowNearby = isClose && isLookingAt;

        if (nowNearby !== wasNearby) {
            setIsNearby(nowNearby);
        }

        // Handle E key press
        const { interact } = getKeys();
        if (nowNearby && interact && !lastInteract.current) {
            setIsOn(prev => !prev);
        }
        lastInteract.current = interact;

        // ANIMATE FIRE when on
        if (isOn) {
            timeRef.current += delta * 8; // Speed of flickering
            const t = timeRef.current;

            // Animate main flame
            if (flame1Ref.current) {
                flame1Ref.current.scale.x = 1 + Math.sin(t * 3.7) * 0.15;
                flame1Ref.current.scale.y = 1 + Math.sin(t * 4.3) * 0.2;
                flame1Ref.current.position.x = Math.sin(t * 2.1) * 0.05;
            }
            // Animate left flame
            if (flame2Ref.current) {
                flame2Ref.current.scale.x = 1 + Math.sin(t * 4.1 + 1) * 0.2;
                flame2Ref.current.scale.y = 1 + Math.sin(t * 3.5 + 1) * 0.25;
            }
            // Animate right flame
            if (flame3Ref.current) {
                flame3Ref.current.scale.x = 1 + Math.sin(t * 3.9 + 2) * 0.2;
                flame3Ref.current.scale.y = 1 + Math.sin(t * 4.7 + 2) * 0.25;
            }
            // Animate inner flame
            if (flame4Ref.current) {
                flame4Ref.current.scale.y = 1 + Math.sin(t * 5.2) * 0.3;
            }
            // Flicker lights
            if (light1Ref.current) {
                light1Ref.current.intensity = 4 + Math.sin(t * 6) * 1.5;
            }
            if (light2Ref.current) {
                light2Ref.current.intensity = 2.5 + Math.sin(t * 7 + 0.5) * 1;
            }
        }
    });

    // Tooltip effect
    useEffect(() => {
        if (isNearby) {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: true, text: isOn ? 'Press E to turn off fire' : 'Press E to light fire' }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('showInteractionTooltip', {
                detail: { show: false }
            }));
        }
    }, [isNearby, isOn]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Fireplace frame - sides, top, back (OPEN FRONT for fire visibility) */}
            <RigidBody type="fixed">
                {/* Left pillar */}
                <Box args={[0.3, 1.5, 0.5]} position={[-0.85, 0.75, 0]}>
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </Box>
                {/* Right pillar */}
                <Box args={[0.3, 1.5, 0.5]} position={[0.85, 0.75, 0]}>
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </Box>
                {/* Top bar */}
                <Box ref={fireplaceRef} args={[2, 0.3, 0.5]} position={[0, 1.65, 0]}>
                    <meshStandardMaterial color="#8B7355" roughness={0.9} />
                </Box>
                {/* Back wall (deep inside) */}
                <Box args={[1.4, 1.2, 0.15]} position={[0, 0.6, -0.2]}>
                    <meshStandardMaterial color="#1a1a1a" roughness={1} />
                </Box>
            </RigidBody>

            {/* Mantle (top shelf) */}
            <Box args={[2.4, 0.15, 0.7]} position={[0, 1.85, 0.1]}>
                <meshStandardMaterial color="#5C4033" roughness={0.6} />
            </Box>

            {/* Hearth (floor in front) */}
            <Box args={[2.2, 0.08, 0.9]} position={[0, 0.04, 0.4]}>
                <meshStandardMaterial color="#555555" roughness={0.85} />
            </Box>

            {/* Logs (always visible) */}
            <mesh position={[-0.25, 0.12, 0.1]} rotation={[0, 0.4, Math.PI / 12]}>
                <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
                <meshStandardMaterial color="#3D2817" roughness={0.95} />
            </mesh>
            <mesh position={[0.25, 0.12, 0.1]} rotation={[0, -0.4, -Math.PI / 12]}>
                <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
                <meshStandardMaterial color="#3D2817" roughness={0.95} />
            </mesh>
            <mesh position={[0, 0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
                <meshStandardMaterial color="#4A3020" roughness={0.95} />
            </mesh>

            {/* FEROCIOUS FIRE - only visible when on */}
            {isOn && (
                <>
                    {/* Large main flame - bright orange - positioned FORWARD */}
                    <mesh ref={flame1Ref} position={[0, 0.6, 0.5]}>
                        <coneGeometry args={[0.35, 0.9, 8]} />
                        <meshStandardMaterial color="#FF6600" emissive="#FF4400" emissiveIntensity={3} transparent opacity={0.95} />
                    </mesh>
                    {/* Secondary flames - left */}
                    <mesh ref={flame2Ref} position={[-0.25, 0.5, 0.45]}>
                        <coneGeometry args={[0.22, 0.7, 6]} />
                        <meshStandardMaterial color="#FF8800" emissive="#FF5500" emissiveIntensity={2.5} transparent opacity={0.9} />
                    </mesh>
                    {/* Secondary flames - right */}
                    <mesh ref={flame3Ref} position={[0.25, 0.5, 0.45]}>
                        <coneGeometry args={[0.22, 0.7, 6]} />
                        <meshStandardMaterial color="#FF8800" emissive="#FF5500" emissiveIntensity={2.5} transparent opacity={0.9} />
                    </mesh>
                    {/* Inner yellow/white hot flames */}
                    <mesh ref={flame4Ref} position={[0, 0.5, 0.55]}>
                        <coneGeometry args={[0.18, 0.6, 6]} />
                        <meshStandardMaterial color="#FFDD00" emissive="#FFCC00" emissiveIntensity={4} transparent opacity={0.85} />
                    </mesh>
                    {/* Glowing ember base - red hot coals */}
                    <mesh position={[0, 0.12, 0.45]}>
                        <boxGeometry args={[0.8, 0.12, 0.35]} />
                        <meshStandardMaterial color="#FF3300" emissive="#FF0000" emissiveIntensity={2.5} />
                    </mesh>
                    {/* Flickering fire lights */}
                    <pointLight ref={light1Ref} position={[0, 0.6, 0.6]} color="#FF6600" intensity={5} distance={10} />
                    <pointLight ref={light2Ref} position={[0, 0.3, 0.5]} color="#FF4400" intensity={3} distance={8} />
                </>
            )}

            {/* Chimney going up through ceiling */}
            <Box args={[0.8, 4, 0.5]} position={[0, 3.8, 0]}>
                <meshStandardMaterial color="#8B7355" roughness={0.9} />
            </Box>
        </group>
    );
};

const Rug = ({ position, args = [3, 0.02, 2], color = "#8B4513" }) => (
    <Box args={args} position={position}>
        <meshStandardMaterial color={color} roughness={0.95} />
    </Box>
);

const Car = ({ position, color = "#2244AA" }) => (
    <RigidBody type="fixed" position={position}>
        {/* Body */}
        <Box args={[1.8, 0.8, 4]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Box>
        {/* Cabin */}
        <Box args={[1.6, 0.6, 1.8]} position={[0, 1, -0.3]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Box>
        {/* Windows */}
        <Box args={[1.55, 0.5, 1.7]} position={[0, 1, -0.3]}>
            <meshStandardMaterial color="#333" transparent opacity={0.7} />
        </Box>
        {/* Wheels */}
        {[[-0.9, -1.2], [-0.9, 1.2], [0.9, -1.2], [0.9, 1.2]].map(([x, z], i) => (
            <Cylinder key={i} args={[0.3, 0.3, 0.2, 16]} position={[x, 0.3, z]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#111" />
            </Cylinder>
        ))}
    </RigidBody>
);

const FilingCabinet = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.5, 1.2, 0.6]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#666" metalness={0.4} />
        </Box>
    </RigidBody>
);

const PCSetup = ({ position }) => (
    <group position={position}>
        {/* Monitor */}
        <Box args={[0.6, 0.4, 0.03]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#222" />
        </Box>
        <Box args={[0.55, 0.35, 0.01]} position={[0, 0.3, 0.02]}>
            <meshStandardMaterial color="#334455" emissive="#223344" emissiveIntensity={0.2} />
        </Box>
        {/* Stand */}
        <Box args={[0.1, 0.1, 0.08]} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#333" />
        </Box>
        {/* Keyboard */}
        <Box args={[0.4, 0.02, 0.15]} position={[0, 0.01, 0.25]}>
            <meshStandardMaterial color="#333" />
        </Box>
    </group>
);

const Shed = ({ position }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {/* Walls */}
            <Box args={[3, 2.5, 0.1]} position={[0, 1.25, -1.45]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[3, 2.5, 0.1]} position={[0, 1.25, 1.45]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.1, 2.5, 3]} position={[-1.45, 1.25, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.1, 2.5, 3]} position={[1.45, 1.25, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            {/* Roof */}
            <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[2.5, 1.5, 4]} />
                <meshStandardMaterial color="#555" />
            </mesh>
        </RigidBody>
    </group>
);

const BBQGrill = ({ position }) => (
    <RigidBody type="fixed" position={position}>
        <Box args={[0.8, 0.9, 0.5]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#222" />
        </Box>
        <Box args={[0.75, 0.05, 0.45]} position={[0, 0.92, 0]}>
            <meshStandardMaterial color="#444" metalness={0.6} />
        </Box>
    </RigidBody>
);

const OutdoorTable = ({ position }) => (
    <group position={position}>
        <Table position={[0, 0, 0]} args={[1.2, 0.7, 1.2]} color="#888" />
        {/* Umbrella */}
        <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[1.2, 0.3, 8]} />
            <meshStandardMaterial color="#CC4444" />
        </mesh>
        <Cylinder args={[0.03, 0.03, 1, 8]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#888" />
        </Cylinder>
    </group>
);

const Stairs = ({ position, direction = "up", steps = 10 }) => (
    <group position={position}>
        <RigidBody type="fixed">
            {Array.from({ length: steps }).map((_, i) => (
                <Box key={i} args={[1.2, 0.2, 0.3]} position={[0, i * 0.35, direction === "up" ? -i * 0.3 : i * 0.3]}>
                    <meshStandardMaterial color="#8B7355" />
                </Box>
            ))}
            {/* Railings */}
            <Box args={[0.05, steps * 0.35 + 0.5, 0.05]} position={[-0.6, (steps * 0.35) / 2, direction === "up" ? -(steps * 0.3) / 2 : (steps * 0.3) / 2]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
            <Box args={[0.05, steps * 0.35 + 0.5, 0.05]} position={[0.6, (steps * 0.35) / 2, direction === "up" ? -(steps * 0.3) / 2 : (steps * 0.3) / 2]}>
                <meshStandardMaterial color="#5C4033" />
            </Box>
        </RigidBody>
    </group>
);

// --- Ground Floor (y=0) ---
function GroundFloor() {
    return (
        <group position={[0, 0, 0]}>
            {/* FLOOR */}
            {/* FLOOR - expanded to 36m width */}
            <Floor position={[0, 0.05, -2.5]} args={[36, 15]} />

            {/* === FOYER (Center Front) === */}
            {/* Front wall - LEFT section (width 16.8, pos -9.6) */}
            <Wall position={[-9.6, 1.75, 5]} args={[16.8, 3.5, 0.2]} />
            {/* Front wall - RIGHT section (width 16.8, pos 9.6) */}
            <Wall position={[9.6, 1.75, 5]} args={[16.8, 3.5, 0.2]} />
            {/* MAIN ENTRANCE - Interactive Door (taller, opens with E key) */}
            <InteractiveDoor position={[0, 1.6, 5]} args={[2.4, 3.2, 0.12]} color="#4A3728" interactionDistance={4} />
            {/* Wall above door */}
            <Wall position={[0, 3.45, 5]} args={[2.6, 0.6, 0.2]} />

            {/* Foyer Furniture - kept minimal */}
            <Rug position={[0, 0.01, 4]} args={[1.5, 0.02, 1]} color="#553322" />

            {/* === LIVING ROOM (Center) === */}
            {/* East wall (to Guest Bedroom) - moved out to x=6 to restore lounge size */}
            <Wall position={[6, 1.75, -4.6]} args={[0.2, 3.5, 10.8]} />   {/* Back section */}
            <Wall position={[6, 1.75, 4.1]} args={[0.2, 3.5, 1.8]} />     {/* Front section */}
            <Wall position={[6, 3.3, 2]} args={[0.2, 0.4, 2.5]} />        {/* Above door */}
            <InteractiveDoor position={[6, 1.5, 2]} rotation={[0, Math.PI / 2, 0]} args={[2.5, 3, 0.12]} color="#4A3728" interactionDistance={3} />

            {/* West wall (to Dining/Kitchen) - moved out to x=-6 to restore lounge size */}
            <Wall position={[-6, 1.75, -4.6]} args={[0.2, 3.5, 10.8]} />  {/* Back section */}
            <Wall position={[-6, 1.75, 4.1]} args={[0.2, 3.5, 1.8]} />    {/* Front section */}
            <Wall position={[-6, 3.3, 2]} args={[0.2, 0.4, 2.5]} />       {/* Above door */}
            <InteractiveDoor position={[-6, 1.5, 2]} rotation={[0, Math.PI / 2, 0]} args={[2.5, 3, 0.12]} color="#4A3728" interactionDistance={3} />

            {/* North Wall (Glass Doors to Backyard) */}
            <GlassWindow position={[0, 1.75, -10]} args={[8, 3, 0.1]} />
            {/* Invisible collision barrier behind glass */}
            <RigidBody type="fixed">
                <Box args={[8, 3, 0.15]} position={[0, 1.75, -10]}>
                    <meshStandardMaterial transparent opacity={0} />
                </Box>
            </RigidBody>
            {/* Wall above glass window to ceiling */}
            <Wall position={[0, 3.35, -10]} args={[8, 0.8, 0.2]} />
            <Wall position={[-5, 1.75, -10]} args={[2, 3.5, 0.2]} />
            <Wall position={[5, 1.75, -10]} args={[2, 3.5, 0.2]} />

            {/* Living Room Furniture - arranged facing TV */}
            {/* Large carpet - charcoal grey outer */}
            <Rug position={[0, 0.12, -6.5]} args={[6, 0.05, 4]} color="#4A4A4A" />
            {/* Inner accent - rich burgundy red */}
            <Rug position={[0, 0.15, -6.5]} args={[5, 0.03, 3.2]} color="#8B1E3F" />

            {/* Main sofa facing TV */}
            <Sofa position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]} />
            {/* Fireplace on west wall - moved to x=-5.5 (for wall at -6) */}
            <InteractiveFireplace position={[-5.5, 0, -6.5]} rotation={[0, Math.PI / 2, 0]} />
            {/* Armchairs on the right */}
            <Armchair position={[3, 0, -5.5]} rotation={[0, -Math.PI / 2, 0]} />
            <Armchair position={[3, 0, -7.5]} rotation={[0, -Math.PI / 2, 0]} />
            {/* Coffee table in center */}
            <CoffeeTable position={[0, 0, -6.5]} />

            {/* Entertainment (Back/North Wall) */}
            <AnimatedTV position={[0, 1.5, -9.3]} rotation={[0, 0, 0]} />
            <TVConsole position={[0, 0, -9.3]} />
            <Bookshelf position={[-3, 0, -9.3]} rotation={[0, 0, 0]} />
            <Bookshelf position={[3, 0, -9.3]} rotation={[0, 0, 0]} />

            {/* === DINING AREA (West of Living) === */}
            {/* Outer Walls - Expanded to x=±14 */}
            {/* Outer Walls - Expanded to x=\u00B118 */}
            <Wall position={[-18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            <Table position={[-12, 0, 0]} args={[2.4, 0.75, 1.2]} color="#5C4033" />
            {/* Dining Chairs (8 around table) */}
            <DiningChair position={[-13.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <DiningChair position={[-10.8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <DiningChair position={[-12.5, 0, 0.8]} rotation={[0, Math.PI, 0]} />
            <DiningChair position={[-11.5, 0, 0.8]} rotation={[0, Math.PI, 0]} />
            <DiningChair position={[-12.5, 0, -0.8]} />
            <DiningChair position={[-11.5, 0, -0.8]} />
            <DiningChair position={[-13.2, 0, 0.5]} rotation={[0, Math.PI / 2, 0]} />
            <DiningChair position={[-10.8, 0, -0.5]} rotation={[0, -Math.PI / 2, 0]} />

            <Chandelier position={[-12, 2.5, 0]} />

            {/* Crockery Cabinet */}
            <RigidBody type="fixed" position={[-13, 0, 0]}>
                <Box args={[0.5, 1.8, 1.2]} position={[0, 0.9, 0]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
            </RigidBody>

            {/* === KITCHEN (North-West Corner - U-Shape) === */}
            {/* North Wall (Window view) - Sink */}
            <Sink position={[-8, 0, -9.5]} />
            <GlassWindow position={[-8, 1.8, -10]} args={[2, 1.5, 0.1]} />

            {/* West Wall (Cooking) - Stove */}
            <Stove position={[-9.5, 0, -7]} />
            <RangeHood position={[-9.5, 2, -7]} />

            {/* South Wall (Storage) - Fridge & Pantry */}
            <Refrigerator position={[-9.5, 0, -4]} />
            <RigidBody type="fixed" position={[-9.5, 0, -2]}>
                <Box args={[0.6, 2, 0.6]} position={[0, 1, 0]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
            </RigidBody>

            {/* Countertops */}
            <KitchenCounter position={[-8, 0.45, -9]} args={[3, 0.9, 0.6]} />
            <KitchenCounter position={[-9.6, 0.45, -6]} args={[0.6, 0.9, 2]} />

            {/* Countertop Appliances */}
            <Box args={[0.35, 0.25, 0.3]} position={[-7, 1.02, -9]}>
                <meshStandardMaterial color="#333" />
            </Box>

            {/* === GUEST BEDROOM (East Wing) === */}
            {/* Only the outer east wall - entrance is from living room's east wall */}
            {/* Outer Walls - Expanded to x=\u00B114 */}
            {/* Outer Walls - Expanded to x=\u00B118 */}
            <Wall position={[18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            <Bed position={[12, 0, -3]} size="queen" color="#3366AA" />
            <Nightstand position={[10.8, 0, -2]} />
            <Nightstand position={[10.8, 0, -4]} />
            <Wardrobe position={[14, 0, -7]} />
            <Desk position={[10, 0, -8.5]} rotation={[0, -Math.PI / 2, 0]} />
            <Chair position={[10.8, 0, -8.5]} rotation={[0, Math.PI / 2, 0]} />

            {/* === GUEST BATHROOM (Near Guest Bedroom) === */}
            <Wall position={[8, 1.75, -9]} args={[4, 3.5, 0.2]} />
            <Door position={[6.5, 1.1, -9]} args={[0.8, 2.2, 0.1]} />

            <Toilet position={[9, 0, -9.5]} rotation={[0, Math.PI, 0]} />
            <Vanity position={[7, 0, -9.5]} />
            <ShowerCubicle position={[8.5, 0, -9.5]} />

            {/* CEILING - Expanded */}
            <Floor position={[0, 3.6, -2.5]} args={[36, 15]} color="#F5F5F0" />

            {/* ===== CEILING LIGHTS ===== */}
            <CeilingLight position={[0, 3.55, 3.5]} intensity={1} /> {/* Foyer */}
            <CeilingLight position={[0, 3.55, -4]} intensity={1.5} /> {/* Living Room */}
            <CeilingLight position={[-3, 3.55, 0]} intensity={1.2} /> {/* Dining (chandelier exists but add ambient) */}
            <CeilingLight position={[-8, 3.55, -7]} intensity={1} /> {/* Kitchen */}
            <CeilingLight position={[9, 3.55, -4]} intensity={0.8} /> {/* Guest Bedroom */}

            {/* STAIRS to First Floor */}
            <Stairs position={[-4, 0, 3]} direction="up" steps={11} />
        </group>
    );
}

// --- First Floor (y=3.8) ---
function FirstFloor() {
    return (
        <group position={[0, 3.8, 0]}>
            {/* Floor */}
            {/* Floor - Expanded */}
            <Floor position={[0, 0.05, -2.5]} args={[36, 15]} color="#B8860B" />

            {/* Exterior Walls */}
            {/* Exterior Walls - Expanded to 28m */}
            <Wall position={[0, 1.75, 5]} args={[36, 3.5, 0.2]} />
            <Wall position={[0, 1.75, -10]} args={[36, 3.5, 0.2]} />
            <Wall position={[-18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />
            <Wall position={[18, 1.75, -2.5]} args={[0.2, 3.5, 15]} />

            {/* === MASTER BEDROOM (Back, above Living Room) === */}
            <Wall position={[0, 1.75, -5]} args={[12, 3.5, 0.2]} />
            <Door position={[-5.5, 1.1, -5]} args={[1, 2.2, 0.1]} />

            {/* Balcony sliding doors */}
            <GlassWindow position={[0, 1.5, -10]} args={[3, 2.8, 0.1]} />

            <Bed position={[3, 0, -7.5]} size="king" color="#880000" />
            <Nightstand position={[1, 0, -6.5]} />
            <Nightstand position={[5, 0, -6.5]} />
            <AnimatedTV position={[-3, 1.5, -7.5]} rotation={[0, Math.PI / 2, 0]} />
            <Armchair position={[-2, 0, -9]} rotation={[0, Math.PI / 4, 0]} />

            {/* Walk-in Closet */}
            <Wall position={[5, 1.75, -8]} args={[0.2, 3.5, 4]} />
            <Door position={[5, 1.1, -6.5]} args={[0.8, 2.2, 0.1]} />
            <Wardrobe position={[7, 0, -7]} />
            <Wardrobe position={[9, 0, -7]} />

            {/* === MASTER BATHROOM (Connected to closet) === */}
            <Wall position={[7, 1.75, -9]} args={[6, 3.5, 0.2]} />
            <Door position={[6, 1.1, -9]} args={[0.8, 2.2, 0.1]} />

            <Bathtub position={[8, 0, -9.5]} />
            <Vanity position={[6.5, 0, -9.7]} double={true} />
            <ShowerCubicle position={[9, 0, -9.5]} />
            <Toilet position={[9.5, 0, -9.5]} rotation={[0, -Math.PI / 2, 0]} />

            {/* === CHILDREN'S BEDROOM (Front, above Guest Room) === */}
            <Wall position={[5, 1.75, 0]} args={[0.2, 3.5, 10]} />
            <Door position={[5, 1.1, -2]} args={[0.8, 2.2, 0.1]} />

            <BunkBed position={[8, 0, 2]} />
            <Desk position={[8, 0, -1]} rotation={[0, Math.PI, 0]} />
            <Chair position={[8, 0, 0]} />
            <Bookshelf position={[9.5, 0, -1]} rotation={[0, -Math.PI / 2, 0]} />
            {/* Toy chest */}
            <RigidBody type="fixed" position={[9, 0, 4]}>
                <Box args={[0.8, 0.5, 0.5]} position={[0, 0.25, 0]}>
                    <meshStandardMaterial color="#AA6633" />
                </Box>
            </RigidBody>

            {/* === HOME OFFICE / STUDY (Near landing) === */}
            <Wall position={[-5, 1.75, 0]} args={[0.2, 3.5, 10]} />
            <Door position={[-5, 1.1, -2]} args={[0.8, 2.2, 0.1]} />

            <Desk position={[-8, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
            <PCSetup position={[-8, 0.75, -2]} />
            <Chair position={[-7, 0, -2]} rotation={[0, -Math.PI / 2, 0]} />
            <FilingCabinet position={[-9.5, 0, -1]} />
            <Bookshelf position={[-9.5, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
            <Bookshelf position={[-9.5, 0, 3]} rotation={[0, Math.PI / 2, 0]} />

            {/* Landing / Hallway area - Stair opening */}
            <Floor position={[-4, 0.05, 3]} args={[2, 4]} color="#555" />

            {/* Balcony (Outside Master Bedroom) */}
            <RigidBody type="fixed">
                <Box args={[4, 0.2, 2]} position={[0, 0, -11.5]}>
                    <meshStandardMaterial color="#666" />
                </Box>
                {/* Railing */}
                <Box args={[4, 1, 0.1]} position={[0, 0.5, -12.4]}>
                    <meshStandardMaterial color="#333" metalness={0.5} />
                </Box>
                <Box args={[0.1, 1, 2]} position={[-2, 0.5, -11.5]}>
                    <meshStandardMaterial color="#333" metalness={0.5} />
                </Box>
                <Box args={[0.1, 1, 2]} position={[2, 0.5, -11.5]}>
                    <meshStandardMaterial color="#333" metalness={0.5} />
                </Box>
            </RigidBody>

            {/* ============ PROPER GABLED ROOF ============ */}
            <RigidBody type="fixed">
                {/* Main roof - front slope */}
                <mesh position={[0, 5.5, 3]} rotation={[Math.PI * 0.2, 0, 0]}>
                    <boxGeometry args={[38, 0.3, 12]} />
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </mesh>
                {/* Main roof - back slope */}
                <mesh position={[0, 5.5, -8]} rotation={[-Math.PI * 0.2, 0, 0]}>
                    <boxGeometry args={[38, 0.3, 12]} />
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </mesh>

                {/* Roof ridge (top beam) */}
                <Box args={[38, 0.4, 0.4]} position={[0, 7.2, -2.5]}>
                    <meshStandardMaterial color="#4A3528" roughness={0.8} />
                </Box>

                {/* Left gable (triangular end) */}
                <mesh position={[-18, 5.5, -2.5]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[11, 4, 0.3]} />
                    <meshStandardMaterial color="#F5E6C8" roughness={0.85} />
                </mesh>
                {/* Right gable (triangular end) */}
                <mesh position={[18, 5.5, -2.5]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[11, 4, 0.3]} />
                    <meshStandardMaterial color="#F5E6C8" roughness={0.85} />
                </mesh>

                {/* Eaves (roof overhang) - front */}
                <Box args={[39, 0.15, 1]} position={[0, 3.8, 5.8]}>
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </Box>
                {/* Eaves - back */}
                <Box args={[39, 0.15, 1]} position={[0, 3.8, -10.8]}>
                    <meshStandardMaterial color="#5D4038" roughness={0.9} />
                </Box>

                {/* Chimney */}
                <Box args={[1.2, 3, 1]} position={[4, 7, -6]}>
                    <meshStandardMaterial color="#8B4513" roughness={0.95} />
                </Box>
                {/* Chimney cap */}
                <Box args={[1.4, 0.15, 1.2]} position={[4, 8.55, -6]}>
                    <meshStandardMaterial color="#555" roughness={0.9} />
                </Box>
            </RigidBody>

            {/* Ceiling lights for first floor */}
            <CeilingLight position={[0, 3.4, -7.5]} intensity={1.5} />
            <CeilingLight position={[8, 3.4, 2]} intensity={1} />
            <CeilingLight position={[-8, 3.4, 2]} intensity={1} />
        </group>
    );
}

// --- Basement (y=-3.5) ---
function Basement() {
    return (
        <group position={[0, -3.5, 0]}>
            <Floor position={[0, 0.05, -2.5]} args={[20, 15]} color="#555555" />

            {/* Walls */}
            <Wall position={[0, 1.75, 5]} args={[20, 3.5, 0.2]} color="#444444" />
            <Wall position={[0, 1.75, -10]} args={[20, 3.5, 0.2]} color="#444444" />
            <Wall position={[-10, 1.75, -2.5]} args={[0.2, 3.5, 15]} color="#444444" />
            <Wall position={[10, 1.75, -2.5]} args={[0.2, 3.5, 15]} color="#444444" />

            {/* === GARAGE (Left side) === */}
            <Wall position={[0, 1.75, -2.5]} args={[0.2, 3.5, 15]} color="#444" />

            {/* Car spaces */}
            <Car position={[-5, 0.5, -5]} color="#2244AA" />
            <Car position={[-5, 0.5, 0]} color="#882222" />

            {/* Wall rack (bicycle, tools) */}
            <RigidBody type="fixed" position={[-9.5, 1.5, -8]}>
                <Box args={[0.1, 1.5, 2]}>
                    <meshStandardMaterial color="#666" metalness={0.5} />
                </Box>
            </RigidBody>

            {/* Car charger */}
            <RigidBody type="fixed" position={[-9.5, 1, -3]}>
                <Box args={[0.2, 0.8, 0.3]}>
                    <meshStandardMaterial color="#333" />
                </Box>
                <Box args={[0.15, 0.1, 0.05]} position={[0.05, 0, 0.18]}>
                    <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.5} />
                </Box>
            </RigidBody>

            {/* Garage door (simplified) */}
            <Box args={[5, 2.5, 0.1]} position={[-5, 1.25, 5.05]}>
                <meshStandardMaterial color="#555" metalness={0.3} />
            </Box>

            {/* === LAUNDRY ROOM (Right side) === */}
            <Door position={[0.5, 1.1, -2.5]} args={[0.8, 2.2, 0.1]} />

            <WashingMachine position={[3, 0, -8]} />
            <WashingMachine position={[4, 0, -8]} />

            {/* Utility sink */}
            <RigidBody type="fixed" position={[6, 0, -8]}>
                <Box args={[0.6, 0.9, 0.5]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#AAA" />
                </Box>
            </RigidBody>

            {/* Shelves with detergents */}
            <RigidBody type="fixed" position={[8, 1.2, -9.5]}>
                <Box args={[3, 0.1, 0.4]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
            </RigidBody>
            <RigidBody type="fixed" position={[8, 1.8, -9.5]}>
                <Box args={[3, 0.1, 0.4]}>
                    <meshStandardMaterial color="#5C4033" />
                </Box>
            </RigidBody>

            {/* Ironing board (folded) */}
            <Box args={[0.1, 1.2, 0.4]} position={[9.5, 0.6, -5]}>
                <meshStandardMaterial color="#888" />
            </Box>

            {/* Stairs from Kitchen */}
            <Stairs position={[2, 0, 3]} direction="up" steps={10} />

            {/* Ceiling */}
            <Floor position={[0, 3.4, -2.5]} args={[20, 15]} color="#444" />
        </group>
    );
}

const Exterior = () => {
    return (
        <group>
            {/* ============ SYMMETRIC PATHWAYS ============ */}
            <RigidBody type="fixed">
                {/* Main walkway - centered, leading to front porch */}
                <Box args={[4, 0.1, 12]} position={[0, 0.06, 12]} receiveShadow>
                    <meshStandardMaterial color="#555555" roughness={0.9} />
                </Box>

                {/* Porch connection - widens at the porch */}
                <Box args={[6, 0.1, 4]} position={[0, 0.06, 7.5]} receiveShadow>
                    <meshStandardMaterial color="#555555" roughness={0.9} />
                </Box>
            </RigidBody>

            {/* Gate posts removed for cleaner entrance */}

            {/* ============ FRONT PORCH ============ */}
            <group position={[0, 0, 6]}>
                {/* Porch floor */}
                <RigidBody type="fixed">
                    <Box args={[6, 0.2, 3]} position={[0, 0.1, 0]} receiveShadow>
                        <meshStandardMaterial color="#8B7355" roughness={0.85} />
                    </Box>
                </RigidBody>

                {/* Porch steps */}
                <RigidBody type="fixed">
                    <Box args={[4, 0.15, 0.4]} position={[0, -0.08, 1.7]} receiveShadow>
                        <meshStandardMaterial color="#8B7355" roughness={0.85} />
                    </Box>
                    <Box args={[4, 0.15, 0.4]} position={[0, -0.23, 2.1]} receiveShadow>
                        <meshStandardMaterial color="#8B7355" roughness={0.85} />
                    </Box>
                </RigidBody>

                {/* Porch columns */}
                {[[-2.5, 1.4], [2.5, 1.4]].map(([x, z], i) => (
                    <Cylinder key={i} args={[0.15, 0.15, 3.3, 16]} position={[x, 1.65, z]}>
                        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
                    </Cylinder>
                ))}

                {/* Porch roof */}
                <RigidBody type="fixed">
                    <Box args={[6.5, 0.2, 3.5]} position={[0, 3.4, 0.5]}>
                        <meshStandardMaterial color="#5D4038" roughness={0.9} />
                    </Box>
                </RigidBody>

                {/* Porch light */}
                <mesh position={[0, 2.8, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#FFFEF0" emissive="#FFF8DC" emissiveIntensity={0.8} />
                </mesh>
                <pointLight position={[0, 2.5, 0]} intensity={1} distance={8} color="#FFF8DC" />
            </group>

            {/* Front Lawn - path lights removed for cleaner look */}

            {/* Backyard */}
            <group position={[0, 0, -15]}>
                {/* Patio concrete slab */}
                <RigidBody type="fixed">
                    <Box args={[8, 0.1, 6]} position={[0, 0, 0]} receiveShadow>
                        <meshStandardMaterial color="#888" roughness={0.8} />
                    </Box>
                </RigidBody>

                {/* BBQ Grill (corner) */}
                <BBQGrill position={[3, 0, -2]} />

                {/* Outdoor table set */}
                <OutdoorTable position={[-1, 0, -1]} />

                {/* Garden area */}
                <RigidBody type="fixed">
                    <Box args={[6, 0.1, 8]} position={[-6, 0, -2]} receiveShadow>
                        <meshStandardMaterial color="#3A5F0B" roughness={0.95} />
                    </Box>
                </RigidBody>

                {/* Shed (far left corner) */}
                <Shed position={[-8, 0, -5]} />
            </group>
        </group>
    );
};

export function House(props) {
    return (
        <group {...props}>
            <GroundFloor />
            <FirstFloor />
            <Basement />
            <Exterior />
        </group>
    );
}