import React from 'react';
import { GroundFloor } from './components/floors/GroundFloor';
import { FirstFloor } from './components/floors/FirstFloor';
import { Basement } from './components/floors/Basement';
import { Exterior } from './components/floors/Exterior';
import { AlarmLight, WallAlarmLight, SmokeDetector } from './components/simulation/AlarmLights';
import { SmokeEffect, RoomSmokeOverlay } from './components/simulation/SmokeEffects';

export const House = (props) => {
    return (
        <group {...props} dispose={null}>
            {/* GROUND FLOOR (Kitchen, Living, Dining, Guest Room) */}
            <GroundFloor />

            {/* FIRST FLOOR (Bedrooms, Bathrooms, Office) */}
            <FirstFloor />

            {/* BASEMENT (Garage, Laundry) */}
            <Basement />

            {/* OUTDOOR / EXTERIOR */}
            <Exterior />
            
            {/* ========== ALARM LIGHTS & SMOKE DETECTORS ========== */}
            
            {/* Ground Floor Alarm Lights */}
            <AlarmLight position={[0, 3.4, -6]} roomName="Living Room" />
            <AlarmLight position={[-12, 3.4, 0]} roomName="Dining Room" />
            <AlarmLight position={[-12, 3.4, -7]} roomName="Kitchen" />
            <AlarmLight position={[12, 3.4, -5]} roomName="Guest Bedroom" />
            
            {/* First Floor Alarm Lights */}
            <AlarmLight position={[0, 7.2, -7.5]} roomName="Master Bedroom" />
            <AlarmLight position={[8, 7.2, 2]} roomName="Children's Room" />
            <AlarmLight position={[-8, 7.2, 2]} roomName="Home Office" />
            
            {/* Wall Strobe Alarms - Emergency exits */}
            <WallAlarmLight position={[0, 2.5, 4.9]} rotation={[0, Math.PI, 0]} />
            <WallAlarmLight position={[-5.9, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WallAlarmLight position={[5.9, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
            
            {/* Smoke Detectors */}
            <SmokeDetector position={[0, 3.45, -6]} />
            <SmokeDetector position={[-12, 3.45, -7]} />
            <SmokeDetector position={[12, 3.45, -5]} />
            <SmokeDetector position={[0, 7.25, -7.5]} />
            <SmokeDetector position={[8, 7.25, 2]} />
            <SmokeDetector position={[-8, 7.25, 2]} />
            
            {/* ========== SMOKE EFFECTS ========== */}
            
            {/* Living Room Smoke (from fireplace when chimney blocked) */}
            <SmokeEffect position={[-5.5, 0.5, -6.5]} intensity={1.5} spread={4} />
            
            {/* Kitchen Smoke */}
            <SmokeEffect position={[-12, 1, -7]} intensity={1} spread={3} />
            
            {/* Room Smoke Overlays */}
            <RoomSmokeOverlay position={[0, 2, -6]} size={[12, 3.5, 10]} />
            <RoomSmokeOverlay position={[-12, 2, -5]} size={[12, 3.5, 10]} />
            <RoomSmokeOverlay position={[12, 2, -5]} size={[12, 3.5, 10]} />
        </group>
    );
};