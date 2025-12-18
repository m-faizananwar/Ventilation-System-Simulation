import React from 'react';
import { GroundFloor } from './components/floors/GroundFloor';
import { FirstFloor } from './components/floors/FirstFloor';
import { Basement } from './components/floors/Basement';
import { Exterior } from './components/floors/Exterior';
import { AlarmLight, WallAlarmLight, SmokeDetector, RoomStatusLight, VentilationIndicator } from './components/simulation/AlarmLights';
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

            {/* ========== ROOM STATUS LIGHTS (RISC-V Controlled) ========== */}

            {/* Ground Floor Status Lights - Near doorways */}
            <RoomStatusLight position={[-2, 2, -1]} roomId="living-room" rotation={[0, Math.PI, 0]} />
            <RoomStatusLight position={[-12, 2, 4]} roomId="dining-room" rotation={[0, Math.PI, 0]} />
            <RoomStatusLight position={[-8, 2, -7]} roomId="kitchen" rotation={[0, 0, 0]} />
            <RoomStatusLight position={[10, 2, -2]} roomId="guest-bedroom" rotation={[0, Math.PI / 2, 0]} />

            {/* First Floor Status Lights */}
            <RoomStatusLight position={[3, 5.8, -5]} roomId="master-bedroom" rotation={[0, Math.PI, 0]} />
            <RoomStatusLight position={[6, 5.8, 4]} roomId="children-room" rotation={[0, Math.PI, 0]} />
            <RoomStatusLight position={[-6, 5.8, 4]} roomId="home-office" rotation={[0, Math.PI, 0]} />

            {/* ========== VENTILATION INDICATORS (RISC-V Controlled) ========== */}

            {/* Ceiling vents for each room */}
            <VentilationIndicator position={[0, 3.4, -4]} roomId="living-room" />
            <VentilationIndicator position={[-12, 3.4, 2]} roomId="dining-room" />
            <VentilationIndicator position={[-12, 3.4, -5]} roomId="kitchen" />
            <VentilationIndicator position={[12, 3.4, -3]} roomId="guest-bedroom" />
            <VentilationIndicator position={[0, 7.2, -5]} roomId="master-bedroom" />
            <VentilationIndicator position={[8, 7.2, 0]} roomId="children-room" />
            <VentilationIndicator position={[-8, 7.2, 0]} roomId="home-office" />

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