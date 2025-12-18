import React, { createContext, useContext, useState, useCallback } from 'react';

// Simulation state context for managing emergency scenarios
const SimulationContext = createContext({
    // Alarm state
    alarmActive: false,
    setAlarmActive: () => {},
    
    // Chimney/smoke state
    chimneyBlocked: false,
    setChimneyBlocked: () => {},
    smokeLevel: 0,
    setSmokeLevel: () => {},
    
    // Heater states (by room)
    heaterStates: {},
    setHeaterState: () => {},
    overloadHeater: () => {},
    
    // Appliance explosion states
    explosionStates: {},
    triggerExplosion: () => {},
    
    // Global emergency
    emergencyMode: false,
    triggerEmergency: () => {},
    resetSimulation: () => {},
});

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    // Alarm state
    const [alarmActive, setAlarmActive] = useState(false);
    
    // Chimney/smoke state
    const [chimneyBlocked, setChimneyBlocked] = useState(false);
    const [smokeLevel, setSmokeLevel] = useState(0);
    
    // Heater states by room ID
    const [heaterStates, setHeaterStates] = useState({
        'living-room': { on: false, level: 1, overloaded: false },
        'dining-room': { on: false, level: 1, overloaded: false },
        'guest-bedroom': { on: false, level: 1, overloaded: false },
        'master-bedroom': { on: false, level: 1, overloaded: false },
        'children-room': { on: false, level: 1, overloaded: false },
        'home-office': { on: false, level: 1, overloaded: false },
    });
    
    // Appliance explosion states
    const [explosionStates, setExplosionStates] = useState({
        'tv-living': { exploded: false, smoking: false },
        'tv-master': { exploded: false, smoking: false },
        'stove': { exploded: false, smoking: false },
        'fridge': { exploded: false, smoking: false },
    });
    
    // Emergency mode
    const [emergencyMode, setEmergencyMode] = useState(false);
    
    // Set individual heater state
    const setHeaterState = useCallback((roomId, state) => {
        setHeaterStates(prev => ({
            ...prev,
            [roomId]: { ...prev[roomId], ...state }
        }));
    }, []);
    
    // Overload a heater (causes smoke)
    const overloadHeater = useCallback((roomId) => {
        setHeaterStates(prev => ({
            ...prev,
            [roomId]: { ...prev[roomId], overloaded: true, on: true, level: 3 }
        }));
        setAlarmActive(true);
        setSmokeLevel(prev => Math.min(prev + 30, 100));
    }, []);
    
    // Trigger appliance explosion
    const triggerExplosion = useCallback((applianceId) => {
        setExplosionStates(prev => ({
            ...prev,
            [applianceId]: { exploded: true, smoking: true }
        }));
        setAlarmActive(true);
        setSmokeLevel(prev => Math.min(prev + 40, 100));
    }, []);
    
    // Trigger full emergency mode
    const triggerEmergency = useCallback(() => {
        setEmergencyMode(true);
        setAlarmActive(true);
        setChimneyBlocked(true);
        setSmokeLevel(80);
    }, []);
    
    // Reset all simulation states
    const resetSimulation = useCallback(() => {
        setAlarmActive(false);
        setChimneyBlocked(false);
        setSmokeLevel(0);
        setEmergencyMode(false);
        setHeaterStates({
            'living-room': { on: false, level: 1, overloaded: false },
            'dining-room': { on: false, level: 1, overloaded: false },
            'guest-bedroom': { on: false, level: 1, overloaded: false },
            'master-bedroom': { on: false, level: 1, overloaded: false },
            'children-room': { on: false, level: 1, overloaded: false },
            'home-office': { on: false, level: 1, overloaded: false },
        });
        setExplosionStates({
            'tv-living': { exploded: false, smoking: false },
            'tv-master': { exploded: false, smoking: false },
            'stove': { exploded: false, smoking: false },
            'fridge': { exploded: false, smoking: false },
        });
    }, []);
    
    return (
        <SimulationContext.Provider value={{
            alarmActive,
            setAlarmActive,
            chimneyBlocked,
            setChimneyBlocked,
            smokeLevel,
            setSmokeLevel,
            heaterStates,
            setHeaterState,
            overloadHeater,
            explosionStates,
            triggerExplosion,
            emergencyMode,
            triggerEmergency,
            resetSimulation,
        }}>
            {children}
        </SimulationContext.Provider>
    );
};

export default SimulationContext;
