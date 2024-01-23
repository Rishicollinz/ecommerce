//split the query string
import { createServer } from 'http';
import { URL } from 'url';

createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const params = parsedUrl.searchParams;
  const txt = `${params.get('year')} ${params.get('month')}`;

  res.end(txt);
}).listen(8080);




