const Settings = () => {
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
          Configure your job matching preferences.
        </p>
      </div>

      <div className="kodnest-workspace" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div className="kodnest-card" style={{ marginBottom: 0 }}>
          <div style={{ marginBottom: '40px' }}>
            <label 
              style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--kodnest-text)'
              }}
              data-testid="label-role-keywords"
            >
              Role Keywords
            </label>
            <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '16px' }}>
              Enter job titles or roles you're interested in
            </p>
            <input
              type="text"
              className="kodnest-input"
              placeholder="e.g., Product Manager, Senior Designer"
              data-testid="input-role-keywords"
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label 
              style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--kodnest-text)'
              }}
              data-testid="label-locations"
            >
              Preferred Locations
            </label>
            <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '16px' }}>
              Cities or regions you want to work in
            </p>
            <input
              type="text"
              className="kodnest-input"
              placeholder="e.g., San Francisco, New York, Remote"
              data-testid="input-locations"
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label 
              style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--kodnest-text)'
              }}
              data-testid="label-mode"
            >
              Work Mode
            </label>
            <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '16px' }}>
              Preferred work arrangement
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" data-testid="checkbox-remote" />
                <span style={{ fontSize: '14px' }}>Remote</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" data-testid="checkbox-hybrid" />
                <span style={{ fontSize: '14px' }}>Hybrid</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" data-testid="checkbox-onsite" />
                <span style={{ fontSize: '14px' }}>Onsite</span>
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label 
              style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--kodnest-text)'
              }}
              data-testid="label-experience"
            >
              Experience Level
            </label>
            <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '16px' }}>
              Your years of professional experience
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="experience" data-testid="radio-entry" />
                <span style={{ fontSize: '14px' }}>Entry (0-2 years)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="experience" data-testid="radio-mid" />
                <span style={{ fontSize: '14px' }}>Mid (3-5 years)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="experience" data-testid="radio-senior" />
                <span style={{ fontSize: '14px' }}>Senior (6+ years)</span>
              </label>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--kodnest-border)', paddingTop: '24px' }}>
            <button
              className="kodnest-btn kodnest-btn-primary"
              data-testid="save-preferences-btn"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;