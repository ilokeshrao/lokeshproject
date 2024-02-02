const Service = require('../models/service')



exports.servicepage = async (req, res) => {
  try{
    const loginname = req.session.loginname
    const record = await Service.find().sort({postedDate:-1})
    const tservice=  await Service.count()
   const tpublish= await Service.count({status:'Publish'})
   const tunpublish=  await Service.count({status:'Unpublish'})

//    console.log(tunpublish)
    res.render('admin/service.ejs', { loginname, record ,tservice,tpublish,tunpublish})
  }catch(error){
    console.log(error.message)
  }
}

exports.serviceform = (req, res) => {
    const loginname = req.session.loginname
    res.render('admin/serviceform.ejs', { loginname })
}
exports.serviceadd = async (req, res) => {
    const currentDate= new Date()
    const { name,desc,md } = req.body
    if (req.file){
    const filename = req.file.filename
     var record = await Service({ title: name,img:filename,desc: desc, mdetails: md,postedDate: currentDate })
}else{
  var record = await Service({ title: name,img:'default.png',desc: desc, mdetails: md,postedDate: currentDate })
}
record.save()
    res.redirect('/admin/service')
}
exports.servicedelete= async(req,res)=>{
  const id= req.params.id
   await Service.findByIdAndDelete(id)
   res.redirect('/admin/service')
}
exports.servicestatusupdate= async(req,res)=>{
    const id= req.params.id
  const record=   await Service.findByIdAndUpdate(id)
 // console.log(record)
  let newstatus= null
  if(record.status=='Unpublish'){
  newstatus= 'Publish'
  }else{
    newstatus='Unpublish'
  }
  await Service.findByIdAndUpdate(id,{status:newstatus})
  res.redirect('/admin/service')
}
exports.search= async(req,res)=>{
  const{search}= req.body
  const loginname= req.session.loginname
  const record=  await Service.find({status:search})
  const tservice=  await Service.count()
  const tpublish= await Service.count({status:'Publish'})
  const tunpublish=  await Service.count({status:'Unpublish'})
  res.render('admin/service.ejs', { loginname, record ,tservice,tpublish,tunpublish})

}
exports.moredetails=async(req,res)=>{
  const id= req.params.id
  const record= await Service.findById(id)

  res.render('servicedetails.ejs',{record})
}