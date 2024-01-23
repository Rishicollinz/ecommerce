const express = require('express')
let mysql=require('mysql')
const app = express()
const port = 3000

let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"EXCHECK"
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
let createTable="INSERT INTO table1(name, age, salary) VALUES ('Rishi',";
conn.query(createTable,function(err,result){
    if(err){
        throw err;
    }else{
        app.get('/createTable',(req,res)=>{
            res.send(result);
        })
    }
});
app.listen(3000,()=>{
    console.log("listening");
});