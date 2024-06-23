import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { routes } from './routes/routes.js';
import React from "react";
import ProtectedRoute from './routes/ProtectedRoutes.jsx';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.protected ? 
                                <ProtectedRoute>{React.createElement(route.component)}</ProtectedRoute> :
                                React.createElement(route.component)
                            }
                        />
                    ))}
                </Routes>
        </Router>
        
        </>
  
    );
}

export default App;
