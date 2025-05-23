import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-32 h-32 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-500"></div>
    </div>
  );
};

export default LoadingSpinner;
