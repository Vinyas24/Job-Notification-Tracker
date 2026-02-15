import { useNavigate } from 'react-router-dom';

const Saved = () => {
  const navigate = useNavigate();

  return (
    <div className="kodnest-container">
      <div className="kodnest-context-header">
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif' }}
          data-testid="page-heading"
        >
          Saved Jobs
        </h1>
        <p className="kodnest-subtext" data-testid="page-subtext">
          Jobs you've marked for later review.
        </p>
      </div>

      <div className="kodnest-workspace" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div 
          className="kodnest-card" 
          style={{ 
            padding: '80px 40px',
            textAlign: 'center',
            marginBottom: 0
          }}
          data-testid="empty-state"
        >
          <h3 
            style={{ 
              fontFamily: 'Crimson Text, serif',
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--kodnest-text)'
            }}
          >
            No saved jobs yet.
          </h3>
          <p 
            style={{ 
              fontSize: '16px',
              color: 'var(--kodnest-text)',
              opacity: 0.6,
              lineHeight: '1.6',
              maxWidth: '480px',
              margin: '0 auto 24px'
            }}
          >
            Start browsing your daily matches to save opportunities for later.
          </p>
          <button
            className="kodnest-btn kodnest-btn-secondary"
            onClick={() => navigate('/dashboard')}
            data-testid="go-to-dashboard-btn"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Saved;