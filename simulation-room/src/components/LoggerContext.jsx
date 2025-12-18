import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLogger } from '../hooks/useLogger';

/**
 * Logger Context - Provides logging functionality across the app
 * Similar to Wokwi's serial monitor
 */

const LoggerContext = createContext(null);

export const useLoggerContext = () => {
    const context = useContext(LoggerContext);
    if (!context) {
        throw new Error('useLoggerContext must be used within a LoggerProvider');
    }
    return context;
};

export const LoggerProvider = ({ children }) => {
    const logger = useLogger();
    const hasBootedRef = useRef(false);

    // Boot sequence - runs once on mount (similar to ESP32 boot)
    useEffect(() => {
        if (hasBootedRef.current) return;
        hasBootedRef.current = true;

        // Simulate ESP32-style boot sequence
        const bootSequence = async () => {
            logger.logSystem('');
            logger.logSystem('ESP-ROM:threejs-fiber-v1.0');
            logger.logSystem('Build:Dec 19 2024');
            logger.logSystem('rst:0x1 (POWERON),boot:0xc (SIM_FAST_BOOT)');
            logger.logSystem('mode:3D, renderer:WebGL');
            logger.logSystem('');

            await new Promise(r => setTimeout(r, 100));
            logger.logSystem('🚀 Smart Corridor 3D Simulation Starting...');

            await new Promise(r => setTimeout(r, 50));
            logger.logSuccess('✅ React Three Fiber initialized');
            logger.logSuccess('✅ Physics engine loaded (Rapier)');
            logger.logSuccess('✅ Simulation context ready');

            await new Promise(r => setTimeout(r, 50));
            logger.logMqtt('📶 Initializing MQTT connection...');
        };

        bootSequence();
    }, [logger]);

    return (
        <LoggerContext.Provider value={logger}>
            {children}
        </LoggerContext.Provider>
    );
};

export default LoggerContext;
