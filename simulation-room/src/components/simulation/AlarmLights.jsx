import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useSimulation } from './SimulationContext';

// Ceiling-mounted alarm light with flashing red effect
export const AlarmLight = ({ position, roomName }) => {
    const lightRef = useRef();
    const glowRef = useRef();
    const { alarmActive } = useSimulation();
    const flashPhase = useRef(0);
    const frameCount = useRef(0);
    
    useFrame((state, delta) => {
        if (!alarmActive) {
            flashPhase.current = 0;
            return;
        }
        
        // Skip frames for performance
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;
        
        // Fast flashing effect
        flashPhase.current += delta * 16; // Compensate for frame skip
        const intensity = Math.sin(flashPhase.current) > 0 ? 1 : 0.15;
        
        if (lightRef.current) {
            lightRef.current.intensity = intensity * 15;
        }
        if (glowRef.current) {
            glowRef.current.material.emissiveIntensity = intensity * 8;
        }
    });
    
    return (
        <group position={position}>
            {/* Alarm housing - ceiling mount */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.1, 0.05, 8]} />
                <meshStandardMaterial color="#333333" roughness={0.7} />
            </mesh>
            
            {/* Red dome light */}
            <mesh ref={glowRef} position={[0, -0.04, 0]}>
                <sphereGeometry args={[0.08, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial 
                    color={alarmActive ? "#FF0000" : "#440000"}
                    emissive={alarmActive ? "#FF0000" : "#000000"}
                    emissiveIntensity={alarmActive ? 5 : 0}
                    transparent
                    opacity={0.95}
                    toneMapped={false}
                />
            </mesh>
            
            {/* Inner bulb */}
            <Sphere args={[0.04, 8, 8]} position={[0, -0.02, 0]}>
                <meshStandardMaterial 
                    color={alarmActive ? "#FF3300" : "#330000"}
                    emissive={alarmActive ? "#FF0000" : "#000000"}
                    emissiveIntensity={alarmActive ? 10 : 0}
                    toneMapped={false}
                />
            </Sphere>
            
            {/* Single point light for room illumination when alarm is active */}
            {alarmActive && (
                <pointLight 
                    ref={lightRef}
                    position={[0, -0.1, 0]} 
                    color="#FF0000" 
                    intensity={15} 
                    distance={15}
                    decay={1.5}
                />
            )}
        </group>
    );
};

// Wall-mounted strobe alarm light
export const WallAlarmLight = ({ position, rotation = [0, 0, 0] }) => {
    const lightRef = useRef();
    const strobeRef = useRef();
    const { alarmActive } = useSimulation();
    const flashPhase = useRef(0);
    const frameCount = useRef(0);
    
    useFrame((state, delta) => {
        if (!alarmActive) {
            flashPhase.current = 0;
            return;
        }
        
        // Skip frames for performance
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;
        
        // Strobe effect - quick on/off
        flashPhase.current += delta * 24; // Compensate for frame skip
        const flash = Math.sin(flashPhase.current) > 0.7 ? 1 : 0;
        
        if (lightRef.current) {
            lightRef.current.intensity = flash * 20;
        }
        if (strobeRef.current) {
            strobeRef.current.material.emissiveIntensity = flash * 12;
        }
    });
    
    return (
        <group position={position} rotation={rotation}>
            {/* Wall mount base */}
            <mesh position={[0, 0, 0.02]}>
                <boxGeometry args={[0.12, 0.15, 0.04]} />
                <meshStandardMaterial color="#EEEEEE" roughness={0.5} />
            </mesh>
            
            {/* Strobe lens */}
            <mesh ref={strobeRef} position={[0, 0, 0.05]}>
                <boxGeometry args={[0.1, 0.12, 0.03]} />
                <meshStandardMaterial 
                    color={alarmActive ? "#FF0000" : "#880000"}
                    emissive={alarmActive ? "#FF0000" : "#000000"}
                    emissiveIntensity={alarmActive ? 8 : 0}
                    transparent
                    opacity={0.9}
                    toneMapped={false}
                />
            </mesh>
            
            {/* Speaker grille at bottom */}
            <mesh position={[0, -0.05, 0.04]}>
                <boxGeometry args={[0.06, 0.03, 0.01]} />
                <meshStandardMaterial color="#222222" roughness={0.8} />
            </mesh>
            
            {/* Status LED */}
            <mesh position={[0.04, 0.05, 0.05]}>
                <sphereGeometry args={[0.008, 6, 6]} />
                <meshStandardMaterial 
                    color={alarmActive ? "#00FF00" : "#004400"}
                    emissive={alarmActive ? "#00FF00" : "#000000"}
                    emissiveIntensity={alarmActive ? 0.5 : 0}
                />
            </mesh>
            
            {/* Single light source */}
            {alarmActive && (
                <pointLight 
                    ref={lightRef}
                    position={[0, 0, 0.3]} 
                    color="#FF0000" 
                    intensity={20} 
                    distance={12}
                    decay={1.5}
                />
            )}
        </group>
    );
};

// Smoke detector with alarm light
export const SmokeDetector = ({ position }) => {
    const ledRef = useRef();
    const { alarmActive, smokeLevel } = useSimulation();
    const blinkPhase = useRef(0);
    const frameCount = useRef(0);
    
    useFrame((state, delta) => {
        // Skip frames for performance
        frameCount.current++;
        if (frameCount.current % 3 !== 0) return;
        
        blinkPhase.current += delta * (alarmActive ? 30 : 1.5); // Compensate for frame skip
        
        if (ledRef.current) {
            if (alarmActive) {
                // Fast red blink during alarm
                ledRef.current.material.emissiveIntensity = Math.sin(blinkPhase.current) > 0 ? 8 : 0;
                ledRef.current.material.color.setHex(0xFF0000);
                ledRef.current.material.emissive.setHex(0xFF0000);
            } else {
                // Slow green blink when normal
                ledRef.current.material.emissiveIntensity = Math.sin(blinkPhase.current) > 0.9 ? 0.5 : 0.1;
                ledRef.current.material.color.setHex(0x00FF00);
                ledRef.current.material.emissive.setHex(0x00FF00);
            }
        }
    });
    
    return (
        <group position={position}>
            {/* Detector body */}
            <mesh>
                <cylinderGeometry args={[0.08, 0.1, 0.04, 12]} />
                <meshStandardMaterial color="#F5F5F5" roughness={0.4} />
            </mesh>
            
            {/* Center dome */}
            <mesh position={[0, -0.01, 0]}>
                <sphereGeometry args={[0.04, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#E0E0E0" roughness={0.5} />
            </mesh>
            
            {/* LED indicator */}
            <mesh ref={ledRef} position={[0.05, -0.02, 0]}>
                <sphereGeometry args={[0.008, 6, 6]} />
                <meshStandardMaterial 
                    color="#00FF00"
                    emissive="#00FF00"
                    emissiveIntensity={0.1}
                />
            </mesh>
            
            {/* Simplified vent slots - reduced from 6 to 4 */}
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} position={[0, -0.015, 0]} rotation={[0, (i / 4) * Math.PI * 2, 0]}>
                    <boxGeometry args={[0.06, 0.008, 0.015]} />
                    <meshStandardMaterial color="#CCCCCC" roughness={0.6} />
                </mesh>
            ))}
        </group>
    );
};

export default AlarmLight;
