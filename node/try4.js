//read the file
import {createServer} from 'http';
import {appendFile} from 'fs';
  appendFile('dmf2.html', 'data to append',function(err) {
    if(err) throw err;
    console.log("data appended");
  });