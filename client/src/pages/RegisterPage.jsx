import React, { useContext, useState } from 'react';
import FormBuilder from '../components/builder/FormBuilder';
import {AuthContext} from '../contexts/AuthContext';


const RegisterPage = () => {
  const { registerUser, error } = useContext(AuthContext);
  const [register, setRegister] = useState({
    email: '',
    password: '',
    role: '',
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    zipcode: '',
    city: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(register);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(register);
  };

  const fields = [
    { type: 'text', label: 'First Name', name: 'firstname', value: register.firstname, onChange: handleChange },
    { type: 'text', label: 'Last Name', name: 'lastname', value: register.lastname, onChange: handleChange },
    { type: 'email', label: 'Email', name: 'email', value: register.email, onChange: handleChange },
    { type: 'password', label: 'Password', name: 'password', value: register.password, onChange: handleChange },
    { type: 'text', label: 'Phone', name: 'phone', value: register.phone, onChange: handleChange },
    { type: 'text', label: 'Address', name: 'address', value: register.address, onChange: handleChange },
    { type: 'text', label: 'Zip Code', name: 'zipcode', value: register.zipcode, onChange: handleChange },
    { type: 'text', label: 'City', name: 'city', value: register.city, onChange: handleChange },
    { type: 'file', label: 'Profile Image', name: 'imageUrl', onChange: handleFileChange },
    { type: 'button', label: 'Register', onClick: handleSubmit },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6  rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <FormBuilder fields={fields} />
    </div>
  );
};

export default RegisterPage;
