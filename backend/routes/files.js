const express=require('express')
const Files =require('../models/Files')
const router=express.Router()
// const multer=require('multer')
// const path=require('path')
var fetchuser=require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator')

router.get('./fetchallnotes',fetchuser,async(req,res)=>
{
   try{
   const notes=await Files.find({user:req.user.id})
   res.json(notes)
   }catch (error) { console.log(error.message); res.status(500).send("internal server error") }
    
})

router.post('./addnote',fetchuser,[body('title').isLength({ min: 3 }), body('description').isLength({min:5}),
   body('password').isLength({ min: 5 })
   ],async(req,res)=>
   {
      try{
      const {title,description,tag}=req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const note=new Files({

         title, description, tag, user:req.user.id
      })
      note.save()
      const savedNote=await note.save()

      res.json(savedNote)
   }catch (error) { console.log(error.message); res.status(500).send("internal server error") }
    
   })


router.put('/updatenote/:id',fetchuser,[body('title').isLength({ min: 3 }), body('description').isLength({min:5}),body('password').isLength({ min: 5 })],async(req,res)=>
{
   try{
     const {title,description,tag}=req.body;
     const newNote={};
     if(title){newNote.title=title}
     if(description){newNote.description=description}
     if(tag){newNote.tag=tag}
     let note= await Files.findById(req.params.id)
     if(!note){return res.status(404).send("not found")}
     if(note.user.toString()!==req.user.id)
      {
         return  res.status(401).send("not allowed")
      }

      note=await Files.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({note})
   }catch (error) { console.log(error.message); res.status(500).send("internal server error") }
    
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>
   {
      try{
        const {title,description,tag}=req.body;
       
        let note= await Files.findById(req.params.id)
        if(!note){return res.status(404).send("not found")}
        if(note.user.toString()!==req.user.id)
         {
            return  res.status(401).send("not allowed")
         }
   
         note=await Files.findByIdAndDelete(req.params.id,{$set:newNote},{new:true})
         res.json({"sucess":"note has been deleted"})
      }catch (error) { console.log(error.message); res.status(500).send("internal server error") }
    
   })
module.exports=router