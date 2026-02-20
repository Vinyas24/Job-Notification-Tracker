import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="kodnest-container">
      <div 
        className="kodnest-context-header" 
        style={{ 
          textAlign: 'center', 
          paddingTop: '120px',
          paddingBottom: '120px',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <h1 
          className="kodnest-headline" 
          style={{ 
            fontFamily: 'Crimson Text, serif',
            fontSize: '64px',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}
          data-testid="landing-headline"
        >
          Stop Missing The Right Jobs.
        </h1>
        <p 
          className="kodnest-subtext" 
          style={{ 
            fontSize: '20px',
            lineHeight: '1.6',
            marginBottom: '64px',
            maxWidth: '600px',
            margin: '0 auto 64px'
          }}
          data-testid="landing-subtext"
        >
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <button
          className="kodnest-btn kodnest-btn-primary"
          onClick={() => navigate('/dashboard')}
          style={{ fontSize: '16px', padding: '16px 40px' }}
          data-testid="start-tracking-btn"
        >
          Start Tracking
        </button>
      </div>
    </div>
  );
};

export default Home;