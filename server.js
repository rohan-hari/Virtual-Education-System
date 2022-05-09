const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')
socket = io(server);

const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash');
const session = require('express-session')
const methodOverride = require('method-override')
require('./config/passport')(passport);

const adminRouter = require('./routes/admin')
const officeRouter = require('./routes/office')
const teacherRouter = require('./routes/teacher')
const studentRouter = require('./routes/student')
const userRouter = require('./routes/user')

const { forwardAuthenticated, ensureAuthenticated, authRole, authApproval } = require('./config/auth')

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine","ejs")
app.use(expressLayouts)
app.set('layout', 'layout/layout')
app.set("layout extractScripts", true)

mongoose.connect('mongodb://localhost:27017/classroom')
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use(bodyParser.urlencoded({ limit: '500mb', parameterLimit: 50000, extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({secret: 'secret', resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
});

app.get('/', (req,res) => { 
    res.render('index', {layout: 'layout/no-page-wrap' }) 
})


app.use('/admin',ensureAuthenticated,authRole('admin'), adminRouter)
app.use('/office',ensureAuthenticated,authRole('office'), officeRouter)
app.use('/teacher',ensureAuthenticated,authRole('teacher'),authApproval, teacherRouter)
app.use('/student', ensureAuthenticated,authRole('student'),authApproval, studentRouter)
app.use('/user', userRouter)


app.get('/room/:id',ensureAuthenticated, (req, res) => {
    const userId = req.user.id
    res.render('[video-room]', {
        userId: userId,
        roomId: req.params.id, 
        layout: "layout/no-page-wrap" 
    })
})

// socket.on('connection', socket => {
//     socket.on("chat message", function(msg) {
//         console.log("message: " + msg);
//         socket.emit("received", { message: msg });
//     })
//     // socket.on('join-room', (roomId, userId) => {
//     //   socket.join(roomId)
//     //   socket.to(roomId).emit('user-connected', userId, roomId)
//     //   })
// })

server.listen(3000, () => {
    console.log('Connected to port: 3000')
})