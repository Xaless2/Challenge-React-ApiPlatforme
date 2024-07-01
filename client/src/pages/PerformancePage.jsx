import React from 'react';
import AdminFormBuilder from '../components/builder/AdminFormBuilder';
import createPerformanceFormFields from '../components/form/createPerformanceFormFields';


export const baseUrl = "http://localhost:8000/api";

const PerformancePage = () => {
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
            <AdminFormBuilder fields={createPerformanceFormFields} onSubmit={handleSubmit} />
        </div>
    );
};

export default PerformancePage;
