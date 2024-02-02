 const mongoose= require('mongoose')

  const querySchema= mongoose.Schema({
    query:String,
    email:String,
    status:{type:String,default:'Email/Reply'}
 })






  module.exports= mongoose.model('query',querySchema)