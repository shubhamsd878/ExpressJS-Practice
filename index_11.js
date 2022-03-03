// _11_RESTFul APIs
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var multer = require('multer')
var upload = multer()
var port = 3000

app.use(cookieParser())
app.use(bodyParser.json())        //why i use it ??
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload.array())


// var movies = require('./movies.js')
// app.use('/movies', movies)

var movies = require('./movies_mongo.js')
app.use('/movies', movies)



app.listen(port, () =>{
    console.log(`app listening at: localhost:${port}`)
})
// app.listen(3000)