import React from 'react';
import { ArrowRight, Sparkles, Users, Code2, Award, Zap } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = ({ setActivePage, currentUser }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div className="badge badge-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <Sparkles size={16} /> SkillSync 2.0 Engine is Live
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          lineHeight: '1.15',
          maxWidth: '900px',
          background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Accelerate Your Tech Career Through Peer Mentorship & Collaboration
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          lineHeight: '1.6'
        }}>
          Connect with top corporate tech clubs at Google, Meta, & Amazon. Build real-world projects, share interview experiences, and master in-demand developer skills.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button
            variant="primary"
            size="large"
            icon={ArrowRight}
            onClick={() => setActivePage(currentUser ? 'Dashboard' : 'Register')}
          >
            {currentUser ? 'Go to Dashboard' : 'Get Started Free'}
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={() => setActivePage('Clubs')}
          >
            Explore Tech Clubs
          </Button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        <Card glow>
          <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
            <Users size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Corporate Tech Clubs</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.5' }}>
            Join exclusive tech clubs organized by engineers from Google, Meta, and Amazon. Access curated interview experiences and internal guides.
          </p>
        </Card>

        <Card glow>
          <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>
            <Code2 size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Collaborative Projects</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.5' }}>
            Form project teams, manage tasks with built-in Kanban boards, and build impressive resume-worthy software with peers.
          </p>
        </Card>

        <Card glow>
          <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
            <Award size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Verified Mentors</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.5' }}>
            Get 1-on-1 mentorship from industry veterans. Match with mentors by programming skills, system design expertise, or company goals.
          </p>
        </Card>

        <Card glow>
          <div style={{ color: 'var(--warning)', marginBottom: '1rem' }}>
            <Zap size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Skill Graph Matchmaking</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.5' }}>
            Our smart recommendation engine connects you with complementary team members based on your skill proficiencies.
          </p>
        </Card>
      </section>
    </div>
  );
};

export default Home;
