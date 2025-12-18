import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for managing simulation logs - similar to Wokwi's serial monitor
 */

const MAX_LOGS = 500; // Keep last 500 logs

// Log types for styling
export const LOG_TYPES = {
    SYSTEM: 'system',      // Boot messages, initialization
    MQTT: 'mqtt',          // MQTT connection logs
    SENSOR: 'sensor',      // Sensor data updates
    COMMAND: 'command',    // Commands sent/received
    WARNING: 'warning',    // Warning messages
    ERROR: 'error',        // Error messages
    SUCCESS: 'success',    // Success messages
};

export const useLogger = () => {
    const [logs, setLogs] = useState([]);
    const logIdRef = useRef(0);
    const startTimeRef = useRef(Date.now());

    // Add a new log entry
    const addLog = useCallback((message, type = LOG_TYPES.SYSTEM) => {
        const timestamp = Date.now() - startTimeRef.current;
        const newLog = {
            id: logIdRef.current++,
            timestamp,
            message,
            type,
            time: new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: 3
            }),
        };

        setLogs(prev => {
            const updated = [...prev, newLog];
            // Keep only the last MAX_LOGS entries
            if (updated.length > MAX_LOGS) {
                return updated.slice(-MAX_LOGS);
            }
            return updated;
        });

        return newLog;
    }, []);

    // Clear all logs
    const clearLogs = useCallback(() => {
        setLogs([]);
        startTimeRef.current = Date.now();
        logIdRef.current = 0;
    }, []);

    // Helper methods for specific log types
    const logSystem = useCallback((msg) => addLog(msg, LOG_TYPES.SYSTEM), [addLog]);
    const logMqtt = useCallback((msg) => addLog(msg, LOG_TYPES.MQTT), [addLog]);
    const logSensor = useCallback((msg) => addLog(msg, LOG_TYPES.SENSOR), [addLog]);
    const logCommand = useCallback((msg) => addLog(msg, LOG_TYPES.COMMAND), [addLog]);
    const logWarning = useCallback((msg) => addLog(msg, LOG_TYPES.WARNING), [addLog]);
    const logError = useCallback((msg) => addLog(msg, LOG_TYPES.ERROR), [addLog]);
    const logSuccess = useCallback((msg) => addLog(msg, LOG_TYPES.SUCCESS), [addLog]);

    // Log JSON data (formatted)
    const logJson = useCallback((label, data, type = LOG_TYPES.SENSOR) => {
        try {
            const jsonStr = JSON.stringify(data);
            addLog(`${label}: ${jsonStr}`, type);
        } catch (e) {
            addLog(`${label}: [Unable to stringify]`, LOG_TYPES.ERROR);
        }
    }, [addLog]);

    return {
        logs,
        addLog,
        clearLogs,
        logSystem,
        logMqtt,
        logSensor,
        logCommand,
        logWarning,
        logError,
        logSuccess,
        logJson,
    };
};

export default useLogger;
