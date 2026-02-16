import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import { toast } from 'sonner';

const Saved = () => {
  const navigate = useNavigate();
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [jobStatuses, setJobStatuses] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobIds(saved);
    
    const statuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
    setJobStatuses(statuses);
  }, []);

  const handleStatusChange = (jobId, newStatus) => {
    const updatedStatuses = { 
        ...jobStatuses, 
        [jobId]: { status: newStatus, date: new Date().toISOString() } 
    };
    setJobStatuses(updatedStatuses);
    localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatuses));
    toast.success(`Status updated to: ${newStatus}`);
  };

  const handleSave = (jobId) => {
    // In Saved page, clicking save (which will be un-save) should remove it
    const newSaved = savedJobIds.filter(id => id !== jobId);
    setSavedJobIds(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    toast("Job removed from saved items");
  };

  const savedJobsList = jobs.filter(job => savedJobIds.includes(job.id));

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

      <div className="kodnest-workspace" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 64px', flexDirection: 'column' }}>
        {savedJobsList.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobsList.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onSave={handleSave} 
                isSaved={true} 
                status={jobStatuses[job.id]?.status || 'Not Applied'}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Saved;