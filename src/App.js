import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import GoalsList from './components/GoalsList';
import GoalDetail from './components/GoalDetail';
import CreateGoalForm from './components/CreateGoalForm';
import AddStatForm from './components/AddStatForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">MyGoalsApp</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-goal">Create Goal</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='p-4'>
          <Routes>
            <Route path="/" element={<GoalsList />} exact />
            <Route path="/create-goal" element={<CreateGoalForm />} />
            <Route path="/goals/:goalId" element={<GoalDetail />} />
            <Route path="/goals/:goalId/add-stat" element={<AddStatForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
