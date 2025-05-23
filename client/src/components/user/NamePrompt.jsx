// pages/NamePrompt.jsx
import React, { useState } from 'react';

const NamePrompt = ({ onSubmit }) => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Enter your name to start</h1>
      <input
        className="border px-4 py-2 rounded mb-4"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded"
        onClick={() => onSubmit(name)}
        disabled={!name}
      >
        Continue
      </button>
    </div>
  );
};

export default NamePrompt;
