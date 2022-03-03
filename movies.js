// for index_11.js --> RESTFul APIs
// Analyze post route starting codition
// Implement delete and everything with mongodb database

var express = require('express')
// var app = express()
var router = express.Router()

var movies = [
    {_id: 101, name: 'Fight Club', year: 1999, rating: 8.1},
    {_id: 102, name: 'Inception', year: 2010, rating: 8.7},
    {_id: 103, name: 'The Dark Knight', year: 2008, rating: 9},
    {_id: 104, name: '12 Angry Men', year: 1957, rating: 8.9}
]

router.get('/', function(req, res){
    res.json(movies)        //will send movies variable as object
    // res.send('hello world')
})

//router to get specific movie
router.get('/:id([0-9]{3,})', function(req,res){
    // in tutorial different method --> by filters
    movies.forEach(function(element,index, array){
        if(element._id == req.params.id){
            res.json(movies[index])            
        }
    })
})

// make router with mongodb
router.post('/', function(req, res){
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]{1}\.[0-9]{1}$/g)){

        res.status(404)
        res.json({message: 'bad Request! Sorry'})
    }

    else{
        var newId = movies[movies.length - 1]._id+1

        movies.push({
            _id : newId,
            name : req.body.name,
            year: req.body.year,
            rating : req.body.rating
        })
        res.status(200)
        res.json({message: 'New Movie pushed', location: 'mongoose', id: newId})
    }
})

// router to update movie
router.put('/:id', function(req, res){
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}/g) ||
        !req.body.rating.toString().match(/^[0-9].[0-9]/g)) 
        {
            res.status(404)
            res.json({message: 'Sorry! Bad Request'})
        }
    else {
        // search for movie
        var movieFound = 0, movieIndex;
        movies.forEach(function (element, index, arr){
            if(element._id == req.body.id){
                movieFound = 1
                // movieSearch = element
                movieIndex = index
            }
        })

        //update existing movie
        if(movieFound){
            movies[movieIndex] = {
                _id : req.body.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            }
            res.status(200)
            res.json({message: 'Movie updated Successfull'})
        }

        //existing movie not found, creating new movie
        else{
            movies.push({
                _id : req.body.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            })
            res.status(200)
            res.json({message: 'Movie added Successfull'})
        }
    }
})



module.exports = router