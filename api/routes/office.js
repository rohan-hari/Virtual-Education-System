const express = require('express')
const User = require('../models/registeredUsers')
const Notification = require('../models/notification')
const router = express.Router()

router.get('/', async (req,res) => {
    res.render("office/index")
})

router.post('/notification', async (req, res) => {
	const notification = new Notification({
		message: req.body.message,
		reciever: req.body.reciever
	})
	try {
		let notifications = await notification.save()
		res.redirect('/office')
	} catch {
		res.redirect('/error')
	}
})

// Fees

router.get('/fees/sem', async(req,res) => {
	const students = await User.find({ role: "student" })
	res.render('office/sem-fees',{ students })
})
router.get('/fees/others', async(req,res) => {
	const students = await User.find({ role: "student" })
	res.render('office/other-fees',{ students })
})

router.post('/fees/sem', async(req,res) => {
	const notification = new Notification({
		message: "Please pay your sem fees",
		reciever: "student",
		feesType: "sem-fees",
		userId : req.body.userId,
		})
	try {
		let notifications = await notification.save()
		res.redirect('/office/fees/sem')
	} catch {
		res.redirect('/error')
	}
})
router.post('/fees/others', async(req,res) => {
	const notification = new Notification({
		message: "Please pay fees",
		reciever: "student",
		feesType: "other-fees",
		userId : req.body.userId,
		})
	try {
		let notifications = await notification.save()
		res.redirect('/office/fees/others')
	} catch {
		res.redirect('/error')
	}
})

// Details --------------------------------------------------

router.get('/faculty-details', async (req,res) => {
    const faculties = await User.find({ role: "teacher" })
    res.render("office/faculty-details", { faculties })
})
router.get('/student-details', async (req,res) => {
    const students = await User.find({ role: "student" })
    res.render("office/student-details", { students })
})

 module.exports = router