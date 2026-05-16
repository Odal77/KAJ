'use client';
import { useEffect, useState } from 'react';
import MediaCard from '../components/MediaCard';
import AddMediaForm from '../components/AddMediaForm';
import StatsChart from '../components/StatsChart';
import VideoModal from '../components/VideoModal';

export default function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const loadItems = () => {
    if (window.MediaHub && window.MediaHub.Core.Library) {
      // Need to spread to trigger re-render
      setItems([...window.MediaHub.Core.Library.load()]);
    }
  };

  const deleteItem = (id) => {
    if (window.MediaHub && window.MediaHub.Core.Library) {
      window.MediaHub.Core.Library.deleteItem(id);
      loadItems();
    }
  };

  const updateRating = (id, newRating) => {
    if (window.MediaHub && window.MediaHub.Core.Library) {
      window.MediaHub.Core.Library.updateRating(id, newRating);
      loadItems();
    }
  };

  useEffect(() => {
    // wait a bit for scripts or just load
    loadItems();
    
    const handleInit = () => loadItems();
    window.addEventListener('load', handleInit);
    return () => window.removeEventListener('load', handleInit);
  }, []);

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section>
      <header>
        <h2 style={{ marginBottom: '1.5rem' }}>MediaHub Premium Library</h2>
        
        <AddMediaForm onAdd={loadItems} />
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          margin: '2rem 0',
          flexWrap: 'wrap' 
        }}>
          <input 
            type="text" 
            placeholder="Search items..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ff9000',
              background: '#000',
              color: '#fff',
              width: '300px'
            }}
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ff9000',
              background: '#000',
              color: '#fff'
            }}
          >
            <option value="all">All Types</option>
            <option value="book">Books</option>
            <option value="movie">Movies</option>
            <option value="game">Games</option>
          </select>
        </div>

        <StatsChart items={items} />
      </header>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}>
        {filteredItems.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>
            {items.length === 0 ? 'Your library is empty. Start your collection now!' : 'No items match your search/filter.'}
          </p>
        ) : (
          filteredItems.map(item => (
            <MediaCard 
              key={item.id} 
              item={item} 
              onDelete={deleteItem} 
              onUpdateRating={updateRating}
              onPlay={(movie) => setSelectedMovie(movie)}
            />
          ))
        )}
      </div>

      {selectedMovie && (
        <VideoModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </section>
  );
}
