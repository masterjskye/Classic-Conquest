const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, '..', 'frontend');

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function send(res, statusCode, contentType, body) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(body);
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, 'text/plain; charset=UTF-8', 'Not found');
      return;
    }

    send(res, 200, contentType, data);
  });
}

function resolveFrontendFile(requestPath) {
  const safePath = path.normalize(requestPath).replace(/^(\.\.([/\\]|$))+/, '');
  const filePath = path.join(frontendDir, safePath);
  return filePath.startsWith(frontendDir) ? filePath : null;
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/health') {
    send(res, 200, 'application/json; charset=UTF-8', JSON.stringify({ status: 'ok', game: 'Classic Conquest' }));
    return;
  }

  if (req.url === '/' || req.url === '/game') {
    serveFile(res, path.join(frontendDir, 'index.html'));
    return;
  }

  const requestedPath = req.url.startsWith('/static/') ? req.url.replace('/static/', '/') : req.url;
  const filePath = resolveFrontendFile(requestedPath);

  if (!filePath) {
    send(res, 403, 'text/plain; charset=UTF-8', 'Forbidden');
    return;
  }

  serveFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Classic Conquest is running at http://localhost:${PORT}`);
});
