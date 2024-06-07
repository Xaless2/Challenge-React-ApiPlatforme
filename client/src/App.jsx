

import React from "react";
import './App.css';
import WelcomePage from "./pages/welcomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CalendarPage from "../src/pages/CalendarPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/calendar" element={<CalendarPage/>} />
      </Routes>
    </div>
  </Router>
  );
}
