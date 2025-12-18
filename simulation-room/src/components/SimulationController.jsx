import React, { useEffect, useRef, useMemo } from 'react';
import TerminalConsole from './TerminalConsole';
import { useLoggerContext } from './LoggerContext';
import { useRiscvCommunication } from '../hooks/useRiscvCommunication';
import { useSimulation } from './simulation/SimulationContext';

/**
 * SimulationController - Connects MQTT communication with the simulation
 * and manages terminal logging
 */

const SENSOR_PUBLISH_INTERVAL = 2000; // Publish sensor data every 2 seconds

const SimulationController = () => {
    const logger = useLoggerContext();
    const { aggregatedSensors, setRiscvConnected, stoveBurners, burningItems, chimneyBlocked, emergencyMode } = useSimulation();

    const {
        isConnected,
        connectionError,
        publishSensorData,
        lastCommand,
    } = useRiscvCommunication(logger);

    const lastPublishRef = useRef(0);
    const prevStatesRef = useRef({
        stoveBurners: [false, false, false, false],
        burningItemsCount: 0,
        chimneyBlocked: false,
        emergencyMode: false,
    });

    // Update RISC-V connection status in simulation context
    useEffect(() => {
        setRiscvConnected(isConnected);
    }, [isConnected, setRiscvConnected]);

    // Log connection errors - only when error changes
    useEffect(() => {
        if (connectionError) {
            logger.logError(`❌ Connection error: ${connectionError}`);
        }
    }, [connectionError]); // Don't include logger - it's stable from context

    // Log state changes - with tracking to avoid duplicate logs
    useEffect(() => {
        const prevStates = prevStatesRef.current;

        // Check stove burners
        const prevActiveCount = prevStates.stoveBurners.filter(b => b).length;
        const activeCount = stoveBurners.filter(b => b).length;
        if (activeCount !== prevActiveCount && activeCount > 0) {
            logger.logWarning(`🔥 Stove: ${activeCount} burner(s) active`);
        }
        prevStates.stoveBurners = [...stoveBurners];

        // Check burning items
        if (burningItems.length > prevStates.burningItemsCount && burningItems.length > 0) {
            logger.logError(`🔥 ALERT: ${burningItems.length} item(s) burning on stove!`);
        }
        prevStates.burningItemsCount = burningItems.length;

        // Check chimney
        if (chimneyBlocked && !prevStates.chimneyBlocked) {
            logger.logError('🚨 WARNING: Chimney blocked! Smoke building up...');
        }
        prevStates.chimneyBlocked = chimneyBlocked;

        // Check emergency mode
        if (emergencyMode && !prevStates.emergencyMode) {
            logger.logError('🆘 EMERGENCY MODE ACTIVATED!');
        }
        prevStates.emergencyMode = emergencyMode;
    }, [stoveBurners, burningItems, chimneyBlocked, emergencyMode]); // Don't include logger

    // Memoize sensor data to prevent unnecessary publishes
    const sensorDataString = useMemo(() => JSON.stringify(aggregatedSensors), [aggregatedSensors]);

    // Periodically publish sensor data to RISC-V
    useEffect(() => {
        if (!isConnected) return;

        const interval = setInterval(() => {
            const now = Date.now();
            // Only publish if we haven't published recently
            if (now - lastPublishRef.current >= SENSOR_PUBLISH_INTERVAL - 100) {
                publishSensorData(aggregatedSensors);
                lastPublishRef.current = now;
            }
        }, SENSOR_PUBLISH_INTERVAL);

        return () => clearInterval(interval);
    }, [isConnected, sensorDataString]); // Use string comparison, not publishSensorData

    // Log received commands with more detail
    useEffect(() => {
        if (lastCommand) {
            const action = lastCommand.action || 'UNKNOWN';
            const room = lastCommand.room || 'global';
            const level = lastCommand.level || '';
            logger.logCommand(`⚡ Executing: ${action} [room: ${room}] [level: ${level}]`);
        }
    }, [lastCommand]); // Don't include logger

    return (
        <TerminalConsole
            logs={logger.logs}
            onClear={logger.clearLogs}
        />
    );
};

export default SimulationController;
