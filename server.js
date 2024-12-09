const express= require('express')
const app= express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const userRouter= require('./routers/userrouter')
const adminRouter= require('./routers/adminrouter')
const session= require('express-session')
const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/backendprojectfirst')



app.use (session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
   cookie:{maxAge:1000*60*60*24*365}  //page ko baar baar logout nhi hona dega 
})) 
app.use(userRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log(`server is run port ${process.env.PORT} `)})


