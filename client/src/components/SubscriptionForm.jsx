import React, { useState } from 'react';

const SubscriptionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        plan: 'basic',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit subscription to API
        fetch('/api/subscribe', {
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
            <h2>Subscribe</h2>
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
            <label>
                Plan:
                <select name="plan" value={formData.plan} onChange={handleChange}>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                </select>
            </label>
            <br />
            <button type="submit">Subscribe</button>
        </form>
    );
};

export default SubscriptionForm;
