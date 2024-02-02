const mongoose= require('mongoose')



 const serviceSchema= mongoose.Schema({
    title:String,
    img:String,
    desc:String,
    mdetails:String,
    postedDate: Date,
    status:{type:String,default:'Unpublish'}
})





 module.exports= mongoose.model('service',serviceSchema)