// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlotList from './components/SlotList';
import ReservationForm from './components/ReservationForm';
import HomePage from '../src/pages/HomePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/slots" element={<SlotList />} />
                <Route path="/reserve/:slotId" element={<ReservationForm />} />
            </Routes>
        </Router>
    );
}

export default App;
