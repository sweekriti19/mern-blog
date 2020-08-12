const Blog=require('../models/Blog')
const Image=require('../models/Image')
const jwt=require('jsonwebtoken')
exports.getPost=((req,res)=>{
    Blog.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            console.log(err)
        }
    })
})

exports.addPost=(req,res)=>{
    const post=new Blog()
    post.title=req.body.title
    post.des=req.body.des
    post.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
}

exports.addImage=(req,res)=>{
    console.log(req.file)
    const image=new Image()
    image.file=req.file
    image.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
}

exports.editPost=(req,res)=>{
    Blog.findById(req.params._id,(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
}

exports.updatePost=(req,res)=>{
    const updatedValue={
        title:req.body.title,
        des:req.body.des
    }
    Blog.findByIdAndUpdate(req.params._id,{$set:updatedValue},{new:true},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
}

exports.deletePost=(req,res)=>{
    Blog.findByIdAndDelete(req.params._id,(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
}