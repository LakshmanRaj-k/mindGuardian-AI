import React from 'react';

/**
 * Reusable Glassy Card Component (Olive Green Glacy Finish)
 */
export const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl glass-card ${
        hover ? 'glass-card-hover' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
