import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import DailyTaskPlanner from './DailyTaskPlanner';
import './App.css'; // Import the CSS file for styling

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/task-planner" element={<DailyTaskPlanner />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
