import React, { useState } from 'react';
import { FolderGit2, Plus, CheckCircle2, Circle, MessageSquare, Link as LinkIcon, User } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/projects.css';

const Projects = ({ data, setData, currentUser }) => {
  const [skillFilter, setSkillFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');

  // Task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  // Discussion message form state
  const [newMessage, setNewMessage] = useState('');

  // Resource link form state
  const [newResTitle, setNewResTitle] = useState('');
  const [newResLink, setNewResLink] = useState('');

  const filteredProjects = skillFilter === 'All'
    ? data.projects
    : data.projects.filter(p => p.skillsRequired.some(s => s.toLowerCase() === skillFilter.toLowerCase()));

  const handleJoinProject = (projectId) => {
    if (!currentUser) return;
    const updated = data.projects.map(p => {
      if (p.projectId === projectId) {
        if (!p.members.some(m => m.userId === currentUser.userId)) {
          return {
            ...p,
            members: [...p.members, { userId: currentUser.userId, name: currentUser.name }]
          };
        }
      }
      return p;
    });

    setData({ ...data, projects: updated });
    if (selectedProject && selectedProject.projectId === projectId) {
      setSelectedProject(updated.find(p => p.projectId === projectId));
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedProject) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      assignedTo: newTaskAssignee || (currentUser ? currentUser.name : "Unassigned"),
      completed: false
    };

    const updatedProjects = data.projects.map(p => {
      if (p.projectId === selectedProject.projectId) {
        return {
          ...p,
          tasks: [...p.tasks, newTask]
        };
      }
      return p;
    });

    setData({ ...data, projects: updatedProjects });
    setSelectedProject({
      ...selectedProject,
      tasks: [...selectedProject.tasks, newTask]
    });
    setNewTaskTitle('');
    setNewTaskAssignee('');
  };

  const toggleTask = (taskId) => {
    if (!selectedProject) return;
    const updatedTasks = selectedProject.tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    const updatedProjects = data.projects.map(p => {
      if (p.projectId === selectedProject.projectId) {
        return { ...p, tasks: updatedTasks };
      }
      return p;
    });

    setData({ ...data, projects: updatedProjects });
    setSelectedProject({ ...selectedProject, tasks: updatedTasks });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage || !selectedProject) return;

    const msg = {
      id: Date.now(),
      sender: currentUser ? currentUser.name : "Guest",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedProjects = data.projects.map(p => {
      if (p.projectId === selectedProject.projectId) {
        return {
          ...p,
          discussions: [...p.discussions, msg]
        };
      }
      return p;
    });

    setData({ ...data, projects: updatedProjects });
    setSelectedProject({
      ...selectedProject,
      discussions: [...selectedProject.discussions, msg]
    });
    setNewMessage('');
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newResTitle || !newResLink || !selectedProject) return;

    const res = {
      id: Date.now(),
      title: newResTitle,
      link: newResLink,
      type: "Doc"
    };

    const updatedProjects = data.projects.map(p => {
      if (p.projectId === selectedProject.projectId) {
        return {
          ...p,
          resources: [...p.resources, res]
        };
      }
      return p;
    });

    setData({ ...data, projects: updatedProjects });
    setSelectedProject({
      ...selectedProject,
      resources: [...selectedProject.resources, res]
    });
    setNewResTitle('');
    setNewResLink('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Collaborative Projects</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Work together with peers, manage Kanban tasks, and build real-world software.
          </p>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'Java', 'React', 'Python', 'Spring Boot', 'System Design'].map(skill => (
          <button
            key={skill}
            onClick={() => setSkillFilter(skill)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              background: skillFilter === skill ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: skillFilter === skill ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
              color: skillFilter === skill ? '#a5b4fc' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map(proj => {
          const isMember = currentUser && proj.members.some(m => m.userId === currentUser.userId);
          const completedCount = proj.tasks.filter(t => t.completed).length;
          return (
            <Card key={proj.projectId} glow={isMember}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{proj.projectName}</h3>
                <span className="badge badge-primary">
                  {proj.members.length} Members
                </span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0.75rem 0', minHeight: '44px' }}>
                {proj.description}
              </p>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {proj.skillsRequired.map(s => (
                  <span key={s} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                  <span>Tasks Completed</span>
                  <span>{completedCount}/{proj.tasks.length} ({proj.tasks.length === 0 ? 0 : Math.round((completedCount/proj.tasks.length)*100)}%)</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${proj.tasks.length === 0 ? 0 : (completedCount/proj.tasks.length)*100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Owner: {proj.owner.name}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline" size="small" onClick={() => setSelectedProject(proj)}>
                    Manage Project
                  </Button>
                  {!isMember && (
                    <Button variant="primary" size="small" onClick={() => handleJoinProject(proj.projectId)}>
                      Join Team
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Project Workspace Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '850px' }}>
            <div className="modal-header">
              <div>
                <h3>{selectedProject.projectName} Workspace</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Owner: {selectedProject.owner.name} • {selectedProject.members.length} Active Members
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>×</button>
            </div>

            {/* Sub Nav Tabs */}
            <div className="club-tabs">
              <button
                className={`club-tab ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tasks')}
              >
                Task Board ({selectedProject.tasks.length})
              </button>
              <button
                className={`club-tab ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
              >
                Team Discussion ({selectedProject.discussions.length})
              </button>
              <button
                className={`club-tab ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                Project Locker ({selectedProject.resources.length})
              </button>
            </div>

            {/* Tab 1: Task Kanban / List */}
            {activeTab === 'tasks' && (
              <div>
                <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="New Task Title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="input-field"
                    style={{ width: '200px' }}
                    placeholder="Assignee Name"
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                  />
                  <Button type="submit" variant="primary" size="medium" icon={Plus}>
                    Add Task
                  </Button>
                </form>

                <div className="kanban-board">
                  {selectedProject.tasks.map(t => (
                    <div key={t.id} className="task-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={() => toggleTask(t.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                          {t.completed ? (
                            <CheckCircle2 size={20} color="#10b981" />
                          ) : (
                            <Circle size={20} color="#64748b" />
                          )}
                        </button>
                        <span style={{
                          fontSize: '0.925rem',
                          textDecoration: t.completed ? 'line-through' : 'none',
                          color: t.completed ? 'var(--text-dim)' : 'var(--text-main)'
                        }}>
                          {t.title}
                        </span>
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                        {t.assignedTo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Team Discussion */}
            {activeTab === 'chat' && (
              <div>
                <div style={{
                  height: '260px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'rgba(15, 23, 42, 0.4)',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  {selectedProject.discussions.map(msg => (
                    <div key={msg.id} style={{
                      padding: '0.65rem 0.85rem',
                      background: msg.sender === (currentUser?.name) ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      alignSelf: msg.sender === (currentUser?.name) ? 'flex-end' : 'flex-start',
                      maxWidth: '75%'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a5b4fc' }}>{msg.sender}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{msg.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.875rem' }}>{msg.content}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Type project discussion message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="primary">Send</Button>
                </form>
              </div>
            )}

            {/* Tab 3: Project Locker */}
            {activeTab === 'resources' && (
              <div>
                <form onSubmit={handleAddResource} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Resource Name"
                    value={newResTitle}
                    onChange={(e) => setNewResTitle(e.target.value)}
                    required
                  />
                  <input
                    type="url"
                    className="input-field"
                    placeholder="Resource URL (https://...)"
                    value={newResLink}
                    onChange={(e) => setNewResLink(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="secondary" icon={Plus}>Add</Button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedProject.resources.map(res => (
                    <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(15,23,42,0.4)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{res.title}</span>
                      <a href={res.link} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <LinkIcon size={14} /> Open Link
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
