const express = require('express')
const User = require('../models/registeredUsers')
const Course = require('../models/course')
const bcrypt = require('bcrypt')
const passport = require('passport')

const router = express.Router()
const { forwardAuthenticated, ensureAuthenticated, } = require('../config/auth');



// Register ------------------------------------------------------------

router.get('/register', forwardAuthenticated, async(req, res) => {
    const courses = await Course.find({ status:'allow-login' })
  res.render('register', { courses: courses, title: 'Register', layout: 'layout/no-page-wrap' })
})

router.post('/register', async(req, res) => {
  const { name, email, password,role,course, subjectName,isApproved} = req.body
  const courses =  await Course.find({status:'allow-login'})
   
  let errors = []

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
       res.render('register', {errors, name, email, courses:courses})
  } 
  else {
   User.findOne({ email: email }).then(user => {
      if (user){
         errors.push({ msg: 'Email already exists' })
           res.render('register', {errors, name, email,courses:courses})
         } else {
          const newUser = new User({name, email, password,role, course, subjectName,isApproved})
          bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save().then(user => {
                req.flash('success_msg','You are now registered')
                res.redirect('/user/login');
              })
              .catch(err => console.log(err));
          })
         })
       }
      })
     }
   }) 

// Login -------------------------------------------------------------------

router.get('/login',forwardAuthenticated,(req,res) => {
    res.render('login.ejs', { title: 'Login', layout: 'layout/no-page-wrap' })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: `/student`,
      failureRedirect: '/user/login',
      failureFlash: true
    }) (req, res, next)
})

router.get('/notapproved',(req,res) => {
    req.logout()
    req.flash('error_msg', 'Please wait for  approval')
    res.redirect('/user/login')
})
 
// Logout ---------------------------------------------------------------------

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/user/login')
})

router.get('/details/:id',ensureAuthenticated, async(req,res) => {
  let users = await User.findById(req.params.id)
	res.render("[user]", { users })
})

module.exports = router