import React, { useState, useRef, useEffect } from 'react';
import { LOG_TYPES } from '../hooks/useLogger';

/**
 * Terminal Console Component - Wokwi-style serial monitor for the 3D simulation
 */

// Color mapping for log types
const LOG_COLORS = {
    [LOG_TYPES.SYSTEM]: '#00BFFF',    // Deep sky blue
    [LOG_TYPES.MQTT]: '#9370DB',       // Medium purple
    [LOG_TYPES.SENSOR]: '#32CD32',     // Lime green
    [LOG_TYPES.COMMAND]: '#FFD700',    // Gold
    [LOG_TYPES.WARNING]: '#FFA500',    // Orange
    [LOG_TYPES.ERROR]: '#FF4444',      // Red
    [LOG_TYPES.SUCCESS]: '#00FF7F',    // Spring green
};

// Terminal icon SVG
const TerminalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);

// Copy icon SVG
const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

// Check icon SVG (for copied feedback)
const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const TerminalConsole = ({ logs = [], onClear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);
    const [copied, setCopied] = useState(false);
    const logContainerRef = useRef(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const lastLogCountRef = useRef(0);

    // Copy logs to clipboard
    const copyLogs = async (e) => {
        e.stopPropagation();
        const logText = logs.map(log => `[${log.time}] ${log.message}`).join('\n');
        try {
            await navigator.clipboard.writeText(logText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy logs:', err);
        }
    };

    // Track unread logs when terminal is closed
    useEffect(() => {
        if (!isOpen && logs.length > lastLogCountRef.current) {
            setUnreadCount(prev => prev + (logs.length - lastLogCountRef.current));
        }
        lastLogCountRef.current = logs.length;
    }, [logs.length, isOpen]);

    // Clear unread count when opening
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (autoScroll && logContainerRef.current && isOpen && !isMinimized) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs, autoScroll, isOpen, isMinimized]);

    // Handle scroll to detect if user scrolled up
    const handleScroll = () => {
        if (logContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
            const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
            setAutoScroll(isAtBottom);
        }
    };

    const toggleTerminal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsMinimized(false);
        }
    };

    const toggleMinimize = (e) => {
        e.stopPropagation();
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            {/* Terminal Button - Bottom Right */}
            <button
                onClick={toggleTerminal}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: isOpen
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                        : 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
                    border: `2px solid ${isOpen ? '#00ff88' : '#4a9eff'}`,
                    color: isOpen ? '#00ff88' : '#4a9eff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isOpen
                        ? '0 0 20px rgba(0, 255, 136, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
                        : '0 0 15px rgba(74, 158, 255, 0.3), 0 4px 15px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    zIndex: 1000,
                }}
                title="Toggle Terminal Console"
            >
                <TerminalIcon />

                {/* Unread badge */}
                {unreadCount > 0 && !isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#ff4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '22px',
                        height: '22px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #1a1a2e',
                    }}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                )}
            </button>

            {/* Terminal Window */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    width: isMinimized ? '300px' : '600px',
                    height: isMinimized ? '40px' : '400px',
                    background: 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)',
                    borderRadius: '12px',
                    border: '1px solid #30363d',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                }}>
                    {/* Terminal Header */}
                    <div style={{
                        background: 'linear-gradient(180deg, #21262d 0%, #161b22 100%)',
                        padding: '10px 15px',
                        borderBottom: '1px solid #30363d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                    }}
                        onClick={toggleMinimize}
                    >
                        {/* Title */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            {/* Traffic light buttons */}
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#ff5f56',
                                    cursor: 'pointer',
                                }}
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    title="Close"
                                />
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#ffbd2e',
                                    cursor: 'pointer',
                                }}
                                    onClick={toggleMinimize}
                                    title="Minimize"
                                />
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#27c93f',
                                }}
                                    title="Maximize"
                                />
                            </div>

                            <span style={{
                                color: '#8b949e',
                                fontSize: '13px',
                                fontWeight: '500',
                            }}>
                                📟 Simulation Console — 3D Environment Logs
                            </span>
                        </div>

                        {/* Controls */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            {/* Log count */}
                            <span style={{
                                color: '#58a6ff',
                                fontSize: '11px',
                                background: 'rgba(88, 166, 255, 0.1)',
                                padding: '2px 8px',
                                borderRadius: '10px',
                            }}>
                                {logs.length} logs
                            </span>

                            {/* Copy button */}
                            {!isMinimized && (
                                <button
                                    onClick={copyLogs}
                                    style={{
                                        background: copied
                                            ? 'rgba(39, 201, 63, 0.2)'
                                            : 'rgba(88, 166, 255, 0.1)',
                                        border: copied
                                            ? '1px solid rgba(39, 201, 63, 0.5)'
                                            : '1px solid rgba(88, 166, 255, 0.3)',
                                        color: copied ? '#27c93f' : '#58a6ff',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}
                                    title="Copy logs to clipboard"
                                >
                                    {copied ? <CheckIcon /> : <CopyIcon />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            )}

                            {/* Clear button */}
                            {!isMinimized && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClear && onClear(); }}
                                    style={{
                                        background: 'rgba(255, 100, 100, 0.1)',
                                        border: '1px solid rgba(255, 100, 100, 0.3)',
                                        color: '#ff6b6b',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    title="Clear logs"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Log Content */}
                    {!isMinimized && (
                        <div
                            ref={logContainerRef}
                            onScroll={handleScroll}
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                padding: '10px 15px',
                                fontSize: '12px',
                                lineHeight: '1.6',
                            }}
                        >
                            {logs.length === 0 ? (
                                <div style={{
                                    color: '#484f58',
                                    textAlign: 'center',
                                    padding: '40px',
                                    fontStyle: 'italic',
                                }}>
                                    No logs yet. Waiting for simulation events...
                                </div>
                            ) : (
                                logs.map((log) => (
                                    <div
                                        key={log.id}
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                            marginBottom: '4px',
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {/* Timestamp */}
                                        <span style={{
                                            color: '#484f58',
                                            flexShrink: 0,
                                            fontSize: '11px',
                                        }}>
                                            [{log.time}]
                                        </span>

                                        {/* Message */}
                                        <span style={{
                                            color: LOG_COLORS[log.type] || '#c9d1d9',
                                        }}>
                                            {log.message}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Auto-scroll indicator */}
                    {!isMinimized && !autoScroll && (
                        <button
                            onClick={() => {
                                setAutoScroll(true);
                                if (logContainerRef.current) {
                                    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
                                }
                            }}
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(88, 166, 255, 0.2)',
                                border: '1px solid rgba(88, 166, 255, 0.4)',
                                color: '#58a6ff',
                                padding: '6px 16px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            ↓ Scroll to bottom
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default TerminalConsole;
