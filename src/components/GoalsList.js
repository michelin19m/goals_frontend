import React, { useEffect, useState } from 'react';
import httpClient from './utils/httpClient';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const GoalsList = () => {
  const [goals, setGoals] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await httpClient.get(`${process.env.REACT_APP_BACKEND_URL}/goals`);
      const fetchedGoals = response.data;
      setGoals(fetchedGoals);

      const labels = fetchedGoals.map(goal => goal.description);
      const progressData = fetchedGoals.map(goal => (goal.total_progress / goal.target_value) * 100);
      const targetData = fetchedGoals.map(() => 100);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Progress (%)',
            data: progressData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Target (%)',
            data: targetData,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
          },
        ],
      });
    };

    fetchGoals();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Goals</h2>
      <div className="list-group">
        {goals.map(goal => {
          const progressPercentage = (goal.total_progress / parseFloat(goal.target_value)) * 100;

          return (
            <Link to={`/goals/${goal.id}`} key={goal.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex justify-content-between align-items-center w-100">
                <h5 className="mb-1">{goal.description}</h5>
                <small className="text-muted">Target: {goal.target_value}</small>
              </div>
              <div className="d-flex align-items-center w-100 mt-2">
                <div className="progress custom-progress flex-grow-1">
                  <div className="progress-bar" role="progressbar" style={{ width: `${Math.max(progressPercentage, 5)}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">{progressPercentage.toFixed(2)}%</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-4">
        <h3>Overall Progress Overview</h3>
        {chartData.labels ? (
          <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true, suggestedMax: 100 } }}} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default GoalsList;
