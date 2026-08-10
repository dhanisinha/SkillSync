import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  const getColorGradient = () => {
    switch (color) {
      case 'secondary':
        return 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(8, 145, 178, 0.05) 100%)';
      case 'accent':
        return 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.05) 100%)';
      case 'warning':
        return 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.05) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.05) 100%)';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'secondary': return '#06b6d4';
      case 'accent': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#6366f1';
    }
  };

  return (
    <Card style={{ background: getColorGradient() }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>{title}</p>
          <h3 style={{ fontSize: '1.85rem', fontWeight: '800', marginTop: '0.4rem', fontFamily: "'Outfit', sans-serif" }}>
            {value}
          </h3>
          {trend && (
            <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.35rem', fontWeight: '600' }}>
              ↑ {trend}
            </p>
          )}
        </div>
        <div style={{
          padding: '0.75rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: getIconColor()
        }}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
