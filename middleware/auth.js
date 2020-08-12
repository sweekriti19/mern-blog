const config = require('config')
const jwt = require('jsonwebtoken')
function auth(req, res, next){
const token = req.header('authorization')
if(!token) console.log('No token auth denied')
try{
    const decoded = jwt.verify(JSON.parse(token), config.get('jwtSecret'))
    req.user=decoded
    next()
}
catch(e){
    console.log(e)
}
}

module.exports=auth