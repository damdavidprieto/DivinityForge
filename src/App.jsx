import { useState, useEffect } from 'react'
import GameEngine from './game/GameEngine'
// Placeholder imports, will create next
import PlanetView from './components/PlanetView'
import ControlPanel from './components/ControlPanel'
import EventLog from './components/EventLog'
import './App.css'

function App() {
    const [gameState, setGameState] = useState(GameEngine.initialState())

    useEffect(() => {
        const loop = setInterval(() => {
            setGameState(prev => GameEngine.tick(prev))
        }, 1000)
        return () => clearInterval(loop)
    }, [])

    return (
        <div className="game-container">
            <header className="game-header">
                <h1>Divinity Forge</h1>
                <div className="stats-bar">
                    <div className="stat">
                        <span className="label">Power</span>
                        <span className="value">{gameState.god.power}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Population</span>
                        <span className="value">{gameState.planet.population}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Alignment</span>
                        <span className="value">{gameState.god.alignment}</span>
                    </div>
                </div>
            </header>

            <main className="main-view">
                <PlanetView planet={gameState.planet} />
                <EventLog events={gameState.events} />
            </main>

            <footer className="controls-area">
                <ControlPanel
                    dispatch={(action) => setGameState(prev => GameEngine.processAction(prev, action))}
                    power={gameState.god.power}
                />
            </footer>
        </div>
    )
}

export default App
