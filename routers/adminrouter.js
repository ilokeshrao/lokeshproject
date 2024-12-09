const router = require('express').Router()
const regc = require('../controllers/regcontroller')
const bannerc = require('../controllers/bannercontroller')
const servicec = require('../controllers/servicecontroller')
const testic = require('../controllers/testicontroller')
const queryc = require('../controllers/querycontroller')
const addc = require('../controllers/addcontroller')
const upload = require('../helpers/multer')
const handlelogin = require('../helpers/logincheck')

function handlecontrol(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin')
    }
}

router.get('/', regc.loginpage)
router.post('/', regc.logincheck)
router.get('/dashboard',handlecontrol, regc.dashboard)
router.get('/logout', regc.logout)
router.get('/banner', handlecontrol,bannerc.bannerpage)
router.get('/bannerupdateform/:id',handlecontrol, bannerc.bannerform)
router.post('/bannerupdateform/:id', upload.single('img'), bannerc.bannerupdate)
router.get('/service', handlecontrol,servicec.servicepage)
router.get('/addservice',handlecontrol, servicec.serviceform)
router.post('/addservice', upload.single('img'), servicec.serviceadd)
router.get('/servicedelete/:id', handlecontrol,servicec.servicedelete)
router.get('/servicestatusupdate/:id',handlecontrol, servicec.servicestatusupdate)
router.get('/testi',handlecontrol, testic.testipage)
router.post('/testi',handlecontrol, testic.search)
router.get('/testistatusupdate/:id',handlecontrol, testic.testistatusupdate)
router.get('/testidelete/:id',handlecontrol, testic.testidelete)
router.get('/query',handlecontrol, queryc.querypage)
router.get('/queryreply/:id',handlecontrol, queryc.emailpage)
router.post('/queryreply/:id', upload.single('attachement'), queryc.sendmail)
router.post('/service',handlecontrol, servicec.search)
router.get('/emaildelete/:id',handlecontrol, queryc.deleteemail)
router.get('/address',handlecontrol, addc.addaddress)
router.get('/addupdate/:id',handlecontrol, addc.updateform)
router.post('/addupdate/:id',handlecontrol, addc.addupdate)


module.exports = router
