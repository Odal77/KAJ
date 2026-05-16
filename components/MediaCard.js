'use client';
import { useEffect, useRef } from 'react';
import styles from './MediaCard.module.css';

export default function MediaCard({ item, onDelete, onUpdateRating, onPlay }) {
  const ratingRef = useRef(null);

  useEffect(() => {
    const el = ratingRef.current;
    if (el) {
      const handleRatingChange = (e) => {
        onUpdateRating(item.id, e.detail.rating);
      };
      el.addEventListener('rating-change', handleRatingChange);
      return () => el.removeEventListener('rating-change', handleRatingChange);
    }
  }, [item.id, onUpdateRating]);

  const renderDetail = () => {
    if (item.author) return <p><strong>Author:</strong> {item.author}</p>;
    if (item.director) return <p><strong>Director:</strong> {item.director}</p>;
    if (item.developer) return <p><strong>Developer:</strong> {item.developer}</p>;
    return null;
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Delete this item?')) {
      onDelete(item.id);
    }
  };

  const handleClick = () => {
    if (item.type === 'movie' && onPlay) {
      onPlay(item);
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img src={item.cover || 'https://via.placeholder.com/260x380/1b1b1b/ff9000?text=No+Cover'} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
        <div className={styles.cardBack}>
          <div>
            <p><strong>Type:</strong> {item.type.toUpperCase()}</p>
            {renderDetail()}
            <p><strong>Added:</strong> {new Date(item.dateAdded).toLocaleDateString()}</p>
            <rating-stars ref={ratingRef} rating={item.rating || 0}></rating-stars> 
          </div>
          <button className={styles.deleteBtn} onClick={handleDelete}>DELETE</button>
        </div>
      </div>
    </div>
  );
}
