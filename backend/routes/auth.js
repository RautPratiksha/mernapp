const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
var bcrypt= require('bcrypt')
var jwt=require('jsonwebtoken')
var fetchuser=require("../middleware/fetchuser")

//create a user using : Post"/api/auth/
const JWT_SECRET="TFKCFdsgUIUdlal"
router.post('/createUser', [body('name').isLength({ min: 3 }), body('email').isEmail(),
body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ "email": req.body.email })
        console.log(user)
        if (user) {
            return res.status(400).json({ error: "sorry user is already exists with this email" })
        }
        const salt=await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        res.json(authtoken)
    } catch (error) { console.log(error.message); res.status(500).send("internal server error") }
    
    
})

//Authenticate the user
router.post('/login', [body('email').isEmail(),
    body('password','password cannot be blank').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password}=req.body;
        try
        {
            let user= await User.findOne({email});
            if(!user)
                {
                    return res.status(400).json({error:"please try to login with correct credentional"})
                }
            const passwordCompare=await bcrypt.compare(password,user.password);
            if(!passwordCompare)
                {
                return res.status(400).json({error:"please try to login with correct credentional"})
   
                }
                const data={
                    user:{
                        id:user.id
                    }
                }
                const authtoken=jwt.sign(data,JWT_SECRET);
                res.json(authtoken)
            
        }catch (error) { console.log(error.message); res.status(500).send("internal server error ") }
    
    
    })


//get user details
router.post('/getuser', fetchuser,async (req, res) => {
try{
    userId=req.user.id
const user=await User.findById(userId).select("-password")
res.json(user)
}catch (error) { console.log(error.message); res.status(500).send("internal server error ") }
    

    })


module.exports = router