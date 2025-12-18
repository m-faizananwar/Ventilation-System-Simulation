import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

// Room definitions for sensor data
const ROOMS = {
    'kitchen': { name: 'Kitchen', floor: 0 },
    'living-room': { name: 'Living Room', floor: 0 },
    'dining-room': { name: 'Dining Room', floor: 0 },
    'guest-bedroom': { name: 'Guest Bedroom', floor: 0 },
    'master-bedroom': { name: 'Master Bedroom', floor: 1 },
    'children-room': { name: "Children's Room", floor: 1 },
    'home-office': { name: 'Home Office', floor: 1 },
};

// Base sensor values (normal conditions)
const BASE_SENSORS = { smoke: 0, co2: 400, pm25: 15, temp: 22 };

// Simulation state context for managing emergency scenarios
const SimulationContext = createContext({
    // Alarm state
    alarmActive: false,
    setAlarmActive: () => { },

    // Chimney/smoke state
    chimneyBlocked: false,
    setChimneyBlocked: () => { },
    smokeLevel: 0,
    setSmokeLevel: () => { },

    // Heater states (by room)
    heaterStates: {},
    setHeaterState: () => { },
    overloadHeater: () => { },

    // Appliance explosion states
    explosionStates: {},
    triggerExplosion: () => { },

    // Stove burner states
    stoveBurners: [false, false, false, false],
    setStoveBurners: () => { },

    // Items burning on stove
    burningItems: [],
    addBurningItem: () => { },

    // Ventilation states (controlled by RISC-V)
    ventilationStates: {},
    setVentilationState: () => { },

    // Room alert levels (from RISC-V)
    roomAlertLevels: {},

    // Sensor data per room
    sensorData: {},

    // Aggregated sensor data for RISC-V
    aggregatedSensors: {},

    // RISC-V command state
    lastRiscvCommand: null,
    riscvConnected: false,
    setRiscvConnected: () => { },

    // Global emergency
    emergencyMode: false,
    triggerEmergency: () => { },
    resetSimulation: () => { },
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

    // Stove burner states
    const [stoveBurners, setStoveBurners] = useState([false, false, false, false]);

    // Items burning on stove
    const [burningItems, setBurningItems] = useState([]);

    // Ventilation states per room (controlled by RISC-V commands)
    const [ventilationStates, setVentilationStates] = useState({
        'kitchen': { active: false, level: 'OFF' },
        'living-room': { active: false, level: 'OFF' },
        'dining-room': { active: false, level: 'OFF' },
        'guest-bedroom': { active: false, level: 'OFF' },
        'master-bedroom': { active: false, level: 'OFF' },
        'children-room': { active: false, level: 'OFF' },
        'home-office': { active: false, level: 'OFF' },
    });

    // Room alert levels (set by RISC-V: 'normal', 'warning', 'danger', 'critical')
    const [roomAlertLevels, setRoomAlertLevels] = useState({
        'kitchen': 'normal',
        'living-room': 'normal',
        'dining-room': 'normal',
        'guest-bedroom': 'normal',
        'master-bedroom': 'normal',
        'children-room': 'normal',
        'home-office': 'normal',
    });

    // RISC-V connection state
    const [riscvConnected, setRiscvConnected] = useState(false);
    const [lastRiscvCommand, setLastRiscvCommand] = useState(null);

    // Emergency mode
    const [emergencyMode, setEmergencyMode] = useState(false);

    // Compute sensor data based on current hazard states
    const sensorData = useMemo(() => {
        const data = {};

        Object.keys(ROOMS).forEach(roomId => {
            // Start with base values
            let smoke = BASE_SENSORS.smoke;
            let co2 = BASE_SENSORS.co2;
            let pm25 = BASE_SENSORS.pm25;
            let temp = BASE_SENSORS.temp;

            // Kitchen-specific: stove burners affect readings
            if (roomId === 'kitchen') {
                const activeBurners = stoveBurners.filter(b => b).length;
                smoke += activeBurners * 5;
                temp += activeBurners * 3;
                co2 += activeBurners * 50;

                // Burning items dramatically increase readings
                if (burningItems.length > 0) {
                    smoke += burningItems.length * 40;
                    pm25 += burningItems.length * 30;
                    co2 += burningItems.length * 150;
                }

                // Stove explosion
                if (explosionStates['stove']?.exploded) {
                    smoke += 80;
                    pm25 += 60;
                    temp += 15;
                }

                // Fridge explosion
                if (explosionStates['fridge']?.exploded) {
                    smoke += 30;
                    co2 += 200;
                }
            }

            // Living room: fireplace + chimney
            if (roomId === 'living-room') {
                if (chimneyBlocked) {
                    smoke += 70;
                    co2 += 300;
                    pm25 += 50;
                }

                if (explosionStates['tv-living']?.exploded) {
                    smoke += 40;
                    pm25 += 35;
                }
            }

            // Master bedroom TV
            if (roomId === 'master-bedroom' && explosionStates['tv-master']?.exploded) {
                smoke += 40;
                pm25 += 35;
            }

            // Heater overload affects room
            const heater = heaterStates[roomId];
            if (heater?.overloaded) {
                smoke += 50;
                temp += 25;
                pm25 += 40;
            } else if (heater?.on) {
                temp += heater.level * 4;
            }

            // Global smoke level affects all rooms
            smoke += smokeLevel * 0.3;

            // Emergency mode affects everything
            if (emergencyMode) {
                smoke = Math.max(smoke, 60);
                co2 = Math.max(co2, 800);
            }

            // Clamp values
            data[roomId] = {
                smoke: Math.min(Math.round(smoke), 100),
                co2: Math.min(Math.round(co2), 2000),
                pm25: Math.min(Math.round(pm25), 200),
                temp: Math.min(Math.round(temp), 60),
            };
        });

        return data;
    }, [stoveBurners, burningItems, explosionStates, chimneyBlocked, heaterStates, smokeLevel, emergencyMode]);

    // Aggregated sensors for RISC-V (max values across all rooms)
    const aggregatedSensors = useMemo(() => {
        const rooms = Object.values(sensorData);
        if (rooms.length === 0) return BASE_SENSORS;

        return {
            smoke: Math.max(...rooms.map(r => r.smoke)),
            co2: Math.max(...rooms.map(r => r.co2)),
            pm25: Math.max(...rooms.map(r => r.pm25)),
            temp: Math.max(...rooms.map(r => r.temp)),
            // Determine overall status
            status: rooms.some(r => r.smoke > 50) ? 'CRITICAL' :
                rooms.some(r => r.smoke > 30 || r.pm25 > 80) ? 'WARNING' : 'SAFE',
        };
    }, [sensorData]);

    // Listen for RISC-V commands
    useEffect(() => {
        const handleRiscvCommand = (e) => {
            const command = e.detail;
            setLastRiscvCommand(command);

            // Process command
            if (command.action === 'ACTIVATE_VENT' && command.room) {
                setVentilationStates(prev => ({
                    ...prev,
                    [command.room]: { active: true, level: command.level || 'HIGH' }
                }));
            } else if (command.action === 'DEACTIVATE_VENT' && command.room) {
                setVentilationStates(prev => ({
                    ...prev,
                    [command.room]: { active: false, level: 'OFF' }
                }));
            } else if (command.action === 'SET_ALERT' && command.room) {
                setRoomAlertLevels(prev => ({
                    ...prev,
                    [command.room]: command.level || 'normal'
                }));
            } else if (command.action === 'GLOBAL_ALARM') {
                setAlarmActive(command.active !== false);
                if (command.level === 'critical') {
                    Object.keys(ROOMS).forEach(room => {
                        setRoomAlertLevels(prev => ({ ...prev, [room]: 'critical' }));
                    });
                }
            }
        };

        window.addEventListener('riscvCommand', handleRiscvCommand);
        return () => window.removeEventListener('riscvCommand', handleRiscvCommand);
    }, []);

    // Set individual heater state
    const setHeaterState = useCallback((roomId, state) => {
        setHeaterStates(prev => ({
            ...prev,
            [roomId]: { ...prev[roomId], ...state }
        }));
    }, []);

    // Overload a heater (causes smoke) - or reset if already overloaded
    const overloadHeater = useCallback((roomId) => {
        setHeaterStates(prev => {
            const current = prev[roomId];
            if (current.overloaded) {
                return {
                    ...prev,
                    [roomId]: { on: false, level: 1, overloaded: false }
                };
            } else {
                setAlarmActive(true);
                setSmokeLevel(s => Math.min(s + 30, 100));
                return {
                    ...prev,
                    [roomId]: { ...prev[roomId], overloaded: true, on: true, level: 3 }
                };
            }
        });
    }, []);

    // Reset a specific heater
    const resetHeater = useCallback((roomId) => {
        setHeaterStates(prev => ({
            ...prev,
            [roomId]: { on: false, level: 1, overloaded: false }
        }));
    }, []);

    // Trigger appliance explosion - or reset if already exploded
    const triggerExplosion = useCallback((applianceId) => {
        setExplosionStates(prev => {
            const current = prev[applianceId];
            if (current.exploded) {
                return {
                    ...prev,
                    [applianceId]: { exploded: false, smoking: false }
                };
            } else {
                setAlarmActive(true);
                setSmokeLevel(s => Math.min(s + 40, 100));
                return {
                    ...prev,
                    [applianceId]: { exploded: true, smoking: true }
                };
            }
        });
    }, []);

    // Reset a specific appliance
    const resetAppliance = useCallback((applianceId) => {
        setExplosionStates(prev => ({
            ...prev,
            [applianceId]: { exploded: false, smoking: false }
        }));
    }, []);

    // Add a burning item to stove
    const addBurningItem = useCallback((itemName) => {
        setBurningItems(prev => [...prev, { name: itemName, startTime: Date.now() }]);
        setAlarmActive(true);
    }, []);

    // Set ventilation state for a room
    const setVentilationState = useCallback((roomId, state) => {
        setVentilationStates(prev => ({
            ...prev,
            [roomId]: { ...prev[roomId], ...state }
        }));
    }, []);

    // Trigger full emergency mode
    const triggerEmergency = useCallback(() => {
        setEmergencyMode(true);
        setAlarmActive(true);
        setChimneyBlocked(true);
        setSmokeLevel(80);
        // Set all rooms to critical
        const criticalLevels = {};
        Object.keys(ROOMS).forEach(room => {
            criticalLevels[room] = 'critical';
        });
        setRoomAlertLevels(criticalLevels);
    }, []);

    // Reset all simulation states
    const resetSimulation = useCallback(() => {
        setAlarmActive(false);
        setChimneyBlocked(false);
        setSmokeLevel(0);
        setEmergencyMode(false);
        setBurningItems([]);
        setStoveBurners([false, false, false, false]);
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
        setVentilationStates({
            'kitchen': { active: false, level: 'OFF' },
            'living-room': { active: false, level: 'OFF' },
            'dining-room': { active: false, level: 'OFF' },
            'guest-bedroom': { active: false, level: 'OFF' },
            'master-bedroom': { active: false, level: 'OFF' },
            'children-room': { active: false, level: 'OFF' },
            'home-office': { active: false, level: 'OFF' },
        });
        setRoomAlertLevels({
            'kitchen': 'normal',
            'living-room': 'normal',
            'dining-room': 'normal',
            'guest-bedroom': 'normal',
            'master-bedroom': 'normal',
            'children-room': 'normal',
            'home-office': 'normal',
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
            resetHeater,
            explosionStates,
            triggerExplosion,
            resetAppliance,
            stoveBurners,
            setStoveBurners,
            burningItems,
            addBurningItem,
            ventilationStates,
            setVentilationState,
            roomAlertLevels,
            sensorData,
            aggregatedSensors,
            lastRiscvCommand,
            riscvConnected,
            setRiscvConnected,
            emergencyMode,
            triggerEmergency,
            resetSimulation,
        }}>
            {children}
        </SimulationContext.Provider>
    );
};

export default SimulationContext;

