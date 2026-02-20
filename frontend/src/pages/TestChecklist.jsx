import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, RotateCcw, Info, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const TestChecklist = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});

  const testItems = [
    {
      id: 'test1',
      label: 'Preferences persist after refresh',
      tooltip: 'Go to Settings, set preferences, refresh page, verify data remains'
    },
    {
      id: 'test2',
      label: 'Match score calculates correctly',
      tooltip: 'Set preferences, check Dashboard job cards show match % badges'
    },
    {
      id: 'test3',
      label: '"Show only matches" toggle works',
      tooltip: 'On Dashboard, toggle "Show only jobs above my threshold" and verify filtering'
    },
    {
      id: 'test4',
      label: 'Save job persists after refresh',
      tooltip: 'Save a job on Dashboard, refresh, check it appears in Saved page'
    },
    {
      id: 'test5',
      label: 'Apply opens in new tab',
      tooltip: 'Click "Apply" button on any job card, verify new tab opens'
    },
    {
      id: 'test6',
      label: 'Status update persists after refresh',
      tooltip: 'Change job status to "Applied", refresh page, verify status remains'
    },
    {
      id: 'test7',
      label: 'Status filter works correctly',
      tooltip: 'On Dashboard, use Status filter dropdown to filter by Applied/Rejected/etc'
    },
    {
      id: 'test8',
      label: 'Digest generates top 10 by score',
      tooltip: 'Go to Digest, click Generate, verify 10 jobs sorted by match score'
    },
    {
      id: 'test9',
      label: 'Digest persists for the day',
      tooltip: 'Generate digest, refresh page, verify same digest shows without regenerating'
    },
    {
      id: 'test10',
      label: 'No console errors on main pages',
      tooltip: 'Open DevTools Console, visit Dashboard/Saved/Digest/Settings, check for errors'
    }
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('jobTrackerTestChecklist') || '{}');
    setCheckedItems(saved);
  }, []);

  const handleToggle = (id) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    localStorage.setItem('jobTrackerTestChecklist', JSON.stringify(updated));
  };

  const handleReset = () => {
    setCheckedItems({});
    localStorage.removeItem('jobTrackerTestChecklist');
    toast.success('Test status reset');
  };

  const passedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = testItems.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="kodnest-container bg-slate-100 min-h-screen">
      <div className="kodnest-context-header">
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif' }}
        >
          Test Checklist
        </h1>
        <p className="kodnest-subtext">
          Verify all features before shipping.
        </p>
      </div>

      <div className="kodnest-workspace" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px 64px', flexDirection: 'column' }}>
        
        {/* Progress Summary */}
        <div className={`p-6 rounded-xl border-2 mb-8 ${allPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-border'}`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Tests Passed: {passedCount} / {totalCount}
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Test Status
            </Button>
          </div>
          
          {!allPassed && (
            <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Resolve all issues before shipping.</p>
                <p className="text-xs text-amber-700 mt-1">Complete all {totalCount} tests to unlock the Ship page.</p>
              </div>
            </div>
          )}

          {allPassed && (
            <div className="flex items-start gap-2 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-900">All tests passed! Ready to ship.</p>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate('/jt/08-ship')}
                >
                  Go to Ship Page →
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Checklist Items */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="divide-y">
            {testItems.map((item, index) => (
              <div 
                key={item.id}
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleToggle(item.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {checkedItems[item.id] ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">#{index + 1}</span>
                      <h3 className={`text-base font-medium ${checkedItems[item.id] ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {item.label}
                      </h3>
                    </div>
                    
                    {item.tooltip && (
                      <div className="flex items-start gap-1.5 mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
                        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{item.tooltip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Click any item to toggle its status. All test states persist in localStorage.</p>
        </div>
      </div>
    </div>
  );
};

export default TestChecklist;
