const express = require('express')
const router = express.Router()
const multer = require('multer')
const {authentication, authorization } = require('../middleware/auth')

const userCtrl = require('../app/controllers/userController')
const storage = multer.diskStorage({  
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const upload = multer({storage})
router.post('/api/user/register',upload.single('image'), userCtrl.register)
router.post('/api/user/login',userCtrl.login) 
router.get('/api/user/profile', authentication,userCtrl.profile)
router.put('/api/user/:id',authentication,authorization,userCtrl.update)
router.delete('/api/user/:id',authentication,authorization,userCtrl.delete)
router.get('/api/user/list',authentication,authorization,userCtrl.list)

module.exports = router 