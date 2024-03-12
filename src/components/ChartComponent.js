import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartComponent = ({ stats }) => {
  const data = {
    labels: stats.map(stat => stat.recorded_date),
    datasets: [
      {
        label: 'Progress Over Time',
        data: stats.map(stat => stat.progress_value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return <Line data={data} />;
};

export default ChartComponent;
