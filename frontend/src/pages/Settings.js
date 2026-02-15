import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const Settings = () => {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        preferredLocations: [], // Array for multi-select simulation (using text for now or simple dropdown) -> Requirement says "multi-select dropdown". I'll use a simple multi-choice strategy or just a few hardcoded typical ones for now to keep UI simple but functional.
        preferredMode: [],
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            setPreferences(JSON.parse(saved));
        }
    }, []);

    const handleChange = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handleModeChange = (mode) => {
        setPreferences(prev => {
            const current = prev.preferredMode || [];
            if (current.includes(mode)) {
                return { ...prev, preferredMode: current.filter(m => m !== mode) };
            } else {
                return { ...prev, preferredMode: [...current, mode] };
            }
        });
    };
    
    const handleLocationChange = (loc) => {
         // Simple toggle for locations to simulate multi-select
        setPreferences(prev => {
            const current = Array.isArray(prev.preferredLocations) ? prev.preferredLocations : [];
            if (current.includes(loc)) {
                return { ...prev, preferredLocations: current.filter(l => l !== loc) };
            } else {
                return { ...prev, preferredLocations: [...current, loc] };
            }
        });
    }

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
        toast.success("Preferences saved successfully!");
        setTimeout(() => setIsSaving(false), 2000);
    };

  return (
    <div className="kodnest-container">
      <div className="kodnest-context-header">
        <h1 
          className="kodnest-headline" 
          style={{ fontFamily: 'Crimson Text, serif' }}
          data-testid="page-heading"
        >
          Preferences
        </h1>
        <p className="kodnest-subtext" data-testid="page-subtext">
          Customize your job matching criteria.
        </p>
      </div>

      <div className="kodnest-workspace" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px 64px', flexDirection: 'column' }}>
        <div className="space-y-8 bg-card p-8 rounded-lg border border-border/50 shadow-sm">
            
            <div className="space-y-3">
                <Label htmlFor="roleKeywords">Role Keywords (comma-separated)</Label>
                <Input 
                    id="roleKeywords" 
                    placeholder="e.g. Frontend, React, Developer" 
                    value={preferences.roleKeywords}
                    onChange={(e) => handleChange('roleKeywords', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Used to match job titles and descriptions.</p>
            </div>

            {/* Preferred Locations */}
            <div className="space-y-3">
                <Label>Preferred Locations</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi', 'Gurgaon', 'Noida', 'Chennai', 'Remote'].map(loc => (
                         <div key={loc} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`loc-${loc}`} 
                                checked={(preferences.preferredLocations || []).includes(loc)}
                                onCheckedChange={() => handleLocationChange(loc)}
                            />
                            <label
                                htmlFor={`loc-${loc}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {loc}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

             {/* Preferred Mode */}
            <div className="space-y-3">
                <Label>Preferred Mode</Label>
                <div className="flex gap-6">
                    {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                        <div key={mode} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`mode-${mode}`} 
                                checked={(preferences.preferredMode || []).includes(mode)}
                                onCheckedChange={() => handleModeChange(mode)}
                            />
                            <label
                                htmlFor={`mode-${mode}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {mode}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Level */}
             <div className="space-y-3">
                <Label>Experience Level</Label>
                <Select 
                    value={preferences.experienceLevel} 
                    onValueChange={(val) => handleChange('experienceLevel', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Experience" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Fresher">Fresher/0-1</SelectItem>
                        <SelectItem value="1-3">1-3 Years</SelectItem>
                        <SelectItem value="3-5">3-5 Years</SelectItem>
                    </SelectContent>
                </Select>
            </div>

             {/* Skills */}
            <div className="space-y-3">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input 
                    id="skills" 
                    placeholder="e.g. Java, Python, React, SQL" 
                    value={preferences.skills}
                    onChange={(e) => handleChange('skills', e.target.value)}
                />
            </div>

            {/* Min Match Score */}
             <div className="space-y-4">
                <div className="flex justify-between">
                    <Label>Minimum Match Score</Label>
                    <span className="text-sm font-medium text-muted-foreground">{preferences.minMatchScore}%</span>
                </div>
                <Slider 
                    defaultValue={[40]} 
                    value={[preferences.minMatchScore]}
                    max={100} 
                    step={1} 
                    onValueChange={(vals) => handleChange('minMatchScore', vals[0])}
                />
                <p className="text-xs text-muted-foreground">Jobs below this score will be hidden when "Show Only Matches" is enabled.</p>
            </div>

            <Button onClick={handleSave} className="w-full md:w-auto" disabled={isSaving}>
                {isSaving ? "Preferences Saved!" : "Save Preferences"}
            </Button>

        </div>
      </div>
    </div>
  );
};

export default Settings;