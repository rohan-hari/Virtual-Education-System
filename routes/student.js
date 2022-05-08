const express = require('express')
const Class = require('../models/classes')
const Note = require('../models/note')
const Notification = require('../models/notification')
const Assignment = require('../models/assignment')
const AssignmentUpl = require('../models/assignmentUpl')

const router = express.Router()

router.get('/', async (req, res) => {
	const user = req.user
	const classes = await Class.find({ "course": req.user.course })
	const notifications = await Notification.find({ 
		"reciever": { $ne: "teacher" } 
	}).sort({ createdAt : -1 })
	const notes = await Note.find({ "course": req.user.course }).distinct("subject")
	const assignments = await Assignment.find({ "course": req.user.course, "submitDate": { $gt: new Date() }}).sort({ "submitDate": 1 })
	res.render("student/index", {
		classes: classes,
		notes: notes,
		assignments: assignments,
		user: user,
		notifications,
		show_notification: 'yes'
	})
})

//Assignment ------------------------------------------------

router.get('/assignment/:id', async (req, res) => {
	const assignments = await Assignment.findById(req.params.id)
	const assignmentUpl = await AssignmentUpl.find({
		"idAssignment": req.params.id,
		"name": req.user.name
	})
	res.render('student/assignments/assignment-upload', {
		assignments: assignments,
		assignmentUpl: assignmentUpl
	})
})

router.post('/assignment/:id', async (req, res) => {
	const assignment_upload = new AssignmentUpl({
		assignmentTopic: req.body.Topic,
		name: req.user.name,
		subject: req.body.subject,
		idAssignment: req.params.id
	})
	saveImage(assignment_upload, req.body.pdfUpload)
	try {
		const newassignment_upload = await assignment_upload.save()
		res.redirect('/student')
	} catch (e) {
		res.redirect('/student')
	}
})

function saveImage(assignment_upload, pdfEncoded) {
	if (pdfEncoded == null) return
	const pdfUpload = JSON.parse(pdfEncoded)
	if (pdfUpload != null) {
		assignment_upload.pdfUploadI = new Buffer.from(pdfUpload.data, 'base64')
	}
}

//Notes-----------------------------------------------------------

router.get('/notes/:subject', async (req, res) => {
	const user = req.user
	const subjectName = req.params.subject
	const notes = await Note.find({
		"subject": subjectName
	})
	res.render('student/notes/[subject]-notes', {
		notes: notes,
		subjectName: subjectName,
		user: user
	})
})
router.get('/notes/:subject/:id', async (req, res) => {
	const user = req.user
	const note = await Note.findById(req.params.id)
	if (note == null) {
		res.redirect('/student')
	} else {
		res.render('student/notes/[note]', {
			note: note,
			user: user
		})
	}
})


module.exports = router