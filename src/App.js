import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import GoalsList from './components/GoalsList';
import GoalDetail from './components/GoalDetail';
import CreateGoalForm from './components/CreateGoalForm';
import AddStatForm from './components/AddStatForm';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-goal">Create Goal</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GoalsList />} exact />
          <Route path="/create-goal" element={<CreateGoalForm />} />
          <Route path="/goals/:goalId" element={<GoalDetail />} />
          <Route path="/goals/:goalId/add-stat" element={<AddStatForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
