import React, { useState } from 'react';
import axios from 'axios';

const CreateGoalForm = () => {
  const [description, setDescription] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [startingValue, setStartingValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/goals', {
        goal: {
          description,
          short_desc: shortDesc,
          target_date: targetDate,
          target_value: parseInt(targetValue, 10),
          starting_value: parseInt(startingValue, 10),
        },
      });
      alert('Goal created successfully!');
    } catch (error) {
      console.error('There was an error creating the goal:', error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2>Create New Goal</h2>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shortDesc" className="form-label">Short Description</label>
          <input
            type="text"
            className="form-control"
            id="shortDesc"
            placeholder="Short Description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="targetDate" className="form-label">Target Date</label>
          <input
            type="date"
            className="form-control"
            id="targetDate"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="targetValue" className="form-label">Target Value</label>
          <input
            type="number"
            className="form-control"
            id="targetValue"
            placeholder="Target Value"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startingValue" className="form-label">Starting Value</label>
          <input
            type="number"
            className="form-control"
            id="startingValue"
            placeholder="Starting Value"
            value={startingValue}
            onChange={(e) => setStartingValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Goal</button>
      </form>
    </div>
  );
};

export default CreateGoalForm;
