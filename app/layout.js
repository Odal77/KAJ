import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>MediaHub</title>
        <link rel="icon" href="/KAJ/images/logo.png" />
        <link rel="manifest" href="/KAJ/manifest.json" />
        <meta name="theme-color" content="#ff9000" />
      </head>
      <body>
        <Script src="/KAJ/core/MediaHub.js" strategy="beforeInteractive" />
        <Script src="/KAJ/components/RatingStars.js" strategy="beforeInteractive" />
        <header>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '900', 
              display: 'flex', 
              alignItems: 'center',
              letterSpacing: '-1px'
            }}>
              <span style={{ color: '#fff' }}>Media</span>
              <span style={{ 
                backgroundColor: '#ff9000', 
                color: '#000', 
                padding: '0 8px', 
                borderRadius: '6px',
                marginLeft: '4px'
              }}>HUB</span>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2026 MediaHub</p>
        </footer>
      </body>
    </html>
  );
}
