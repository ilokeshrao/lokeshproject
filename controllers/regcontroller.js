const Reg= require('../models/reg')


exports.loginpage=(req,res)=>{
    res.render('admin/login.ejs',{message:''})
}
exports.logincheck=async(req,res)=>{
    const{name,pass}= req.body
    try{
   const record= await Reg.findOne({username:name})
 //  console.log(record)
 if(record!==null){
    if(record.password==pass){
    req.session.isAuth= true
    req.session.loginname= name
res.redirect('/admin/dashboard')
}else{
res.render('admin/login.ejs',{message:'wrong credentails'})
}
 }else{
    res.render('admin/login.ejs',{message:'wrong credentails'})
 }
    }catch(error){
   console.log(error.message)
    }
}
exports.dashboard= (req,res)=>{
    const loginname= req.session.loginname
    res.render('admin/dashboard.ejs',{loginname})
}
exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin')

}
