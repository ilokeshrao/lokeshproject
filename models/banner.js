const mongoose= require('mongoose')


 const bannerSchema= mongoose.Schema({
    title:String,
    desc:String,
    img:String,
    mdetails:String
})


module.exports=mongoose.model('banner',bannerSchema)