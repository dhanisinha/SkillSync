import React, { useState } from 'react';
import { Layers, Home, LayoutDashboard, Users, FolderGit2, Search, Bell, LogOut, ShieldCheck } from 'lucide-react';
import Button from './Button';
import '../styles/navbar.css';

const Navbar = ({ activePage, setActivePage, currentUser, setCurrentUser, notifications, setNotifications }) => {
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const navItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Clubs', label: 'Clubs', icon: Users },
    { id: 'Projects', label: 'Projects', icon: FolderGit2 },
    { id: 'Search', label: 'Search & Mentors', icon: Search }
  ];

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <div className="navbar-brand" onClick={() => setActivePage('Home')}>
        <div className="brand-icon">
          <Layers size={24} />
        </div>
        <span className="brand-name">SkillSync</span>
      </div>

      {/* Floating Glass Pill Taskbar Container */}
      <div className="navbar-pill-container">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`nav-pill-item ${isActive ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-pill-icon">
                <Icon size={17} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Actions & Profile */}
      <div className="navbar-actions">
        {currentUser ? (
          <>
            <div className="notif-badge" onClick={() => setShowNotifs(!showNotifs)}>
              <Bell size={19} />
              {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
            </div>

            {showNotifs && (
              <div className="notif-dropdown">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.95rem' }}>Notifications</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No notifications yet.</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        style={{
                          padding: '0.55rem 0.75rem',
                          background: n.read ? 'transparent' : 'rgba(99, 102, 241, 0.12)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-main)' }}>{n.message}</p>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="user-profile-summary" onClick={() => setActivePage('Profile')}>
              <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {currentUser.name}
                  {currentUser.mentor && <ShieldCheck size={14} color="#10b981" title="Verified Mentor" />}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{currentUser.skills.length} Skills</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="small"
              icon={LogOut}
              onClick={() => {
                setCurrentUser(null);
                setActivePage('Login');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="small" onClick={() => setActivePage('Login')}>
              Login
            </Button>
            <Button variant="primary" size="small" onClick={() => setActivePage('Register')}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
