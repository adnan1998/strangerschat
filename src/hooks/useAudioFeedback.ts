import { useCallback, useRef, useEffect } from 'react';

interface AudioFeedbackOptions {
  volume?: number;
  enabled?: boolean;
}

export const useAudioFeedback = (options: AudioFeedbackOptions = {}) => {
  const { volume = 0.5, enabled = true } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitialized = useRef(false);

  // Initialize audio on first user interaction
  const initializeAudio = useCallback(() => {
    if (!isInitialized.current && enabled) {
      try {
        audioRef.current = new Audio();
        audioRef.current.volume = volume;
        audioRef.current.preload = 'auto';
        isInitialized.current = true;
      } catch (error) {
        console.warn('Audio initialization failed:', error);
      }
    }
  }, [volume, enabled]);

  // Play success sound
  const playSuccess = useCallback(async () => {
    if (!enabled || !audioRef.current) {
      initializeAudio();
      if (!audioRef.current) return;
    }

    try {
      // Set the audio source if not already set
      if (!audioRef.current.src || !audioRef.current.src.includes('success.mp3')) {
        audioRef.current.src = '/sounds/success.mp3';
      }

      // Reset the audio to the beginning
      audioRef.current.currentTime = 0;
      
      // Play the audio
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      // Handle autoplay restrictions gracefully
      if (error.name === 'NotAllowedError') {
        console.info('Audio autoplay prevented by browser. User interaction required.');
      } else {
        console.warn('Error playing success sound:', error);
      }
    }
  }, [enabled, initializeAudio]);

  // Play error sound (placeholder for future)
  const playError = useCallback(async () => {
    // For now, we'll use a different tone or the same file
    // You can add error.mp3 later if needed
    console.log('Error sound would play here');
  }, []);

  // Play notification sound for new messages
  const playNotification = useCallback(async () => {
    if (!enabled || !audioRef.current) {
      initializeAudio();
      if (!audioRef.current) return;
    }

    try {
      // Create a new audio instance for notification to avoid conflicts
      const notificationAudio = new Audio('/sounds/chat.mp3');
      notificationAudio.volume = volume * 0.8; // Slightly quieter for notifications
      notificationAudio.currentTime = 0;
      
      const playPromise = notificationAudio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        console.info('Audio autoplay prevented by browser. User interaction required.');
      } else {
        console.warn('Error playing notification sound:', error);
      }
    }
  }, [enabled, volume, initializeAudio]);

  // Initialize on mount and user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      initializeAudio();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add listeners for user interaction to enable audio
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [initializeAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  return {
    playSuccess,
    playError,
    playNotification,
    isAudioSupported: typeof Audio !== 'undefined'
  };
};

export default useAudioFeedback;