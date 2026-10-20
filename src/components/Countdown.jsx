import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { princessName, birthdayDate, birthdayMessage } from '../data/memories';
import { useInView } from '../hooks/useInView';

/* ─── Countdown logic (India timezone) ──────────────────── */
function getTimeUntilBirthday() {
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );
  const target = new Date(`${birthdayDate}T00:00:00`);
  // Use India local date for target too
  const targetIST = new Date(
    target.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );

  const diff = targetIST - now;

  if (diff <= 0) return null; // Birthday has arrived!

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

/* ─── Confetti ───────────────────────────────────────────── */
function Confetti({ active }) {
  const pieces = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: ['#E879A9', '#E8C46A', '#EDE7F6', '#F8BBD0', '#FCE4EC', '#fff'][i % 6],
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 3,
      size: 8 + Math.random() * 8,
    })), []);

  if (!active) return null;

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Birthday Cake SVG ──────────────────────────────────── */
function BirthdayCake({ replay }) {
  const [candles, setCandles] = useState([true, true, true]);

  // Blow out candles on click
  const blowCandle = (i) => {
    setCandles((c) => c.map((v, idx) => idx === i ? false : v));
  };

  useEffect(() => {
    if (replay) setCandles([true, true, true]);
  }, [replay]);

  return (
    <div className="birthday-cake" style={{ marginBottom: '20px' }}>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        {/* Plate */}
        <ellipse cx="100" cy="175" rx="85" ry="12" fill="#F8BBD0" opacity="0.5"/>
        {/* Cake bottom layer */}
        <rect x="25" y="120" width="150" height="55" rx="10" fill="#F8BBD0"/>
        <rect x="25" y="120" width="150" height="20" rx="10" fill="#E879A9" opacity="0.6"/>
        {/* Cake top layer */}
        <rect x="45" y="78" width="110" height="48" rx="10" fill="#FCE4EC"/>
        <rect x="45" y="78" width="110" height="16" rx="10" fill="#F8BBD0" opacity="0.7"/>
        {/* Frosting drips */}
        {[55, 80, 105, 130].map((x, i) => (
          <ellipse key={i} cx={x} cy="78" rx="8" ry="5" fill="white" opacity="0.8"/>
        ))}
        {[60, 88, 115, 140].map((x, i) => (
          <rect key={i} x={x-4} y="70" width="8" height="14" rx="4" fill="white" opacity="0.6"/>
        ))}
        {/* Decorations */}
        <text x="70" y="150" fontSize="22">🎀</text>
        <text x="110" y="108" fontSize="16">💖</text>
        <text x="55" y="108" fontSize="14">🌸</text>
        {/* Candles */}
        {[70, 100, 130].map((x, i) => (
          <g key={i} onClick={() => blowCandle(i)} style={{ cursor: 'pointer' }}>
            <rect x={x - 5} y="48" width="10" height="32" rx="5" fill={['#E8C46A', '#E879A9', '#EDE7F6'][i]}/>
            {candles[i] && (
              <>
                <ellipse cx={x} cy="44" rx="6" ry="10" fill="#FFD700" opacity="0.8">
                  <animate attributeName="ry" values="10;12;10;8;10" dur="0.8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;1;0.8;0.6;0.8" dur="0.8s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx={x} cy="42" rx="3" ry="6" fill="#FF6B6B" opacity="0.6">
                  <animate attributeName="ry" values="6;8;6;4;6" dur="0.8s" repeatCount="indefinite"/>
                </ellipse>
              </>
            )}
            {!candles[i] && (
              <text x={x - 8} y="44" fontSize="14">💨</text>
            )}
          </g>
        ))}
      </svg>
      <p style={{
        fontFamily: 'var(--font-handwritten)',
        fontSize: '0.95rem',
        color: 'var(--rose-pink)',
        opacity: 0.7,
        marginTop: '4px',
      }}>
        (Click candles to blow them out! 🎉)
      </p>
    </div>
  );
}

/* ─── Gift Box ───────────────────────────────────────────── */
function GiftBox({ onOpen, opened }) {
  return (
    <div>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="gift"
            className="gift-box"
            onClick={onOpen}
            whileHover={{ scale: 1.1, rotate: [-3, 3, -3, 0] }}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
          >
            <div className="gift-box-icon">🎁</div>
            <p style={{
              fontFamily: 'var(--font-handwritten)',
              color: 'var(--rose-pink)',
              fontSize: '1.1rem',
              marginTop: '8px',
            }}>
              Click to open your gift! ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="gift-message"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎀</div>
            <p>{birthdayMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Countdown/Birthday Component ──────────────────── */
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilBirthday());
  const [giftOpened, setGiftOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  const isBirthday = timeLeft === null;

  useEffect(() => {
    if (isBirthday) {
      setConfetti(true);
      const t = setTimeout(() => setConfetti(false), 6000);
      return () => clearTimeout(t);
    }
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilBirthday());
    }, 1000);
    return () => clearInterval(interval);
  }, [isBirthday]);

  const handleReplay = () => {
    setGiftOpened(false);
    setConfetti(true);
    setReplayKey((k) => k + 1);
    setTimeout(() => setConfetti(false), 6000);
  };

  const units = timeLeft ? [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ] : [];

  return (
    <>
      <Confetti active={confetti} />

      <section className="countdown-section" id="birthday">
        <div className="section-container">
          <motion.div
            className="section-header"
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subtitle">🎂 Special Day 🎂</p>
            <h2 className="section-title">
              {isBirthday ? `Happy Birthday, ${princessName}!` : 'Her Big Day is Coming…'}
            </h2>
            <div className="section-divider">
              <div className="line" />
              <span className="icon">🎀</span>
              <div className="line" />
            </div>
          </motion.div>

          <div className="countdown-wrapper">
            {!isBirthday ? (
              /* ── Countdown Mode ── */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: '1.2rem',
                  color: 'var(--dark-rose)',
                  opacity: 0.75,
                  marginBottom: '8px',
                }}>
                  October 24, 2026 — Counting Down…
                </p>

                <div className="countdown-boxes">
                  {units.map((unit, i) => (
                    <motion.div
                      key={unit.label}
                      className="countdown-box"
                      initial={{ opacity: 0, y: 20 }}
                      animate={headerInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={unit.value}
                          className="countdown-number"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {String(unit.value).padStart(2, '0')}
                        </motion.div>
                      </AnimatePresence>
                      <div className="countdown-label">{unit.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1.1rem',
                    color: 'var(--rose-pink)',
                    opacity: 0.8,
                    marginTop: '10px',
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ✨ Getting ready for something magical… ✨
                </motion.p>
              </motion.div>
            ) : (
              /* ── Birthday Celebration Mode ── */
              <motion.div
                key={replayKey}
                className="celebration-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  style={{ fontSize: '3rem', marginBottom: '10px' }}
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎉👑🎉
                </motion.div>

                <BirthdayCake replay={replayKey} />

                {/* Floating birthday hearts */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '20px 0', flexWrap: 'wrap' }}>
                  {['💖', '💕', '💗', '💝', '💘'].map((h, i) => (
                    <motion.span
                      key={i}
                      style={{ fontSize: '1.8rem' }}
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    >
                      {h}
                    </motion.span>
                  ))}
                </div>

                <GiftBox onOpen={() => setGiftOpened(true)} opened={giftOpened} />

                <motion.button
                  className="replay-btn"
                  onClick={handleReplay}
                  style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={16} /> Replay Celebration ✨
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
