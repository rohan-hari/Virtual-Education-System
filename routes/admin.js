const express = require('express')
const Course = require('../models/course')
const Class = require('../models/classes')
const User = require('../models/registeredUsers')

const router = express.Router()

router.get('/', async (req,res) => {
    const user = req.user
    const courses = await Course.find()
    res.render("admin/index",{ course: new Course(), courses:courses, user:user, title: 'Admin' })
 })

router.post('/', async(req,res) => {
    const course = new Course({
          course:req.body.course,
          status:req.body.status
    }) 
    try{
      const newCourse = await course.save()
      res.redirect(`admin`)
    } catch {
        res.redirect('/error'),{
       }}
})

//Course Page ------------------------------------------------------------
 
router.get('/:course', async(req,res) =>{
    const user = req.user
    const course = req.params.course
    const classes = await Class.find({"course":course}) 
    const faculties = await User.find({"course":course,"role":"teacher"})
    const students = await User.find({"course":course,"role":"student"})
    res.render("admin/[course]", { course, classes, faculties , students, user })
})

router.get('/edit/:id',async(req,res) =>{
    const course = await Course.findById(req.params.id)
    res.render("admin/edit_course",{course:course})
})
router.put('/edit/:id',async(req,res) =>{
    req.course = await Course.findById(req.params.id)
    let course = req.course
        course.status = req.body.status
        try {
          course = await course.save()
          res.redirect('/admin')
      } catch {
              res.redirect('/admin')
      }
})

// User Approval ---------------------------------------------------------

router.put('/:course/:id', async(req,res) => {
    const course = req.params.course
    req.user = await User.findById(req.params.id)
    let user = req.user
    user.isApproved = "yes"
    try {
      user = await user.save()
      res.redirect(`/admin/${course}`)
  }
    catch {
      res.redirect(`/error`)
}
})

router.delete('/:course/:id', async (req,res) => {
    const course = req.params.course
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.redirect(`/admin/${course}`)
})  

module.exports = router