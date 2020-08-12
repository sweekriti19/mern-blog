const express=require('express')
const app=express()
const route=require('./router/route')
const db=require('./models/db')
const cors=require('cors')
app.use(express.json())
const path=require('path')
app.use(express.static(path.join(__dirname, "./public/")));
app.use(cors({origin:'http://localhost:3000'}))
app.use('/blog',route)
app.listen(4000,()=>{
  console.log('listening on port 4000')
})