import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddStatForm = () => {
  const [recordedDate, setRecordedDate] = useState('');
  const [progressValue, setProgressValue] = useState('');
  const { goalId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/goals/${goalId}/stats`, {
        stat: {
          recorded_date: recordedDate,
          progress_value: parseInt(progressValue, 10),
        },
      });
      alert('Stat added successfully!');
      navigate(`/goals/${goalId}`);
    } catch (error) {
      console.error('There was an error adding the stat:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Stat</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="recordedDate" className="form-label">Recorded Date</label>
          <input
            type="date"
            className="form-control"
            id="recordedDate"
            value={recordedDate}
            onChange={(e) => setRecordedDate(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{ maxWidth: '200px' }}>
          <label htmlFor="progressValue" className="form-label">Progress Value</label>
          <input
            type="number"
            className="form-control"
            id="progressValue"
            placeholder="Progress Value"
            value={progressValue}
            onChange={(e) => setProgressValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Stat</button>
      </form>
    </div>
  );
};

export default AddStatForm;
