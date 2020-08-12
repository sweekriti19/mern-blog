const express=require('express')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const auth=require('../middleware/auth')

const storage = multer.diskStorage({
    destination: "uploads/",
    filename:function(req,file,cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({
    storage:storage
})

const {getPost, addPost, editPost, updatePost, deletePost, addImage}=require('../controller/Blogcontroller')
const { addUser,loginUser, verifyUser } = require('../controller/Usercontroller')
router.route('/').get(auth,getPost).post(addPost)
router.route('/upload').post(upload.single('mfile'),addImage)
router.route('/edit/:_id').get(editPost)
router.route('/:_id').put(updatePost)
router.route('/delete/:_id').delete(deletePost)

router.route('/register').post(addUser)
router.route('/login').post(loginUser)
router.route('/profile').get(verifyUser)
module.exports=router