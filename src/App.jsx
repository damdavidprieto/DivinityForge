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

    useEffect(() => {
        const loop = setInterval(() => {
            setGameState(prev => GameEngine.tick(prev))
        }, 1000)
        return () => clearInterval(loop)
    }, [])

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
                        <span className="label">Power</span>
                        <span className="value">{Math.floor(gameState.god.power)}</span>
                    </div>
                    {currentEra.nextEraThreshold !== Infinity && (
                        <div className="stat">
                            <span className="label">Next Era</span>
                            <span className="value">{Math.floor(gameState.god.power)} / {currentEra.nextEraThreshold}</span>
                        </div>
                    )}
                    <div className="stat">
                        <span className="label">Hostility</span>
                        <span className="value">{Math.floor(gameState.planet.hostility)}%</span>
                    </div>
                    {/* Only show Population in Life Era onwards */}
                    {gameState.era !== 'PRIMORDIAL' && (
                        <div className="stat">
                            <span className="label">Population</span>
                            <span className="value">{gameState.planet.population}</span>
                        </div>
                    )}
                    {/* Show Archetype only when defined */}
                    {gameState.god.archetype && (
                        <div className="stat">
                            <span className="label">Archetype</span>
                            <span className="value">{gameState.god.archetype}</span>
                        </div>
                    )}
                </div>
            </header>

            <main className="main-view">
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Inter:wght@300;400;700&display=swap" rel="stylesheet" />

                <div className="era-description">
                    <p>{currentEra.description}</p>
                </div>

                <GodDashboard god={gameState.god} />
                <PlanetView planet={gameState.planet} />
                <EventLog events={gameState.events} />

                {/* Advance Era Button (Development/Debug or Player Trigger) */}
                {gameState.god.power >= currentEra.nextEraThreshold && (
                    <button className="advance-era-btn" onClick={() => setGameState(prev => GameEngine.processAction(prev, { type: 'ADVANCE_ERA' }))}>
                        Advance to Next Era
                    </button>
                )}
            </main>

            <footer className="controls-area">
                <ControlPanel
                    dispatch={(action) => setGameState(prev => GameEngine.processAction(prev, action))}
                    power={gameState.god.power}
                    era={gameState.era}
                    god={gameState.god}
                />
            </footer>
        </div>
    )
}

export default App
