import React from 'react';

const PlanetView = ({ planet }) => {
    // Dynamic styles based on planet stats
    const atmosphereColor = planet.atmosphere === 'stormy' ? 'rgba(100, 116, 139, 0.8)' :
        planet.atmosphere === 'void' ? 'transparent' :
            'rgba(186, 230, 253, 0.3)'; // Calm Divine Light

    const surfaceColor = planet.stats && planet.stats.hydration > 20 ?
        (planet.population > 100 ? '#166534' : '#1e40af') : // Deep Green if pop, Deep Blue if wet
        '#581c87'; // Royal Purple/Rock base

    const planetSize = 350;

    const planetStyle = {
        width: `${planetSize}px`,
        height: `${planetSize}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${surfaceColor}, #020617)`,
        position: 'relative',
        margin: '2rem auto',
        boxShadow: `
            0 0 80px rgba(0, 0, 0, 0.6),
            inset -30px -30px 60px rgba(0,0,0,0.8),
            0 0 ${40 + (planet.population / 100)}px ${planet.population > 0 ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.05)'}
        `,
        transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        animation: 'slowRotate 120s linear infinite'
    };

    const atmosphereStyle = {
        position: 'absolute',
        top: '-10px', left: '-10px', right: '-10px', bottom: '-10px',
        borderRadius: '50%',
        background: atmosphereColor,
        boxShadow: `inset 0 0 40px rgba(255,255,255,0.1), 0 0 20px ${atmosphereColor}`,
        zIndex: 5,
        pointerEvents: 'none'
    };

    const glowsStyle = {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
        zIndex: 4
    }

    return (
        <div className="planet-container">
            <div style={planetStyle}>
                <div style={glowsStyle}></div>

                {/* Visualizing Hostility as Red Overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    opacity: planet.hostility / 100,
                    zIndex: 3,
                    borderRadius: '50%'
                }}></div>

                {/* Civilization Lights */}
                {planet.population > 500 && (
                    <div className="civ-lights" style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 2,
                        borderRadius: '50%',
                        opacity: Math.min(0.6, (planet.population - 500) / 5000)
                    }}></div>
                )}
            </div>

            <div style={atmosphereStyle}></div>

            <div className="planet-status-text">
                <h3>World Resonance</h3>
                <p>
                    <span className="label">Essence:</span>
                    <span className="value" style={{ color: 'var(--clr-gold)' }}>{planet.atmosphere.toUpperCase()}</span>
                </p>
                {planet.stats && (
                    <>
                        <p>
                            <span className="label">Vibrancy:</span>
                            <span className="value">{planet.stats.hydration}%</span>
                        </p>
                        <p>
                            <span className="label">Tempering:</span>
                            <span className="value">{planet.stats.temperature}°C</span>
                        </p>
                    </>
                )}
                <p>
                    <span className="label">Complexity:</span>
                    <span className="value" style={{ color: 'var(--clr-life)' }}>{planet.population} souls</span>
                </p>
            </div>

            <style>{`
                @keyframes slowRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PlanetView;
