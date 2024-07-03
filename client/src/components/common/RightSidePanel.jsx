import React from 'react';

export const RightSidePanel = ({ children, isOpened, toggleOpen }) => {
  return (
    <div className={`right-side-panel ${isOpened ? 'open' : ''}`}>
      <button onClick={toggleOpen}>Toggle</button>
      {children}
    </div>
  );
};