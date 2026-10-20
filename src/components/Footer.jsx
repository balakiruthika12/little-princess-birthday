import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { princessName } from '../data/memories';

export default function Footer() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const hearts = ['💖', '💕', '💗', '💝', '💖'];

  return (
    <footer className="footer-section" ref={ref} id="footer">
      {/* Decorative top sparkles */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px',
        flexWrap: 'wrap',
      }}>
        {['✨', '🌸', '👑', '🌸', '✨'].map((icon, i) => (
          <motion.span
            key={i}
            style={{ fontSize: '1.5rem' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.3 }}
          >
            {icon}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="footer-message"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        Every year, you grow a little bigger,<br />
        but you will always be our little princess. 💗
      </motion.p>

      <motion.div
        className="footer-hearts"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          >
            {h}
          </motion.span>
        ))}
      </motion.div>

      <div className="footer-divider" />

      <motion.p
        className="footer-credit"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Made with 💖 for our little princess, {princessName} &nbsp;·&nbsp; Our Little Princess ©{new Date().getFullYear()}
      </motion.p>
    </footer>
  );
}
