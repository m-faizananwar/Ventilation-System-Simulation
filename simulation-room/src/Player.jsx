import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const SPEED = 15;

export function Player(props) {
    const { camera } = useThree();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const velocity = useRef(new THREE.Vector3());

    useEffect(() => {
        // Initial position
        camera.position.set(0, 2, 10);
    }, [camera]);

    useFrame((state, delta) => {
        const { forward, backward, left, right } = getKeys();

        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
        const sideVector = new THREE.Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED * delta)
            .applyEuler(camera.rotation);

        // Constrain movement to the XZ plane (no flying)
        direction.y = 0;

        // Simple collision detection (very basic: clamp position)
        // In a real app, use a physics engine like Rapier or Cannon
        const nextPos = camera.position.clone().add(direction);

        // Example boundary check (keep inside a large area)
        if (nextPos.x > -45 && nextPos.x < 45 && nextPos.z > -45 && nextPos.z < 45) {
            camera.position.add(direction);
        }
    });

    return <PointerLockControls />;
}
