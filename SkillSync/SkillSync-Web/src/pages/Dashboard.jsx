import React, { useState } from 'react';
import { FolderGit2, Users, Award, ShieldCheck, Plus, CheckCircle2, Circle, ArrowUpRight, MessageSquare } from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/dashboard.css';

const Dashboard = ({ setActivePage, currentUser, data, setData }) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectSkills, setNewProjectSkills] = useState('Java, React');

  if (!currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Please sign in to view your dashboard</h2>
        <Button variant="primary" style={{ marginTop: '1rem' }} onClick={() => setActivePage('Login')}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  // Filter projects user is member or owner of
  const myProjects = data.projects.filter(p => 
    p.owner.userId === currentUser.userId || p.members.some(m => m.userId === currentUser.userId)
  );

  // Filter clubs user is member of
  const myClubs = data.clubs.filter(c => 
    c.members.some(m => m.userId === currentUser.userId)
  );

  // Toggle task completion status
  const toggleTask = (projectId, taskId) => {
    const updatedProjects = data.projects.map(proj => {
      if (proj.projectId === projectId) {
        const updatedTasks = proj.tasks.map(t => {
          if (t.id === taskId) {
            return { ...t, completed: !t.completed };
          }
          return t;
        });
        return { ...proj, tasks: updatedTasks };
      }
      return proj;
    });

    setData({ ...data, projects: updatedProjects });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName) return;

    const newProj = {
      projectId: Date.now(),
      projectName: newProjectName,
      description: newProjectDesc || "New collaborative project",
      skillsRequired: newProjectSkills.split(',').map(s => s.trim()),
      owner: { userId: currentUser.userId, name: currentUser.name },
      members: [{ userId: currentUser.userId, name: currentUser.name }],
      discussions: [
        { id: 1, sender: currentUser.name, content: "Project initialized!", timestamp: "Just now" }
      ],
      resources: [],
      tasks: [
        { id: 1, title: "Initial project setup & requirements", assignedTo: currentUser.name, completed: false }
      ]
    };

    setData({
      ...data,
      projects: [...data.projects, newProj]
    });

    setShowProjectModal(false);
    setNewProjectName('');
    setNewProjectDesc('');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>
            Welcome back, {currentUser.name}! 👋
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            {currentUser.title}
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowProjectModal(true)}
        >
          Create Project
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid">
        <StatCard
          title="Active Projects"
          value={myProjects.length}
          icon={FolderGit2}
          trend="2 active"
          color="primary"
        />
        <StatCard
          title="Joined Clubs"
          value={myClubs.length}
          icon={Users}
          trend="1 new post"
          color="secondary"
        />
        <StatCard
          title="Mastered Skills"
          value={currentUser.skills.length}
          icon={Award}
          color="accent"
        />
        <StatCard
          title="Mentor Status"
          value={currentUser.mentor ? "Active" : "Standard"}
          icon={ShieldCheck}
          color={currentUser.mentor ? "accent" : "warning"}
        />
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Projects & Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Active Projects */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderGit2 size={20} color="#6366f1" /> My Collaborative Projects
              </h3>
              <Button variant="outline" size="small" onClick={() => setActivePage('Projects')}>
                View All
              </Button>
            </div>

            {myProjects.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You haven't joined any projects yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myProjects.map(proj => (
                  <div
                    key={proj.projectId}
                    style={{
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>{proj.projectName}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                          {proj.description}
                        </p>
                      </div>
                      <span className="badge badge-primary">
                        Owner: {proj.owner.name}
                      </span>
                    </div>

                    {/* Skill requirements */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                      {proj.skillsRequired.map(skill => (
                        <span key={skill} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Task checklist */}
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Project Tasks ({proj.tasks.filter(t => t.completed).length}/{proj.tasks.length}):
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {proj.tasks.map(t => (
                          <div key={t.id} className="task-item">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <button
                                onClick={() => toggleTask(proj.projectId, t.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                              >
                                {t.completed ? (
                                  <CheckCircle2 size={18} color="#10b981" />
                                ) : (
                                  <Circle size={18} color="#64748b" />
                                )}
                              </button>
                              <span style={{
                                fontSize: '0.85rem',
                                textDecoration: t.completed ? 'line-through' : 'none',
                                color: t.completed ? 'var(--text-dim)' : 'var(--text-main)'
                              }}>
                                {t.title}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assigned: {t.assignedTo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Joined Clubs & Skill Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} color="#06b6d4" /> Joined Tech Clubs
              </h3>
              <Button variant="outline" size="small" onClick={() => setActivePage('Clubs')}>
                Explore
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {myClubs.map(club => (
                <div
                  key={club.clubId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={club.logo} alt={club.companyName} style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'contain', background: '#fff', padding: '2px' }} />
                    <div>
                      <h5 style={{ fontSize: '0.9rem' }}>{club.clubName}</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{club.members.length} members</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => setActivePage('Clubs')} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="#10b981" /> Skill Profile
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {currentUser.skills.map(s => (
                <span key={s.name} className="badge badge-accent">
                  {s.name} • {s.proficiency}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Project Modal */}
      {showProjectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Collaborative Project</h3>
              <button className="modal-close-btn" onClick={() => setShowProjectModal(false)}>×</button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Distributed Cache Engine"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="textarea-field"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Describe project objectives and scope..."
                />
              </div>

              <div className="form-group">
                <label>Required Tech Skills (comma separated)</label>
                <input
                  type="text"
                  className="input-field"
                  value={newProjectSkills}
                  onChange={(e) => setNewProjectSkills(e.target.value)}
                  placeholder="Java, Spring Boot, React"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <Button variant="outline" onClick={() => setShowProjectModal(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Create Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
