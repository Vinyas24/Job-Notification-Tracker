import { useNavigate } from 'react-router-dom';

const Digest = () => {
  const navigate = useNavigate();

  return (
    <div className="kodnest-container">
      <div className="kodnest-context-header">
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif' }}
          data-testid="page-heading"
        >
          Daily Digest
        </h1>
        <p className="kodnest-subtext" data-testid="page-subtext">
          Your curated summary of the best matches.
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
            No digest available.
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
            Your daily digest will be generated once job matching begins.
          </p>
          <button
            className="kodnest-btn kodnest-btn-secondary"
            onClick={() => navigate('/settings')}
            data-testid="configure-preferences-btn"
          >
            Configure Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default Digest;