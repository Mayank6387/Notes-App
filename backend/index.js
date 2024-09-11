const express=require('express');
const cors=require('cors')
const dbconnect=require("./config/dbconnect")

dbconnect();
const app=express();

app.use(cors({
    origin:"*"
}))


app.get("/",(req,res)=>{
    res.json({data:"hello"})
})


app.listen(3000)

module.exports=app;