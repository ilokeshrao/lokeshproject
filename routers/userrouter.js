const router = require('express').Router()
const bannerc = require('../controllers/bannercontroller')
const servicec = require('../controllers/servicecontroller')
const testic = require('../controllers/testicontroller')
const Banner = require('../models/banner')
const Service = require('../models/service')
const Testi = require('../models/testi')
const upload = require('../helpers/multer')
const queryc = require('../controllers/querycontroller')
const addc = require('../controllers/addcontroller')
const Add = require('../models/address')

function handlecontrol(req,res,next){
  if(req.session.isAuth){
      next()
  }else{
      res.redirect('/admin')
  }
}


router.get('/', async (req, res) => {
  try {
    const serviceRecord = await Service.find({ status: 'Publish' });
    const bannerRecord = await Banner.findOne();
    console.log('bannerrecord testing:', bannerRecord);
    const testiRecord = await Testi.find({ status: 'Published' }).sort({ postedDate: -1 });
    const addRecord = await Add.findOne();
    res.render('index.ejs', { bannerRecord, serviceRecord, testiRecord, addRecord });
  } catch (error) {
    // Handle errors appropriately, log or send an error response
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
})
router.get('/banner',handlecontrol, bannerc.userbannerpage)
router.get('/testadd', handlecontrol,testic.testiform)
router.post('/testadd', upload.single('img'), testic.testiadd)
router.post('/', queryc.queryadd)
router.get('/servicedetails/:id', handlecontrol,servicec.moredetails)


module.exports = router