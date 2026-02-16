import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Copy, ExternalLink, AlertCircle, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const Proof = () => {
  const [links, setLinks] = useState({
    lovable: '',
    github: '',
    deployed: ''
  });
  const [testsPassed, setTestsPassed] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load saved links
    const savedLinks = JSON.parse(localStorage.getItem('jobTrackerProofLinks') || '{}');
    setLinks({
      lovable: savedLinks.lovable || '',
      github: savedLinks.github || '',
      deployed: savedLinks.deployed || ''
    });

    // Check test completion
    const checklist = JSON.parse(localStorage.getItem('jobTrackerTestChecklist') || '{}');
    const passedCount = Object.values(checklist).filter(Boolean).length;
    setTestsPassed(passedCount);
  }, []);

  const validateURL = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setLinks(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field) => {
    const value = links[field];
    if (value && !validateURL(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter a valid URL (must start with http:// or https://)' }));
    } else {
      // Save to localStorage if valid
      const updated = { ...links };
      localStorage.setItem('jobTrackerProofLinks', JSON.stringify(updated));
      if (value) {
        toast.success('Link saved');
      }
    }
  };

  const handleCopySubmission = () => {
    if (!links.lovable || !links.github || !links.deployed) {
      toast.error('Please fill in all three links first');
      return;
    }

    const text = `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;

    navigator.clipboard.writeText(text).then(() => {
      toast.success('Final submission copied to clipboard!');
    });
  };

  // Calculate project status
  const allLinksProvided = links.lovable && links.github && links.deployed && 
                           validateURL(links.lovable) && validateURL(links.github) && validateURL(links.deployed);
  const allTestsPassed = testsPassed === 10;
  const isShipped = allLinksProvided && allTestsPassed;

  const steps = [
    { id: 1, label: 'Core UI & Job Cards', completed: true },
    { id: 2, label: 'Preferences & Match Scoring', completed: true },
    { id: 3, label: 'Daily Digest', completed: true },
    { id: 4, label: 'Status Tracking', completed: true },
    { id: 5, label: 'Test Checklist', completed: true },
    { id: 6, label: 'Artifact Links', completed: allLinksProvided },
    { id: 7, label: 'All Tests Passed', completed: allTestsPassed },
    { id: 8, label: 'Final Deployment', completed: isShipped }
  ];

  const completedSteps = steps.filter(s => s.completed).length;

  // Determine status
  let status = 'Not Started';
  let statusColor = 'text-slate-500';
  let statusBg = 'bg-slate-100';
  
  if (completedSteps >= 5 && !isShipped) {
    status = 'In Progress';
    statusColor = 'text-amber-700';
    statusBg = 'bg-amber-100';
  } else if (isShipped) {
    status = 'Shipped';
    statusColor = 'text-emerald-700';
    statusBg = 'bg-emerald-100';
  }

  return (
    <div className="kodnest-container bg-slate-100 min-h-screen">
      <div className="kodnest-context-header">
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif' }}
        >
          Project 1 — Job Notification Tracker
        </h1>
        <p className="kodnest-subtext">
          Final proof and submission system.
        </p>
      </div>

      <div className="kodnest-workspace" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px 64px', flexDirection: 'column' }}>
        
        {/* Status Badge */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-slate-600" />
            <div>
              <h2 className="text-sm font-medium text-slate-600">Project Status</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBg} ${statusColor}`}>
                  {status}
                </span>
                <span className="text-xs text-slate-500">
                  {completedSteps} / {steps.length} steps completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipped Message */}
        {isShipped && (
          <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-serif font-semibold text-emerald-900">
                  Project 1 Shipped Successfully.
                </h3>
                <p className="text-sm text-emerald-700 mt-1">
                  All requirements met. Ready for final review.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step Completion Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden mb-8">
          <div className="bg-slate-50 border-b p-4">
            <h2 className="text-lg font-serif font-bold text-slate-900">Step Completion Summary</h2>
          </div>
          <div className="divide-y">
            {steps.map((step) => (
              <div key={step.id} className="p-4 flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                )}
                <span className={`text-sm ${step.completed ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                  {step.label}
                </span>
                {step.completed && (
                  <span className="ml-auto text-xs text-emerald-600 font-medium">Completed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Artifact Collection */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden mb-8">
          <div className="bg-slate-50 border-b p-4">
            <h2 className="text-lg font-serif font-bold text-slate-900">Artifact Collection</h2>
            <p className="text-sm text-slate-600 mt-1">Provide deployment links to complete the project.</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Lovable Link */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lovable Project Link <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={links.lovable}
                  onChange={(e) => handleInputChange('lovable', e.target.value)}
                  onBlur={() => handleInputBlur('lovable')}
                  placeholder="https://lovable.dev/projects/..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lovable ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {links.lovable && validateURL(links.lovable) && (
                  <ExternalLink className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
                )}
              </div>
              {errors.lovable && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.lovable}
                </p>
              )}
            </div>

            {/* GitHub Link */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GitHub Repository Link <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={links.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  onBlur={() => handleInputBlur('github')}
                  placeholder="https://github.com/username/repo"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.github ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {links.github && validateURL(links.github) && (
                  <ExternalLink className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
                )}
              </div>
              {errors.github && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.github}
                </p>
              )}
            </div>

            {/* Deployed URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deployed URL (Vercel or equivalent) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={links.deployed}
                  onChange={(e) => handleInputChange('deployed', e.target.value)}
                  onBlur={() => handleInputBlur('deployed')}
                  placeholder="https://your-app.vercel.app"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.deployed ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {links.deployed && validateURL(links.deployed) && (
                  <ExternalLink className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
                )}
              </div>
              {errors.deployed && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.deployed}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Test Status Warning */}
        {!allTestsPassed && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">
                Test Checklist Incomplete
              </p>
              <p className="text-xs text-amber-700 mt-1">
                {testsPassed} / 10 tests passed. Complete all tests at <a href="/jt/07-test" className="underline font-medium">/jt/07-test</a> to mark project as shipped.
              </p>
            </div>
          </div>
        )}

        {/* Final Submission Export */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="bg-slate-50 border-b p-4">
            <h2 className="text-lg font-serif font-bold text-slate-900">Final Submission</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">
              Copy the formatted submission text to share your completed project.
            </p>
            <Button 
              onClick={handleCopySubmission}
              disabled={!allLinksProvided}
              className="gap-2 w-full md:w-auto"
            >
              <Copy className="w-4 h-4" />
              Copy Final Submission
            </Button>
            {!allLinksProvided && (
              <p className="text-xs text-slate-500 mt-2">
                All three links must be provided to copy submission.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proof;