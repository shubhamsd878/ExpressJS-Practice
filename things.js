var express = require('Express')
var router = express.Router()

router.get('/', function(req, res){
    res.send('Get route on things')
})

router.post('/', function(req, res){
    res.send('Post route on things')
})

// impoortant module.exports
module.exports = router