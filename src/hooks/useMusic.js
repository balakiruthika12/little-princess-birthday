import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Reuses one audio element for the lifetime of the app and starts playback only
 * in response to an explicit user action.
 */
export function useMusic(musicSrc) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!musicSrc) {
      setError('Background music is not configured.');
      return undefined;
    }

    const audio = document.querySelector('audio') || document.createElement('audio');
    audio.dataset.backgroundMusic = 'true';
    audio.hidden = true;
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    if (!audio.isConnected) document.body.appendChild(audio);

    const handleCanPlay = () => {
      setIsLoaded(true);
      setError('');
    };
    const handleError = () => {
      setIsLoaded(false);
      setIsPlaying(false);
      setError('Background music could not be loaded. Please try again later.');
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(audio.muted);

    audioRef.current = audio;
    setIsPlaying(!audio.paused);
    setIsMuted(audio.muted);
    setIsLoaded(audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA);
    setError('');

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('volumechange', handleVolumeChange);
    if (audio.getAttribute('src') !== musicSrc) {
      audio.src = musicSrc;
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.pause();
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, [musicSrc]);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      setError('Background music is not available.');
      return false;
    }

    try {
      await audio.play();
      setError('');
      return true;
    } catch {
      setIsPlaying(false);
      setError('Background music could not be played. Please try again.');
      return false;
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setError('Background music is not available.');
      return;
    }

    if (audio.paused) {
      void startMusic();
    } else {
      audio.pause();
    }
  }, [startMusic]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setError('Background music is not available.');
      return;
    }

    audio.muted = !audio.muted;
  }, []);

  return { isPlaying, isMuted, isLoaded, error, startMusic, togglePlay, toggleMute };
}
