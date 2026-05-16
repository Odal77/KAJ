'use client';
import { useState } from 'react';
import styles from './AddMediaForm.module.css';

export default function AddMediaForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('book');
  const [extra, setExtra] = useState(''); // Author/Director/Developer
  const [cover, setCover] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image to resize it via Canvas
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setCover(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!window.MediaHub) return;

    const { Core } = window.MediaHub;
    let newItem;

    switch(type) {
      case 'book':
        newItem = new Core.Book(null, title, extra, cover);
        break;
      case 'movie':
        newItem = new Core.Movie(null, title, extra, cover);
        break;
      case 'game':
        newItem = new Core.Game(null, title, extra, cover);
        break;
      default:
        newItem = new Core.MediaItem(null, title, type, cover);
    }

    Core.Library.addItem(newItem);
    onAdd(); // Trigger refresh in parent
    
    // Reset form
    setTitle('');
    setExtra('');
    setCover(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add New Media</h3>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required 
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="book">Book</option>
        <option value="movie">Movie</option>
        <option value="game">Game</option>
      </select>
      <input 
        type="text" 
        placeholder={type === 'book' ? 'Author' : type === 'movie' ? 'Director' : 'Developer'} 
        value={extra} 
        onChange={e => setExtra(e.target.value)} 
        required 
      />
      <label>Cover Image:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Save to Library</button>
    </form>
  );
}
