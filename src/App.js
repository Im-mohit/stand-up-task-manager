import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import DailyTaskPlanner from './DailyTaskPlanner';
import './App.css'; // Import the CSS file for styling
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import outputs from './amplify_outputs.json';

Amplify.configure(outputs);

const cookieStorage = new CookieStorage({
    domain: ".leanlyf.com",
    path: "/",
    sameSite: "none",
    secure: true,
    expires: 365,
});


cognitoUserPoolsTokenProvider.setKeyValueStorage(cookieStorage);

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
