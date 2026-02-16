import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { calculateMatchScore, getScoreColor } from '../utils/scoring';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Mail, Copy, AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Digest = () => {
    const navigate = useNavigate();
    const [digestJobs, setDigestJobs] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [statusUpdates, setStatusUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    const todayStr = new Date().toISOString().split('T')[0];
    const digestKey = `jobTrackerDigest_${todayStr}`;

    useEffect(() => {
        const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        setPreferences(prefs);

        // Check for existing digest
        const existingDigest = localStorage.getItem(digestKey);
        if (existingDigest) {
            setDigestJobs(JSON.parse(existingDigest));
        }

        // Load recent status updates
        const allStatuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        console.log("Digest: Loaded statuses from LS:", allStatuses);

        const updates = Object.entries(allStatuses)
            .map(([id, data]) => {
                // Fix: IDs in jobs.js are strings (e.g., "j1"), so do NOT use parseInt
                const job = jobs.find(j => j.id === id);
                if (!job) console.warn(`Digest: Job not found for ID ${id}`);
                return job ? { ...job, ...data } : null;
            })
            .filter(item => item !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5); // Status Top 5
            
        console.log("Digest: Computed updates:", updates);
        setStatusUpdates(updates);
        
        setLoading(false);
    }, [digestKey]);

    const generateDigest = () => {
        if (!preferences) {
             toast.error("Please set your preferences first.");
             return;
        }

        setLoading(true);
        
        // Simulation delay
        setTimeout(() => {
            // 1. Calculate Scores
            const scoredJobs = jobs.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, preferences)
            }));

            // 2. Filter & Sort
            // Filter: Score > 0 roughly (or a threshold, user asked for top 10 sorted by score)
            const filtered = scoredJobs.filter(j => j.matchScore > 0);
            
            filtered.sort((a, b) => {
                // Priority 1: Match Score Desc
                if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                // Priority 2: Posted Days Ago Asc (Fresher first)
                return a.postedDaysAgo - b.postedDaysAgo;
            });

            // 3. Top 10
            const finalDigest = filtered.slice(0, 10);

            // 4. Persist
            localStorage.setItem(digestKey, JSON.stringify(finalDigest));
            setDigestJobs(finalDigest);
            setLoading(false);
            toast.success("Daily digest generated!");
        }, 800);
    };

    const handleCopy = () => {
        if (!digestJobs) return;
        
        const text = digestJobs.map(job => 
            `• ${job.title} | ${job.company} | ${job.matchScore}% Match\n  ${job.applyUrl}`
        ).join('\n\n');

        const header = `Here are the top ${digestJobs.length} jobs for you today (${todayStr}):\n\n`;
        
        navigator.clipboard.writeText(header + text).then(() => {
            toast.success("Digest copied to clipboard!");
        });
    };

    const handleEmail = () => {
        if (!digestJobs) return;
         const text = digestJobs.map(job => 
            `${job.title} at ${job.company} (${job.matchScore}% Match)\nLocation: ${job.location}\nLink: ${job.applyUrl}`
        ).join('\n\n');
        
        const subject = "My 9AM Job Digest";
        const body = `Top Jobs for ${todayStr}:\n\n${text}`;
        
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    if (loading) {
        return <div className="p-20 text-center text-muted-foreground">Loading digest...</div>;
    }

    if (!preferences) {
         return (
            <div className="kodnest-container">
                 <div className="kodnest-workspace" style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 20px', flexDirection: 'column' }}>
                    <Alert className="mb-6 border-amber-200 bg-amber-50">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Preferences Required</AlertTitle>
                        <AlertDescription className="text-amber-700">
                            To generate a personalized digest, you need to set your job preferences first.
                        </AlertDescription>
                    </Alert>
                    <div className="text-center mt-4">
                        <Button onClick={() => navigate('/settings')}>Go to Settings</Button>
                    </div>
                </div>
            </div>
         )
    }

  return (
    <div className="kodnest-container bg-slate-100 min-h-screen">
      <div className="kodnest-workspace" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', flexDirection: 'column' }}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        
        {/* Main Content - Daily Briefing */}
        <div className={`${statusUpdates.length > 0 ? 'lg:col-span-8' : 'lg:col-span-8 lg:col-start-3'}`}>
        {!digestJobs ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-border/50 h-full flex flex-col justify-center items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6 text-blue-600">
                    <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-semibold mb-2">Ready for your morning update?</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                    Generate your personalized daily digest based on your current preferences.
                </p>
                 <Button onClick={generateDigest} size="lg" className="w-full md:w-auto">
                    Generate Today's 9AM Digest (Simulated)
                </Button>
                 <p className="text-xs text-muted-foreground mt-4">Demo Mode: Daily 9AM trigger simulated manually.</p>
            </div>
        ) : (
            <div className="bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 border-b p-8 text-center space-y-2">
                     <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Daily Briefing</p>
                     <h1 className="text-3xl font-serif font-bold text-slate-900">Top {digestJobs.length} Jobs For You</h1>
                     <p className="text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                {/* Actions Bar */}
                <div className="flex border-b divide-x">
                     <button onClick={handleCopy} className="flex-1 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                         <Copy className="w-4 h-4" /> Copy Digest
                     </button>
                      <button onClick={handleEmail} className="flex-1 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                         <Mail className="w-4 h-4" /> Create Draft
                     </button>
                </div>

                {/* List */}
                <div className="divide-y">
                    {digestJobs.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground">
                            No matching roles found today. Check again tomorrow or adjust your filters.
                        </div>
                    ) : (
                        digestJobs.map((job, index) => (
                            <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{job.title}</h3>
                                    <div className="text-sm text-slate-500 space-x-2">
                                        <span className="font-medium text-slate-700">{job.company}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>{job.experience} Yrs</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                                     <span className={`px-2 py-1 text-xs font-bold rounded border ${getScoreColor(job.matchScore)}`}>
                                        {job.matchScore}% Match
                                     </span>
                                     <Button size="sm" variant="outline" onClick={() => window.open(job.applyUrl, '_blank')}>
                                         Apply
                                     </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 border-t p-6 text-center text-xs text-muted-foreground">
                    This digest was generated based on your preferences. <span className="underline cursor-pointer" onClick={() => navigate('/settings')}>Update Priorities</span>
                </div>
            </div>
        )}
        </div>
        
        {/* Status Updates Sidebar */}
        {statusUpdates.length > 0 && (
            <div className="lg:col-span-4">
             <div className="bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden sticky top-8">
                <div className="bg-slate-50 border-b p-4">
                    <h2 className="text-lg font-serif font-bold text-slate-900">Recent Updates</h2>
                </div>
                <div className="divide-y max-h-[600px] overflow-y-auto">
                    {statusUpdates.map((update, idx) => (
                        <div key={idx} className="p-3 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-slate-800 truncate">{update.title}</h4>
                                    <span className="text-xs text-muted-foreground">{update.company}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide whitespace-nowrap ${update.status === 'Applied' ? 'text-blue-700 bg-blue-50 border-blue-200' : update.status === 'Selected' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : update.status === 'Rejected' ? 'text-red-700 bg-red-50 border-red-200' : 'text-slate-600 bg-slate-50 border-slate-200'}`}>
                                    {update.status}
                                </span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                                {new Date(update.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-slate-50/50 text-center border-t">
                    <button onClick={() => navigate('/dashboard')} className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">View All Applications →</button>
                </div>
             </div>
            </div>
        )}
        
        </div>
      </div>
    </div>
  );
};

export default Digest;