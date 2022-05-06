const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
	subject: {
		type: String
	},
	topic: {
		type: String
	},
	date: {
		type: Date,
		required: true
	},
	course: {
		type: String,
		required: true
	},
	tfrom: {
	},
	tto: {
	},
	classlink: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Class', classSchema)