const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    reciever:{
        type: String,
        required:true
    },
    feesType:{
        type: String,
     },
    userId:{
    }
}, { timestamps: true })

module.exports = mongoose.model('notification', notificationSchema)