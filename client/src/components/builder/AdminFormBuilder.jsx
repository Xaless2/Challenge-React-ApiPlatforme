// src/components/admin/AdminFormBuilder.jsx
import React, { useState, useEffect } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import PasswordInput from '../common/PasswordInput';
import Button from '../common/Button';
import FileInput from '../common/FileInput';

const FIELD_TYPES = {
    TEXT: 'text',
    EMAIL: 'email',
    NUMBER: 'number',
    SELECT: 'select',
    DATE: 'date',
    TEXTAREA: 'textarea',
    LABEL: 'label',
    FILE: 'file',
    PASSWORD: 'password',
    BUTTON: 'button',
};

const Field = ({ field, handleChange }) => {
    const commonProps = {
        field: { ...field, onChange: handleChange },
    };

    switch (field.type) {
        case FIELD_TYPES.TEXT:
        case FIELD_TYPES.EMAIL:
        case FIELD_TYPES.NUMBER:
        case FIELD_TYPES.DATE:
        case FIELD_TYPES.TEXTAREA:
        case FIELD_TYPES.LABEL:
            return <TextInput {...commonProps} />;
        case FIELD_TYPES.PASSWORD:
            return <PasswordInput {...commonProps} />;
        case FIELD_TYPES.SELECT:
            return <SelectInput {...commonProps} />;
        case FIELD_TYPES.FILE:
            return <FileInput {...commonProps} />;
        default:
            return null;
    }
};

const AdminFormBuilder = ({ fields, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [endTimeOptions, setEndTimeOptions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (formData.time_start_at && formData.duration_minutes) {
            const startTime = formData.time_start_at.split(':');
            const duration = parseInt(formData.duration_minutes, 10);
            const startHour = parseInt(startTime[0], 10);
            const startMinute = parseInt(startTime[1], 10);

            const endHour = startHour + Math.floor((startMinute + duration) / 60);
            const endMinute = (startMinute + duration) % 60;

            if (endHour >= 0 && endHour < 24) {
                const formattedHour = endHour < 10 ? `0${endHour}` : endHour;
                const formattedMinute = endMinute < 10 ? `0${endMinute}` : endMinute;
                const endTime = `${formattedHour}:${formattedMinute}`;

                setFormData((prevData) => ({
                    ...prevData,
                    time_end_at: endTime,
                }));
            }
        }
    }, [formData.time_start_at, formData.duration_minutes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <Field
                    key={index}
                    field={{
                        ...field,
                        value: formData[field.name] || '',
                    }}
                    handleChange={handleChange}
                />
            ))}
            <Button type="submit" text="Submit" />
        </form>
    );
};

export default AdminFormBuilder;
