'use client';
import { useEffect, useRef } from 'react';

export default function StatsChart({ items }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Calculate stats
    const stats = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    const total = items.length;
    const colors = { book: '#0070f3', movie: '#ff4d4d', game: '#00ff88' };
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (total === 0) {
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.font = '14px sans-serif';
      ctx.fillText('No data available', canvas.width/2, canvas.height/2);
      return;
    }

    let startAngle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    Object.keys(stats).forEach(type => {
      const sliceAngle = (stats[type] / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = colors[type] || '#ccc';
      ctx.fill();
      
      startAngle += sliceAngle;
    });

    // Draw legend
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    let legendY = 20;
    Object.keys(stats).forEach(type => {
      ctx.fillStyle = colors[type] || '#ccc';
      ctx.fillRect(10, legendY, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.fillText(`${type.charAt(0).toUpperCase() + type.slice(1)}: ${stats[type]}`, 25, legendY + 10);
      legendY += 20;
    });

  }, [items]);

  return (
    <div style={{ textAlign: 'center', margin: '1rem' }}>
      <h4>Library Stats</h4>
      <canvas ref={canvasRef} width="200" height="200" />
    </div>
  );
}
