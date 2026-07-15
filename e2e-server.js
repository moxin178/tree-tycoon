import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8765;
const ROOT = process.cwd();

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
};

createServer(async (req, res) => {
  let filePath = join(ROOT, req.url === '/' ? 'index.html' : req.url);
  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT);
