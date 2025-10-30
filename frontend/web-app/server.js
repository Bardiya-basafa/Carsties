const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const app = next({ 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Handle static uploads
    if (pathname.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', pathname);
      
      try {
        if (fs.existsSync(filePath)) {
          const file = fs.readFileSync(filePath);
          const ext = path.extname(filePath).toLowerCase();
          
          const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
          };
          
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
          res.end(file);
        } else {
          res.statusCode = 404;
          res.end('File not found');
        }
      } catch (error) {
        console.error('Error serving file:', error);
        res.statusCode = 500;
        res.end('Server error');
      }
      return;
    }

    // Handle all other requests with Next.js
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});