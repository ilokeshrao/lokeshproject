 const Add= require('../models/address')




exports.addaddress=async(req,res)=>{
    const loginname= req.session.loginname
    const record=  await Add.findOne()
    res.render('admin/addpage.ejs',{loginname,record})
}
exports.updateform= async(req,res)=>{
    const loginname= req.session.loginname
     const record= await Add.findById(req.params.id)
    res.render('admin/addform.ejs',{loginname,record})
}
exports.addupdate= async(req,res)=>{
    const{add,mobile,email,insta,tel,fb}=req.body
    const id= req.params.id
    await Add.findByIdAndUpdate(id,{ add:add, mobile:mobile, tel:tel, email:email, insta:insta,fb:fb})
 res.redirect('/admin/address')
}
