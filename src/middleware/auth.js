const jwt=require('jsonwebtoken')
const User=require('../models/users')
const auth=async (req,res,next)=>{
    // console.log('middleware');
    try {
        const token=req.header('Authorization').replace('Bearer ','')
         // console.log(token)
        // const decoded=jwt.verify(token,'see env variable in config')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)
        const user=await User.findOne({_id: decoded._id,'tokens.token':token})
        // console.log(user);
        
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        
        // console.log(req.user);
        next()     
        
    } catch (error) {
        res.status(401).send({err:"authentication failed"})
    }
    
    
}

module.exports = auth


