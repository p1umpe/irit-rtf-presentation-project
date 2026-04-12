import React from 'react';

export const ProgressBar = ({ progress, height = 8 }) => {
  return (
    <div className="progress-bar-container" style={{ height: `${height}px` }}>
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
        <div className="progress-bar-shine" />
      </div>
    </div>
  );
};