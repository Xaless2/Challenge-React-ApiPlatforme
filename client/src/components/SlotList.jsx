// src/components/SlotList.jsx
import React, { useState, useEffect } from 'react';

const SlotList = () => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch('https://localhost:8000/api/slots');
                if (!response.ok) {
                    throw new Error('Failed to fetch slots');
                }
                const data = await response.json();
                setSlots(data['hydra:member']);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSlots();
    }, []);

    return (
        <div>
            <h1>Available Slots</h1>
            <ul>
                {slots.map(slot => (
                    <li key={slot.id}>
                        {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SlotList;
