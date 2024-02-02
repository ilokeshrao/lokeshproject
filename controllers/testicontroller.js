 const Testi= require('../models/testi')


 exports.testiform= (req,res)=>{
    res.render('testiform.ejs')
 }
 exports.testiadd= (req,res)=>{
    const{views,name}=req.body
    if(req.file){
        const filename= req.file.filename
  var record=   new Testi({ quotes:views, name:name,img:filename})
    }else{
  var record=   new Testi({ quotes:views, name:name,img:'default.png'})
    }
  record.save()
 //console.log(record)
 }
 exports.testipage=async(req,res)=>{
    const loginname= req.session.loginname
    const record=  await Testi.find().sort({postedDate:-1})
    const ttesti= await Testi.count()
    const utesti= await Testi.count({status:'Unpublished'})
    const ptesti= await Testi.count({status:'Published'})

    res.render('admin/testi.ejs',{loginname,record,ttesti,utesti,ptesti})
 }
 exports.testistatusupdate= async(req,res)=>{
  const id= req.params.id
  const record=  await Testi.findById(id)
  //console.log(record)
 let newstatus= null
  if(record.status=='Unpublished'){
    newstatus='Published'
  }else{
    newstatus= 'Unpublished'
  }
  await Testi.findByIdAndUpdate(id,{status:newstatus})
  res.redirect('/admin/testi')
 }
 exports.testidelete= async(req,res)=>{
  const id= req.params.id
   await Testi.findByIdAndDelete(id)
   res.redirect('/admin/testi')
 }
 exports.search= async(req,res)=>{
  const{search}= req.body
  const loginname= req.session.loginname
   const record= await Testi.find({status:search})
   const ttesti= await Testi.count()
   const utesti= await Testi.count({status:'Unpublished'})
   const ptesti= await Testi.count({status:'Published'})

   res.render('admin/testi.ejs',{loginname,record,ttesti,utesti,ptesti})
   
 }
