// App.js
import React from 'react';
import DailyTaskPlanner from './DailyTaskPlanner';
import './App.css'; // Import the CSS file for styling

const App = () => {
  return (
    <body>
      <header>
        <h1>Daily Task Planner</h1>
      </header>
      <main>
        <DailyTaskPlanner />
      </main>
      <footer>
        <p>© 2024 Daily Task Planner. All rights reserved.</p>
      </footer>
    </body>
  );
};

export default App;
