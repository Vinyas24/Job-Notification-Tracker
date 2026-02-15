import React, { useState, useEffect, useMemo } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import { toast } from 'sonner';
import { calculateMatchScore } from '../utils/scoring';
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Settings } from 'lucide-react';

const Dashboard = () => {
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [showMatchesOnly, setShowMatchesOnly] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest' // latest, matchScore, oldest, salary
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobIds(saved);
    
    const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
    setPreferences(prefs);
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

    // Calculate scores for all jobs once (or re-calc when prefs change)
    const jobsWithScores = useMemo(() => {
        return jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));
    }, [preferences]);


  const filteredJobs = useMemo(() => {
     let result = jobsWithScores.filter(job => {
        const searchMatch = 
          job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
          job.company.toLowerCase().includes(filters.search.toLowerCase());
        
        const locationMatch = !filters.location || filters.location === 'All' || job.location.includes(filters.location);
        const modeMatch = !filters.mode || filters.mode === 'All' || job.mode === filters.mode;
        
        let experienceMatch = true;
        if (filters.experience && filters.experience !== 'All') {
            if (filters.experience === 'Fresher') {
                experienceMatch = job.experience === 'Fresher' || job.experience === '0-1';
            } else {
                experienceMatch = job.experience === filters.experience;
            }
        }

        const sourceMatch = !filters.source || filters.source === 'All' || job.source === filters.source;
        
        // Match Score Filter
        const scoreMatch = !showMatchesOnly || !preferences || job.matchScore >= (preferences.minMatchScore || 40);

        return searchMatch && locationMatch && modeMatch && experienceMatch && sourceMatch && scoreMatch;
      });

      // Sorting
      result.sort((a, b) => {
        if (filters.sort === 'matchScore') {
            // Secondary sort by date
            if (b.matchScore === a.matchScore) {
                 return a.postedDaysAgo - b.postedDaysAgo;
            }
            return b.matchScore - a.matchScore;
        }
        if (filters.sort === 'oldest') {
            return b.postedDaysAgo - a.postedDaysAgo;
        }
        if (filters.sort === 'salary') {
             // Simple heuristic extraction: "3-5 LPA" -> 5 (max), "₹15k" -> 0.18 (LPA est)
             const extractMaxSalary = (range) => {
                 try {
                    const match = range.match(/(\d+)(?:\.?\d+)?/g);
                    if (!match) return 0;
                    return Math.max(...match.map(Number));
                 } catch { return 0; }
             };
             return extractMaxSalary(b.salaryRange) - extractMaxSalary(a.salaryRange);
        }
        // Default: Latest
        return a.postedDaysAgo - b.postedDaysAgo;
      });
      
      return result;
  }, [jobsWithScores, filters, showMatchesOnly, preferences]);

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
        
        {!preferences && (
            <Alert className="mb-6 border-amber-200 bg-amber-50">
                <Settings className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Set your preferences</AlertTitle>
                <AlertDescription className="text-amber-700">
                    To activate intelligent matching and see Match Scores, please <Link to="/settings" className="font-semibold underline">configure your settings</Link>.
                </AlertDescription>
            </Alert>
        )}

        {preferences && (
             <div className="flex items-center space-x-2 mb-4">
                <Switch 
                    id="show-matches" 
                    checked={showMatchesOnly}
                    onCheckedChange={setShowMatchesOnly}
                />
                <Label htmlFor="show-matches" className="text-sm font-medium">
                    Show only matches above {preferences.minMatchScore}% match 
                    {!showMatchesOnly && <span className="text-muted-foreground font-normal ml-1">(Enable to filter)</span>}
                </Label>
            </div>
        )}

        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onSave={handleSave} 
                isSaved={savedJobIds.includes(job.id)} 
                matchScore={preferences ? job.matchScore : undefined}
              />
            ))
          ) : (
             <div className="col-span-full text-center py-20 bg-card rounded-lg border border-border/50">
                <h3 className="text-xl font-medium text-muted-foreground">No jobs found.</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                    {showMatchesOnly 
                        ? "Try lowering your match threshold in Settings or disabling the 'Show only matches' filter." 
                        : "Try adjusting your filters to see more results."}
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;