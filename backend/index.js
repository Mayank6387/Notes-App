const express=require('express');
const app=express();
const cors=require('cors')
const dbconnect=require("./config/dbconnect")
const userModel=require('./models/userModel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

dbconnect();

app.use(cors({origin:"*"}))

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({data:"hello"})
})


app.post("/createaccount",async(req,res)=>{
   
    const {fullname,email,password}=req.body;

    if(!fullname){
        return res.status(400).json({error:true,message:"Full Name is Required"});
    }
    if(!email){
        return res.status(400).json({error:true,message:"Email is Required"});
    }
    if(!password){
        return res.status(400).json({error:true,message:"Password is Required"});
    }

    try{
        const isUser=await userModel.findOne({email:email});

    if(isUser){
        return res.json({error:true,message:"User Already Exists"})
    }

    const salt=await bcrypt.genSalt();
    const hashPassword=await bcrypt.hash(password,salt);

    const user=await userModel.create({
        fullname,
        email,
        password:hashPassword
    })
     
    await user.save();
    const accesstoken=jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'30m'
    })

    return res.status(201).json({
        error:false,
        user,
        accesstoken,
        message:"Registration Successfull"
    })

    }catch(err){
        console.log(err,"Error in Registering the User")
    }

})


app.listen(3000)

module.exports=app;