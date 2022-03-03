// _01_hello world
const { application } = require('express')
var express = require('express')
var app = express()

app.get('/hello', function(req, res){
    res.send('Hello World')
});

app.post('/hello', function(req, res){
    res.send('hello world from post')
});
// test this request in terminal to get get output from post
// curl -X POST "http://localhost:3000/hello"

app.all('/test', function(req, res){
    res.send('message from node test')
})

app.listen(3000)