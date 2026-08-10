import React from 'react';
import { LayoutDashboard, Users, FolderGit2, Search, UserCheck } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Clubs', icon: Users },
    { name: 'Projects', icon: FolderGit2 },
    { name: 'Search', icon: Search },
    { name: 'Profile', icon: UserCheck }
  ];

  return (
    <aside style={{
      width: '240px',
      background: 'rgba(11, 15, 25, 0.6)',
      borderRight: '1px solid var(--border-glass)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.05em', padding: '0 0.75rem 0.5rem' }}>
        Workspace Menu
      </div>
      {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = activePage === item.name;
        return (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
              color: isActive ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: isActive ? '600' : '500',
              cursor: 'pointer',
              borderTop: 'none',
              borderRight: 'none',
              borderBottom: 'none',
              textAlign: 'left',
              transition: 'var(--transition-fast)'
            }}
          >
            <Icon size={18} color={isActive ? '#6366f1' : '#94a3b8'} />
            {item.name}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
