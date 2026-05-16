'use client';
import { useRef, useState } from 'react';
import styles from './VideoModal.module.css';

export default function VideoModal({ movie, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Custom Play/Pause using Media API as required in cw
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h3>Trailer: {movie.title}</h3>
        
        <video 
          ref={videoRef}
          className={styles.videoPlayer}
          src="https://www.w3schools.com/html/mov_bbb.mp4" 
        />

        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => skip(-10)}>-10s</button>
          <button className={styles.controlBtn} onClick={togglePlay}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          <button className={styles.controlBtn} onClick={() => skip(10)}>+10s</button>
        </div>

        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
