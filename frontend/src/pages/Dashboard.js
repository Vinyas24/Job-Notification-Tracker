import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import { toast } from 'sonner';

const Dashboard = () => {
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest'
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobIds(saved);
  }, []);

  const handleSave = (jobId) => {
    let newSaved;
    if (savedJobIds.includes(jobId)) {
      newSaved = savedJobIds.filter(id => id !== jobId);
      toast("Job removed from saved items");
    } else {
      newSaved = [...savedJobIds, jobId];
      toast("Job saved successfully");
    }
    setSavedJobIds(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  const filteredJobs = jobs.filter(job => {
    const searchMatch = 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
      job.company.toLowerCase().includes(filters.search.toLowerCase());
    
    const locationMatch = !filters.location || filters.location === 'All' || job.location.includes(filters.location);
    const modeMatch = !filters.mode || filters.mode === 'All' || job.mode === filters.mode;
    
    // Simple experience matching logic
    let experienceMatch = true;
    if (filters.experience && filters.experience !== 'All') {
        if (filters.experience === 'Fresher') {
            experienceMatch = job.experience === 'Fresher' || job.experience === '0-1';
        } else {
            experienceMatch = job.experience === filters.experience;
        }
    }

    const sourceMatch = !filters.source || filters.source === 'All' || job.source === filters.source;

    return searchMatch && locationMatch && modeMatch && experienceMatch && sourceMatch;
  }).sort((a, b) => {
    if (filters.sort === 'oldest') {
        return b.postedDaysAgo - a.postedDaysAgo;
    }
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  return (
    <div className="kodnest-container">
      <div className="kodnest-context-header">
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif' }}
          data-testid="page-heading"
        >
          Dashboard
        </h1>
        <p className="kodnest-subtext" data-testid="page-subtext">
          Find your dream job from our curated list of opportunities.
        </p>
      </div>

      <div className="kodnest-workspace" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 64px', flexDirection: 'column' }}>
        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onSave={handleSave} 
                isSaved={savedJobIds.includes(job.id)} 
              />
            ))
          ) : (
             <div className="col-span-full text-center py-20">
                <h3 className="text-xl font-medium text-muted-foreground">No jobs found matching your criteria.</h3>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;