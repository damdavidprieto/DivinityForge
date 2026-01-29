import { useState, useEffect } from 'react'
import GameEngine from './game/GameEngine'
import { EraConfig } from './game/EraDefinitions'
import PlanetView from './components/PlanetView'
import ControlPanel from './components/ControlPanel'
import EventLog from './components/EventLog'
import GodDashboard from './components/GodDashboard'
import './App.css'

function App() {
    const [gameState, setGameState] = useState(GameEngine.initialState())
    const [isImpact, setIsImpact] = useState(false);

    useEffect(() => {
        const loop = setInterval(() => {
            setGameState(prev => GameEngine.tick(prev))
        }, 1000)
        return () => clearInterval(loop)
    }, [])

    const handleAction = (action) => {
        setGameState(prev => GameEngine.processAction(prev, action));
        setIsImpact(true);
        setTimeout(() => setIsImpact(false), 500);
    };

    const currentEra = EraConfig[gameState.era];

    return (
        <div className="game-container">
            <header className="game-header">
                <div className="header-top">
                    <h1>Divinity Forge</h1>
                    <span className="era-badge">{currentEra.name}</span>
                </div>

                <div className="stats-bar">
                    <div className="stat">
                        <span className="label">Divine Power</span>
                        <span className="value">{Math.floor(gameState.god.power)}</span>
                    </div>
                    {currentEra.nextEraThreshold !== Infinity && (
                        <div className="stat">
                            <span className="label">{currentEra.statLabel}</span>
                            <span className="value">{Math.floor(gameState.god.evolution)} / {currentEra.nextEraThreshold}</span>
                        </div>
                    )}
                    <div className="stat">
                        <span className="label">World Resonance</span>
                        <span className="value">{Math.floor(gameState.planet.hostility)}% Hostile</span>
                    </div>
                    {/* Only show Population in Life Era onwards */}
                    {gameState.era !== 'PRIMORDIAL' && (
                        <div className="stat">
                            <span className="label">Population</span>
                            <span className="value">{gameState.planet.population}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="layout-root">
                <main className={`main-view ${isImpact ? 'impact-active' : ''}`}>
                    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Inter:wght@300;400;700&display=swap" rel="stylesheet" />

                    <div className="era-description">
                        <p>{currentEra.description}</p>
                    </div>

                    <div className="central-visuals">
                        <GodDashboard god={gameState.god} />
                        <PlanetView
                            planet={gameState.planet}
                            domainPoints={gameState.god.domainPoints}
                        />
                        <EventLog events={gameState.events} />
                    </div>

                    {/* Advance Era Button */}
                    {gameState.god.evolution >= currentEra.nextEraThreshold && (
                        <button className="advance-era-btn" onClick={() => handleAction({ type: 'ADVANCE_ERA' })}>
                            Ascend to {gameState.era === 'PRIMORDIAL' ? 'Era of Life' : 'Era of Awakening'}
                        </button>
                    )}
                </main>

                <aside className="side-controls">
                    <ControlPanel
                        dispatch={handleAction}
                        power={gameState.god.power}
                        era={gameState.era}
                        god={gameState.god}
                    />
                </aside>
            </div>
        </div>
    );
}

export default App
