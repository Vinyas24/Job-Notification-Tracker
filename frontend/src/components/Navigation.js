import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/saved', label: 'Saved' },
    { path: '/digest', label: 'Digest' },
    { path: '/settings', label: 'Settings' },
    { path: '/proof', label: 'Proof' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="kodnest-topbar" style={{ position: 'relative' }}>
      <div className="kodnest-project-name">Job Notification Tracker</div>

      {/* Desktop Navigation */}
      <div className="kodnest-nav-desktop" style={{ display: 'none' }}>
        <style>
          {`
            @media (min-width: 768px) {
              .kodnest-nav-desktop {
                display: flex !important;
                gap: 40px;
              }
              .kodnest-nav-mobile-toggle {
                display: none !important;
              }
            }
            .kodnest-nav-link {
              font-size: 14px;
              font-weight: 500;
              color: var(--kodnest-text);
              text-decoration: none;
              padding-bottom: 4px;
              border-bottom: 2px solid transparent;
              transition: border-color 150ms ease-in-out;
            }
            .kodnest-nav-link:hover {
              border-bottom-color: var(--kodnest-accent);
              opacity: 0.7;
            }
            .kodnest-nav-link-active {
              border-bottom-color: var(--kodnest-accent);
            }
            .kodnest-mobile-menu {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background-color: var(--kodnest-card);
              border-bottom: 1px solid var(--kodnest-border);
              padding: 24px 40px;
              display: flex;
              flex-direction: column;
              gap: 24px;
              z-index: 50;
            }
            @media (min-width: 768px) {
              .kodnest-mobile-menu {
                display: none !important;
              }
            }
          `}
        </style>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`kodnest-nav-link ${isActive(item.path) ? 'kodnest-nav-link-active' : ''}`}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="kodnest-nav-mobile-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          color: 'var(--kodnest-text)'
        }}
        data-testid="mobile-menu-toggle"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="kodnest-mobile-menu" data-testid="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`kodnest-nav-link ${isActive(item.path) ? 'kodnest-nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
              data-testid={`nav-mobile-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;