const multer= require('multer')

const storage=  multer.diskStorage({
   destination:function(req,file,cb){
       cb(null,'./public/upload')
   },
   filename: function(req,file,cb){
       cb(null,Date.now()+file.originalname)
   }
})
 const upload= multer({
   storage:storage,
   limits:{filesize:1024*1024*4}
})


module.exports=upload