const mongoose = require('mongoose')
const { marked } = require('marked')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	content: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	course: {
		type: String,
		required: true
	}
})

noteSchema.virtual('sanitizedHtml').get(function() {
	if (this.content != null) {
		let sanitizeHtml = dompurify.sanitize(marked(this.content))
		return `${sanitizeHtml}`
	}
})

module.exports = mongoose.model('Note', noteSchema)