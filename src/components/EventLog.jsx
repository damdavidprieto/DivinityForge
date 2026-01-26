import React from 'react';

const EventLog = ({ events }) => {
    return (
        <div className="event-log">
            <h3>History</h3>
            <ul>
                {events.map((evt, idx) => (
                    <li key={idx} className={`event-item ${evt.type}`}>
                        {evt.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventLog;
