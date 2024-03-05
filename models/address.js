 const mongoose=require('mongoose')

 const addressSchema= mongoose.Schema({
    add:String,
    mobile:Number,
    tel:Number,
    email:String,
    insta:String,
    fb:String

})

 module.exports=  mongoose.model('address',addressSchema)