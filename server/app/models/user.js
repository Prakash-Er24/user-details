const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { Schema, model } = mongoose
const { isEmail } = validator

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['admin','user'],
        default:'user'
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    const user = this
    bcrypt.genSalt(10)
        .then((salt)=>{
            bcrypt.hash(user.password,salt)
                .then((encrypted)=>{
                    user.password = encrypted
                    next()
                })
        })
})

const User = model('User',userSchema)
module.exports = User