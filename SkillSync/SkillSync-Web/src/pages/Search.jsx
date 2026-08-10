import React, { useState } from 'react';
import { Search as SearchIcon, ShieldCheck, Mail, BookOpen, User, Users, FolderGit2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/search.css';

const Search = ({ data, setActivePage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('Mentors'); // 'Mentors' | 'Users' | 'Clubs' | 'Projects'

  const filteredUsers = data.users.filter(u => {
    const matchesTerm = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.skills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (searchCategory === 'Mentors') {
      return matchesTerm && u.mentor;
    }
    return matchesTerm;
  });

  const filteredClubs = data.clubs.filter(c =>
    c.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = data.projects.filter(p =>
    p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.skillsRequired.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Search & Mentor Discovery</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Find verified mentors, developers by skill, company clubs, and projects.
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.75rem', height: '48px', fontSize: '1rem' }}
            placeholder="Search by skill (Java, React), title, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '14px' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['Mentors', 'Users', 'Clubs', 'Projects'].map(cat => (
            <button
              key={cat}
              onClick={() => setSearchCategory(cat)}
              style={{
                padding: '0 1.25rem',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: searchCategory === cat ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: '#ffffff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {(searchCategory === 'Mentors' || searchCategory === 'Users') && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            {searchCategory} ({filteredUsers.length})
          </h3>
          <div className="search-results-grid">
            {filteredUsers.map(user => (
              <Card key={user.userId} glow={user.mentor}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: user.mentor ? '2px solid #10b981' : '1px solid var(--border-glass)' }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {user.name}
                      {user.mentor && <ShieldCheck size={16} color="#10b981" title="Verified Mentor" />}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.title}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', minHeight: '40px' }}>
                  {user.bio}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {user.skills.map(s => (
                    <span key={s.name} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {s.name} ({s.proficiency})
                    </span>
                  ))}
                </div>

                <Button variant={user.mentor ? 'accent' : 'outline'} size="small" icon={Mail} style={{ width: '100%' }}>
                  {user.mentor ? 'Request Mentorship' : 'Connect'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {searchCategory === 'Clubs' && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Tech Clubs ({filteredClubs.length})</h3>
          <div className="search-results-grid">
            {filteredClubs.map(c => (
              <Card key={c.clubId}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <img src={c.logo} alt={c.companyName} style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff', padding: '4px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>{c.clubName}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.companyName}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{c.description}</p>
                <Button variant="outline" size="small" onClick={() => setActivePage('Clubs')}>View Club</Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {searchCategory === 'Projects' && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Projects ({filteredProjects.length})</h3>
          <div className="search-results-grid">
            {filteredProjects.map(p => (
              <Card key={p.projectId}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{p.projectName}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{p.description}</p>
                <Button variant="outline" size="small" onClick={() => setActivePage('Projects')}>Explore Project</Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
