const mongoose=require('mongoose')
const {Schema} =mongoose
const FilesSchema=new Schema({
   user:
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
   },
    
    title:
    {
        type :String
    },
    description:
    {
        type:String
    },
    tag:
    {
        type:String,
        default:'General'
    },
    date:
    {
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("files",FilesSchema)