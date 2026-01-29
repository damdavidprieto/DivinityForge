import React from 'react';
import { EraConfig } from '../game/EraDefinitions';

const ControlPanel = ({ dispatch, power, era, god }) => {
    // Filter actions: Show if no requirement OR if requirement matches current archetype
    const actions = EraConfig[era].actions.filter(a =>
        !a.requiredArchetype || (god && god.archetype === a.requiredArchetype)
    );

    return (
        <div className="control-panel">
            <h3>Divine Actions</h3>
            <div className="actions-grid">
                {actions.map(action => (
                    <button
                        key={action.id}
                        disabled={power < action.cost}
                        onClick={() => dispatch({ type: action.id })}
                        className={`action-btn ${action.requiredArchetype ? 'archetype-unique' : ''}`}
                        title={action.description}
                    >
                        <strong>{action.name}</strong>
                        <br />
                        <small>{action.cost} Power</small>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ControlPanel;
