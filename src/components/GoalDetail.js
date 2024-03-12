import React, { useEffect, useState } from 'react';
import httpClient from './utils/httpClient';
import { Link, useParams } from 'react-router-dom';
import ChartComponent from './ChartComponent';

const GoalDetail = () => {
  const [goal, setGoal] = useState(null);
  const [stats, setStats] = useState([]);
  const { goalId } = useParams();

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const goalResponse = await httpClient.get(`${process.env.REACT_APP_BACKEND_URL}/goals/${goalId}`);
        setGoal(goalResponse.data);

        const statsResponse = await httpClient.get(`${process.env.REACT_APP_BACKEND_URL}/goals/${goalId}/stats`);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching goal details or stats:', error);
      }
    };

    fetchGoalDetails();
  }, [goalId]);

  const deleteStat = async (statId) => {
    try {
      await httpClient.delete(`${process.env.REACT_APP_BACKEND_URL}/goals/${goalId}/stats/${statId}`);
      const updatedStats = stats.filter(stat => stat.id !== statId);
      setStats(updatedStats);
      alert('Stat deleted successfully!');
    } catch (error) {
      console.error('Error deleting stat:', error);
      alert('Failed to delete stat.');
    }
  };

  return (
    <div className="container mt-4">
      {goal ? (
        <div>
          <h2 className="mb-3">{goal.description}</h2>
          <div className="mb-3">
            <p><strong>Target Date:</strong> {goal.target_date}</p>
            <p><strong>Target Value:</strong> {goal.target_value}</p>
            <p><strong>Starting Value:</strong> {goal.starting_value}</p>
          </div>
          <div className="mb-3">
            <h3 className="d-flex justify-content-between align-items-center">
              Stats
              <Link className="btn btn-primary" to={`/goals/${goal.id}/add-stat`}>Add Stat</Link>
            </h3>
            {stats.length > 0 ? (
              <ul className="list-group">
                {stats.map((stat) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={stat.id}>
                    Date: {stat.recorded_date}, Progress: {stat.progress_value}
                    <button className="btn btn-outline-danger" onClick={() => deleteStat(stat.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No stats available.</p>
            )}
          </div>
          <ChartComponent stats={stats} />
        </div>
      ) : (
        <p>Loading goal details...</p>
      )}
    </div>
  );
};

export default GoalDetail;
