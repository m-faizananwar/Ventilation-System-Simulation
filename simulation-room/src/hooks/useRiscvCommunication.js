import { useState, useEffect, useCallback, useRef } from 'react';
import mqtt from 'mqtt';

/**
 * Custom hook for bidirectional MQTT communication with RISC-V Wokwi simulation.
 * 
 * Publishes sensor data to: smart-corridor/sensors
 * Subscribes to commands from: smart-corridor/commands
 */

const MQTT_BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';
const TOPIC_SENSORS = 'smart-corridor/sensors';
const TOPIC_COMMANDS = 'smart-corridor/commands';
const TOPIC_MONITOR = 'smart-corridor/monitor'; // Wokwi publishes here

export const useRiscvCommunication = (logger = null) => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastCommand, setLastCommand] = useState(null);
    const [lastWokwiData, setLastWokwiData] = useState(null);
    const [connectionError, setConnectionError] = useState(null);
    const clientRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    // Use ref to avoid dependency issues with logger
    const loggerRef = useRef(logger);
    loggerRef.current = logger;

    // Stable logging function using ref
    const log = useCallback((type, message) => {
        const currentLogger = loggerRef.current;
        if (currentLogger) {
            switch (type) {
                case 'mqtt': currentLogger.logMqtt(message); break;
                case 'command': currentLogger.logCommand(message); break;
                case 'sensor': currentLogger.logSensor(message); break;
                case 'error': currentLogger.logError(message); break;
                case 'warning': currentLogger.logWarning(message); break;
                case 'success': currentLogger.logSuccess(message); break;
                default: currentLogger.logSystem(message);
            }
        }
        console.log(message);
    }, []); // Empty dependency array - stable reference

    // Connect to MQTT broker - only runs once
    useEffect(() => {
        // Prevent multiple connections
        if (clientRef.current) {
            return;
        }

        const clientId = `simulation-${Math.random().toString(16).slice(2, 10)}`;

        log('mqtt', `🔗 Attempting MQTT connection...`);
        log('mqtt', `   Broker: broker.hivemq.com:8884`);
        log('mqtt', `   Client ID: ${clientId}`);

        try {
            // Use mqtt.connect or mqtt directly (depending on how it's exported)
            const connectFn = mqtt.connect || mqtt;
            const client = connectFn(MQTT_BROKER_URL, {
                clientId,
                clean: true,
                connectTimeout: 5000,
                reconnectPeriod: 3000,
            });

            client.on('connect', () => {
                log('success', '🔗 Connected to MQTT broker');
                setIsConnected(true);
                setConnectionError(null);

                // Subscribe to command topic from RISC-V
                client.subscribe(TOPIC_COMMANDS, { qos: 0 }, (err) => {
                    if (err) {
                        log('error', `❌ Failed to subscribe to ${TOPIC_COMMANDS}: ${err.message}`);
                    } else {
                        log('mqtt', `📡 Subscribed to: ${TOPIC_COMMANDS}`);
                    }
                });

                // Subscribe to Wokwi monitor topic
                client.subscribe(TOPIC_MONITOR, { qos: 0 }, (err) => {
                    if (!err) {
                        log('mqtt', `📡 Subscribed to: ${TOPIC_MONITOR}`);
                    }
                });
            });

            client.on('message', (topic, message) => {
                try {
                    const payload = JSON.parse(message.toString());

                    if (topic === TOPIC_COMMANDS) {
                        log('command', `📨 Command received: ${JSON.stringify(payload)}`);
                        setLastCommand({
                            ...payload,
                            timestamp: Date.now(),
                        });

                        // Dispatch event for other components to react
                        window.dispatchEvent(new CustomEvent('riscvCommand', {
                            detail: payload
                        }));
                    } else if (topic === TOPIC_MONITOR) {
                        // Less verbose logging for monitor data (every few seconds from Wokwi)
                        log('sensor', `📊 Wokwi: ${JSON.stringify(payload)}`);
                        setLastWokwiData({
                            ...payload,
                            timestamp: Date.now(),
                        });
                    }
                } catch (e) {
                    log('warning', `⚠️ Failed to parse MQTT message: ${e.message}`);
                }
            });

            client.on('error', (err) => {
                log('error', `❌ MQTT error: ${err.message}`);
                setConnectionError(err.message);
            });

            client.on('close', () => {
                log('mqtt', '🔌 MQTT connection closed');
                setIsConnected(false);
            });

            client.on('reconnect', () => {
                log('mqtt', '🔄 Reconnecting to MQTT...');
            });

            client.on('offline', () => {
                log('warning', '📴 MQTT client offline');
            });

            clientRef.current = client;
        } catch (err) {
            log('error', `❌ Failed to connect to MQTT: ${err.message}`);
            setConnectionError(err.message);
        }

        return () => {
            if (clientRef.current) {
                clientRef.current.end(true);
                clientRef.current = null;
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [log]); // log is now stable

    // Publish sensor data to RISC-V
    const publishSensorData = useCallback((sensorData) => {
        if (!clientRef.current || !isConnected) {
            // Don't log warning on every attempt - too noisy
            return false;
        }

        try {
            const payload = JSON.stringify({
                ...sensorData,
                timestamp: Date.now(),
            });

            clientRef.current.publish(TOPIC_SENSORS, payload, { qos: 0 });
            log('sensor', `📤 Published sensors: ${payload}`);
            return true;
        } catch (err) {
            log('error', `❌ Failed to publish sensor data: ${err.message}`);
            return false;
        }
    }, [isConnected, log]);

    // Publish a command (for testing/manual override)
    const publishCommand = useCallback((command) => {
        if (!clientRef.current || !isConnected) {
            return false;
        }

        try {
            const payload = JSON.stringify(command);
            clientRef.current.publish(TOPIC_COMMANDS, payload, { qos: 0 });
            log('command', `📤 Command sent: ${payload}`);
            return true;
        } catch (err) {
            log('error', `❌ Failed to publish command: ${err.message}`);
            return false;
        }
    }, [isConnected, log]);

    return {
        isConnected,
        connectionError,
        lastCommand,
        lastWokwiData,
        publishSensorData,
        publishCommand,
    };
};

export default useRiscvCommunication;
