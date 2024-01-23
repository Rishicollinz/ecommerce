const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.get(/r/,(req,res)=>{
    res.send("anything with r");
});
app.listen(3000,()=>{
    console.log("listening");
});