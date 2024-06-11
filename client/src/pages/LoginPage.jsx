import React, { useContext, useState } from 'react';
import FormBuilder from '../components/builder/FormBuilder';
import {AuthContext} from '../contexts/AuthContext';

const LoginPage = () => {
  const { loginUser, error } = useContext(AuthContext);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(login);
  };

  const fields = [
    { type: 'email', label: 'Email', name: 'email', value: register.email, onChange: handleChange },
    { type: 'password', label: 'Password', name: 'password', value: register.password, onChange: handleChange },
    { type: 'button', label: 'Register', onClick: handleSubmit },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <FormBuilder fields={fields} />
    </div>
  );
};

export default LoginPage;
