const mongoose=require('mongoose')
const imageSchema=new mongoose.Schema({
    file:{
        type:String
    }
})

 const Image=mongoose.model('image',imageSchema)
 module.exports=Image