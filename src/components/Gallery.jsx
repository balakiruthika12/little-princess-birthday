import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryPhotos, galleryCategories } from '../data/memories';
import { useInView } from '../hooks/useInView';

// Rotations for polaroid tilt
const TILTS = [-3, 2, -1.5, 3, -2, 1, -2.5, 2.5, -1, 3];

function GalleryImage({ photo, onClick, index }) {
  const [failed, setFailed] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const tilt = TILTS[index % TILTS.length];
  const isPolaroid = photo.style === 'polaroid';

  return (
    <motion.div
      ref={ref}
      className={`gallery-item ${isPolaroid ? 'polaroid' : 'rounded'}`}
      style={{ '--rotate': `${tilt}deg` }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      onClick={() => onClick(photo)}
    >
      <div className="gallery-image-wrapper">
        {failed || !photo.image ? (
          <div className="gallery-placeholder">
            <span style={{ fontSize: '2rem' }}>📸</span>
            <span style={{ fontSize: '0.7rem', textAlign: 'center', padding: '0 8px' }}>
              Add photo:<br />{photo.image}
            </span>
          </div>
        ) : (
          <img
            src={photo.image}
            alt={photo.caption || 'Memory'}
            className="gallery-image"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
        {!isPolaroid && (
          <div className="gallery-caption">{photo.caption}</div>
        )}
      </div>
      {isPolaroid && photo.caption && (
        <div className="gallery-caption">{photo.caption}</div>
      )}
    </motion.div>
  );
}

function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [failed, setFailed] = useState(false);

  const photo = photos[current];

  const prev = useCallback(() => {
    setFailed(false);
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setFailed(false);
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-content"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {failed || !photo.image ? (
              <div className="lightbox-placeholder">
                <span style={{ fontSize: '3rem' }}>📸</span>
                <span>Photo: {photo.image}</span>
              </div>
            ) : (
              <img
                src={photo.image}
                alt={photo.caption || 'Memory'}
                className="lightbox-image"
                onError={() => setFailed(true)}
              />
            )}
            {photo.caption && (
              <p className="lightbox-caption">✨ {photo.caption} ✨</p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
        <X size={22} />
      </button>
      {photos.length > 1 && (
        <>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo">
            <ChevronLeft size={22} />
          </button>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo">
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  const filtered = activeCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeCategory);

  const openLightbox = (photo) => {
    const idx = filtered.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx);
  };

  return (
    <>
      <section className="gallery-section" id="memories">
        <div className="section-container">
          <motion.div
            className="section-header"
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subtitle">📷 Precious Moments 📷</p>
            <h2 className="section-title">Our Precious Memories</h2>
            <div className="section-divider">
              <div className="line" />
              <span className="icon">🌸</span>
              <div className="line" />
            </div>
            <p style={{
              fontFamily: 'var(--font-handwritten)',
              fontSize: '1.1rem',
              color: 'var(--dark-rose)',
              opacity: 0.7,
              marginTop: '16px',
            }}>
              Every photograph holds a thousand words of love…
            </p>
          </motion.div>

          {/* Filters */}
          <div className="gallery-filters">
            {galleryCategories.map((cat) => (
              <button
                key={cat.key}
                className={`gallery-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="gallery-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((photo, index) => (
              <GalleryImage
                key={photo.id}
                photo={photo}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filtered}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
