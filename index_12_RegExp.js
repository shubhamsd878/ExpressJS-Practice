// RegExp 
const express = require('express')
const app = express()
const port = 4000

app.use('/', (req, res) =>{
    var text = 'This is the hello'
    var pattern = /s/gi

    // var result = pattern.test(text)      // <-- returns true if found pattern string
    // var result = pattern.exec(text)      // <-- returns first found index of the string
    // var result = text.match(pattern)     // <-- returns array with same string in pattern no. of times available in text
    // var result = text.search(pattern)    // <-- returns index of first found
    console.log(result)                     

    res.send('check terminal')
})

app.listen(port, ()=> console.log(`app listening at localhost:${port}`))
