 const mongoose =require('mongoose')

   const testiSchema= mongoose.Schema({
    img:String,
   // img1:String,
    quotes:String,
    name:String,
    status:{type:String,default:'Unpublished'},
    postedDate:{type:Date,default:new Date()}
  })






  module.exports= mongoose.model('testi',testiSchema)