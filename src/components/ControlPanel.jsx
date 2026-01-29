import React from 'react';
import { EraConfig } from '../game/EraDefinitions';
import Tooltip from './Tooltip';

const ControlPanel = ({ dispatch, power, era, god }) => {
    const actions = EraConfig[era].actions.filter(a =>
        !a.requiredArchetype || (god && god.archetype === a.requiredArchetype)
    );

    return (
        <div className="control-panel">
            <h3>Divine Actions</h3>
            <div className="actions-grid">
                {actions.map(action => (
                    <Tooltip
                        key={action.id}
                        title={action.name}
                        lore={action.lore}
                        tip={action.tip}
                    >
                        <button
                            disabled={power < action.cost}
                            onClick={() => dispatch({ type: action.id })}
                            className={`action-btn ${action.requiredArchetype ? 'archetype-unique' : ''}`}
                        >
                            <strong>{action.name}</strong>
                            <br />
                            <small>{action.cost} Power</small>
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default ControlPanel;
