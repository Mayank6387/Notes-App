const jwt=require('jsonwebtoken');
const config=require('../config/config')
const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;
    
    if (!token) {
      return res.status(401).json({ error: true, message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, config.accesstoken);
      req.user=decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: true, message: "Invalid token" });
    }
  };


  module.exports={authenticate};