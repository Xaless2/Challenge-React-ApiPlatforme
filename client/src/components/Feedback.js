import React, { useState } from 'react';

const Feedback = ({ reservationId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = { rating, comment };

        fetch(`https://localhost:8000/reservations/${reservationId}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        })
            .then(response => response.json())
            .then(data => console.log('Feedback submitted:', data))
            .catch(error => console.error('Error submitting feedback:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Note:</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <div>
                <label>Commentaire:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit">Soumettre</button>
        </form>
    );
};

export default Feedback;
