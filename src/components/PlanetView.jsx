import React from 'react';

const PlanetView = ({ planet }) => {
    // Simple CSS-based visualization
    // In the future, this can be SVG or Canvas based
    const planetStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: '#3498db',
        margin: '2rem auto',
        boxShadow: `0 0 ${planet.population / 100}px #fff`, // Glow based on pop
        transition: 'all 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'column'
    };

    return (
        <div className="planet-container">
            <div style={planetStyle}>
                <span>Planet</span>
                <span>{planet.atmosphere}</span>
            </div>
            <div className="planet-stats">
                <p>Population: {planet.population}</p>
            </div>
        </div>
    );
};

export default PlanetView;
