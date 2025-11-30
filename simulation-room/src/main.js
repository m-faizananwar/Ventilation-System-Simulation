import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a); // Darker, moodier background
scene.fog = new THREE.FogExp2(0x1a1a1a, 0.03);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('/textures/wood.png');
const concreteTexture = textureLoader.load('/textures/concrete.png');
const brickTexture = textureLoader.load('/textures/brick.png');
const metalTexture = textureLoader.load('/textures/metal.png');

// Texture settings for wrapping
[woodTexture, concreteTexture, brickTexture, metalTexture].forEach(t => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
});

woodTexture.repeat.set(4, 4);
concreteTexture.repeat.set(4, 2);
brickTexture.repeat.set(2, 1);

// Materials
const floorMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.8,
    metalness: 0.1
});
const wallMaterial = new THREE.MeshStandardMaterial({
    map: concreteTexture,
    roughness: 0.9,
    metalness: 0.1
});
const brickMaterial = new THREE.MeshStandardMaterial({
    map: brickTexture,
    roughness: 0.9,
    normalScale: new THREE.Vector2(1, 1)
});
const metalMaterial = new THREE.MeshStandardMaterial({
    map: metalTexture,
    roughness: 0.4,
    metalness: 0.8
});
const blackMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.5,
    metalness: 0.8
});

// Room Dimensions
const roomWidth = 15;
const roomDepth = 15;
const roomHeight = 6;

// Floor
const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Ceiling
const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = roomHeight;
scene.add(ceiling);

// Walls
const wallGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, 0.2);

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, roomHeight / 2, -roomDepth / 2);
backWall.receiveShadow = true;
scene.add(backWall);

const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, roomHeight / 2, roomDepth / 2);
frontWall.receiveShadow = true;
scene.add(frontWall);

const sideWallGeometry = new THREE.BoxGeometry(0.2, roomHeight, roomDepth);
const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
leftWall.receiveShadow = true;
scene.add(leftWall);

const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
rightWall.receiveShadow = true;
scene.add(rightWall);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Warm Spotlights (Track lighting feel)
const spotLight1 = new THREE.SpotLight(0xffaa55, 100);
spotLight1.position.set(-5, 5.5, 0);
spotLight1.angle = Math.PI / 6;
spotLight1.penumbra = 0.5;
spotLight1.castShadow = true;
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffaa55, 100);
spotLight2.position.set(5, 5.5, 0);
spotLight2.angle = Math.PI / 6;
spotLight2.penumbra = 0.5;
spotLight2.castShadow = true;
scene.add(spotLight2);

// Hearth (Industrial Brick Fireplace)
const hearthGroup = new THREE.Group();
hearthGroup.position.set(0, 0, -roomDepth / 2 + 1.5);

const hearthBase = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 2), brickMaterial);
hearthBase.castShadow = true;
hearthBase.receiveShadow = true;
hearthGroup.add(hearthBase);

const chimney = new THREE.Mesh(new THREE.BoxGeometry(2, roomHeight, 1), brickMaterial);
chimney.position.set(0, roomHeight / 2, -0.5);
chimney.castShadow = true;
hearthGroup.add(chimney);

// Fire Box
const fireBox = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.8), new THREE.MeshStandardMaterial({ color: 0x000000 }));
fireBox.position.set(0, 1, -0.4);
hearthGroup.add(fireBox);

// Fire Light
const fireLight = new THREE.PointLight(0xff4500, 5, 20);
fireLight.position.set(0, 1, 0.5);
fireLight.castShadow = true;
fireLight.shadow.bias = -0.001;
hearthGroup.add(fireLight);

// Fire Particles
const fireParticles = [];
const fireGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const fireMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
for (let i = 0; i < 30; i++) {
    const mesh = new THREE.Mesh(fireGeo, fireMat);
    mesh.position.set((Math.random() - 0.5) * 1, 0.5 + Math.random() * 0.5, 0.5 + (Math.random() - 0.5) * 0.5);
    hearthGroup.add(mesh);
    fireParticles.push({ mesh, speed: Math.random() * 0.05 + 0.02, offset: Math.random() * 100 });
}

scene.add(hearthGroup);

// Heater (Industrial Coil Style)
const heaterGroup = new THREE.Group();
heaterGroup.position.set(-roomWidth / 2 + 2, 0, -roomDepth / 2 + 2);

const heaterBase = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 0.2, 32), blackMetalMaterial);
heaterBase.castShadow = true;
heaterGroup.add(heaterBase);

const heaterCore = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2, 32), metalMaterial);
heaterCore.position.y = 1.1;
heaterCore.castShadow = true;
heaterGroup.add(heaterCore);

// Glowing Coils
const coilMat = new THREE.MeshBasicMaterial({ color: 0xff3300 });
for (let i = 0; i < 5; i++) {
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.05, 16, 100), coilMat);
    coil.rotation.x = Math.PI / 2;
    coil.position.y = 0.5 + i * 0.4;
    heaterGroup.add(coil);
}

scene.add(heaterGroup);

// Pollution Device (Old Generator)
const generatorGroup = new THREE.Group();
generatorGroup.position.set(roomWidth / 2 - 3, 0, roomDepth / 2 - 3);

