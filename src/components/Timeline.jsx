import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { timelineMemories } from '../data/memories';

function ImageWithFallback({ src, alt, className, style }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className="timeline-card-image-placeholder">
        <span className="placeholder-icon">📸</span>
        <span className="placeholder-text">Add photo: {src}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function TimelineCard({ memory, index }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60, y: 20 },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // Floating decorations per card
  const decorations = ['✨', '🌸', '⭐', '👑', '💖', '🦋', '🌟', '💫', '🌺', '💕'];
  const decor = decorations[index % decorations.length];

  return (
    <div className="timeline-item" ref={ref}>
      {/* Node on path */}
      <div className="timeline-node" />

      {/* Floating decoration */}
      <div
        className="timeline-decoration"
        style={{
          position: 'absolute',
          [isLeft ? 'right' : 'left']: 'calc(50% - 60px)',
          top: '10px',
          fontSize: '1.2rem',
          zIndex: 3,
        }}
      >
        {decor}
      </div>

      <motion.div
        className="timeline-card"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Sparkle overlay on hover */}
        <div className="timeline-sparkle">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="sparkle-dot"
              style={{
                left: `${15 + i * 18}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Photo */}
        <div className="timeline-card-image-wrapper">
          <ImageWithFallback
            src={memory.image}
            alt={memory.title}
            className="timeline-card-image"
            style={{ objectPosition: memory.imagePosition || 'center' }}
          />
        </div>

        {/* Content */}
        <div className="timeline-card-content">
          {memory.age && <span className="timeline-card-age">{memory.age}</span>}
          <h3 className="timeline-card-title">{memory.title}</h3>
          <p className="timeline-card-caption">{memory.caption}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  return (
    <section className="timeline-section" id="journey">
      {/* Section Header */}
      <motion.div
        className="section-container"
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <p className="section-subtitle">✨ A Magical Story ✨</p>
          <h2 className="section-title">Her Life Journey</h2>
          <div className="section-divider">
            <div className="line" />
            <span className="icon">👑</span>
            <div className="line" />
          </div>
          <p style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: '1.15rem',
            color: 'var(--dark-rose)',
            opacity: 0.7,
            marginTop: '16px',
            maxWidth: '500px',
            margin: '16px auto 0',
            lineHeight: 1.7,
          }}>
            Every chapter of your life is more beautiful than the last…
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="timeline">
        {/* Winding path line */}
        <div className="timeline-path" />

        {timelineMemories.map((memory, index) => (
          <TimelineCard key={memory.id} memory={memory} index={index} />
        ))}
      </div>
    </section>
  );
}
