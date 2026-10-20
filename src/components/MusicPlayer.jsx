import { motion } from 'framer-motion';
import { Music, Music2, VolumeX, Volume2 } from 'lucide-react';

export default function MusicPlayer({ isPlaying, isMuted, error, onTogglePlay, onToggleMute }) {
  return (
    <div className="music-player" role="group" aria-label="Background music controls">
      <motion.button
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={isPlaying}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title={isPlaying ? 'Pause music' : 'Play background music'}
      >
        {isPlaying ? <Music2 size={20} aria-hidden="true" /> : <Music size={20} aria-hidden="true" />}
      </motion.button>

      <motion.button
        className="music-btn"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        aria-pressed={isMuted}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
      </motion.button>

      {error && (
        <span className="music-error" role="status" aria-live="polite">
          {error}
        </span>
      )}
    </div>
  );
}
