import React, { useState } from 'react';
import httpClient from './utils/httpClient';

const CreateGoalForm = () => {
  const [description, setDescription] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [startingValue, setStartingValue] = useState('');
  const [notifyMe, setNotifyMe] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await httpClient.post(`${process.env.REACT_APP_BACKEND_URL}/goals`, {
        goal: {
          description,
          short_desc: shortDesc,
          target_date: targetDate,
          target_value: parseInt(targetValue, 10),
          starting_value: parseInt(startingValue, 10),
          notify_me: notifyMe,
          notification_frequency: notifyMe ? notificationFrequency : null,
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
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="notifyMe"
            checked={notifyMe}
            onChange={(e) => setNotifyMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="notifyMe">Notify me</label>
        </div>

        {notifyMe && (
          <div className="mb-3">
            <label htmlFor="notificationFrequency" className="form-label">Notification Frequency</label>
            <select
              className="form-control"
              id="notificationFrequency"
              value={notificationFrequency}
              onChange={(e) => setNotificationFrequency(e.target.value)}
            >
              <option value="daily">Once a day</option>
              <option value="weekly">Once a week</option>
              <option value="monthly">Once a month</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Create Goal</button>
      </form>
    </div>
  );
};

export default CreateGoalForm;
