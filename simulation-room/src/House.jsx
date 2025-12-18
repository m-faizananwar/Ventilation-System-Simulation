import React from 'react';
import { GroundFloor } from './components/floors/GroundFloor';
import { FirstFloor } from './components/floors/FirstFloor';
import { Basement } from './components/floors/Basement';
import { Exterior } from './components/floors/Exterior';

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
        </group>
    );
};