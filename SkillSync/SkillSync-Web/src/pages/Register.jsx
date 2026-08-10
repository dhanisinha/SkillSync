import React, { useState } from 'react';
import { UserPlus, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/register.css';

const AVAILABLE_SKILLS = [
  "Java", "React", "Spring Boot", "Python", "PyTorch", 
  "AWS", "Docker", "System Design", "SQL", "TypeScript", 
  "C++", "Go", "Machine Learning", "GraphQL", "Kubernetes"
];

const Register = ({ setActivePage, data, setData, setCurrentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(["Java", "React"]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    const newUser = {
      userId: Date.now(),
      name,
      email,
      password,
      mentor: isMentor,
      title: title || "Software Engineer",
      bio: bio || "Enthusiastic software developer learning new technologies.",
      skills: selectedSkills.map(s => ({ name: s, proficiency: "Intermediate" })),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`
    };

    const updatedData = {
      ...data,
      users: [...data.users, newUser]
    };

    setData(updatedData);
    setCurrentUser(newUser);
    setActivePage('Dashboard');
  };

  return (
    <div className="auth-page-container">
      <Card glow className="auth-card" style={{ maxWidth: '540px' }}>
        <div className="auth-header">
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: '#fff'
          }}>
            <UserPlus size={26} />
          </div>
          <h2>Create Your Account</h2>
          <p className="auth-subtitle">Join SkillSync to start collaborating with tech leaders</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Smith"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Current Title / Target Role</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          <div className="form-group">
            <label>Select Your Tech Skills</label>
            <div className="register-skills-selector">
              {AVAILABLE_SKILLS.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`skill-selectable-chip ${isSelected ? 'selected' : ''}`}
                  >
                    {skill} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
            <input
              type="checkbox"
              id="mentor-check"
              checked={isMentor}
              onChange={(e) => setIsMentor(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
            />
            <label htmlFor="mentor-check" style={{ fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} color="#10b981" /> Apply to become a Mentor
            </label>
          </div>

          <Button type="submit" variant="secondary" size="large" style={{ width: '100%' }}>
            Complete Sign Up
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already registered?{' '}
          <button
            onClick={() => setActivePage('Login')}
            style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '600', cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
