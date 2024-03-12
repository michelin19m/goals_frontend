import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const GoalDetail = () => {
  const [goal, setGoal] = useState(null);
  const [stats, setStats] = useState([]);
  const { goalId } = useParams();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const goalResponse = await axios.get(`http://localhost:3000/goals/${goalId}`);
        setGoal(goalResponse.data);

        const statsResponse = await axios.get(`http://localhost:3000/goals/${goalId}/stats`);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching goal details or stats:', error);
      }
    };

    fetchGoalDetails();
  }, [goalId]);

  return (
    <div>
      {goal ? (
        <div>
          <h2>{goal.description}</h2>
          <p>Target Date: {goal.target_date}</p>
          <p>Target Value: {goal.target_value}</p>
          <p>Starting Value: {goal.starting_value}</p>
          <h3>Stats
            <span>
              <Link to={`/goals/${goal.id}/add-stat`}>+</Link>
            </span>
          </h3>
          <ul>
            {stats.length > 0 ? (
              stats.map((stat) => (
                <li key={stat.id}>
                  Date: {stat.recorded_date}, Progress: {stat.progress_value}
                </li>
              ))
            ) : (
              <p>No stats available.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading goal details...</p>
      )}
    </div>
  );
};

export default GoalDetail;
