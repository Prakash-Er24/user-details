const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userCtrl = {}

userCtrl.register = (req,res) => {
    const {name,email,password,mobile,country,state,city,description} = req.body
    const obj = {name,email,password,mobile,country,state,city,image:req.file.path,description}
    const user = new User(obj)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            if(err.hasOwnProperty('keyValue') && err.keyValue.email === email)
            {
                res.json({notice:`${err.keyValue.email} is taken.`})
            }
            else
            {
                res.json(err)
            }
        })
}

userCtrl.login = (req,res) => {
    const {email,password} = req.body
    User.findOne({email})
        .then((user)=>{
            if(user)
            {
                bcrypt.compare(password, user.password)
                    .then((match)=>{
                        if(match)
                        {
                            const obj = {name:user.name,email:user.email,role:user.role}
                            const token = jwt.sign(obj,process.env.JWT_KEY,{expiresIn:'1d'})
                            res.json({token:`Bearer ${token}`})
                        }
                        else{
                            res.json({errors:{message:'Invalid email or password'}})
                        }
                    })
            }
            else
            {
                res.json({errors:{message:'Invalid email or password'}})
            }
        })

}
userCtrl.profile = (req,res) =>{
    const {email} = req.tokenData 
    User.findOne({email},'-password')
        .then((users)=>{
            res.json(users)
        })
        .catch((err)=>{
            res.json(err)
        })
}

userCtrl.list = (req,res) => {
    User.find({role:'user'},'-password')
        .then((users)=>{
            res.json(users)
        })
        .catch((err)=>{
            res.json(err)
        })
}

userCtrl.update = (req,res) => {
    const {id} = req.params
    const {name,email,mobile,country,state,city,description} = req.body
    const obj = {name,email,mobile,country,state,city,description}

        User.findOneAndUpdate({_id:id},obj,{new:true})
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
          
}

userCtrl.delete = (req,res) => {
    const { id } = req.params
    User.findByIdAndDelete({_id:id})
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })

}
module.exports = userCtrl
