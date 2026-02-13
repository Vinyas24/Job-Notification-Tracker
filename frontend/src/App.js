import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Dashboard = () => {
  const [checklist, setChecklist] = useState({
    uiBuilt: false,
    logicWorking: false,
    testPassed: false,
    deployed: false
  });

  const toggleCheckbox = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="kodnest-container">
      {/* Top Bar */}
      <div className="kodnest-topbar">
        <div className="kodnest-project-name">KodNest Premium Build System</div>
        <div className="kodnest-progress">Dashboard Overview</div>
        <div className="kodnest-status-badge">Design System</div>
      </div>

      {/* Context Header */}
      <div className="kodnest-context-header">
        <h1 className="kodnest-headline">Design System Components</h1>
        <p className="kodnest-subtext">
          A calm, intentional, and coherent design system for serious B2C products.
        </p>
      </div>

      {/* Workspace */}
      <div className="kodnest-workspace">
        {/* Primary Workspace - 70% */}
        <div className="kodnest-primary">
          {/* Color System */}
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Color System</h3>
            <p className="kodnest-card-description">
              Maximum 4 colors. Clean, muted, professional.
            </p>
            <div className="kodnest-color-grid">
              <div className="kodnest-color-swatch" style={{ backgroundColor: '#F7F6F3' }}>
                <span className="kodnest-color-label">Background</span>
                <span className="kodnest-color-value">#F7F6F3</span>
              </div>
              <div className="kodnest-color-swatch" style={{ backgroundColor: '#111111' }}>
                <span className="kodnest-color-label" style={{ color: '#F7F6F3' }}>Text</span>
                <span className="kodnest-color-value" style={{ color: '#F7F6F3' }}>#111111</span>
              </div>
              <div className="kodnest-color-swatch" style={{ backgroundColor: '#8B0000' }}>
                <span className="kodnest-color-label" style={{ color: '#F7F6F3' }}>Accent</span>
                <span className="kodnest-color-value" style={{ color: '#F7F6F3' }}>#8B0000</span>
              </div>
              <div className="kodnest-color-swatch" style={{ backgroundColor: '#2F5233' }}>
                <span className="kodnest-color-label" style={{ color: '#F7F6F3' }}>Success</span>
                <span className="kodnest-color-value" style={{ color: '#F7F6F3' }}>#2F5233</span>
              </div>
              <div className="kodnest-color-swatch" style={{ backgroundColor: '#8B6914' }}>
                <span className="kodnest-color-label" style={{ color: '#F7F6F3' }}>Warning</span>
                <span className="kodnest-color-value" style={{ color: '#F7F6F3' }}>#8B6914</span>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Typography</h3>
            <p className="kodnest-card-description">
              Clean sans-serif throughout. Inter for all text. 16-18px body, line-height 1.6-1.8.
            </p>
            <div>
              <div className="kodnest-type-sample">
                <div className="kodnest-type-label">Headline (48px, Weight 600)</div>
                <div style={{ fontSize: '48px', fontWeight: 600, lineHeight: 1.2 }}>
                  Design System Components
                </div>
              </div>
              <div className="kodnest-type-sample">
                <div className="kodnest-type-label">Subheading (18px, Weight 400)</div>
                <div style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.6, opacity: 0.6 }}>
                  A calm, intentional, and coherent design system for serious B2C products.
                </div>
              </div>
              <div className="kodnest-type-sample">
                <div className="kodnest-type-label">Body (16px, Weight 400)</div>
                <div style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.6 }}>
                  This is body text. Clean, readable, with generous spacing. Maximum 720px width for text blocks to ensure optimal readability.
                </div>
              </div>
              <div className="kodnest-type-sample" style={{ border: 'none', paddingBottom: 0 }}>
                <div className="kodnest-type-label">Small (14px, Weight 400)</div>
                <div style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.6, opacity: 0.6 }}>
                  Secondary information and labels use smaller text with reduced opacity.
                </div>
              </div>
            </div>
          </div>

          {/* Spacing System */}
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Spacing System</h3>
            <p className="kodnest-card-description">
              Consistent scale: 8px, 16px, 24px, 40px, 64px. No random values.
            </p>
            <div>
              <div className="kodnest-spacing-demo">
                <div className="kodnest-spacing-box" style={{ width: '8px', height: '8px' }}></div>
                <span className="kodnest-spacing-label">8px</span>
              </div>
              <div className="kodnest-spacing-demo">
                <div className="kodnest-spacing-box" style={{ width: '16px', height: '16px' }}></div>
                <span className="kodnest-spacing-label">16px</span>
              </div>
              <div className="kodnest-spacing-demo">
                <div className="kodnest-spacing-box" style={{ width: '24px', height: '24px' }}></div>
                <span className="kodnest-spacing-label">24px</span>
              </div>
              <div className="kodnest-spacing-demo">
                <div className="kodnest-spacing-box" style={{ width: '40px', height: '40px' }}></div>
                <span className="kodnest-spacing-label">40px</span>
              </div>
              <div className="kodnest-spacing-demo">
                <div className="kodnest-spacing-box" style={{ width: '64px', height: '64px' }}></div>
                <span className="kodnest-spacing-label">64px</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Buttons</h3>
            <p className="kodnest-card-description">
              Primary (solid red) and Secondary (outlined). Same hover, same radius.
            </p>
            <div className="kodnest-component-grid" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="kodnest-btn kodnest-btn-primary" data-testid="primary-button">
                Primary Button
              </button>
              <button className="kodnest-btn kodnest-btn-secondary" data-testid="secondary-button">
                Secondary Button
              </button>
              <button className="kodnest-btn kodnest-btn-primary kodnest-btn-small" data-testid="small-button">
                Small Button
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Input Fields</h3>
            <p className="kodnest-card-description">
              Clean borders, no heavy shadows, clear focus state.
            </p>
            <div className="kodnest-component-grid">
              <input 
                type="text" 
                className="kodnest-input" 
                placeholder="Enter your text here"
                data-testid="text-input"
              />
              <input 
                type="email" 
                className="kodnest-input" 
                placeholder="email@example.com"
                data-testid="email-input"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Card Component</h3>
            <p className="kodnest-card-description">
              Subtle border, no drop shadows, balanced padding. Hover reveals intent.
            </p>
            <div className="kodnest-card" style={{ marginBottom: 0 }} data-testid="demo-card">
              <h4 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>Example Card</h4>
              <p style={{ fontSize: '14px', margin: 0, opacity: 0.6 }}>
                This is how cards look in the system. Clean, minimal, with subtle interactions.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Panel - 30% */}
        <div className="kodnest-secondary">
          <div className="kodnest-card">
            <h3 className="kodnest-card-title">System Overview</h3>
            <p className="kodnest-card-description">
              Core principles and implementation notes.
            </p>
            <div style={{ fontSize: '14px', lineHeight: 1.8 }}>
              <p><strong>Philosophy:</strong> Calm, intentional, coherent</p>
              <p><strong>Approach:</strong> Not flashy, not loud, professional</p>
              <p><strong>Restrictions:</strong> No gradients, no glassmorphism, no animation noise</p>
              <p><strong>Transitions:</strong> 150-200ms, ease-in-out</p>
              <p><strong>Border Radius:</strong> 4px everywhere</p>
            </div>
          </div>

          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Layout Structure</h3>
            <p className="kodnest-card-description">
              Every page follows this pattern.
            </p>
            <div className="kodnest-code-block">
              [Top Bar]<br/>
              ↓<br/>
              [Context Header]<br/>
              ↓<br/>
              [Primary (70%) + Secondary (30%)]<br/>
              ↓<br/>
              [Proof Footer]
            </div>
          </div>

          <div className="kodnest-card">
            <h3 className="kodnest-card-title">Action Buttons</h3>
            <p className="kodnest-card-description">
              Quick actions for this step.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="kodnest-btn kodnest-btn-secondary kodnest-btn-small" data-testid="copy-button">
                Copy Prompt
              </button>
              <button className="kodnest-btn kodnest-btn-secondary kodnest-btn-small" data-testid="build-button">
                Build in Lovable
              </button>
              <button className="kodnest-btn kodnest-btn-secondary kodnest-btn-small" data-testid="worked-button">
                It Worked
              </button>
              <button className="kodnest-btn kodnest-btn-secondary kodnest-btn-small" data-testid="error-button">
                Report Error
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Footer */}
      <div className="kodnest-proof-footer">
        <div className="kodnest-proof-inner">
          <div className="kodnest-checkbox-item">
            <input 
              type="checkbox" 
              className="kodnest-checkbox"
              checked={checklist.uiBuilt}
              onChange={() => toggleCheckbox('uiBuilt')}
              data-testid="checkbox-ui"
            />
            <span>UI Built</span>
          </div>
          <div className="kodnest-checkbox-item">
            <input 
              type="checkbox" 
              className="kodnest-checkbox"
              checked={checklist.logicWorking}
              onChange={() => toggleCheckbox('logicWorking')}
              data-testid="checkbox-logic"
            />
            <span>Logic Working</span>
          </div>
          <div className="kodnest-checkbox-item">
            <input 
              type="checkbox" 
              className="kodnest-checkbox"
              checked={checklist.testPassed}
              onChange={() => toggleCheckbox('testPassed')}
              data-testid="checkbox-test"
            />
            <span>Test Passed</span>
          </div>
          <div className="kodnest-checkbox-item">
            <input 
              type="checkbox" 
              className="kodnest-checkbox"
              checked={checklist.deployed}
              onChange={() => toggleCheckbox('deployed')}
              data-testid="checkbox-deployed"
            />
            <span>Deployed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
