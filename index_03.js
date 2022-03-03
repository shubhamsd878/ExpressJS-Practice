// _03_url_building_dynamic_routing

var express = require('express')
var app = express()

// validation putted on id - must be of 5 digits
// notice types of brackets
// [0-9]{5}
app.get('/things/:  name/:id([4-8]{5})', function(req, res){
    res.send('id: ' + req.params.id + '  &&   name: ' + req.params.name)
})

app.get('*', function(req, res){
    res.send('please enter a valid url')
})

app.listen(3000)


