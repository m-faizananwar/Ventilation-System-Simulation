import React from 'react';
import { Wall, Floor, Door, GlassWindow, CeilingLight, FLOOR_COLORS, InteractiveDoor } from './HouseStructure';
import { Box, Cylinder, Sphere } from '@react-three/drei';
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

// Interactive Refrigerator with opening doors and food inside
const InteractiveRefrigerator = ({ position, rotation = [0, 0, 0], interactionDistance = 3 }) => {
    const [freezerOpen, setFreezerOpen] = useState(false);
    const [fridgeOpen, setFridgeOpen] = useState(false);
    const [isNearby, setIsNearby] = useState(false);
    const groupRef = useRef();
    const fridgeRef = useRef();
    const freezerDoorRef = useRef();
    const fridgeDoorRef = useRef();
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);

    // Handle keyboard input for individual door control
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isNearby) return;

            if (e.key === '1') {
                setFreezerOpen(prev => !prev);
            } else if (e.key === '2') {
                setFridgeOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isNearby]);

    useFrame((state, delta) => {
        if (!groupRef.current || !fridgeRef.current) return;

        const fridgePos = groupRef.current.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(fridgePos);

        const isClose = distance < interactionDistance;

        let isLookingAt = false;
        if (isClose) {
            raycaster.setFromCamera({ x: 0, y: 0 }, camera);
            const intersects = raycaster.intersectObject(fridgeRef.current, true);
            isLookingAt = intersects.length > 0;
        }

        const nowNearby = isClose && isLookingAt;
        if (nowNearby !== isNearby) {
            setIsNearby(nowNearby);
        }

        // Handle E key press - toggle both doors
        const { interact } = getKeys();
        if (nowNearby && interact && !lastInteract.current) {
            const bothOpen = freezerOpen && fridgeOpen;
            setFreezerOpen(!bothOpen);
            setFridgeOpen(!bothOpen);
        }
        lastInteract.current = interact;

        // Animate freezer door (top) - swings down
        const freezerTarget = freezerOpen ? -Math.PI / 3 : 0;
        if (freezerDoorRef.current) {
            freezerDoorRef.current.rotation.x += (freezerTarget - freezerDoorRef.current.rotation.x) * 0.1;
        }

        // Animate fridge door (bottom) - swings open
        const fridgeTarget = fridgeOpen ? Math.PI / 2 : 0;
        if (fridgeDoorRef.current) {
            fridgeDoorRef.current.rotation.y += (fridgeTarget - fridgeDoorRef.current.rotation.y) * 0.1;
        }
    });

    // Control panel effect
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('showFridgeControl', {
            detail: {
                show: isNearby,
                freezerOpen,
                fridgeOpen
            }
        }));
    }, [isNearby, freezerOpen, fridgeOpen]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Hollow shell structure - so interior is visible */}
                {/* Back panel */}
                <Box ref={fridgeRef} args={[1.0, 2.2, 0.1]} position={[0, 1.1, -0.375]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Left side panel */}
                <Box args={[0.1, 2.2, 0.85]} position={[-0.45, 1.1, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Right side panel */}
                <Box args={[0.1, 2.2, 0.85]} position={[0.45, 1.1, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Top panel */}
                <Box args={[1.0, 0.1, 0.85]} position={[0, 2.15, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Bottom panel */}
                <Box args={[1.0, 0.1, 0.85]} position={[0, 0.05, 0]}>
                    <meshStandardMaterial color="#E8E8E8" metalness={0.4} roughness={0.3} />
                </Box>
                {/* Division line between freezer and fridge */}
                <Box args={[0.82, 0.04, 0.75]} position={[0, 1.55, 0]}>
                    <meshStandardMaterial color="#555555" metalness={0.6} />
                </Box>
            </RigidBody>

            {/* Freezer Door (top) */}
            <group ref={freezerDoorRef} position={[0, 2.15, 0.42]}>
                <Box args={[0.98, 0.55, 0.05]} position={[0, -0.275, 0]}>
                    <meshStandardMaterial color="#D8D8D8" metalness={0.5} roughness={0.3} />
                </Box>
                <Box args={[0.3, 0.03, 0.05]} position={[0, -0.5, 0.03]}>
                    <meshStandardMaterial color="#888888" metalness={0.8} />
                </Box>
            </group>

            {/* Fridge Door (bottom) */}
            <group ref={fridgeDoorRef} position={[0.48, 0, 0.42]}>
                <Box args={[0.98, 1.25, 0.05]} position={[-0.49, 0.78, 0]}>
                    <meshStandardMaterial color="#E0E0E0" metalness={0.5} roughness={0.3} />
                </Box>
                <Box args={[0.03, 0.25, 0.05]} position={[-0.95, 1.0, 0.03]}>
                    <meshStandardMaterial color="#888888" metalness={0.8} />
                </Box>
            </group>

            {/* Freezer Interior */}
            {freezerOpen && (
                <group>
                    {/* Freezer floor - items sit on this */}
                    <Box args={[0.76, 0.03, 0.5]} position={[0, 1.58, -0.05]}>
                        <meshStandardMaterial color="#E0EEF2" />
                    </Box>

                    {/* Freezer interior walls - icy white */}
                    <Box args={[0.76, 0.5, 0.02]} position={[0, 1.82, -0.28]}>
                        <meshStandardMaterial color="#E8F4F8" />
                    </Box>
                    <Box args={[0.02, 0.5, 0.45]} position={[-0.37, 1.82, -0.05]}>
                        <meshStandardMaterial color="#E0F0F5" />
                    </Box>
                    <Box args={[0.02, 0.5, 0.45]} position={[0.37, 1.82, -0.05]}>
                        <meshStandardMaterial color="#E0F0F5" />
                    </Box>

                    {/* Frozen food package 1 - pizza box (sitting on floor) */}
                    <group position={[-0.2, 1.62, -0.08]}>
                        <Box args={[0.18, 0.04, 0.18]}>
                            <meshStandardMaterial color="#E53935" />
                        </Box>
                        <Box args={[0.14, 0.005, 0.14]} position={[0, 0.023, 0]}>
                            <meshStandardMaterial color="#FFEB3B" />
                        </Box>
                    </group>

                    {/* Frozen food package 2 - vegetables bag (standing on floor) */}
                    <group position={[0.05, 1.67, -0.08]}>
                        <Box args={[0.1, 0.12, 0.05]}>
                            <meshStandardMaterial color="#4CAF50" transparent opacity={0.9} />
                        </Box>
                    </group>

                    {/* Ice cream container (on floor) */}
                    <group position={[0.25, 1.64, -0.1]}>
                        <Cylinder args={[0.055, 0.055, 0.09, 12]}>
                            <meshStandardMaterial color="#5D4037" />
                        </Cylinder>
                        <Cylinder args={[0.057, 0.057, 0.015, 12]} position={[0, 0.05, 0]}>
                            <meshStandardMaterial color="#795548" />
                        </Cylinder>
                    </group>

                    {/* Subtle cold light */}
                    <pointLight position={[0, 1.85, 0]} color="#E8F4FF" intensity={0.6} distance={0.8} />
                </group>
            )}

            {/* Fridge Interior */}
            {fridgeOpen && (
                <group>
                    {/* White interior back */}
                    <Box args={[0.78, 1.4, 0.02]} position={[0, 0.78, -0.3]}>
                        <meshStandardMaterial color="#F8F8F8" />
                    </Box>
                    {/* White interior sides */}
                    <Box args={[0.02, 1.4, 0.5]} position={[-0.38, 0.78, 0]}>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                    <Box args={[0.02, 1.4, 0.5]} position={[0.38, 0.78, 0]}>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>

                    {/* Glass shelves */}
                    <Box args={[0.72, 0.015, 0.45]} position={[0, 0.35, -0.05]}>
                        <meshStandardMaterial color="#D0E8F0" transparent opacity={0.4} />
                    </Box>
                    <Box args={[0.72, 0.015, 0.45]} position={[0, 0.75, -0.05]}>
                        <meshStandardMaterial color="#D0E8F0" transparent opacity={0.4} />
                    </Box>
                    <Box args={[0.72, 0.015, 0.45]} position={[0, 1.15, -0.05]}>
                        <meshStandardMaterial color="#D0E8F0" transparent opacity={0.4} />
                    </Box>

                    {/* ===== BOTTOM SHELF ITEMS ===== */}
                    {/* Milk carton - realistic with label */}
                    <group position={[-0.25, 0.5, -0.1]}>
                        <Box args={[0.08, 0.24, 0.08]}>
                            <meshStandardMaterial color="#FFFFFF" />
                        </Box>
                        <Box args={[0.075, 0.04, 0.075]} position={[0, 0.13, 0]}>
                            <meshStandardMaterial color="#1976D2" />
                        </Box>
                        <Box args={[0.06, 0.08, 0.005]} position={[0, 0, 0.04]}>
                            <meshStandardMaterial color="#42A5F5" />
                        </Box>
                    </group>

                    {/* Orange juice bottle */}
                    <group position={[-0.05, 0.47, -0.1]}>
                        <Cylinder args={[0.04, 0.04, 0.2, 12]}>
                            <meshStandardMaterial color="#FF9800" transparent opacity={0.8} />
                        </Cylinder>
                        <Cylinder args={[0.025, 0.025, 0.04, 12]} position={[0, 0.12, 0]}>
                            <meshStandardMaterial color="#E65100" />
                        </Cylinder>
                    </group>

                    {/* Egg carton */}
                    <group position={[0.2, 0.4, -0.08]}>
                        <Box args={[0.18, 0.06, 0.1]}>
                            <meshStandardMaterial color="#D7CCC8" />
                        </Box>
                        {/* Individual eggs */}
                        {[[-0.05, 0], [0.05, 0], [-0.05, 0.03], [0.05, 0.03]].map(([x, z], i) => (
                            <Sphere key={i} args={[0.025, 8, 8]} position={[x, 0.04, z - 0.015]}>
                                <meshStandardMaterial color="#FFF8E1" />
                            </Sphere>
                        ))}
                    </group>

                    {/* ===== MIDDLE SHELF ITEMS ===== */}
                    {/* Lettuce/cabbage */}
                    <Sphere args={[0.08, 12, 12]} position={[-0.22, 0.86, -0.1]}>
                        <meshStandardMaterial color="#81C784" roughness={0.8} />
                    </Sphere>

                    {/* Tomatoes */}
                    <Sphere args={[0.05, 12, 12]} position={[0, 0.82, -0.08]}>
                        <meshStandardMaterial color="#E53935" roughness={0.4} />
                    </Sphere>
                    <Sphere args={[0.045, 12, 12]} position={[0.12, 0.81, -0.12]}>
                        <meshStandardMaterial color="#EF5350" roughness={0.4} />
                    </Sphere>

                    {/* Cucumber */}
                    <Cylinder args={[0.025, 0.025, 0.15, 8]} position={[0.25, 0.82, -0.1]} rotation={[0, 0, Math.PI / 2]}>
                        <meshStandardMaterial color="#388E3C" roughness={0.6} />
                    </Cylinder>

                    {/* ===== TOP SHELF ITEMS ===== */}
                    {/* Apples */}
                    <Sphere args={[0.055, 12, 12]} position={[-0.2, 1.22, -0.1]}>
                        <meshStandardMaterial color="#C62828" roughness={0.3} />
                    </Sphere>
                    <Sphere args={[0.055, 12, 12]} position={[-0.05, 1.22, -0.08]}>
                        <meshStandardMaterial color="#43A047" roughness={0.3} />
                    </Sphere>

                    {/* Orange */}
                    <Sphere args={[0.055, 12, 12]} position={[0.1, 1.22, -0.1]}>
                        <meshStandardMaterial color="#FB8C00" roughness={0.5} />
                    </Sphere>

                    {/* Butter/cheese block */}
                    <Box args={[0.1, 0.04, 0.06]} position={[0.25, 1.19, -0.08]}>
                        <meshStandardMaterial color="#FFE082" />
                    </Box>

                    {/* Subtle interior light - not too bright */}
                    <pointLight position={[0, 1.3, -0.1]} color="#FFFEF0" intensity={1.5} distance={1.5} />
                </group>
            )}
        </group>
    );
};

// Interactive Stove with animated burner flames
const InteractiveStove = ({ position, rotation = [0, 0, 0], interactionDistance = 3 }) => {
    const [burnersOn, setBurnersOn] = useState([false, false, false, false]);
    const [isNearby, setIsNearby] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const groupRef = useRef();
    const stoveRef = useRef();
    const flameRefs = [useRef(), useRef(), useRef(), useRef()];
    const lightRefs = [useRef(), useRef(), useRef(), useRef()];
    const { camera, raycaster } = useThree();
    const [, getKeys] = useKeyboardControls();
    const lastInteract = useRef(false);
    const timeRef = useRef(0);

    // Burner positions (larger stove) and labels
    const burnerPositions = [
        [-0.35, 1.02, -0.25],  // Front left (1)
        [0.35, 1.02, -0.25],   // Front right (2)
        [-0.35, 1.02, 0.25],   // Back left (3)
        [0.35, 1.02, 0.25]     // Back right (4)
    ];
    const burnerLabels = ['Front Left', 'Front Right', 'Back Left', 'Back Right'];

    // Handle keyboard input for individual burner control
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showMenu) return;

            const key = e.key;
            if (key >= '1' && key <= '4') {
                const burnerIndex = parseInt(key) - 1;
                setBurnersOn(prev => {
                    const newState = [...prev];
                    newState[burnerIndex] = !newState[burnerIndex];
                    return newState;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showMenu]);

    useFrame((state, delta) => {
        if (!groupRef.current || !stoveRef.current) return;

        const stovePos = groupRef.current.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(stovePos);

        const isClose = distance < interactionDistance;

        let isLookingAt = false;
        if (isClose) {
            raycaster.setFromCamera({ x: 0, y: 0 }, camera);
            const intersects = raycaster.intersectObject(stoveRef.current, true);
            isLookingAt = intersects.length > 0;
        }

        const wasNearby = isNearby;
        const nowNearby = isClose && isLookingAt;

        if (nowNearby !== wasNearby) {
            setIsNearby(nowNearby);
            setShowMenu(nowNearby);
        }

        // Handle E key press - toggle all burners
        const { interact } = getKeys();
        if (nowNearby && interact && !lastInteract.current) {
            const allOn = burnersOn.every(b => b);
            setBurnersOn(allOn ? [false, false, false, false] : [true, true, true, true]);
        }
        lastInteract.current = interact;

        // Animate flames when burners are on
        timeRef.current += delta * 10;
        const t = timeRef.current;

        burnersOn.forEach((isOn, i) => {
            if (isOn && flameRefs[i].current) {
                // Flickering flame animation
                flameRefs[i].current.scale.x = 1 + Math.sin(t * (4 + i * 0.5)) * 0.15;
                flameRefs[i].current.scale.y = 1 + Math.sin(t * (5 + i * 0.3)) * 0.15;
                flameRefs[i].current.scale.z = 1 + Math.sin(t * (4.5 + i * 0.4)) * 0.2;
            }
            if (isOn && lightRefs[i].current) {
                lightRefs[i].current.intensity = 1.5 + Math.sin(t * (6 + i)) * 0.5;
            }
        });
    });

    // Stove control panel effect
    useEffect(() => {
        // Dispatch stove control panel event for visual UI
        window.dispatchEvent(new CustomEvent('showStoveControl', {
            detail: {
                show: isNearby,
                burners: burnersOn
            }
        }));
    }, [isNearby, burnersOn]);

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <RigidBody type="fixed">
                {/* Stove Body - Larger size */}
                <Box ref={stoveRef} args={[1.2, 1.0, 0.8]} position={[0, 0.5, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
                </Box>

                {/* Oven Door */}
                <Box args={[0.9, 0.5, 0.05]} position={[0, 0.35, 0.42]}>
                    <meshStandardMaterial color="#222222" metalness={0.4} roughness={0.5} />
                </Box>
                {/* Oven Door Handle */}
                <Box args={[0.6, 0.04, 0.04]} position={[0, 0.55, 0.46]}>
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Oven Window */}
                <Box args={[0.5, 0.3, 0.02]} position={[0, 0.3, 0.44]}>
                    <meshStandardMaterial color="#111111" metalness={0.5} transparent opacity={0.7} />
                </Box>

                {/* Cooktop surface */}
                <Box args={[1.15, 0.04, 0.75]} position={[0, 1.0, 0]}>
                    <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.3} />
                </Box>

                {/* Control Knobs */}
                {[-0.4, -0.15, 0.15, 0.4].map((x, i) => (
                    <Cylinder key={i} args={[0.04, 0.04, 0.03, 16]} position={[x, 0.75, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color={burnersOn[i] ? "#ff4400" : "#444444"} metalness={0.6} />
                    </Cylinder>
                ))}
            </RigidBody>

            {/* Burner Grates and Flames */}
            {burnerPositions.map(([x, y, z], i) => (
                <group key={i}>
                    {/* Burner Ring - horizontal */}
                    <mesh position={[x, y - 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.12, 0.02, 8, 24]} />
                        <meshStandardMaterial color="#333333" metalness={0.5} />
                    </mesh>

                    {/* Grate */}
                    <Box args={[0.25, 0.02, 0.02]} position={[x, y, z]}>
                        <meshStandardMaterial color="#222222" metalness={0.4} />
                    </Box>
                    <Box args={[0.02, 0.02, 0.25]} position={[x, y, z]}>
                        <meshStandardMaterial color="#222222" metalness={0.4} />
                    </Box>

                    {/* Flame - only visible when burner is on - HORIZONTAL */}
                    {burnersOn[i] && (
                        <>
                            {/* Blue flame ring - horizontal */}
                            <mesh ref={flameRefs[i]} position={[x, y + 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[0.1, 0.02, 8, 32]} />
                                <meshStandardMaterial
                                    color="#3388ff"
                                    emissive="#2266ff"
                                    emissiveIntensity={3}
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>
                            {/* Inner orange flame ring - horizontal */}
                            <mesh position={[x, y + 0.025, z]} rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[0.08, 0.015, 8, 32]} />
                                <meshStandardMaterial
                                    color="#ff6600"
                                    emissive="#ff4400"
                                    emissiveIntensity={2.5}
                                    transparent
                                    opacity={0.85}
                                />
                            </mesh>
                            {/* Point light for flame glow */}
                            <pointLight
                                ref={lightRefs[i]}
                                position={[x, y + 0.08, z]}
                                color="#ff6633"
                                intensity={1.5}
                                distance={2}
                            />
                        </>
                    )}
                </group>
            ))}
        </group>
    );
};

// Realistic Range Hood with lighting
const RealisticRangeHood = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        <RigidBody type="fixed">
            {/* Main hood body - trapezoid shape */}
            <Box args={[1.3, 0.15, 0.9]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#CCCCCC" metalness={0.7} roughness={0.3} />
            </Box>
            {/* Hood canopy */}
            <Box args={[1.2, 0.4, 0.8]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#AAAAAA" metalness={0.6} roughness={0.3} />
            </Box>
            {/* Vent chimney */}
            <Box args={[0.4, 0.8, 0.3]} position={[0, 0.65, 0]}>
                <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.4} />
            </Box>

            {/* Vent slats */}
            {[-0.3, 0, 0.3].map((x, i) => (
                <Box key={i} args={[0.25, 0.02, 0.6]} position={[x, -0.05, 0]}>
                    <meshStandardMaterial color="#666666" metalness={0.6} />
                </Box>
            ))}

            {/* Hood lights */}
            <Box args={[0.1, 0.05, 0.1]} position={[-0.3, -0.1, 0]}>
                <meshStandardMaterial color="#FFFFCC" emissive="#FFFF99" emissiveIntensity={0.5} />
            </Box>
            <Box args={[0.1, 0.05, 0.1]} position={[0.3, -0.1, 0]}>
                <meshStandardMaterial color="#FFFFCC" emissive="#FFFF99" emissiveIntensity={0.5} />
            </Box>
        </RigidBody>

        {/* Subtle down lighting */}
        <pointLight position={[0, -0.2, 0]} color="#FFFEF0" intensity={0.5} distance={3} />
    </group>
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

            {/* === KITCHEN (North-West Corner - L-Shape against walls) === */}

            {/* --- KITCHEN BACK WALL (North Wall at z=-10) - Single solid wall --- */}
            <Wall position={[-12, 1.75, -10]} args={[12, 3.5, 0.2]} />

            {/* --- SIDE WALL (West Wall at x=-18) - Stove & Refrigerator --- */}
            {/* Interactive Refrigerator - against west wall, facing room */}
            <InteractiveRefrigerator position={[-17.4, 0, -8.5]} rotation={[0, Math.PI / 2, 0]} interactionDistance={3} />

            {/* Interactive Stove with animated burners - attached to west wall */}
            <InteractiveStove position={[-17.5, 0, -5.5]} rotation={[0, Math.PI / 2, 0]} interactionDistance={4} />
            {/* Realistic Range Hood above stove - attached to wall */}
            <RealisticRangeHood position={[-17.5, 2.0, -5.5]} rotation={[0, Math.PI / 2, 0]} />

            {/* ===== MODERN KITCHEN DESIGN ===== */}

            {/* === WALL CABINETS (Along back wall) === */}
            {/* Lower cabinets - olive green */}
            <RigidBody type="fixed" position={[-12, 0, -9.5]}>
                {/* Cabinet base */}
                <Box args={[6, 0.9, 0.6]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
                {/* Marble countertop */}
                <Box args={[6.1, 0.05, 0.65]} position={[0, 0.93, 0]}>
                    <meshStandardMaterial color="#F5F5F5" metalness={0.1} roughness={0.3} />
                </Box>
                {/* Backsplash */}
                <Box args={[6, 0.6, 0.05]} position={[0, 1.3, -0.28]}>
                    <meshStandardMaterial color="#D4C4A8" />
                </Box>
            </RigidBody>

            {/* Modern Kitchen Sink - visible above counter */}
            <group position={[-12, 0.96, -9.3]}>
                {/* Sink rim/edge - visible from above */}
                <Box args={[0.6, 0.03, 0.45]}>
                    <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Sink basin walls */}
                <Box args={[0.55, 0.2, 0.02]} position={[0, -0.1, 0.21]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                <Box args={[0.55, 0.2, 0.02]} position={[0, -0.1, -0.21]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                <Box args={[0.02, 0.2, 0.4]} position={[0.27, -0.1, 0]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                <Box args={[0.02, 0.2, 0.4]} position={[-0.27, -0.1, 0]}>
                    <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
                </Box>
                {/* Sink bottom */}
                <Box args={[0.52, 0.02, 0.38]} position={[0, -0.19, 0]}>
                    <meshStandardMaterial color="#707070" metalness={0.8} roughness={0.2} />
                </Box>
                {/* Drain */}
                <Cylinder args={[0.025, 0.025, 0.03, 12]} position={[0, -0.18, 0]}>
                    <meshStandardMaterial color="#4A4A4A" metalness={0.9} />
                </Cylinder>
            </group>

            {/* Modern Gooseneck Faucet */}
            <group position={[-12, 0.96, -9.65]}>
                {/* Faucet base plate */}
                <Cylinder args={[0.04, 0.04, 0.02, 16]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Faucet vertical neck */}
                <Cylinder args={[0.018, 0.018, 0.28, 12]} position={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Gooseneck curve */}
                <Cylinder args={[0.015, 0.015, 0.2, 12]} position={[0, 0.26, 0.1]} rotation={[Math.PI / 2.2, 0, 0]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Spout end */}
                <Cylinder args={[0.012, 0.008, 0.05, 8]} position={[0, 0.17, 0.22]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Cylinder>
                {/* Lever handle */}
                <Box args={[0.07, 0.015, 0.025]} position={[0, 0.3, -0.02]}>
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
                </Box>
            </group>

            {/* Upper cabinets - olive green */}
            <RigidBody type="fixed" position={[-12, 1.8, -9.65]}>
                <Box args={[6, 0.8, 0.4]} position={[0, 0.4, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
            </RigidBody>

            {/* Under-cabinet lighting strip */}
            <Box args={[5.8, 0.02, 0.1]} position={[-12, 1.62, -9.5]}>
                <meshStandardMaterial color="#FFFDE7" emissive="#FFFDE7" emissiveIntensity={0.3} />
            </Box>

            {/* === KITCHEN ISLAND WITH MARBLE TOP === */}
            <RigidBody type="fixed" position={[-12, 0, -6]}>
                {/* Island base - olive green */}
                <Box args={[3.5, 0.9, 1.2]} position={[0, 0.45, 0]}>
                    <meshStandardMaterial color="#6B8E23" />
                </Box>
                {/* Marble countertop - extends on one side */}
                <Box args={[3.8, 0.08, 1.5]} position={[0, 0.94, 0.15]}>
                    <meshStandardMaterial color="#F8F8F8" metalness={0.05} roughness={0.2} />
                </Box>
                {/* Marble side extension (for seating) */}
                <Box args={[0.15, 0.6, 1.5]} position={[-1.8, 0.6, 0.15]}>
                    <meshStandardMaterial color="#F0F0F0" metalness={0.05} roughness={0.2} />
                </Box>
            </RigidBody>

            {/* === BAR STOOLS (4 stools along island) === */}
            {[-13.2, -12.4, -11.6, -10.8].map((x, i) => (
                <group key={i} position={[x, 0, -5.2]}>
                    {/* Stool seat - wooden */}
                    <Cylinder args={[0.18, 0.2, 0.05, 16]} position={[0, 0.75, 0]}>
                        <meshStandardMaterial color="#8B6914" roughness={0.6} />
                    </Cylinder>
                    {/* Metal legs */}
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[-0.1, 0.38, -0.1]} rotation={[0.1, 0, 0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[0.1, 0.38, -0.1]} rotation={[0.1, 0, -0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[-0.1, 0.38, 0.1]} rotation={[-0.1, 0, 0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                    <Cylinder args={[0.015, 0.015, 0.75, 6]} position={[0.1, 0.38, 0.1]} rotation={[-0.1, 0, -0.1]}>
                        <meshStandardMaterial color="#2C2C2C" metalness={0.7} />
                    </Cylinder>
                </group>
            ))}

            {/* === PENDANT LIGHTS ABOVE ISLAND === */}
            {[-12.8, -11.2].map((x, i) => (
                <group key={i} position={[x, 2.5, -6]}>
                    {/* Cord */}
                    <Cylinder args={[0.008, 0.008, 0.5, 6]}>
                        <meshStandardMaterial color="#333333" />
                    </Cylinder>
                    {/* Dome shade */}
                    <Sphere args={[0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, -0.35, 0]}>
                        <meshStandardMaterial color="#757575" metalness={0.7} roughness={0.3} side={2} />
                    </Sphere>
                    {/* Light */}
                    <pointLight position={[0, -0.4, 0]} color="#FFF8E1" intensity={1.5} distance={4} />
                </group>
            ))}

            {/* === REALISTIC KITCHEN ITEMS ON BACK COUNTER === */}

            {/* Grocery bag with items peeking out */}
            <group position={[-14.5, 0.96, -9.35]}>
                {/* Paper bag */}
                <Box args={[0.2, 0.25, 0.12]} position={[0, 0.13, 0]}>
                    <meshStandardMaterial color="#C4A776" roughness={0.9} />
                </Box>
                {/* Celery sticking out */}
                <Cylinder args={[0.015, 0.015, 0.15, 6]} position={[-0.05, 0.3, 0]} rotation={[0.1, 0, 0.15]}>
                    <meshStandardMaterial color="#8BC34A" />
                </Cylinder>
                {/* Baguette sticking out */}
                <Cylinder args={[0.025, 0.02, 0.18, 8]} position={[0.05, 0.32, 0.02]} rotation={[-0.1, 0, -0.1]}>
                    <meshStandardMaterial color="#D4A574" roughness={0.7} />
                </Cylinder>
            </group>

            {/* Milk carton */}
            <group position={[-13.8, 0.96, -9.4]}>
                <Box args={[0.08, 0.22, 0.08]} position={[0, 0.11, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                </Box>
                {/* Blue cap */}
                <Box args={[0.06, 0.03, 0.06]} position={[0, 0.23, 0]}>
                    <meshStandardMaterial color="#1976D2" />
                </Box>
                {/* Label */}
                <Box args={[0.075, 0.1, 0.001]} position={[0, 0.1, 0.041]}>
                    <meshStandardMaterial color="#42A5F5" />
                </Box>
            </group>

            {/* Bread loaf in wrapper */}
            <group position={[-13.3, 0.96, -9.35]}>
                <Box args={[0.12, 0.1, 0.25]} position={[0, 0.05, 0]}>
                    <meshStandardMaterial color="#FFE0B2" transparent opacity={0.7} />
                </Box>
                {/* Bread inside */}
                <Box args={[0.1, 0.08, 0.22]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#D7A86E" roughness={0.8} />
                </Box>
                {/* Twist tie */}
                <Box args={[0.08, 0.01, 0.01]} position={[0, 0.08, 0.12]}>
                    <meshStandardMaterial color="#F44336" />
                </Box>
            </group>

            {/* Fruit bowl */}
            <group position={[-12.5, 0.96, -9.35]}>
                {/* Bowl */}
                <Cylinder args={[0.15, 0.12, 0.08, 16]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#ECEFF1" />
                </Cylinder>
                {/* Apples */}
                <Sphere args={[0.045, 10, 10]} position={[-0.04, 0.12, 0]}>
                    <meshStandardMaterial color="#C62828" roughness={0.4} />
                </Sphere>
                <Sphere args={[0.04, 10, 10]} position={[0.04, 0.11, 0.03]}>
                    <meshStandardMaterial color="#43A047" roughness={0.4} />
                </Sphere>
                {/* Orange */}
                <Sphere args={[0.045, 10, 10]} position={[0, 0.13, -0.04]}>
                    <meshStandardMaterial color="#FF9800" roughness={0.5} />
                </Sphere>
                {/* Banana */}
                <Cylinder args={[0.02, 0.015, 0.12, 6]} position={[0.06, 0.1, -0.02]} rotation={[0.3, 0.5, 0.2]}>
                    <meshStandardMaterial color="#FFEB3B" roughness={0.6} />
                </Cylinder>
            </group>

            {/* Coffee maker */}
            <group position={[-11.8, 0.96, -9.45]}>
                {/* Base */}
                <Box args={[0.2, 0.05, 0.15]} position={[0, 0.025, 0]}>
                    <meshStandardMaterial color="#212121" />
                </Box>
                {/* Carafe */}
                <Cylinder args={[0.06, 0.05, 0.12, 12]} position={[0, 0.11, 0.02]}>
                    <meshStandardMaterial color="#111111" transparent opacity={0.8} />
                </Cylinder>
                {/* Top unit */}
                <Box args={[0.18, 0.15, 0.12]} position={[0, 0.13, -0.02]}>
                    <meshStandardMaterial color="#212121" />
                </Box>
            </group>

            {/* Cereal box */}
            <group position={[-11.2, 0.96, -9.42]}>
                <Box args={[0.06, 0.25, 0.18]} position={[0, 0.125, 0]}>
                    <meshStandardMaterial color="#FFC107" />
                </Box>
                {/* Label area */}
                <Box args={[0.001, 0.15, 0.12]} position={[0.031, 0.12, 0]}>
                    <meshStandardMaterial color="#FF5722" />
                </Box>
            </group>

            {/* Cutting board with knife */}
            <group position={[-10.5, 0.96, -9.38]}>
                <Box args={[0.25, 0.015, 0.18]} rotation={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#A1887F" roughness={0.7} />
                </Box>
                {/* Knife */}
                <Box args={[0.18, 0.003, 0.025]} position={[0.05, 0.015, 0.04]}>
                    <meshStandardMaterial color="#BDBDBD" metalness={0.8} />
                </Box>
                <Box args={[0.06, 0.012, 0.02]} position={[-0.06, 0.015, 0.04]}>
                    <meshStandardMaterial color="#5D4037" />
                </Box>
            </group>

            {/* Cooking oil bottle */}
            <group position={[-9.9, 0.96, -9.42]}>
                <Cylinder args={[0.035, 0.035, 0.18, 12]} position={[0, 0.09, 0]}>
                    <meshStandardMaterial color="#FFEB3B" transparent opacity={0.7} />
                </Cylinder>
                <Cylinder args={[0.015, 0.015, 0.03, 8]} position={[0, 0.19, 0]}>
                    <meshStandardMaterial color="#795548" />
                </Cylinder>
            </group>

            {/* Spice jars */}
            {[-9.5, -9.3, -9.1].map((x, i) => (
                <group key={i} position={[x, 0.96, -9.42]}>
                    <Cylinder args={[0.025, 0.025, 0.08, 10]} position={[0, 0.04, 0]}>
                        <meshStandardMaterial color={['#8D6E63', '#F57C00', '#C62828'][i]} />
                    </Cylinder>
                    <Cylinder args={[0.027, 0.027, 0.015, 10]} position={[0, 0.085, 0]}>
                        <meshStandardMaterial color="#616161" metalness={0.7} />
                    </Cylinder>
                </group>
            ))}

            {/* === ITEMS ON KITCHEN ISLAND === */}

            {/* Coffee mug */}
            <group position={[-12.5, 1.02, -6.2]}>
                <Cylinder args={[0.04, 0.035, 0.08, 12]} position={[0, 0.04, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                </Cylinder>
                {/* Handle */}
                <Box args={[0.015, 0.04, 0.03]} position={[0.045, 0.04, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                </Box>
            </group>

            {/* Paper towel roll */}
            <group position={[-11.5, 1.02, -6.3]}>
                <Cylinder args={[0.05, 0.05, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#FAFAFA" />
                </Cylinder>
                {/* Inner tube */}
                <Cylinder args={[0.02, 0.02, 0.21, 8]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#A1887F" />
                </Cylinder>
            </group>

            {/* Plate with cookies/pastries */}
            <group position={[-10.8, 1.02, -6.2]}>
                <Cylinder args={[0.1, 0.1, 0.015, 16]} position={[0, 0.008, 0]}>
                    <meshStandardMaterial color="#ECEFF1" />
                </Cylinder>
                {/* Cookies */}
                <Cylinder args={[0.03, 0.03, 0.01, 10]} position={[-0.03, 0.02, 0]}>
                    <meshStandardMaterial color="#D4A574" roughness={0.8} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.01, 10]} position={[0.03, 0.02, 0.02]}>
                    <meshStandardMaterial color="#C49A6C" roughness={0.8} />
                </Cylinder>
                <Cylinder args={[0.025, 0.025, 0.01, 10]} position={[0, 0.025, -0.02]}>
                    <meshStandardMaterial color="#8D6E63" roughness={0.8} />
                </Cylinder>
            </group>

            {/* Glass of water */}
            <group position={[-13.2, 1.02, -6.15]}>
                <Cylinder args={[0.03, 0.025, 0.1, 12]} position={[0, 0.05, 0]}>
                    <meshStandardMaterial color="#E3F2FD" transparent opacity={0.4} />
                </Cylinder>
            </group>

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
            <CeilingLight position={[-14, 3.55, -7]} intensity={1.2} /> {/* Kitchen */}
            <CeilingLight position={[9, 3.55, -4]} intensity={0.8} /> {/* Guest Bedroom */}

            {/* STAIRS to First Floor */}
            <Stairs position={[-4, 0, 3]} direction="up" steps={11} />
        </group >
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