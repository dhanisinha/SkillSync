import React, { useState } from 'react';
import { Users, Plus, MessageSquare, BookOpen, Briefcase, ExternalLink, Star } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/clubs.css';

const Clubs = ({ data, setData, currentUser }) => {
  const [companyFilter, setCompanyFilter] = useState('All');
  const [selectedClub, setSelectedClub] = useState(null);
  const [activeTab, setActiveTab] = useState('discussions');

  // Form states for modals
  const [showCreateClubModal, setShowCreateClubModal] = useState(false);
  const [clubName, setClubName] = useState('');
  const [companyName, setCompanyName] = useState('Google');
  const [clubDesc, setClubDesc] = useState('');

  // Form state for adding discussion post
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  // Form state for interview experience
  const [expRole, setExpRole] = useState('');
  const [expText, setExpText] = useState('');
  const [expRating, setExpRating] = useState('5.0');

  const filteredClubs = companyFilter === 'All'
    ? data.clubs
    : data.clubs.filter(c => c.companyName.toLowerCase() === companyFilter.toLowerCase());

  const handleJoinClub = (clubId) => {
    if (!currentUser) return;
    const updated = data.clubs.map(c => {
      if (c.clubId === clubId) {
        if (!c.members.some(m => m.userId === currentUser.userId)) {
          return {
            ...c,
            members: [...c.members, { userId: currentUser.userId, name: currentUser.name }]
          };
        }
      }
      return c;
    });
    setData({ ...data, clubs: updated });
    if (selectedClub && selectedClub.clubId === clubId) {
      setSelectedClub(updated.find(c => c.clubId === clubId));
    }
  };

  const handleCreateClub = (e) => {
    e.preventDefault();
    if (!clubName || !companyName) return;

    const newClub = {
      clubId: Date.now(),
      clubName,
      companyName,
      description: clubDesc || `${companyName} engineering discussion guild`,
      logo: companyName === 'Google' ? 'https://pngimg.com/uploads/google/google_PNG19635.png' :
            companyName === 'Amazon' ? 'https://pngimg.com/uploads/amazon/amazon_PNG27.png' :
            companyName === 'Meta' ? 'https://pngimg.com/uploads/meta/meta_PNG12.png' :
            'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      creator: { userId: currentUser.userId, name: currentUser.name },
      members: [{ userId: currentUser.userId, name: currentUser.name }],
      discussionPosts: [],
      resources: [],
      interviewExperiences: []
    };

    setData({ ...data, clubs: [...data.clubs, newClub] });
    setShowCreateClubModal(false);
    setClubName('');
    setClubDesc('');
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!postTitle || !postContent || !selectedClub) return;

    const newPost = {
      id: Date.now(),
      title: postTitle,
      content: postContent,
      authorName: currentUser ? currentUser.name : "Anonymous",
      createdAt: "Just now"
    };

    const updatedClubs = data.clubs.map(c => {
      if (c.clubId === selectedClub.clubId) {
        return {
          ...c,
          discussionPosts: [newPost, ...c.discussionPosts]
        };
      }
      return c;
    });

    setData({ ...data, clubs: updatedClubs });
    setSelectedClub({
      ...selectedClub,
      discussionPosts: [newPost, ...selectedClub.discussionPosts]
    });
    setPostTitle('');
    setPostContent('');
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!expRole || !expText || !selectedClub) return;

    const newExp = {
      id: Date.now(),
      company: selectedClub.companyName,
      role: expRole,
      experience: expText,
      rating: expRating,
      sharedBy: currentUser ? currentUser.name : "Anonymous",
      date: "Aug 2026"
    };

    const updatedClubs = data.clubs.map(c => {
      if (c.clubId === selectedClub.clubId) {
        return {
          ...c,
          interviewExperiences: [newExp, ...c.interviewExperiences]
        };
      }
      return c;
    });

    setData({ ...data, clubs: updatedClubs });
    setSelectedClub({
      ...selectedClub,
      interviewExperiences: [newExp, ...selectedClub.interviewExperiences]
    });
    setExpRole('');
    setExpText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Corporate Tech Clubs</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Connect with engineers from top tech companies and access interview insights.
          </p>
        </div>
        <Button variant="secondary" icon={Plus} onClick={() => setShowCreateClubModal(true)}>
          Create Club
        </Button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'Google', 'Amazon', 'Meta', 'Microsoft'].map(company => (
          <button
            key={company}
            onClick={() => setCompanyFilter(company)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              background: companyFilter === company ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: companyFilter === company ? '1px solid var(--secondary)' : '1px solid var(--border-glass)',
              color: companyFilter === company ? '#67e8f9' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            {company}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="clubs-grid">
        {filteredClubs.map(club => {
          const isMember = currentUser && club.members.some(m => m.userId === currentUser.userId);
          return (
            <Card key={club.clubId} glow={isMember}>
              <div className="club-card-header">
                <img src={club.logo} alt={club.companyName} className="club-logo" />
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>{club.clubName}</h3>
                  <span className="badge badge-secondary">{club.companyName}</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', minHeight: '48px' }}>
                {club.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  {club.members.length} Members • {club.interviewExperiences.length} Interviews
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline" size="small" onClick={() => setSelectedClub(club)}>
                    View Hub
                  </Button>
                  {!isMember && (
                    <Button variant="primary" size="small" onClick={() => handleJoinClub(club.clubId)}>
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Club Hub Detail Modal */}
      {selectedClub && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={selectedClub.logo} alt={selectedClub.companyName} style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fff', padding: '4px' }} />
                <div>
                  <h3>{selectedClub.clubName}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Created by {selectedClub.creator.name} • {selectedClub.members.length} members
                  </span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedClub(null)}>×</button>
            </div>

            {/* Club Sub Tabs */}
            <div className="club-tabs">
              <button
                className={`club-tab ${activeTab === 'discussions' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussions')}
              >
                Discussions ({selectedClub.discussionPosts.length})
              </button>
              <button
                className={`club-tab ${activeTab === 'interviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('interviews')}
              >
                Interview Experiences ({selectedClub.interviewExperiences.length})
              </button>
              <button
                className={`club-tab ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources ({selectedClub.resources.length})
              </button>
            </div>

            {/* Tab 1: Discussions */}
            {activeTab === 'discussions' && (
              <div>
                <form onSubmit={handleAddPost} style={{ marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Post a New Topic</h4>
                  <div className="form-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Discussion Title..."
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="textarea-field"
                      placeholder="Share your thoughts or question..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" size="small">Post Topic</Button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedClub.discussionPosts.map(post => (
                    <div key={post.id} className="post-card">
                      <h4 style={{ fontSize: '1rem', color: '#fff' }}>{post.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{post.content}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        <span>Author: {post.authorName}</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Interview Experiences */}
            {activeTab === 'interviews' && (
              <div>
                <form onSubmit={handleAddExperience} style={{ marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Share Your Interview Experience</h4>
                  <div className="form-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Target Role (e.g. Senior Backend Engineer)"
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="textarea-field"
                      placeholder="Detail round breakdowns, coding questions, and prep tips..."
                      value={expText}
                      onChange={(e) => setExpText(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" variant="accent" size="small">Share Experience</Button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedClub.interviewExperiences.map(exp => (
                    <div key={exp.id} className="post-card" style={{ borderLeft: '3px solid var(--accent)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>{exp.company} — {exp.role}</h4>
                        <span className="badge badge-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Star size={12} fill="#6ee7b7" /> {exp.rating}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                        {exp.experience}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        <span>Shared by {exp.sharedBy}</span>
                        <span>{exp.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Resources */}
            {activeTab === 'resources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedClub.resources.map(res => (
                  <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: 'rgba(15,23,42,0.4)', borderRadius: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem' }}>{res.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Category: {res.category} • Posted by {res.postedBy}</span>
                    </div>
                    <a href={res.url} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="small" icon={ExternalLink}>Open</Button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Club Modal */}
      {showCreateClubModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Corporate Tech Club</h3>
              <button className="modal-close-btn" onClick={() => setShowCreateClubModal(false)}>×</button>
            </div>
            <form onSubmit={handleCreateClub}>
              <div className="form-group">
                <label>Club Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Microsoft AI Guild"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <select
                  className="select-field"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="Google">Google</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Meta">Meta</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="textarea-field"
                  placeholder="What is the goal of this club?"
                  value={clubDesc}
                  onChange={(e) => setClubDesc(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <Button variant="outline" onClick={() => setShowCreateClubModal(false)}>Cancel</Button>
                <Button variant="secondary" type="submit">Create Club</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
