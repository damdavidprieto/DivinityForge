import React from 'react';

const GodDashboard = ({ god }) => {
    const domains = [
        { id: 'ORDER', label: 'Order', color: 'var(--clr-order)' },
        { id: 'CHAOS', label: 'Chaos', color: 'var(--clr-chaos)' },
        { id: 'LIFE', label: 'Life', color: 'var(--clr-life)' },
        { id: 'WRATH', label: 'Wrath', color: 'var(--clr-wrath)' },
        { id: 'KNOWLEDGE', label: 'Knowledge', color: 'var(--clr-knowledge)' }
    ];

    return (
        <div className="god-dashboard">
            <h3>Divine Resonance</h3>
            <div className="archetype-info">
                <span className="label">Form:</span>
                <span className="value">{god.archetype || 'Ascending Essence'}</span>
            </div>

            <div className="domains-container">
                {domains.map(d => {
                    const points = god.domainPoints[d.id] || 0;
                    const percentage = Math.min(100, (points / 20) * 100);

                    return (
                        <div key={d.id} className="domain-track">
                            <div className="domain-header">
                                <span className="domain-name">{d.label}</span>
                                <span className="domain-points">{points}</span>
                            </div>
                            <div className="progress-bg">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: d.color,
                                        boxShadow: `0 0 10px ${d.color}`
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .god-dashboard {
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 1.5rem;
                    width: 300px;
                    position: absolute;
                    left: 2rem;
                    top: 12rem;
                    z-index: 10;
                }
                
                .god-dashboard h3 {
                    margin-top: 0;
                    font-size: 0.9rem;
                    color: var(--clr-gold);
                }
                
                .archetype-info {
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid var(--glass-border);
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                }
                
                .archetype-info .value {
                    color: var(--text-primary);
                    font-weight: bold;
                    font-family: var(--font-heading);
                }
                
                .domains-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .domain-track {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                
                .domain-header {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--text-secondary);
                }
                
                .progress-bg {
                    height: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 2px;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </div>
    );
};

export default GodDashboard;
