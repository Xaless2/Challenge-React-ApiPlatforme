import React from 'react';
import AdminFormBuilder from '../components/builder/AdminFormBuilder';
import createSlotFormFields from '../components/form/createSlotFormFields';


export const baseUrl = "http://localhost:8000/api";

const SlotPage = () => {
    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('${baseUrl}/slots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Créneau créé avec succès:', data);
        } catch (error) {
            console.error('Erreur lors de la création du créneau:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Créer un Créneau</h1>
            <AdminFormBuilder fields={createSlotFormFields} onSubmit={handleSubmit} />
        </div>
    );
};

export default SlotPage;
