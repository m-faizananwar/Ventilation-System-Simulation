import { useState, useEffect, useCallback, useRef } from 'react';
import * as mqtt from 'mqtt';

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

export const useRiscvCommunication = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastCommand, setLastCommand] = useState(null);
    const [lastWokwiData, setLastWokwiData] = useState(null);
    const [connectionError, setConnectionError] = useState(null);
    const clientRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    // Connect to MQTT broker
    useEffect(() => {
        const connectMqtt = () => {
            try {
                const clientId = `simulation-${Math.random().toString(16).slice(2, 10)}`;

                const client = mqtt.connect(MQTT_BROKER_URL, {
                    clientId,
                    clean: true,
                    connectTimeout: 5000,
                    reconnectPeriod: 3000,
                });


                client.on('connect', () => {
                    console.log('🔗 Connected to MQTT broker');
                    setIsConnected(true);
                    setConnectionError(null);

                    // Subscribe to command topic from RISC-V
                    client.subscribe(TOPIC_COMMANDS, { qos: 0 }, (err) => {
                        if (err) {
                            console.error('Failed to subscribe to commands:', err);
                        } else {
                            console.log('📡 Subscribed to', TOPIC_COMMANDS);
                        }
                    });

                    // Subscribe to Wokwi monitor topic
                    client.subscribe(TOPIC_MONITOR, { qos: 0 }, (err) => {
                        if (!err) {
                            console.log('📡 Subscribed to', TOPIC_MONITOR);
                        }
                    });
                });

                client.on('message', (topic, message) => {
                    try {
                        const payload = JSON.parse(message.toString());
                        console.log(`📨 Received on ${topic}:`, payload);

                        if (topic === TOPIC_COMMANDS) {
                            setLastCommand({
                                ...payload,
                                timestamp: Date.now(),
                            });

                            // Dispatch event for other components to react
                            window.dispatchEvent(new CustomEvent('riscvCommand', {
                                detail: payload
                            }));
                        } else if (topic === TOPIC_MONITOR) {
                            setLastWokwiData({
                                ...payload,
                                timestamp: Date.now(),
                            });
                        }
                    } catch (e) {
                        console.warn('Failed to parse MQTT message:', e);
                    }
                });

                client.on('error', (err) => {
                    console.error('MQTT error:', err);
                    setConnectionError(err.message);
                });

                client.on('close', () => {
                    console.log('🔌 MQTT connection closed');
                    setIsConnected(false);
                });

                client.on('reconnect', () => {
                    console.log('🔄 Reconnecting to MQTT...');
                });

                clientRef.current = client;
            } catch (err) {
                console.error('Failed to connect to MQTT:', err);
                setConnectionError(err.message);
            }
        };

        connectMqtt();

        return () => {
            if (clientRef.current) {
                clientRef.current.end(true);
                clientRef.current = null;
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

    // Publish sensor data to RISC-V
    const publishSensorData = useCallback((sensorData) => {
        if (!clientRef.current || !isConnected) {
            console.warn('Cannot publish: MQTT not connected');
            return false;
        }

        try {
            const payload = JSON.stringify({
                ...sensorData,
                timestamp: Date.now(),
            });

            clientRef.current.publish(TOPIC_SENSORS, payload, { qos: 0 });
            console.log('📤 Published sensor data:', sensorData);
            return true;
        } catch (err) {
            console.error('Failed to publish sensor data:', err);
            return false;
        }
    }, [isConnected]);

    // Publish a command (for testing/manual override)
    const publishCommand = useCallback((command) => {
        if (!clientRef.current || !isConnected) {
            return false;
        }

        try {
            const payload = JSON.stringify(command);
            clientRef.current.publish(TOPIC_COMMANDS, payload, { qos: 0 });
            return true;
        } catch (err) {
            console.error('Failed to publish command:', err);
            return false;
        }
    }, [isConnected]);

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
