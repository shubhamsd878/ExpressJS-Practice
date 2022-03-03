// _09_sessions

var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser())
app.use(session( {secret: 'shh!, it \' a secret'}))

// 
app.get('/', (req, res) => {
    if(req.session.page_views){
        req.session.page_views++
        res.send('You visited this page ' + req.session.page_views +' times')
    }
    else{
        req.session.page_views = 1
        res.send('Welcome \' to the page for the first time')
    }
})

app.listen(3000)