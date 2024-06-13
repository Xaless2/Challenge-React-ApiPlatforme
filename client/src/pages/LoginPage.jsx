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



  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(login);
  };

  const fields = [
    { type: 'email', label: 'Email', name: 'email', value: login.email, onChange: handleChange },
    { type: 'password', label: 'Password', name: 'password', value: login.password, onChange: handleChange },
    { type: 'button', label: 'login', onClick: handleSubmit },
  ];


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:block md:w-1/2 relative">
          <img src="/path/to/your/image.jpg" alt="Planifit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-4xl text-white font-bold">Planifit</h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          <FormBuilder fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
