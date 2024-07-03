import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminFormBuilder from '../components/builder/AdminFormBuilder';
import createEstablishmentFormFields from '../components/form/createEstablishmentFormFields';
import { baseUrl } from '../utils/service';

const EstablishmentPage = () => {
    const location = useLocation();
    const { brandId } = location.state || {};
    const [formFields, setFormFields] = useState(createEstablishmentFormFields);

    useEffect(() => {
        if (brandId) {
            console.log('Setting brand ID:', brandId);
            const updatedFields = createEstablishmentFormFields.map(field => {
                if (field.name === 'brand_id') {
                    return { ...field, value: brandId, readOnly: true };
                }
                return field;
            });
            setFormFields(updatedFields);
        }
    }, [brandId]);

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/establishments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Établissement créé avec succès:', data);
        } catch (error) {
            console.error('Erreur lors de la création de l\'établissement:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Créer un Établissement</h1>
            {formFields.length > 0 && (
                <AdminFormBuilder fields={formFields} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default EstablishmentPage;
