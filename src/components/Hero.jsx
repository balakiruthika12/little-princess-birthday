import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { princessName, birthdayDate } from '../data/memories';

/**
 * Hero Section — The Magical Beginning
 * Full-screen immersive opening with castle, butterflies, clouds, and stars.
 */
export default function Hero({ onEnter }) {
  // Generate stars
  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    })), []);

  // Generate butterflies
  const butterflies = useMemo(() =>
    ['🦋', '🦋', '🦋', '🦋', '🦋'].map((emoji, i) => ({
      id: i,
      emoji,
      left: `${15 + Math.random() * 70}%`,
      top: `${10 + Math.random() * 60}%`,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 5,
    })), []);

  // Floating hearts
  const hearts = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 10,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 6,
    })), []);

  const handleEnter = () => {
    if (onEnter) onEnter();
  };

  // Format birthday date display
  const formattedDate = (() => {
    const d = new Date(birthdayDate + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  })();

  return (
    <section className="hero" id="home">
      {/* Background Elements */}
      <div className="hero-bg-elements">
        {/* Clouds */}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />

        {/* Stars */}
        <div className="stars-container">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                '--duration': `${star.duration}s`,
                '--delay': `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Butterflies */}
        {butterflies.map((b) => (
          <div
            key={b.id}
            className="butterfly"
            style={{
              left: b.left,
              top: b.top,
              '--duration': `${b.duration}s`,
              '--delay': `${b.delay}s`,
            }}
          >
            {b.emoji}
          </div>
        ))}

        {/* Floating hearts */}
        <div className="floating-hearts">
          {hearts.map((h) => (
            <div
              key={h.id}
              className="floating-heart"
              style={{
                left: h.left,
                fontSize: `${h.size}px`,
                '--duration': `${h.duration}s`,
                '--delay': `${h.delay}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Castle illustration */}
        <motion.div
          className="hero-castle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg className="castle-svg" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Castle base */}
            <rect x="50" y="100" width="100" height="100" rx="4" fill="#F8BBD0" opacity="0.8"/>
            {/* Castle door */}
            <rect x="82" y="150" width="36" height="50" rx="18" fill="#E879A9" opacity="0.6"/>
            {/* Windows */}
            <circle cx="75" cy="130" r="8" fill="#FCE4EC"/>
            <circle cx="125" cy="130" r="8" fill="#FCE4EC"/>
            {/* Left tower */}
            <rect x="35" y="60" width="30" height="120" rx="3" fill="#F8BBD0" opacity="0.9"/>
            <polygon points="35,60 50,25 65,60" fill="#E879A9" opacity="0.7"/>
            <circle cx="50" cy="85" r="6" fill="#FCE4EC"/>
            {/* Right tower */}
            <rect x="135" y="60" width="30" height="120" rx="3" fill="#F8BBD0" opacity="0.9"/>
            <polygon points="135,60 150,25 165,60" fill="#E879A9" opacity="0.7"/>
            <circle cx="150" cy="85" r="6" fill="#FCE4EC"/>
            {/* Center tower */}
            <rect x="75" y="50" width="50" height="60" rx="3" fill="#E879A9" opacity="0.5"/>
            <polygon points="75,50 100,15 125,50" fill="#D4608A" opacity="0.6"/>
            {/* Flags */}
            <line x1="50" y1="25" x2="50" y2="10" stroke="#E8C46A" strokeWidth="2"/>
            <polygon points="50,10 62,16 50,22" fill="#E8C46A" opacity="0.8"/>
            <line x1="100" y1="15" x2="100" y2="0" stroke="#E8C46A" strokeWidth="2"/>
            <polygon points="100,0 112,6 100,12" fill="#E8C46A" opacity="0.8"/>
            <line x1="150" y1="25" x2="150" y2="10" stroke="#E8C46A" strokeWidth="2"/>
            <polygon points="150,10 162,16 150,22" fill="#E8C46A" opacity="0.8"/>
            {/* Stars on towers */}
            <text x="47" y="18" fontSize="8">⭐</text>
            <text x="97" y="8" fontSize="8">⭐</text>
            <text x="147" y="18" fontSize="8">⭐</text>
            {/* Heart on door */}
            <text x="92" y="170" fontSize="14">💖</text>
          </svg>
        </motion.div>

        <motion.h1
          className="hero-once-upon"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Once Upon a Time…
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          A little princess came into our lives and filled our hearts with endless love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, type: 'spring' }}
        >
          <button className="hero-btn" onClick={handleEnter}>
            Enter Our Fairytale ✨
          </button>
        </motion.div>

        <motion.p
          className="hero-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          {formattedDate} — Her Special Day
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{ marginTop: '20px', position: 'relative', display: 'inline-block' }}
        >
          <span className="hero-crown">👑</span>
          <h2 className="hero-princess-name">{princessName || '[HER NAME]'}</h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
