// Custom Web Component for points, i need it, i did a great work (>:0)
class RatingStars extends HTMLElement {
  static get observedAttributes() {
    return ['rating'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const rating = parseInt(this.getAttribute('rating')) || 0;
    const max = 5;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          color: #ffd700;
          font-size: 1.5rem;
          margin: 10px 0;
          cursor: pointer;
          user-select: none;
        }
        span:hover {
          transform: scale(1.2);
          display: inline-block;
        }
      </style>
      <div id="stars-container"></div>
    `;

    const container = this.shadowRoot.getElementById('stars-container');
    // generate stars manualle
    for (let i = 1; i <= max; i++) {
      const star = document.createElement('span');
      star.textContent = i <= rating ? '★' : '☆';
      star.onclick = (e) => {
        e.stopPropagation();
        this.setAttribute('rating', i);
        // Dispatching custom event to let React knowing
        this.dispatchEvent(new CustomEvent('rating-change', {
          detail: { rating: i },
          bubbles: true,
          composed: true
        }));
      };
      container.appendChild(star);
    }
  }
}

if (!customElements.get('rating-stars')) {
  customElements.define('rating-stars', RatingStars);
}
