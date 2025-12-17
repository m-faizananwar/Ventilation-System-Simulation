import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier';
import * as THREE from 'three';

const SPEED = 6;
const SPRINT_SPEED = 10;
const JUMP_FORCE = 6;
const PLAYER_HEIGHT = 1.0;

export function Player(props) {
    const { camera } = useThree();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const rigidBody = useRef();
    const { rapier, world } = useRapier();
    const isGrounded = useRef(false);

    // For head bob effect
    const bobPhase = useRef(0);

    // Raycaster for ground detection
    const rapierRay = useRef(new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }));

    useFrame((state, delta) => {
        if (!rigidBody.current) return;

        const { forward, backward, left, right, jump, run } = getKeys();
        const velocity = rigidBody.current.linvel();

        // Determine movement speed
        const currentSpeed = run ? SPRINT_SPEED : SPEED;

        // Camera direction for movement
        const frontVector = new THREE.Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
        const sideVector = new THREE.Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
        const direction = new THREE.Vector3();

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(currentSpeed)
            .applyEuler(camera.rotation);

        // Apply horizontal movement (preserve vertical velocity for physics)
        rigidBody.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

        // Ground check using raycast
        const origin = rigidBody.current.translation();
        rapierRay.current.origin = { x: origin.x, y: origin.y - 0.4, z: origin.z };
        rapierRay.current.dir = { x: 0, y: -1, z: 0 };

        const hit = world.castRay(rapierRay.current, 0.3, true);
        isGrounded.current = hit && hit.toi < 0.3;

        // Jumping
        if (jump && isGrounded.current) {
            rigidBody.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true);
        }

        // Head bob effect when moving on ground
        const isMoving = Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1;
        if (isMoving && isGrounded.current) {
            bobPhase.current += delta * currentSpeed;
            const bobOffset = Math.sin(bobPhase.current * 10) * 0.05;
            camera.position.y = origin.y + PLAYER_HEIGHT + bobOffset;
        } else {
            bobPhase.current = 0;
            camera.position.y = origin.y + PLAYER_HEIGHT;
        }

        // Sync camera position to player
        const translation = rigidBody.current.translation();
        camera.position.x = translation.x;
        camera.position.z = translation.z;
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