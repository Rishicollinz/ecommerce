const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello world!');
}).listen(8080);

// POST method route
app.post('/h', (req, res) => {
    res.send('POST request to the homepage')
  })

app.listen(3000,()=>{
    console.log("listening");
});