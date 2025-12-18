import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSimulation } from './SimulationContext';

const SimulationControlMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('emergency');
    const containerRef = useRef(null);
    
    const {
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
        emergencyMode,
        triggerEmergency,
        resetSimulation,
    } = useSimulation();
    
    // Exit pointer lock when menu opens
    useEffect(() => {
        if (isOpen && document.pointerLockElement) {
            document.exitPointerLock();
        }
    }, [isOpen]);
    
    // Prevent clicks from triggering pointer lock on canvas
    const stopPropagation = useCallback((e) => {
        e.stopPropagation();
    }, []);
    
    const toggleMenu = useCallback(() => {
        // Exit pointer lock when opening menu
        if (!isOpen && document.pointerLockElement) {
            document.exitPointerLock();
        }
        setIsOpen(prev => !prev);
    }, [isOpen]);
    
    const heaterRooms = [
        { id: 'living-room', name: 'Living Room' },
        { id: 'dining-room', name: 'Dining Room' },
        { id: 'guest-bedroom', name: 'Guest Bedroom' },
        { id: 'master-bedroom', name: 'Master Bedroom' },
        { id: 'children-room', name: "Children's Room" },
        { id: 'home-office', name: 'Home Office' },
    ];
    
    const appliances = [
        { id: 'tv-living', name: 'Living Room TV' },
        { id: 'tv-master', name: 'Master Bedroom TV' },
        { id: 'stove', name: 'Kitchen Stove' },
        { id: 'fridge', name: 'Refrigerator' },
    ];
    
    return (
        <div 
            ref={containerRef}
            onMouseDown={stopPropagation}
            onPointerDown={stopPropagation}
            onClick={stopPropagation}
            style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}
        >
            {/* Menu Toggle Button - Bottom Left */}
            <button
                onClick={toggleMenu}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    pointerEvents: 'auto',
                    background: emergencyMode 
                        ? 'linear-gradient(135deg, #FF0000, #CC0000)' 
                        : 'linear-gradient(135deg, #4A90D9, #357ABD)',
                    border: '3px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: emergencyMode
                        ? '0 4px 20px rgba(255,0,0,0.5), 0 0 30px rgba(255,0,0,0.3)'
                        : '0 4px 15px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: 10000,
                    animation: emergencyMode ? 'pulse 1s infinite' : 'none',
                }}
            >
                {emergencyMode ? '🚨' : '⚙️'}
            </button>
            
            {/* Main Menu Panel */}
            {isOpen && (
                <div
                    onClick={stopPropagation}
                    onMouseDown={stopPropagation}
                    onPointerDown={stopPropagation}
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        left: '20px',
                        width: '340px',
                        maxHeight: '70vh',
                        background: 'linear-gradient(180deg, rgba(25,25,30,0.98) 0%, rgba(15,15,20,0.98) 100%)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        zIndex: 10000,
                        fontFamily: '"Segoe UI", Arial, sans-serif',
                        pointerEvents: 'auto',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(90deg, #4A90D9, #357ABD)',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '20px' }}>🏠</span>
                            <span style={{ 
                                color: 'white', 
                                fontWeight: 'bold',
                                fontSize: '16px',
                                letterSpacing: '0.5px'
                            }}>
                                Simulation Control
                            </span>
                        </div>
                        <button
                            onClick={toggleMenu}
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    
                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '8px',
                        gap: '6px',
                    }}>
                        {[
                            { id: 'emergency', icon: '🚨', label: 'Emergency' },
                            { id: 'heaters', icon: '🔥', label: 'Heaters' },
                            { id: 'appliances', icon: '💥', label: 'Appliances' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: 1,
                                    padding: '10px 8px',
                                    background: activeTab === tab.id 
                                        ? 'linear-gradient(135deg, #4A90D9, #357ABD)' 
                                        : 'rgba(60,60,70,0.5)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <span style={{ display: 'block', fontSize: '16px', marginBottom: '4px' }}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    
                    {/* Content Area */}
                    <div style={{
                        padding: '16px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        color: 'white',
                    }}>
                        {/* Emergency Tab */}
                        {activeTab === 'emergency' && (
                            <div>
                                {/* Quick Actions */}
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ margin: '0 0 12px 0', color: '#FF6B6B', fontSize: '14px' }}>
                                        ⚡ Quick Actions
                                    </h4>
                                    
                                    <button
                                        onClick={triggerEmergency}
                                        style={{
                                            width: '100%',
                                            padding: '14px',
                                            background: 'linear-gradient(135deg, #FF4444, #CC0000)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            marginBottom: '10px',
                                            boxShadow: '0 4px 15px rgba(255,0,0,0.3)',
                                        }}
                                    >
                                        🚨 TRIGGER FULL EMERGENCY
                                    </button>
                                    
                                    <button
                                        onClick={resetSimulation}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: 'linear-gradient(135deg, #4CAF50, #388E3C)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✅ Reset All Systems
                                    </button>
                                </div>
                                
                                {/* Individual Controls */}
                                <h4 style={{ margin: '0 0 12px 0', color: '#aaa', fontSize: '13px' }}>
                                    Individual Controls
                                </h4>
                                
                                {/* Alarm Toggle */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'rgba(60,60,70,0.4)',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '13px' }}>🔔 Fire Alarm</div>
                                        <div style={{ fontSize: '11px', color: alarmActive ? '#FF6B6B' : '#888' }}>
                                            {alarmActive ? 'ACTIVE - Sounding' : 'Inactive'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setAlarmActive(!alarmActive)}
                                        style={{
                                            padding: '8px 16px',
                                            background: alarmActive ? '#FF4444' : '#444',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {alarmActive ? 'OFF' : 'ON'}
                                    </button>
                                </div>
                                
                                {/* Chimney Toggle */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'rgba(60,60,70,0.4)',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '13px' }}>🏭 Chimney</div>
                                        <div style={{ fontSize: '11px', color: chimneyBlocked ? '#FF6B6B' : '#4CAF50' }}>
                                            {chimneyBlocked ? 'BLOCKED - Smoke trapped!' : 'Clear'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setChimneyBlocked(!chimneyBlocked);
                                            if (!chimneyBlocked) {
                                                setSmokeLevel(prev => Math.min(prev + 50, 100));
                                            } else {
                                                setSmokeLevel(prev => Math.max(prev - 30, 0));
                                            }
                                        }}
                                        style={{
                                            padding: '8px 16px',
                                            background: chimneyBlocked ? '#FF8C00' : '#444',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {chimneyBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                </div>
                                
                                {/* Smoke Level Slider */}
                                <div style={{
                                    padding: '12px',
                                    background: 'rgba(60,60,70,0.4)',
                                    borderRadius: '10px',
                                }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginBottom: '8px'
                                    }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '13px' }}>💨 Smoke Level</span>
                                        <span style={{ 
                                            color: smokeLevel > 50 ? '#FF6B6B' : '#4CAF50',
                                            fontWeight: 'bold'
                                        }}>
                                            {smokeLevel}%
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={smokeLevel}
                                        onChange={(e) => setSmokeLevel(parseInt(e.target.value))}
                                        style={{
                                            width: '100%',
                                            height: '8px',
                                            borderRadius: '4px',
                                            background: `linear-gradient(90deg, #4CAF50 0%, #FF6B6B ${smokeLevel}%, #333 ${smokeLevel}%)`,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        
                        {/* Heaters Tab */}
                        {activeTab === 'heaters' && (
                            <div>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <h4 style={{ margin: 0, color: '#FF8C42', fontSize: '14px' }}>
                                        🔥 Room Heaters
                                    </h4>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button
                                            onClick={() => {
                                                heaterRooms.forEach(room => {
                                                    const state = heaterStates[room.id];
                                                    if (!state?.overloaded) overloadHeater(room.id);
                                                });
                                            }}
                                            style={{
                                                padding: '6px 10px',
                                                background: '#FF4444',
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                fontSize: '10px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            ⚡ All
                                        </button>
                                        <button
                                            onClick={() => {
                                                heaterRooms.forEach(room => resetHeater(room.id));
                                            }}
                                            style={{
                                                padding: '6px 10px',
                                                background: '#4CAF50',
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                fontSize: '10px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            ✓ Reset All
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Info box explaining heater overload */}
                                <div style={{
                                    background: 'rgba(255,140,66,0.15)',
                                    border: '1px solid rgba(255,140,66,0.3)',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    marginBottom: '12px',
                                    fontSize: '11px',
                                    color: '#FFB366',
                                }}>
                                    <strong>⚡ Overload:</strong> Simulates heater malfunction causing smoke & fire hazard. Click ⚡ to overload or click again to reset.
                                </div>
                                
                                {heaterRooms.map(room => {
                                    const state = heaterStates[room.id] || { on: false, level: 1, overloaded: false };
                                    return (
                                        <div key={room.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 12px',
                                            background: state.overloaded 
                                                ? 'rgba(255,50,50,0.3)' 
                                                : 'rgba(60,60,70,0.4)',
                                            borderRadius: '8px',
                                            marginBottom: '8px',
                                            border: state.overloaded ? '1px solid #FF4444' : 'none',
                                        }}>
                                            <div>
                                                <div style={{ 
                                                    fontWeight: 'bold', 
                                                    fontSize: '12px',
                                                    color: state.overloaded ? '#FF6B6B' : 'white'
                                                }}>
                                                    {room.name}
                                                </div>
                                                <div style={{ 
                                                    fontSize: '10px', 
                                                    color: state.overloaded ? '#FF8888' : '#888' 
                                                }}>
                                                    {state.overloaded ? '⚠️ OVERLOADED!' : (state.on ? `Level ${state.level}` : 'Off')}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button
                                                    onClick={() => setHeaterState(room.id, { on: !state.on })}
                                                    disabled={state.overloaded}
                                                    style={{
                                                        padding: '6px 10px',
                                                        background: state.overloaded ? '#555' : (state.on ? '#4CAF50' : '#444'),
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        color: 'white',
                                                        fontSize: '10px',
                                                        cursor: state.overloaded ? 'not-allowed' : 'pointer',
                                                        opacity: state.overloaded ? 0.6 : 1,
                                                    }}
                                                >
                                                    {state.on ? 'ON' : 'OFF'}
                                                </button>
                                                <button
                                                    onClick={() => overloadHeater(room.id)}
                                                    style={{
                                                        padding: '6px 10px',
                                                        background: state.overloaded ? '#4CAF50' : '#FF6B35',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        color: 'white',
                                                        fontSize: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {state.overloaded ? '✓' : '⚡'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        
                        {/* Appliances Tab */}
                        {activeTab === 'appliances' && (
                            <div>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <h4 style={{ margin: 0, color: '#FFD93D', fontSize: '14px' }}>
                                        💥 Appliance Controls
                                    </h4>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button
                                            onClick={() => {
                                                appliances.forEach(app => {
                                                    const state = explosionStates[app.id];
                                                    if (!state?.exploded) triggerExplosion(app.id);
                                                });
                                            }}
                                            style={{
                                                padding: '6px 10px',
                                                background: '#FF4444',
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                fontSize: '10px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            💥 All
                                        </button>
                                        <button
                                            onClick={() => {
                                                appliances.forEach(app => resetAppliance(app.id));
                                            }}
                                            style={{
                                                padding: '6px 10px',
                                                background: '#4CAF50',
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                fontSize: '10px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            ✓ Reset All
                                        </button>
                                    </div>
                                </div>
                                
                                <p style={{ fontSize: '11px', color: '#888', marginBottom: '16px' }}>
                                    Trigger electrical failures to simulate smoke and fire hazards. Click again to repair.
                                </p>
                                
                                {appliances.map(appliance => {
                                    const state = explosionStates[appliance.id] || { exploded: false, smoking: false };
                                    return (
                                        <div key={appliance.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px',
                                            background: state.exploded 
                                                ? 'rgba(255,100,0,0.3)' 
                                                : 'rgba(60,60,70,0.4)',
                                            borderRadius: '10px',
                                            marginBottom: '10px',
                                            border: state.exploded ? '1px solid #FF6600' : 'none',
                                        }}>
                                            <div>
                                                <div style={{ 
                                                    fontWeight: 'bold', 
                                                    fontSize: '13px',
                                                    color: state.exploded ? '#FF8C42' : 'white'
                                                }}>
                                                    {appliance.name}
                                                </div>
                                                <div style={{ 
                                                    fontSize: '11px', 
                                                    color: state.exploded ? '#FF8888' : '#888' 
                                                }}>
                                                    {state.exploded ? '🔥 Malfunctioning!' : '✓ Normal'}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => triggerExplosion(appliance.id)}
                                                style={{
                                                    padding: '10px 16px',
                                                    background: state.exploded 
                                                        ? 'linear-gradient(135deg, #4CAF50, #388E3C)' 
                                                        : 'linear-gradient(135deg, #FF6B35, #FF4444)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {state.exploded ? '🔧 Repair' : '💥 Blast'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    
                    {/* Status Bar */}
                    <div style={{
                        padding: '12px 16px',
                        background: 'rgba(0,0,0,0.4)',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'space-around',
                        fontSize: '11px',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: alarmActive ? '#FF4444' : '#4CAF50', fontWeight: 'bold' }}>
                                {alarmActive ? '🚨' : '✓'}
                            </div>
                            <div style={{ color: '#888' }}>Alarm</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: smokeLevel > 30 ? '#FF8C42' : '#4CAF50', fontWeight: 'bold' }}>
                                {smokeLevel}%
                            </div>
                            <div style={{ color: '#888' }}>Smoke</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: chimneyBlocked ? '#FF4444' : '#4CAF50', fontWeight: 'bold' }}>
                                {chimneyBlocked ? '❌' : '✓'}
                            </div>
                            <div style={{ color: '#888' }}>Chimney</div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* CSS for pulse animation */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default SimulationControlMenu;
