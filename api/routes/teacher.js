const express = require('express')
const Note = require('../models/note')
const Class = require('../models/classes')
const Notification = require('../models/notification')
const Assignment = require('../models/assignment')
const AssignmentUpl = require('../models/assignmentUpl')

const router = express.Router()

router.get('/', async (req, res) => {
	const user = req.user
	const notifications = await Notification.find({ 
		"reciever": { $ne: "student" } 
	}).sort({ createdAt : -1 })
	const notes = await Note.find({
		"subject": req.user.subjectName,
		"course": req.user.course
	})
	const classes = await Class.find({
		"subject": req.user.subjectName,
		"course": req.user.course
	})
	const assignments = await Assignment.find({
		"subject": req.user.subjectName,
		"course": req.user.course,
		"submitDate": { $gt: new Date() }
	})
	res.render('teacher/index', {
		classes: classes,
		notes: notes,
		assignments: assignments,
		user: user,
		notifications,
		show_notification: 'yes'
	})
})

//Class --------------------------------------------------------

router.get('/room/:id', (req, res) => {
	res.render('teacher/classes/video-room', {
		roomId: req.params.id, layout: 'layout/no-page-wrap' 
	})
})

router.get('/class/edit/:id', async(req, res) => {
	const classes = await Class.findById(req.params.id)
	res.render('teacher/partials/edit_class', {
		classes: classes
	})
})

router.post('/', async (req, res, next) => {
	req.classes = new Class()
	next()
}, saveClassAndRedirect('teacher'))

router.put('/class/edit/:id', async (req, res, next) => {
	req.classes = await Class.findById(req.params.id)
	next()
}, saveClassAndRedirect('partials/edit_class'))

router.delete('/:id', async (req, res) => {
	await Class.findByIdAndDelete(req.params.id)
	res.redirect('/teacher')
})

function saveClassAndRedirect(path) {
	return async (req, res) => {
		let classes = req.classes
		classes.topic = req.body.topic
		classes.subject = req.user.subjectName
		classes.course = req.user.course
		classes.date = req.body.date
		classes.tfrom = req.body.tfrom
		classes.tto = req.body.tto
		try {
			classes = await classes.save()
			res.redirect('/teacher')
		} catch (e) {
			res.redirect('/teacher')
		}
	}
}

//Assignment ----------------------------------------------------

router.get('/assignment', async (req, res) => {
	const user = req.user
	const assignments = await Assignment.find({
		"course": req.user.course,
		"subject": req.user.subjectName,
		"submitDate": { $lt: new Date() } }).sort({ "submitDate": -1 })
	res.render('teacher/assignments/prev-assignments', {
		assignments: assignments,
		user: user
	})
})
router.get('/assignment/:idAssignment', async (req, res) => {
	const user = req.user
	const idAssignment = req.params.idAssignment
	const assignmentUpl = await AssignmentUpl.find({
		idAssignment
	})
	const assignment = await Assignment.find({
		"_id": idAssignment
	})
	res.render('teacher/assignments/view-assignment-upl', {
		assignmentUpl: assignmentUpl,
		assignment: assignment,
		user: user,
	})
})
router.get('/assignment/:idAssignment/:name', async (req, res) => {
	const user = req.user
	const idAssignment = req.params.idAssignment
	const name = req.params.name
	const assignmentUplod = await AssignmentUpl.find({
		idAssignment,
		name
	})
	res.render('teacher/partials/view_asst_upl', {
		assignmentUplod: assignmentUplod,
		name: name,
		idAssignment: idAssignment,
		user: user
	})
})


router.post('/assignment', async (req, res) => {
	const assignments = new Assignment({
		assignmentTopic: req.body.assignmentTopic,
		subject: req.user.subjectName,
		course: req.user.course,
		description: req.body.description,
		submitDate: req.body.submitDate
	})
	try {
		assignments = await assignments.save()
		res.redirect('/teacher')
	} catch {
		res.redirect('/teacher')
	}
})

router.delete('/assignment/:id', async (req, res) => {
	const id = req.params.id
	await AssignmentUpl.deleteMany({
		"idAssignment": id
	})
	await Assignment.findByIdAndDelete(id)
	res.redirect('/teacher')
})

//Notes -------------------------------------------------------

router.get('/notes/create-note', (req, res) => {
	const user = req.user
	res.render('teacher/notes/[create-note]', {
		note: new Note(),
		user: user
	})
})
router.get('/notes/edit/:id', async (req, res) => {
	const user = req.user
	const note = await Note.findById(req.params.id)
	res.render('teacher/notes/[edit-note]', {
		note: note,
		user: user
	})
})
router.get('/notes/:id', async (req, res) => {
	const user = req.user
	const note = await Note.findById(req.params.id)
	if (note == null) {
		res.redirect('/teacher')
	} else {
		res.render('teacher/notes/[notes]', {
			note: note,
			user: user
		})
	}
})

router.post('/notes/create-note', async (req, res, next) => {
	req.note = new Note()
	next()
}, saveNoteAndRedirect('/notes/[create-note]'))

router.put('/notes/edit/:id', async (req, res, next) => {
	req.note = await Note.findById(req.params.id)
	next()
}, saveNoteAndRedirect('/notes/[edit-note]'))

router.delete('/notes/edit/:id', async (req, res) => {
	await Note.findByIdAndDelete(req.params.id)
	res.redirect('/teacher')
})

function saveNoteAndRedirect(path) {
	return async (req, res) => {
		let note = req.note
		note.title = req.body.title
		note.subject = req.user.subjectName
		note.course = req.user.course
		note.description = req.body.description
		note.content = req.body.content
		try {
			note = await note.save()
			res.redirect(`/teacher/notes/${note.id}`)
		} catch (e) {
			res.render(`teacher/${path}`, {
				note: note
			})
		}
	}
}

module.exports = router