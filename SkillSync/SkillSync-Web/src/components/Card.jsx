import React from 'react';

const Card = ({ children, className = '', glow = false, onClick, style = {} }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-panel ${glow ? 'glass-panel-glow' : ''} ${className}`}
      style={{
        padding: '1.5rem',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Card;
