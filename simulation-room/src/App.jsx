import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { House } from './House';
import { World } from './World';
import { Player } from './Player';
import './App.css';

import { Physics } from '@react-three/rapier';

function App() {
  return (
    <div id="canvas-container">
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Canvas camera={{ fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

            <Physics gravity={[0, -9.81, 0]}>
              <World />
              <House position={[0, 0, 0]} />
              <Player />
            </Physics>

            <Environment preset="night" />
          </Suspense>
        </Canvas>
        <div className="instructions">
          Click to explore | WASD to move | Mouse to look
        </div>
      </KeyboardControls>
    </div>
  );
}

export default App;
