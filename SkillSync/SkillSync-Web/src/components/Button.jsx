import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
          border: 'none'
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(6, 182, 212, 0.35)',
          border: 'none'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#f8fafc',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: 'none'
        };
      case 'glow':
        return {
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#a5b4fc',
          border: '1px solid rgba(99, 102, 241, 0.5)',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
          border: 'none'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '8px' };
      case 'large':
        return { padding: '0.9rem 1.75rem', fontSize: '1.05rem', borderRadius: '14px' };
      default:
        return { padding: '0.65rem 1.25rem', fontSize: '0.925rem', borderRadius: '10px' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Outfit', sans-serif",
        ...getVariantStyles(),
        ...getSizeStyles()
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.filter = 'brightness(1)';
        }
      }}
    >
      {Icon && <Icon size={size === 'small' ? 14 : size === 'large' ? 20 : 16} />}
      {children}
    </button>
  );
};

export default Button;
