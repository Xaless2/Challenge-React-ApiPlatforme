import React from 'react'
import FormBuilder from '../components/FormBuilder'
import '../App.css';


function LoginPage() {

    const styleEmail = {
        display: 'inline-block', 
        width: '50%', 
        padding: '10px 20px',
        margin: '15px 0', 
        cursor: 'pointer'  
    }
  const fields = [
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Entrez votre email',
      required: true,
      onChange: (e) => console.log(e.target.value),
      style: styleEmail,
    },
    {
        type: 'label',
        label: 'Vous voulez vous connecter en tant que :',
       


    },
  
    {
      type: 'password',
      name: 'password',
      label: 'Mot de passe',
      placeholder: 'Entrez votre mot de passe',
      required: true,
      onChange: (e) => console.log(e.target.value),
   
    },
    {
      type: 'button',
      label: 'Se connecter',
      onClick: () => console.log('Button clicked'),
    },
  ];

  return (
    <FormBuilder fields={fields} />
  )
}

export default LoginPage