const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true  
    },
    course:{
        type: mongoose.Schema.Types.String,
        ref: 'Course',
        required:true
    },
    subjectName:{
        type:String
    },
    isApproved:{
        type:String,
        required:true,
        default: 'no'
    }
})

module.exports = mongoose.model('User', userSchema)