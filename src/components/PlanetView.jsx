import React from 'react';

const PlanetView = ({ planet, domainPoints }) => {
    const isStormy = planet.atmosphere === 'stormy';
    const isWet = planet.stats && planet.stats.hydration > 30;

    // Atmosphere Calculation
    const atmosphereColor = isStormy ? 'rgba(100, 116, 139, 0.8)' :
        planet.atmosphere === 'void' ? 'transparent' :
            'rgba(186, 230, 253, 0.3)';

    // Surface Base Color
    const surfaceColor = planet.stats && planet.stats.hydration > 20 ?
        (planet.population > 100 ? '#166534' : '#1e40af') :
        '#581c87';

    const planetSize = 350;

    const getAuraStyle = (domain, color) => {
        const points = domainPoints[domain] || 0;
        const scale = 1 + (points / 150);
        const opacity = Math.min(0.4, points / 40);

        return {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '50%',
            boxShadow: `0 0 ${30 + points}px ${color}`,
            border: `1px solid ${color}`,
            transform: `scale(${scale})`,
            opacity: opacity,
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        };
    };

    return (
        <div className="planet-container">
            <div className="visual-stage">
                {/* Domain Auras */}
                <div style={getAuraStyle('ORDER', 'var(--clr-order)')}></div>
                <div style={getAuraStyle('CHAOS', 'var(--clr-chaos)')}></div>
                <div style={getAuraStyle('LIFE', 'var(--clr-life)')}></div>
                <div style={getAuraStyle('WRATH', 'var(--clr-wrath)')}></div>

                <div className="planet-main" style={{
                    width: `${planetSize}px`,
                    height: `${planetSize}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 30% 30%, ${surfaceColor}, #020617)`,
                    position: 'relative',
                    margin: '2rem auto',
                    boxShadow: `
                        0 0 80px rgba(0, 0, 0, 0.8),
                        inset -30px -30px 80px rgba(0,0,0,0.9),
                        0 0 ${40 + (planet.population / 100)}px ${planet.population > 0 ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255,255,255,0.05)'}
                    `,
                    overflow: 'hidden',
                    animation: 'slowRotate 120s linear infinite',
                    zIndex: 2
                }}>
                    {/* TERRAIN LAYER: Mountains/Oceans */}
                    <div className="terrain-layer" style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        opacity: 0.8,
                        background: `
                            radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
                            ${isWet ? 'radial-gradient(circle at 50% 50%, #1e3a8a 20%, transparent 60%)' : ''}
                        `
                    }}></div>

                    {/* DYNAMIC CLOUDS / WEATHER */}
                    <div className="weather-layer" style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        opacity: isWet ? 0.4 : 0.1,
                        background: `radial-gradient(circle at 50% 50%, white, transparent 70%)`,
                        filter: 'blur(30px)',
                        mixBlendMode: 'overlay',
                        animation: 'cloudFloat 20s linear infinite alternate'
                    }}></div>

                    {/* HOSTILITY CORE */}
                    <div className="hostility-overlay" style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 80%)',
                        opacity: planet.hostility / 100,
                        zIndex: 3
                    }}></div>

                    {/* CIVILIZATION LIGHTS */}
                    {planet.population > 500 && (
                        <div className="civ-lights" style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 4,
                            opacity: Math.min(0.8, (planet.population - 500) / 10000)
                        }}></div>
                    )}
                </div>

                {/* ATMOSPHERE HALO */}
                <div className="atmosphere-halo" style={{
                    position: 'absolute',
                    top: '-15px', left: '-15px', right: '-15px', bottom: '-15px',
                    borderRadius: '50%',
                    background: atmosphereColor,
                    boxShadow: `inset 0 0 50px rgba(255,255,255,0.1), 0 0 30px ${atmosphereColor}`,
                    zIndex: 10,
                    pointerEvents: 'none'
                }}></div>
            </div>

            <div className="planet-status-text">
                <h3>World Resonance</h3>
                <div className="stats-grid">
                    <div className="stat-line">
                        <span className="label">Essence:</span>
                        <span className="value" style={{ color: 'var(--clr-gold)' }}>{planet.atmosphere.toUpperCase()}</span>
                    </div>
                    {planet.stats && (
                        <>
                            <div className="stat-line">
                                <span className="label">Vibrancy:</span>
                                <span className="value">{planet.stats.hydration}%</span>
                            </div>
                            <div className="stat-line">
                                <span className="label">Tempering:</span>
                                <span className="value">{planet.stats.temperature}°C</span>
                            </div>
                        </>
                    )}
                    <div className="stat-line">
                        <span className="label">Complexity:</span>
                        <span className="value" style={{ color: 'var(--clr-life)' }}>{planet.population.toLocaleString()} souls</span>
                    </div>
                </div>
            </div>

            <style>{`
                .visual-stage {
                    position: relative;
                    padding: 2rem;
                }
                
                @keyframes slowRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes cloudFloat {
                    from { transform: translate(-10px, -10px); }
                    to { transform: translate(10px, 10px); }
                }

                .stats-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .stat-line {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                }

                .stat-line .label { color: var(--text-secondary); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 1px; }

                /* Impact Visuals in CSS */
                .impact-active .planet-main {
                    animation: impactFeedback 0.5s ease-out;
                }
                
                @keyframes impactFeedback {
                    0% { transform: scale(1); filter: brightness(1) saturate(1); }
                    30% { transform: scale(1.05); filter: brightness(2) saturate(2); }
                    100% { transform: scale(1); filter: brightness(1) saturate(1); }
                }
            `}</style>
        </div>
    );
};

export default PlanetView;
