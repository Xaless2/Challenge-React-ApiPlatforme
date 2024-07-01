import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminFormBuilder from '../components/builder/AdminFormBuilder';
import createSlotFormFields from '../components/form/createSlotFormFields';

export const baseUrl = "http://localhost:8000/api";

const SlotPage = () => {
    const location = useLocation();
    const { performanceId, numberOfClients } = location.state || {};
    const [formFields, setFormFields] = useState(createSlotFormFields);

    useEffect(() => {
        if (performanceId) {
            console.log('Setting performance ID and number of clients:', performanceId, numberOfClients);
            const updatedFields = createSlotFormFields.map(field => {
                if (field.name === 'performance_id') {
                    return { ...field, value: performanceId, readOnly: true };
                }
                if (field.name === 'number_of_clients') {
                    return { ...field, value: numberOfClients };
                }
                return field;
            });
            setFormFields(updatedFields);
        }
    }, [performanceId, numberOfClients]);

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const formattedData = {
                ...formData,
                performance_id: `/api/performances/${formData.performance_id}`, 
                number_of_clients: parseInt(formData.number_of_clients, 10), 
                duration_minutes: parseInt(formData.duration_minutes, 10), 
            };

            const response = await fetch(`${baseUrl}/slots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formattedData),
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
            {formFields.length > 0 && (
                <AdminFormBuilder fields={formFields} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default SlotPage;
