import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Edit, Save, Award, Users, FolderGit2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/profile.css';

const Profile = ({ currentUser, setCurrentUser, data, setData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [title, setTitle] = useState(currentUser?.title || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  // Add skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProf, setNewSkillProf] = useState('Intermediate');

  if (!currentUser) {
    return <p style={{ padding: '2rem' }}>Please sign in to view your profile.</p>;
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      name,
      title,
      bio
    };

    setCurrentUser(updatedUser);

    // Update in data users array
    const updatedUsers = data.users.map(u => u.userId === currentUser.userId ? updatedUser : u);
    setData({ ...data, users: updatedUsers });
    setIsEditing(false);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName) return;

    if (currentUser.skills.some(s => s.name.toLowerCase() === newSkillName.toLowerCase())) {
      return;
    }

    const updatedUser = {
      ...currentUser,
      skills: [...currentUser.skills, { name: newSkillName, proficiency: newSkillProf }]
    };

    setCurrentUser(updatedUser);
    const updatedUsers = data.users.map(u => u.userId === currentUser.userId ? updatedUser : u);
    setData({ ...data, users: updatedUsers });
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillName) => {
    const updatedUser = {
      ...currentUser,
      skills: currentUser.skills.filter(s => s.name !== skillName)
    };

    setCurrentUser(updatedUser);
    const updatedUsers = data.users.map(u => u.userId === currentUser.userId ? updatedUser : u);
    setData({ ...data, users: updatedUsers });
  };

  const toggleMentorStatus = () => {
    const updatedUser = {
      ...currentUser,
      mentor: !currentUser.mentor
    };
    setCurrentUser(updatedUser);
    const updatedUsers = data.users.map(u => u.userId === currentUser.userId ? updatedUser : u);
    setData({ ...data, users: updatedUsers });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Profile Header Card */}
      <Card glow className="profile-header">
        <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar-lg" />
        
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title / Role"
              />
              <textarea
                className="textarea-field"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Button type="submit" variant="primary" size="small" icon={Save}>Save Profile</Button>
                <Button variant="outline" size="small" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {currentUser.name}
                    {currentUser.mentor && <ShieldCheck size={22} color="#10b981" title="Verified Mentor" />}
                  </h2>
                  <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                    {currentUser.title}
                  </p>
                </div>
                <Button variant="outline" size="small" icon={Edit} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.75rem', lineHeight: '1.5' }}>
                {currentUser.bio}
              </p>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  Email: {currentUser.email}
                </span>
                <Button
                  variant={currentUser.mentor ? 'accent' : 'outline'}
                  size="small"
                  onClick={toggleMentorStatus}
                >
                  {currentUser.mentor ? '✓ Mentor Active' : 'Become a Mentor'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Skills Management */}
      <Card>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} color="#6366f1" /> Skill Endorsements & Proficiency
        </h3>

        <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Add new skill (e.g. Docker, GraphQL)"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            required
          />
          <select
            className="select-field"
            style={{ width: '180px' }}
            value={newSkillProf}
            onChange={(e) => setNewSkillProf(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
          <Button type="submit" variant="primary" icon={Plus}>Add Skill</Button>
        </form>

        <div className="skills-tags-container">
          {currentUser.skills.map(s => (
            <div key={s.name} className="skill-chip">
              <span>{s.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>• {s.proficiency}</span>
              <button
                onClick={() => handleRemoveSkill(s.name)}
                style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', marginLeft: '0.25rem' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
