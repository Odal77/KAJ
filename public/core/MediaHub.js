(function() {
  window.MediaHub = window.MediaHub || {};
  window.MediaHub.Core = window.MediaHub.Core || {};

  function MediaItem(id, title, type, cover = null, rating = 0) {
    this.id = id || Date.now();
    this.title = title;
    this.type = type;
    this.cover = cover;
    this.rating = rating;
    this.dateAdded = new Date();
  }

  MediaItem.prototype.getInfo = function() {
    return this.title + " (" + this.type + ")";
  };

  window.MediaHub.Core.MediaItem = MediaItem;

  function Book(id, title, author, cover, rating) {
    window.MediaHub.Core.MediaItem.call(this, id, title, 'book', cover, rating);
    this.author = author;
  }
  Object.setPrototypeOf(Book.prototype, window.MediaHub.Core.MediaItem.prototype);

  function Movie(id, title, director, cover, rating) {
    window.MediaHub.Core.MediaItem.call(this, id, title, 'movie', cover, rating);
    this.director = director;
  }
  Object.setPrototypeOf(Movie.prototype, window.MediaHub.Core.MediaItem.prototype);

  function Game(id, title, developer, cover, rating) {
    window.MediaHub.Core.MediaItem.call(this, id, title, 'game', cover, rating);
    this.developer = developer;
  }
  Object.setPrototypeOf(Game.prototype, window.MediaHub.Core.MediaItem.prototype);

  window.MediaHub.Core.Book = Book;
  window.MediaHub.Core.Movie = Movie;
  window.MediaHub.Core.Game = Game;

  window.MediaHub.Core.Library = {
    items: [],
    load: function() {
      const data = localStorage.getItem('mediahub_data');
      if (data) {
        const parsed = JSON.parse(data);
        this.items = parsed.map(item => {
          if (item.type === 'book') return new Book(item.id, item.title, item.author, item.cover, item.rating || 0);
          if (item.type === 'movie') return new Movie(item.id, item.title, item.director, item.cover, item.rating || 0);
          if (item.type === 'game') return new Game(item.id, item.title, item.developer, item.cover, item.rating || 0);
          return new MediaItem(item.id, item.title, item.type, item.cover, item.rating || 0);
        });
      }
      return this.items;
    },
    updateRating: function(id, newRating) {
      const item = this.items.find(i => i.id === id);
      if (item) {
        item.rating = newRating;
        this.save();
      }
    },
    save: function() {
      try {
        localStorage.setItem('mediahub_data', JSON.stringify(this.items));
      } catch (e) {
        // TODO: show better error to user
        alert('Quota exceeded!');
      }
    },
    addItem: function(item) {
      this.items.push(item);
      this.save();
    },
    deleteItem: function(id) {
      this.items = this.items.filter(item => item.id !== id);
      this.save();
    }
  };
})();
