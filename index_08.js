// _08_cookies
// set cookie, expire + maxAge
// expire not working
var express = require('express')
var app = express()

var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res)=>{
    // res.cookie('name','express').send('cookie set')         //sets name == cookie
    
    // cookie with expiration time
    // res.cookie('expire','not working without date', {expire: 3600}).send('expiration cookie set')         //sets name == cookie
    // res.cookie('maxAge','not_working', {maxAge: 10000}).send('\nmaxAge cookie set')         //sets name == cookie
    var d = new Date()
    res.cookie('expire','not working without date', {expire: 3600 + d.getUTCDate()})         //sets name == cookie
    console.log(d.getUTCDate())
    res.cookie('maxAge','not_working', {maxAge: 10000}).send('\nmaxAge cookie set')         //sets name == cookie
    // res.send('hello world')
    console.log('req.cookies: ' )
})

app.get('/clearcookie', (req, res) => {
    res.clearCookie('maxage')
    res.send('name cookie cleared')
})

app.listen(3000)