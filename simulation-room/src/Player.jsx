import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier';
import * as THREE from 'three';

const SPEED = 6;
const SPRINT_SPEED = 10;
const JUMP_FORCE = 6;
const PLAYER_HEIGHT = 1.0;

// Reusable vectors to avoid garbage collection
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const direction = new THREE.Vector3();

export function Player(props) {
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls();
    const rigidBody = useRef();
    const { rapier, world } = useRapier();
    const isGrounded = useRef(false);
    const bobPhase = useRef(0);
    const groundCheckCounter = useRef(0);

    // Raycaster for ground detection - created once
    const rapierRay = useRef(new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }));

    useFrame((state, delta) => {
        if (!rigidBody.current) return;

        const { forward, backward, left, right, jump, run } = getKeys();
        const velocity = rigidBody.current.linvel();
        const origin = rigidBody.current.translation();

        // Determine movement speed
        const currentSpeed = run ? SPRINT_SPEED : SPEED;

        // Camera direction for movement - reuse vectors
        frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
        sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(currentSpeed)
            .applyEuler(camera.rotation);

        // Apply horizontal movement
        rigidBody.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

        // Ground check - only every 3 frames for performance
        groundCheckCounter.current++;
        if (groundCheckCounter.current >= 3) {
            groundCheckCounter.current = 0;
            rapierRay.current.origin = { x: origin.x, y: origin.y - 0.4, z: origin.z };
            const hit = world.castRay(rapierRay.current, 0.3, true);
            isGrounded.current = hit && hit.toi < 0.3;
        }

        // Jumping
        if (jump && isGrounded.current) {
            rigidBody.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true);
        }

        // Simplified head bob - less calculation
        const isMoving = Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1;
        if (isMoving && isGrounded.current) {
            bobPhase.current += delta * currentSpeed;
            camera.position.y = origin.y + PLAYER_HEIGHT + Math.sin(bobPhase.current * 10) * 0.03;
        } else {
            bobPhase.current = 0;
            camera.position.y = origin.y + PLAYER_HEIGHT;
        }

        // Sync camera position
        camera.position.x = origin.x;
        camera.position.z = origin.z;
    });

    return (
        <RigidBody
            ref={rigidBody}
            colliders={false}
            mass={80}
            type="dynamic"
            position={[0, 2, 20]}
            enabledRotations={[false, false, false]}
            lockRotations
            linearDamping={0.5}
            angularDamping={1}
        >
            <CapsuleCollider args={[0.35, 0.35]} />
            <PointerLockControls />
        </RigidBody>
    );
}