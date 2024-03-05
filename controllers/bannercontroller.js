const Banner= require('../models/banner')


exports.bannerpage= async(req,res)=>{
    try{
    console.log('banner table data is here', Banner)
   const loginname=  req.session.loginname
   const record = await Banner.findOne()
    res.render('admin/banner.ejs',{loginname,record})
    }catch(error){
        console.log(error.message)
    }
}
exports.bannerform= async(req,res)=>{
    try{
    const id= req.params.id
    const record= await Banner.findById(id)
    console.log(record)
   const loginname=  req.session.loginname
    res.render('admin/bannerform.ejs',{loginname,record,message:''})
    }catch(error){
        console.log(error.message)
    }
}
exports.bannerupdate= async(req,res)=>{
    
    const{title,desc,md}= req.body
    const id = req.params.id
    const loginname=  req.session.loginname
    const record= await Banner.findById(id)
    try{
        if(req.file){
            const filename= req.file.filename
    await Banner.findByIdAndUpdate(id,{ title:title,desc:desc, mdetails:md,img:filename})
        }else {
    await Banner.findByIdAndUpdate(id,{ title:title,desc:desc, mdetails:md})
        }
    res.render('admin/bannerform.ejs',{message:'sucessfully banner more updated',loginname,record})
    }catch(error){
        console.log(error.message)
    }
}
exports.userbannerpage=async(req,res)=>{
  const record= await Banner.findOne()
    res.render('banner.ejs',{record})
}