const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const configureDb = ()=>{
    mongoose.connect("mongodb://localhost:27017/Task")
        .then(()=>{
            console.log("connected to db")
        })
        .catch(()=>{
            console.log("not connected to db")
        })
}

module.exports = configureDb