import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { princessName, birthdayLetter } from '../data/memories';
import { useInView } from '../hooks/useInView';

export default function Letter() {
  const [opened, setOpened] = useState(false);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  return (
    <section className="letter-section" id="letter">
      <div className="section-container">
        <motion.div
          className="section-header"
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle">💌 Written With Love 💌</p>
          <h2 className="section-title">A Little Letter for Our Princess</h2>
          <div className="section-divider">
            <div className="line" />
            <span className="icon">💌</span>
            <div className="line" />
          </div>
        </motion.div>

        <div className="letter-wrapper">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, rotate: -5 }}
                transition={{ duration: 0.5, type: 'spring' }}
                style={{ textAlign: 'center' }}
              >
                {/* Envelope */}
                <motion.div
                  className={`envelope ${opened ? 'opened' : ''}`}
                  onClick={() => setOpened(true)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="envelope-body">
                    {/* Flap */}
                    <div className="envelope-flap" />
                    {/* Wax seal */}
                    <div className="envelope-seal">👑</div>
                  </div>
                </motion.div>

                <p className="envelope-hint">
                  ✨ Click the envelope to open your letter ✨
                </p>

                {/* Floating hearts around envelope */}
                {['💕', '🌸', '💖', '⭐'].map((icon, i) => (
                  <motion.span
                    key={i}
                    style={{
                      position: 'absolute',
                      fontSize: '1.2rem',
                      left: `${20 + i * 18}%`,
                      top: `${30 + (i % 2) * 20}%`,
                      opacity: 0.4,
                    }}
                    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Letter header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <motion.div
                    style={{ fontSize: '2.5rem' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -5, 0] }}
                    transition={{ duration: 0.6, type: 'spring' }}
                  >
                    💌
                  </motion.div>
                </div>

                <div className="letter-content">
                  {/* Decorative corner */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '1.2rem',
                    opacity: 0.4,
                  }}>👑</div>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    fontSize: '1.2rem',
                    opacity: 0.4,
                  }}>🌸</div>

                  <motion.p
                    className="letter-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    {birthdayLetter}
                  </motion.p>
                </div>

                {/* Close / re-seal button */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <motion.button
                    onClick={() => setOpened(false)}
                    style={{
                      padding: '10px 28px',
                      background: 'var(--gradient-pink)',
                      border: '1px solid rgba(248,187,208,0.5)',
                      borderRadius: '30px',
                      fontFamily: 'var(--font-script)',
                      fontSize: '1.1rem',
                      color: 'var(--dark-rose)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-soft)',
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    🌸 Seal the Letter
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
