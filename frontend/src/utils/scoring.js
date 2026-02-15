export const calculateMatchScore = (job, preferences) => {
    if (!preferences) return 0;
    
    let score = 0;
    
    const {
        roleKeywords,
        preferredLocations,
        preferredMode,
        experienceLevel,
        skills,
    } = preferences;
    
    // 1. Role Keyword in Title (+25)
    if (roleKeywords && roleKeywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const keywords = roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
        if (keywords.some(k => titleLower.includes(k))) {
            score += 25;
        }
    }
    
    // 2. Role Keyword in Description (+15)
    if (roleKeywords && roleKeywords.length > 0) {
         const descLower = job.description.toLowerCase();
         const keywords = roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
         // Check if ANY keyword is in description (distinct from title check, but using same keywords)
         if (keywords.some(k => descLower.includes(k))) {
             score += 15;
         }
    }
    
    // 3. Location Match (+15)
    if (preferredLocations && preferredLocations !== 'All') {
        // preferredLocations might be a string (from select) or array (if multi-select implemented, but current plan implies strings/simple)
        // Adjusting for simpler string matching as per current Dashboard filter logic, but Settings might allow multiple. 
        // Let's assume input is comma-sep string for now or array. 
        // Re-reading specs: "preferredLocations (multi-select dropdown)". 
        // Let's assume it stores an array of strings.
        
        const locs = Array.isArray(preferredLocations) ? preferredLocations : [preferredLocations];
        if (locs.some(loc => job.location.includes(loc))) {
            score += 15;
        }
    }
    
    // 4. Mode Match (+10)
    if (preferredMode && preferredMode.length > 0) {
         // preferredMode is checkboxes -> array of strings ["Remote", "Hybrid"]
         if (preferredMode.includes(job.mode)) {
             score += 10;
         }
    }
    
    // 5. Experience Match (+10)
    // Precise string match for now.
    if (experienceLevel && experienceLevel !== 'All' && job.experience === experienceLevel) {
        score += 10;
    }
    
    // 6. Skill Overlap (+15)
    if (skills && skills.length > 0) {
        const userSkills = skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
        const jobSkills = job.skills.map(s => s.toLowerCase());
        
        if (userSkills.some(us => jobSkills.includes(us))) {
            score += 15;
        }
    }
    
    // 7. Recency (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }
    
    // 8. Source (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }
    
    return Math.min(score, 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-200";
    if (score >= 40) return "bg-slate-100 text-slate-800 border-slate-200";
    return "bg-gray-50 text-gray-500 border-gray-100 opacity-70";
};
