const express=require('express')
const app=express()

let userTb=[
    {id:1,"name":"rishi"},
    {id:1,"name":"rishi"},
    {id:1,"name":"rishi"},
    {id:1,"name":"rishi"},
    {id:1,"name":"rishi"},
];
app.get('/users',(req,res)=>{
    let page=req.query.page;
    let limit=req.query.limit;
    let startIndex=(page-1)*limit;
    let endIndex=(page)*limit;
    let result=userTb.slice(startIndex,endIndex);
    res.json(result);
})
app.listen(3000);