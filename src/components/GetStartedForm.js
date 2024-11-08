import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetStartedForm.css';

function GetStartedForm() {
  const [dimensions, setDimensions] = useState('');
  const [preferences, setPreferences] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/recommendations', { state: { dimensions, preferences } });
  };

  return (
    <div className="form-container">
      <h2>Tell Us About Your Space</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter dimensions (ex: 12x15 ft)"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe your preferences (ex: modern, minimalist)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GetStartedForm;

