import React, { useEffect, useState } from 'react';
import AdminFormBuilder from '../components/builder/AdminFormBuilder';
import createPerformanceFormFields from '../components/form/createPerformanceFormFields';

export const baseUrl = "http://localhost:8000/api";

const PerformancePage = () => {
    const [formFields, setFormFields] = useState(createPerformanceFormFields);

    useEffect(() => {
        const fetchEstablishments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${baseUrl}/brands/establishments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const establishmentOptions = data.map(establishment => ({
                    value: establishment.id,
                    label: establishment.display_name,
                }));

                const updatedFields = createPerformanceFormFields.map(field => {
                    if (field.name === 'establishment_id') {
                        return {
                            ...field,
                            options: establishmentOptions,
                        };
                    }
                    return field;
                });

                setFormFields(updatedFields);

            } catch (error) {
                console.error('Error fetching establishments:', error);
            }
        };

        fetchEstablishments();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token'); 

            formData.number_of_clients_max = parseInt(formData.number_of_clients_max, 10);
            formData.establishment_id = `/api/establishments/${formData.establishment_id}`;

            const response = await fetch(`${baseUrl}/performances`, {
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
            console.log('Performance created successfully:', data);
        } catch (error) {
            console.error('Error creating performance:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Créer une Performance</h1>
            <AdminFormBuilder fields={formFields} onSubmit={handleSubmit} />
        </div>
    );
};

export default PerformancePage;
