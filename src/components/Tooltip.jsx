import React, { useState } from 'react';

const Tooltip = ({ title, lore, tip, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{ position: 'relative', display: 'inline-block', width: '100%' }}
        >
            {children}
            {visible && (
                <div className="tooltip-content">
                    <div className="tooltip-title">{title}</div>
                    {lore && <div className="tooltip-lore">"{lore}"</div>}
                    <div className="tooltip-divider"></div>
                    {tip && <div className="tooltip-tip">{tip}</div>}
                </div>
            )}

            <style>{`
                .tooltip-content {
                    position: absolute;
                    bottom: 110%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 250px;
                    background: rgba(2, 6, 23, 0.95);
                    backdrop-filter: blur(8px);
                    border: 1px solid var(--clr-gold);
                    border-radius: 8px;
                    padding: 1rem;
                    z-index: 1000000000;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    pointer-events: none;
                    animation: fadeIn 0.2s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, 10px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }

                .tooltip-title {
                    color: var(--clr-gold);
                    font-family: var(--font-heading);
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .tooltip-lore {
                    font-style: italic;
                    color: var(--text-secondary);
                    font-size: 0.8rem;
                    line-height: 1.4;
                    margin-bottom: 0.75rem;
                }

                .tooltip-divider {
                    height: 1px;
                    background: var(--glass-border);
                    margin: 0.5rem 0;
                }

                .tooltip-tip {
                    color: var(--text-primary);
                    font-size: 0.75rem;
                    line-height: 1.3;
                }
            `}</style>
        </div>
    );
};

export default Tooltip;
