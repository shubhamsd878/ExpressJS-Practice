// _05_pug + static files
var express = require('express')
var app = express()

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'))  //--> this line will make my root directory public and will fetch files directly from here even if i had given path(/Test-image)) of image in first_view.puh <-- views <-- Express JS 

// also we can use multiple static directories
app.use(express.static('public2'))

app.use('/virtual_path_prefix', express.static('public3'))      // --> virtual path prefix. now use /virtual-path-prefix to use files inside public3

app.get('/first_template', function(req, res){
    res.render('first_view', {
        user: {name: 'TutorailsPoint',
                age: 20
        }
    })
})

app.listen(3000)




// var express = require('express');
// var app = express();

// app.get('/first_template', function(req, res){
//    res.render('first_view');
// });

// app.listen(3000);