import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, Rocket, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Ship = () => {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const checklist = JSON.parse(localStorage.getItem('jobTrackerTestChecklist') || '{}');
    const checkedCount = Object.values(checklist).filter(Boolean).length;
    setIsUnlocked(checkedCount === 10);
  }, []);

  if (!isUnlocked) {
    return (
      <div className="kodnest-container bg-slate-100 min-h-screen">
        <div className="kodnest-workspace" style={{ maxWidth: '600px', margin: '0 auto', padding: '120px 40px', flexDirection: 'column' }}>
          <div className="bg-white rounded-xl shadow-lg border border-border p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
              <Lock className="w-10 h-10 text-slate-400" />
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">
              Ship Page Locked
            </h1>
            
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Complete all 10 tests on the Test Checklist page before you can access the Ship page.
            </p>

            <Button 
              onClick={() => navigate('/jt/07-test')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Test Checklist
            </Button>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                This ensures all features are verified before deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kodnest-container bg-gradient-to-br from-emerald-50 to-blue-50 min-h-screen">
      <div className="kodnest-workspace" style={{ maxWidth: '700px', margin: '0 auto', padding: '120px 40px', flexDirection: 'column' }}>
        <div className="bg-white rounded-xl shadow-xl border-2 border-emerald-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 mb-6">
            <Rocket className="w-12 h-12 text-emerald-600" />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h1 className="text-4xl font-serif font-bold text-slate-900">
              Ready to Ship!
            </h1>
          </div>
          
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            All tests have passed. Your Job Notification Tracker is ready for deployment.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Deployment Instructions</h2>
            <ol className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold">1.</span>
                <span>Commit all changes: <code className="bg-white px-2 py-0.5 rounded text-xs">git add . && git commit -m "Ready to ship"</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold">2.</span>
                <span>Push to main: <code className="bg-white px-2 py-0.5 rounded text-xs">git push origin main</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold">3.</span>
                <span>Deploy to Vercel or your preferred hosting platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold">4.</span>
                <span>Verify production deployment works as expected</span>
              </li>
            </ol>
          </div>

          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline"
              onClick={() => navigate('/jt/07-test')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tests
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              Go to Dashboard
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              🎉 Congratulations on building a premium job tracking application!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship;
