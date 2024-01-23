//read the file
import {createServer} from 'http';
import {readFile} from 'fs';
createServer(function (req, res) {
  readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);