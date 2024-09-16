const jwt=require('jsonwebtoken');
const config=require('../config/config')


const authenticate=(req,res)=>{
    const token=req.header("Authorization");

    if(!token){
        return res.sendStatus(401).json({error:true,message:"Authorization required"});
    }

    try {
       const parsedToken=token.split(" ")[1];
       jwt.verify(parsedToken,config.accesstoken,(err,user)=>{
        if(err)return res.sendStatus(401).json({error:true,message:"Error in getting token"});
        req.user=user;
        next();
       })
    } catch (error) {
        return res.sendStatus(401).json({
            error:true,
            message:"Token Expired"
        })
    }
}

module.exports={authenticate};