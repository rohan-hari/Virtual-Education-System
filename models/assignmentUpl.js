const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const assignmentUplSchema = new mongoose.Schema({
	assignmentTopic: {
		type: String,
	},
	name: {
		type: String
	},
	subject: {
		type: String
	},
	idAssignment: {
		type: ObjectID
	},
	pdfUploadI: {
		type: Buffer
	}
})

assignmentUplSchema.virtual('pdfUploadIstring').get(function() {
	if (this.pdfUploadI != null) {
		return `${this.pdfUploadI.toString('base64')}`
	}
})

module.exports = mongoose.model('assignmentUpl', assignmentUplSchema)