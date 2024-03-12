import React from 'react';
import { Route, Link, Routes, Navigate } from 'react-router-dom';
import GoalsList from './components/GoalsList';
import GoalDetail from './components/GoalDetail';
import CreateGoalForm from './components/CreateGoalForm';
import AddStatForm from './components/AddStatForm';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyGoalsApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-goal">Create Goal</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className='p-4'>
        <Routes>
          <Route path="/" element={currentUser ? <GoalsList /> : <Navigate to="/login" />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/create-goal" element={currentUser ? <CreateGoalForm /> : <Navigate to="/login" />} />
          <Route path="/goals/:goalId" element={currentUser ? <GoalDetail /> : <Navigate to="/login" />} />
          <Route path="/goals/:goalId/add-stat" element={currentUser ? <AddStatForm /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
