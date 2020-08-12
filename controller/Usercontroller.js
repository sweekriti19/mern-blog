const User=require('../models/User')
const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')

exports.addUser=(req,res)=>{
const {name,email,password}=req.body
if(!name || !email || !password){
    return res.status(400).json({msg:'Please enter all the fields'})
}

User.findOne({email}).then(user=>{
    if(user){
        return res.status(400).json({msg:'User already exists'})
    }

    const userp = new User({
        name,
        email,
        password
    })
    
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(userp.password,salt,(err,hash)=>{
            if(err) throw err
            userp.password=hash
            userp.save().then(user=>{
                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecret'),
                    {expiresIn:3600},
                    (err,token)=>{
                        
                        if(err) throw err
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email
                            }
                        })
                        
                    }
                )
              
            }).catch(err=>{
                console.log(err)
            })
        })
    })
})
}

exports.loginUser=(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({msg:'Please enter all the fields'})
    }
    
    User.findOne({email}).then(user=>{
        if(!user){
            console.log('User does not exists')
        }
        
       bcrypt.compare(password,user.password).then(isMatch=>{
           if(!isMatch){
              console.log('Invalid credentials')
           }
           
           const payload={
            id:user.id,
            name:user.name,
            email:user.email
           }
          const token= jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:3600}
        )
            res.send(token)
       })
    })
    }
    
    exports.verifyUser=(req,res)=>{
        var decoded=jwt.verify(req.headers['authorization'],config.get('jwtSecret'))
        User.findOne({
            _id:decoded._id
        })
        .then(user=>{
            if(user){
                res.json(user)
            }
            else{
                res.send('User does not exist')
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }