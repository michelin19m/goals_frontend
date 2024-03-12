import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddStatForm = () => {
  const [recordedDate, setRecordedDate] = useState('');
  const [progressValue, setProgressValue] = useState('');
  const { goalId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/goals/${goalId}/stats`, {
        stat: {
          recorded_date: recordedDate,
          progress_value: progressValue,
        },
      });
      alert('Stat added successfully!');
    } catch (error) {
      console.error('There was an error adding the stat:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Stat</h2>
      <input
        type="date"
        value={recordedDate}
        onChange={(e) => setRecordedDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Progress Value"
        value={progressValue}
        onChange={(e) => setProgressValue(e.target.value)}
      />
      <button type="submit">Add Stat</button>
    </form>
  );
};

export default AddStatForm;
