const mongoose=require('mongoose')
const BlogSchmea=new mongoose.Schema({
    title:{
        type:String
        // required:[true,'title is required']
    },
    des:{
        type:String
        // required:[true,'Please enter description of the post']
    },
    file:{
       
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Blog=mongoose.model('schem',BlogSchmea)

module.exports=Blog