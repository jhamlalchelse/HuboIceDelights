import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorize = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Unauthorize</p>
      <button onClick={() => navigate(-1)} className="bg-blue-600 px-5 py-1">
        Go Back
      </button>
    </div>
  );
};

export default Unauthorize;
