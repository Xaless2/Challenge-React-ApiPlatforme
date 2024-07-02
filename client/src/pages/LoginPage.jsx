import React, { useContext, useState } from 'react';
import FormBuilder from '../components/builder/FormBuilder';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { loginUser, error, setError } = useContext(AuthContext);
  const [login, setLogin] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(login);
      if (success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } else {
        console.error('Login failed: Invalid credentials or server error');
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Server error. Please try again later.');
    }
  };
  

  const fields = [
    { type: 'email', label: 'Email', name: 'email', value: login.email, onChange: handleChange },
    { type: 'password', label: 'Password', name: 'password', value: login.password, onChange: handleChange },
    { type: 'button', label: 'Login', onClick: handleSubmit,
      style: {
        hoverBackgroundColor: '#088f9c',
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        paddingY: '2',
        paddingX: '4',
        borderRadius: 'rounded',
        focus: {
          outline: 'none',
          shadow: 'outline',
        },
      },
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
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          <FormBuilder fields={fields} />
          <p className="text-center">
            Vous n'avez pas de compte ?{' '}
            
           <a href="/register" className="text-blue-500">
            Créer un compte
            </a></p>
        </div>
       
      </div>
    </div>
  );
};

export default LoginPage;
