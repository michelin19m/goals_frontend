import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GoalsList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axios.get('http://localhost:3000/goals');
      setGoals(response.data);
    };

    fetchGoals();
  }, []);

  return (
    <div>
      <h2>Goals</h2>

      <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <Link to={`/goals/${goal.id}`}>{goal.description}</Link> - Target: {goal.target_value}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default GoalsList;
