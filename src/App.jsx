import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Countdown from './components/Countdown';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import FallingPetals from './components/FallingPetals';
import { useMusic } from './hooks/useMusic';
import { musicFile } from './data/memories';
import './index.css';

export default function App() {
  const { isPlaying, isMuted, error, startMusic, togglePlay, toggleMute } = useMusic(musicFile);

  const handleEnter = () => {
    startMusic();
    window.setTimeout(() => {
      const el = document.getElementById('journey');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      {/* Ambient falling petals (subtle, always visible) */}
      <FallingPetals count={10} />

      {/* Navbar */}
      <Navbar />

      {/* Main Page */}
      <main>
        {/* 1. Hero */}
        <Hero onEnter={handleEnter} />

        {/* 2. Her Life Journey — Fairytale Timeline */}
        <Timeline />

        {/* 3. Photo Gallery — Our Precious Memories */}
        <Gallery />

        {/* 4. Birthday Countdown & Celebration */}
        <Countdown />

        {/* 5. Birthday Letter */}
        <Letter />

        {/* 6. Footer */}
        <Footer />
      </main>

      {/* Floating Music Player */}
      <MusicPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        error={error}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
      />
    </>
  );
}
