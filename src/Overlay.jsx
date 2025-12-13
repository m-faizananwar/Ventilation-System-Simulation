import React from 'react';

export function Overlay({ fogIntensity, sensors, fanOn, onToggleFog }) {
    const getStatusColor = (type, value) => {
        if (type === 'co2') {
            if (value < 600) return '#00FF00';
            if (value < 1000) return '#FFAA00';
            return '#FF0000';
        }
        if (type === 'pm25') {
            if (value < 35) return '#00FF00';
            if (value < 75) return '#FFAA00';
            return '#FF0000';
        }
        if (type === 'smog') {
            if (value < 50) return '#00FF00';
            if (value < 150) return '#FFAA00';
            return '#FF0000';
        }
        return '#00FF00';
    };

    const getStatusText = (type, value) => {
        if (type === 'co2') {
            if (value < 600) return 'GOOD';
            if (value < 1000) return 'MODERATE';
            return 'POOR';
        }
        if (type === 'pm25') {
            if (value < 35) return 'GOOD';
            if (value < 75) return 'MODERATE';
            return 'UNHEALTHY';
        }
        if (type === 'smog') {
            if (value < 50) return 'GOOD';
            if (value < 150) return 'MODERATE';
            return 'UNHEALTHY';
        }
        return 'GOOD';
    };

    const fogPercentage = Math.round(fogIntensity * 100);
    const airQuality = sensors.smog < 50 ? 'EXCELLENT' : sensors.smog < 150 ? 'MODERATE' : 'POOR';

    return (
        <>
            {/* Main Control Panel */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(30, 30, 45, 0.95))',
                color: 'white',
                padding: '25px',
                borderRadius: '15px',
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                width: '320px',
                pointerEvents: 'auto',
                zIndex: 1000,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(100, 150, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '15px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: fanOn ? '#00FF00' : '#FF0000',
                        marginRight: '10px',
                        boxShadow: fanOn ? '0 0 15px #00FF00' : '0 0 15px #FF0000',
                        animation: fanOn ? 'pulse 2s infinite' : 'none'
                    }} />
                    <h2 style={{ 
                        margin: 0, 
                        fontSize: '1.4em',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        background: 'linear-gradient(90deg, #fff, #aaf)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        AIR QUALITY MONITOR
                    </h2>
                </div>

                {/* Overall Air Quality Status */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    border: `2px solid ${getStatusColor('smog', sensors.smog)}`
                }}>
                    <div style={{ 
                        fontSize: '0.9em', 
                        color: '#AAA',
                        marginBottom: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Overall Status
                    </div>
                    <div style={{ 
                        fontSize: '1.8em', 
                        fontWeight: 'bold',
                        color: getStatusColor('smog', sensors.smog),
                        textShadow: `0 0 10px ${getStatusColor('smog', sensors.smog)}`
                    }}>
                        {airQuality}
                    </div>
                </div>

                {/* Fog Control Button */}
                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={onToggleFog}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: fogIntensity > 0.5 
                                ? 'linear-gradient(135deg, #FF4444, #CC0000)' 
                                : 'linear-gradient(135deg, #4488FF, #0044CC)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.1em',
                            letterSpacing: '1px',
                            transition: 'all 0.3s',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                            textTransform: 'uppercase'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 7px 20px rgba(0, 0, 0, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        {fogIntensity > 0.1 ? `🌫️ CLEARING FOG (${fogPercentage}%)` : '💨 SIMULATE POLLUTION'}
                    </button>
                </div>

                {/* Sensor Readings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <SensorDisplay 
                        label="CO₂ Level" 
                        value={sensors.co2} 
                        unit="ppm"
                        type="co2"
                        icon="🔬"
                    />
                    <SensorDisplay 
                        label="PM2.5" 
                        value={sensors.pm25} 
                        unit="µg/m³"
                        type="pm25"
                        icon="💨"
                    />
                    <SensorDisplay 
                        label="Air Quality Index" 
                        value={sensors.smog} 
                        unit="AQI"
                        type="smog"
                        icon="🌡️"
                    />
                </div>

                {/* Ventilation System Status */}
                <div style={{ 
                    marginTop: '20px', 
                    paddingTop: '20px', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <span style={{ fontSize: '1.1em', fontWeight: '500' }}>
                            🌀 Ventilation System
                        </span>
                        <div style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: fanOn 
                                ? 'linear-gradient(135deg, #00FF00, #00AA00)'
                                : 'linear-gradient(135deg, #555, #333)',
                            fontWeight: 'bold',
                            fontSize: '0.9em',
                            boxShadow: fanOn ? '0 0 15px rgba(0, 255, 0, 0.5)' : 'none',
                            transition: 'all 0.3s'
                        }}>
                            {fanOn ? '✓ ACTIVE' : '○ STANDBY'}
                        </div>
                    </div>
                    
                    {fanOn && (
                        <div style={{
                            fontSize: '0.85em',
                            color: '#00FF00',
                            marginTop: '8px',
                            animation: 'fadeIn 0.5s'
                        }}>
                            ⚡ System automatically activated due to poor air quality
                        </div>
                    )}
                </div>
            </div>

            {/* Mini Stats - Bottom Left */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(20, 20, 30, 0.9)',
                color: 'white',
                padding: '15px 20px',
                borderRadius: '10px',
                fontFamily: 'monospace',
                fontSize: '0.9em',
                zIndex: 1000,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none'
            }}>
                <div style={{ marginBottom: '5px' }}>
                    <span style={{ color: '#AAA' }}>Fog Density:</span>{' '}
                    <span style={{ color: fogIntensity > 0.6 ? '#FF4444' : '#44FF44', fontWeight: 'bold' }}>
                        {fogPercentage}%
                    </span>
                </div>
                <div>
                    <span style={{ color: '#AAA' }}>Auto-Control:</span>{' '}
                    <span style={{ color: '#44AAFF', fontWeight: 'bold' }}>
                        ENABLED
                    </span>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}

function SensorDisplay({ label, value, unit, type, icon }) {
    const getStatusColor = (type, value) => {
        if (type === 'co2') {
            if (value < 600) return '#00FF00';
            if (value < 1000) return '#FFAA00';
            return '#FF0000';
        }
        if (type === 'pm25') {
            if (value < 35) return '#00FF00';
            if (value < 75) return '#FFAA00';
            return '#FF0000';
        }
        if (type === 'smog') {
            if (value < 50) return '#00FF00';
            if (value < 150) return '#FFAA00';
            return '#FF0000';
        }
        return '#00FF00';
    };

    const getStatusText = (type, value) => {
        if (type === 'co2') {
            if (value < 600) return 'GOOD';
            if (value < 1000) return 'MODERATE';
            return 'POOR';
        }
        if (type === 'pm25') {
            if (value < 35) return 'GOOD';
            if (value < 75) return 'MODERATE';
            return 'UNHEALTHY';
        }
        if (type === 'smog') {
            if (value < 50) return 'GOOD';
            if (value < 150) return 'MODERATE';
            return 'UNHEALTHY';
        }
        return 'GOOD';
    };

    const color = getStatusColor(type, value);
    const status = getStatusText(type, value);
    const percentage = type === 'co2' ? (value / 12) : type === 'pm25' ? (value / 1.5) : (value / 3);

    return (
        <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${color}30`
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
            }}>
                <span style={{ fontSize: '0.95em', color: '#CCC' }}>
                    {icon} {label}
                </span>
                <span style={{ 
                    fontSize: '0.75em',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    background: color + '20',
                    color: color,
                    fontWeight: 'bold'
                }}>
                    {status}
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <span style={{ 
                    fontSize: '1.5em', 
                    fontWeight: 'bold',
                    color: color,
                    textShadow: `0 0 10px ${color}50`
                }}>
                    {Math.round(value)}
                </span>
                <span style={{ fontSize: '0.8em', color: '#999' }}>
                    {unit}
                </span>
            </div>
            
            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                marginTop: '8px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${Math.min(percentage, 100)}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}, ${color}AA)`,
                    borderRadius: '3px',
                    transition: 'width 0.5s',
                    boxShadow: `0 0 10px ${color}`
                }} />
            </div>
        </div>
    );
}