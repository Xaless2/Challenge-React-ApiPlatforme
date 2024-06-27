import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { NextUIProvider } from "@nextui-org/react";
import {  AuthContextProvider } from './contexts/AuthContext.jsx';
import { BrandContextProvider } from './contexts/BrandContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthContextProvider>
        <BrandContextProvider> 
          <App />
        </BrandContextProvider>
      </AuthContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
);