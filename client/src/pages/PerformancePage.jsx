import React from 'react';
import AdminFormBuilder from '../components/builder/AdminFormBuilder';
import createPerformanceFormFields from '../components/form/createPerformanceFormFields';

const PerformancePage = () => {
    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('/api/performances', {
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
