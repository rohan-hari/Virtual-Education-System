const mongoose = require('mongoose')

const assignmentsSchema = new mongoose.Schema({
	assignmentTopic: {
		type: String,
		index: true,
		required: true
	},
	description: {
		type: String,
	},
	subject: {
		type: String,
		required: true
	},
	course: {
		type: String,
		required: true
	},
	submitDate: {
		type: Date,
		required: true
	}
})

module.exports = mongoose.model('assignments', assignmentsSchema)