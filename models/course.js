const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('course',courseSchema)
