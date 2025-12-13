import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier';
import * as THREE from 'three';

const SPEED = 5;
const JUMP_FORCE = 5;

export function Player(props) {
    const { camera } = useThree();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const rigidBody = useRef();
    const { rapier, world } = useRapier();

    // Ref for the raycaster to check if grounded
    const rapierRay = useRef(new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }));

    useFrame((state, delta) => {
        if (!rigidBody.current) return;

        const { forward, backward, left, right, jump } = getKeys();
        const velocity = rigidBody.current.linvel();

        // Camera direction
        const frontVector = new THREE.Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
        const sideVector = new THREE.Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
        const direction = new THREE.Vector3();

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        // Apply movement velocity (keep Y velocity for gravity)
        rigidBody.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

        // Jumping
        // Simple ground check using raycast
        const origin = rigidBody.current.translation();
        origin.y -= 0.9; // Bottom of capsule
        rapierRay.current.origin = origin;
        rapierRay.current.dir = { x: 0, y: -1, z: 0 };

        const hit = world.castRay(rapierRay.current, 0.2, true);

        if (jump && hit && hit.toi < 0.2) {
            rigidBody.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true);
        }

        // Sync camera to player position
        const translation = rigidBody.current.translation();
        camera.position.set(translation.x, translation.y + 0.5, translation.z);
    });

    return (
        <RigidBody
            ref={rigidBody}
            colliders={false}
            mass={1}
            type="dynamic"
            position={[0, 5, 10]}
            enabledRotations={[false, false, false]}
            lockRotations
        >
            <CapsuleCollider args={[0.5, 0.5]} />
            <PointerLockControls />
        </RigidBody>
    );
}
