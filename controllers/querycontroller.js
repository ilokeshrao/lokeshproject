const Query = require('../models/query')
 const nodemailer= require('nodemailer')



exports.queryadd = (req, res) => {
    try {
        const { email, query } = req.body
        const record = new Query({ email: email, query: query })
        record.save()
        //  console.log(record)
    } catch (error) {
        console.log(error.message)
    }

}
exports.querypage = async (req, res) => {
    try {
        const loginname = req.session.loginname
        const record = await Query.find().sort({status:1})
        res.render('admin/query.ejs', { loginname, record })
    } catch (error) {
        console.log(error.message)
    }
}
exports.emailpage = async (req, res) => {
    try {
        const id = req.params.id
        const record = await Query.findById(id)
        const loginname = req.session.loginname
        res.render('admin/emailform.ejs', { loginname, record })
    } catch (error) {
        console.log(error.message)
    }
}
exports.sendmail=async (req,res)=>{
    const id = req.params.id
    const path= req.file.path
    const{emailto,emailfrom,subject,body}=req.body

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'l6858729@gmail.com',
      pass: 'ngwd jurl wvvr mwit'
    }
  });
  console.log('connected to gmail smpt server')
  const info = await transporter.sendMail({
    from: emailfrom, // sender address
    to: emailto, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
   // html: "<b>Hello world?</b>", // html body
   attachments:[{
    path:path
   }]
  });
  console.log('email sent')
  await Query.findByIdAndUpdate(id,{status:'Replied'})
  res.redirect('/admin/query')

}

exports.deleteemail= async(req,res)=>{
    const id= req.params.id
    await Query.findByIdAndDelete(id)
    res.redirect('/admin/query')
}
