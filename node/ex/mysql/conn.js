const express = require('express')
let mysql=require('mysql')
const app = express()
const port = 3000

let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});

conn.connect(function(err){
    if(err){
        throw err;
    }else{
        app.get('/',(req,res)=>{
            res.send('connected!');
        });
    }

});
app.listen(3000,()=>{
    console.log("listening");
});