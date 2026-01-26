import React from 'react';

const ControlPanel = ({ dispatch, power }) => {
    return (
        <div className="control-panel">
            <h3>Divine Actions</h3>
            <div className="actions-grid">
                <button
                    disabled={power < 50}
                    onClick={() => dispatch({ type: 'SMITE' })}
                    className="action-btn wrath"
                >
                    Smite (50 Power)
                </button>
                <button
                    disabled={power < 20}
                    onClick={() => dispatch({ type: 'BLESS' })}
                    className="action-btn benevolence"
                >
                    Bless (20 Power)
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
