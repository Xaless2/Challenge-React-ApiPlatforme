import React, { useContext, useState } from 'react';
import FormBuilder from '../components/builder/FormBuilder';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { registerUser, error } = useContext(AuthContext);
  const [register, setRegister] = useState({
    email: '',
    password: '',
    roles: [],
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    zipcode: '',
    city: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeArray = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await registerUser(register);
        console.log('Response from registerUser:', response);
        if (response) {
            navigate('/login');
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
};




  const fields = [
    { type: 'text', label: 'First Name', name: 'firstname', value: register.firstname, onChange: handleChange },
    { type: 'text', label: 'Last Name', name: 'lastname', value: register.lastname, onChange: handleChange },
    { type: 'email', label: 'Email', name: 'email', value: register.email, onChange: handleChange },
    { 
      type: 'select', 
      label: 'Vous vous inscrivez en tant que :', 
      name: 'roles', 
      value: register.roles, 
      onChange: handleChangeArray,
      options: [
        { value: 'ROLE_CLIENT', label: 'Client' },
        { value: 'ROLE_COACH', label: 'Coach' },
        { value: 'ROLE_CREATOR', label: 'Créateur' },
        { value: 'ROLE_ADMIN', label: 'Administratif' },
      ],
    },
    { type: 'password', label: 'Password', name: 'password', value: register.password, onChange: handleChange },
    { 
      type: 'button', 
      label: "S'inscrire",
      onClick: handleSubmit,
      style: {
        hoverBackgroundColor: '#088f9c',
        color: 'white',
        fontWeight: 'bold',
        width:'100%',
        paddingY: '2',
        paddingX: '4',
        borderRadius: 'rounded',
        focus: {
          outline: 'none',
          shadow: 'outline'
        }
      }
   },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:block md:w-1/2 relative">
          <img src="https://zupimages.net/up/24/27/20qm.png" alt="Planifit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-4xl text-white font-bold">Planifit</h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          <FormBuilder fields={fields} />
          <p className="text-center">Vous avez déjà un compte? <a href="/login" className="text-blue-500">
            Se connecter
            </a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;