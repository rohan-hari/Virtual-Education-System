const express = require('express')
const router = express.Router()

router.get('/', async (req,res) => {
 res.render("office/index")
 })

 module.exports = router