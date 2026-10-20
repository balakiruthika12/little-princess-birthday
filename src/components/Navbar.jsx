import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart, Menu, X } from 'lucide-react';
import { princessName } from '../data/memories';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = ['home', 'journey', 'memories', 'birthday', 'letter'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'journey', label: 'Her Journey' },
    { id: 'memories', label: 'Memories' },
    { id: 'birthday', label: 'Birthday' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="navbar-inner">
          <div className="navbar-logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
            <Crown className="crown-icon" size={20} />
            <span>{princessName || 'Our Princess'}</span>
          </div>

          <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
            {mobileOpen && (
              <button className="mobile-close-btn" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            )}
            {links.map((link) => (
              <li key={link.id}>
                <a
                  onClick={() => scrollTo(link.id)}
                  className={activeSection === link.id ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Heart className="nav-heart" size={18} fill="currentColor" />
            </li>
          </ul>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}