const genBody = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 1.5), metalMaterial);
genBody.position.y = 0.75;
genBody.castShadow = true;
generatorGroup.add(genBody);

const genDetail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.5, 1.6), blackMetalMaterial);
genDetail.position.y = 0.25;
generatorGroup.add(genDetail);

const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5, 16), blackMetalMaterial);
exhaust.position.set(0.8, 1.5, 0);
exhaust.rotation.z = Math.PI / 6;
generatorGroup.add(exhaust);

scene.add(generatorGroup);

// Smoke
const smokeParticles = [];
const smokeGeo = new THREE.SphereGeometry(0.3, 8, 8);
const smokeMat = new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.4 });

// Ventilator Fan (Industrial)
const fanGroup = new THREE.Group();
fanGroup.position.set(0, roomHeight - 1.5, -roomDepth / 2 + 0.2);

const fanFrame = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 0.5), blackMetalMaterial);
fanGroup.add(fanFrame);

const fanBlades = new THREE.Group();
const bladeGeo = new THREE.BoxGeometry(0.2, 2.2, 0.05);
for (let i = 0; i < 3; i++) {
    const blade = new THREE.Mesh(bladeGeo, metalMaterial);
    blade.rotation.z = (Math.PI / 1.5) * i;
    fanBlades.add(blade);
}
fanBlades.position.z = 0.3;
fanGroup.add(fanBlades);

scene.add(fanGroup);

// Decor: Rug
const rugGeo = new THREE.PlaneGeometry(6, 4);
const rugMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0 });
const rug = new THREE.Mesh(rugGeo, rugMat);
rug.rotation.x = -Math.PI / 2;
rug.position.set(0, 0.01, 0);
rug.receiveShadow = true;
scene.add(rug);

// Decor: Modern Coffee Table
const tableGroup = new THREE.Group();
tableGroup.position.set(0, 0, 0);

const tableTop = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 2), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.5 }));
tableTop.position.y = 0.6;
tableTop.castShadow = true;
tableGroup.add(tableTop);

const tableLegGeo = new THREE.BoxGeometry(0.1, 0.6, 0.1);
const legPos = [[-1.4, 0.3, -0.9], [1.4, 0.3, -0.9], [-1.4, 0.3, 0.9], [1.4, 0.3, 0.9]];
legPos.forEach(pos => {
    const leg = new THREE.Mesh(tableLegGeo, metalMaterial);
    leg.position.set(...pos);
    tableGroup.add(leg);
});
scene.add(tableGroup);


// Post-Processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.2; // Lower threshold to make fire glow
bloomPass.strength = 1.2;
bloomPass.radius = 0.5;
composer.addPass(bloomPass);

// Controls
const controls = new PointerLockControls(camera, document.body);
const info = document.getElementById('info');

document.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    info.style.display = 'none';
});

controls.addEventListener('unlock', () => {
    info.style.display = 'block';
});

const moveState = { forward: false, backward: false, left: false, right: false };
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'KeyW': moveState.forward = true; break;
        case 'KeyS': moveState.backward = true; break;
        case 'KeyA': moveState.left = true; break;
        case 'KeyD': moveState.right = true; break;
    }
});
document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyW': moveState.forward = false; break;
        case 'KeyS': moveState.backward = false; break;
        case 'KeyA': moveState.left = false; break;
        case 'KeyD': moveState.right = false; break;
    }
});

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Movement
    if (controls.isLocked) {
        const speed = 8 * delta;
        if (moveState.forward) controls.moveForward(speed);
        if (moveState.backward) controls.moveForward(-speed);
        if (moveState.right) controls.moveRight(speed);
        if (moveState.left) controls.moveRight(-speed);
    }

    // Fire Animation
    fireLight.intensity = 4 + Math.sin(time * 10) * 1 + Math.random();
    fireParticles.forEach(p => {
        p.mesh.position.y += p.speed;
        p.mesh.scale.setScalar(1 - (p.mesh.position.y - 0.5) / 1.5); // Shrink as it goes up
        if (p.mesh.position.y > 2) {
            p.mesh.position.y = 0.5;
            p.mesh.scale.setScalar(1);
        }
    });

    // Fan Animation
    fanBlades.rotation.z -= 10 * delta;

    // Smoke Animation
    if (Math.random() > 0.92) {
        const smoke = new THREE.Mesh(smokeGeo, smokeMat);
        const exhaustPos = new THREE.Vector3(0.8, 1.5, 0);
        exhaustPos.applyMatrix4(generatorGroup.matrixWorld);
        smoke.position.copy(exhaustPos);
        scene.add(smoke);
        smokeParticles.push({ mesh: smoke, life: 3 });
    }

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.life -= delta;
        p.mesh.position.y += delta * 0.5;
        p.mesh.position.x += delta * 0.2; // Drift
        p.mesh.scale.multiplyScalar(1.01);
        p.mesh.material.opacity = p.life / 3 * 0.4;
        if (p.life <= 0) {
            scene.remove(p.mesh);
            smokeParticles.splice(i, 1);
        }
    }

    composer.render();
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
