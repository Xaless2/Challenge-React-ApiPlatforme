import React from 'react';
import Button from './Button'; 

const Field = ({ field }) => {
    switch (field.type) {
        case 'text':
        case 'password':
        case 'email':
        case 'number':
        case 'date':
        case 'textarea':
        case 'file':
            return (
                <input 
                    type={field.type} 
                    name={field.name}
                    placeholder={field.placeholder} 
                    required={field.required}
                    value={field.value}
                    onChange={field.onChange}
                    style={field.style} 
                    
                />
            );
        case 'button':
            return <Button text={field.label} onClick={field.onClick} style={field.style} />;
        default:
            return null;
    }
};

const FormBuilder = ({ fields }) => (
    <form>
        {fields.map((field, index) => <Field key={index} field={field} />)}
    </form>
);

export default FormBuilder;