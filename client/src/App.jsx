import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import { routes } from './routes/routes.js';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          {routes.map((route, index) => (
            route.protected ? 
            <Route 
              key={index}
              path={route.path}
              element={
                <ProtectedRoutes roles={route.roles}>
                  <route.component />
                </ProtectedRoutes>
              }
            /> :
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
