import React, { useState } from 'react';
import axios from 'axios';

const CreateGoalForm = () => {
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [startingValue, setStartingValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/goals', {
        goal: {
          description,
          target_date: targetDate,
          target_value: targetValue,
          starting_value: startingValue,
        },
      });
      alert('Goal created successfully!');
    } catch (error) {
      console.error('There was an error creating the goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Goal</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Target Value"
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Starting Value"
        value={startingValue}
        onChange={(e) => setStartingValue(e.target.value)}
      />
      <button type="submit">Create Goal</button>
    </form>
  );
};

export default CreateGoalForm;
