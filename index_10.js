// _10_Authentication

var express = require('express')
var cookieParser =require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')

var app = express()
var upload = multer()

app.use(cookieParser())
app.use(session({secret: 'shh!, it\'s a secret'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload.array())

app.set('view engine', 'pug')
app.set('views', './views')

//program starts 
var User = []

app.get('/signup', (req, res) => {
    res.render('signup')
} )

app.get('/protected_page', (req, res) => {
    res.render('/protectedpage', (request, response) => {
        res.render('protected_page', {id: req.body.id})
    })
})

// app.post('/protected_page', )

app.post('/signup', (req, res) => {
    // console.log(req.body)
    if(!req.body.id || !req.body.password){
        res.status(404)
        res.send('Invalid Credentials')
    }
    else{   
        User.filter(function(User){
            if(User.id === req.body.id){
               res.render('signup', {
                  message: "User Already Exists! Login or choose another User id"});
            }
        });

        var newUser = { id: req.body.id, pass: req.body.pass}
        
        User.push(newUser)
        // res.send('newuser pushed')
        res.redirect('protected_page')

        // working well
        // res.render('/protectedpage', (request, response) => {
        //     res.render('protected_page', {id: req.body.id})
        // })
    }
})

//function for cheking if already signed in
// function checkSignIn(req, res) {
//     if(req.)
// }


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    console.log(User)

    if(!req.body.id || !req.body.password){
        res.render('/login', {message: 'please enter valid id and password'})
    }

    else{
        User.filter(function(user){
            if(user.id == req.body.id && user.password == req.body.password){
                req.session.user = user                     //IMPORTANT
                req.redirect('/protected_page')
            }
        })
    }
    res.render('/login', {message: 'Invalid Credentials'})
})

app.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log('user logged out')
    })
    res.redirect('/login')
})

app.listen(3000)