import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReservationForm = () => {
    const { slotId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit reservation to API
        fetch(`/api/reserve/${slotId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle response
            console.log(data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reserve Slot</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Reserve</button>
        </form>
    );
};

export default ReservationForm;
