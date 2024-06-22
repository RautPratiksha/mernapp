const jwt=require('jsonwebtoken')
const JWT_SECRET="TFKCFdsgUIUdlal"
const fetchuser=(req,res,next)=>
    {
       //get the user from the jwt toekn and add id to req object
       const token=req.header('auth-token');
       if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
       }
       try{
       const data=jwt.verify(token,JWT_SECRET)
       req.user=data.user
       next()
       }
       catch(error){
        res.status(401).send({error:"please authenticate using valid token"})
       }
    }
module.exports=fetchuser