import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import SlotList from './components/SlotList';
import ReservationForm from './components/ReservationForm';
import SubscriptionForm from './components/SubscriptionForm';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/slots" element={<SlotList />} />
                    <Route path="/reserve/:slotId" element={<ReservationForm />} />
                    <Route path="/subscribe" element={<SubscriptionForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
