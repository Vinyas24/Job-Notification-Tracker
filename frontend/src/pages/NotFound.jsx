import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="kodnest-container">
      <div className="kodnest-context-header" style={{ textAlign: 'center', paddingTop: '120px' }}>
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif', fontSize: '72px', marginBottom: '24px' }}
          data-testid="error-heading"
        >
          404
        </h1>
        <p className="kodnest-subtext" style={{ fontSize: '24px', marginBottom: '40px' }} data-testid="error-message">
          Page not found
        </p>
        <p className="kodnest-subtext" style={{ marginBottom: '40px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/dashboard" 
          className="kodnest-btn kodnest-btn-primary"
          data-testid="back-to-dashboard"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;