const express = require('express')
const User = require('../models/registeredUsers')
const Notification = require('../models/notification')
const router = express.Router()

router.get('/', async (req,res) => {
    res.render("office/index",)
})

router.post('/notification', async (req, res) => {
	const notification = new Notification({
		message: req.body.message,
	})
	try {
		let notifications = await notification.save()
		res.redirect('/office')
	} catch {
		res.redirect('/error')
	}
})

// Details --------------------------------------------------

router.get('/faculty-details', async (req,res) => {
    const faculties = await User.find({ role: "teacher" })
    res.render("office/faculty-details", { faculties : faculties })
})
router.get('/student-details', async (req,res) => {
    const students = await User.find({ role: "student" })
    res.render("office/student-details", { students : students })
})

 module.exports = router