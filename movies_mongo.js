// for index_11.js --> RESTFul APIs

// Analyze post route starting codition from tutorailspoint
// Implement delete and everything with mongodb database

// features:
// comment out starting comments for inserting objMovies data to collection movies in express database in MongoDB
// 
//  get -> localhost:3000/movies -> get list of all movies from database
//  get -> localhost:3000/movies/(any_valid_id) -> get details of particular movie with that id
//  post --> localhost:3000/movies with jsondata (without _id) in body -- (json using thunderclient) --> insertOne movie
//  put --> localhost:3000/movies/(any_valid_id) with valid json data in body to update movie and create new if id not found
//  delete --> localhost:3000/movies/(any_valid_id) will be deleted wheter available or not



var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

// for inserting to database
// MongoClient.connect(url, function(err, db){
//     if (err) throw err;
//     var dbo = db.db('express')

//     var objMovies = [
//         {_id: 101, name: 'Fight Club', year: 1999, rating: 8.1},
//         {_id: 102, name: 'Inception', year: 2010, rating: 8.7},
//         {_id: 103, name: 'The Dark Knight', year: 2008, rating: 9},
//         {_id: 104, name: '12 Angry Men', year: 1957, rating: 8.9}
//     ]

//     dbo.collection('movies').insertMany(objMovies, function(err, res){
//         if (err) throw err
//         console.log(res.insertedCount + " movies inserted to Mongo Database")
//         db.close()
//     })
// })


// var movies = [
//     {_id: 101, name: 'Fight Club', year: 1999, rating: 8.1},
//     {_id: 102, name: 'Inception', year: 2010, rating: 8.7},
//     {_id: 103, name: 'The Dark Knight', year: 2008, rating: 9},
//     {_id: 104, name: '12 Angry Men', year: 1957, rating: 8.9}
// ]

// for getting movies from database to variable movies (i.e. movies = array of objects)

var movies;
MongoClient.connect(url, function(err, db){
    if (err) throw db
    var dbo = db.db('express')
    
    dbo.collection('movies').find({}).toArray(function(err, result){
        if(err) throw err
        movies = result;
        console.log(result)
    })
})

// get --> localhost:3000/movies
router.get('/', function(req, res){
    res.json(movies)        //will send movies variable as object
    // res.send('hello world')
})

//router to get specific movie
// try localhost:3000/movies/(any_valid_id)
router.get('/:id([0-9]{3,})', function(req,res){
    // in tutorial different method --> by filters
    movies.forEach(function(element,index, array){
        if(element._id == req.params.id){
            res.json(movies[index])            
        }
    })
})

// create new movie
// visit post --> localhost:3000/movies and valid data (without _id) in body -- json using thunderclient
router.post('/', function(req, res){
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]{1}\.[0-9]{1}$/g)){

        res.status(404)
        res.json({message: 'bad Request! Sorry'})
    }

    else{
        var newId = movies[movies.length - 1]._id+1

        movieData = {
            _id : newId,
            name : req.body.name,
            year: req.body.year,
            rating : req.body.rating
        }

        // add new movie, if not available
        MongoClient.connect(url, function(err, db){
            if(err) throw err
            
            var dbo = db.db('express')
            dbo.collection('movies').insertOne(movieData, function(err, res){
                if (err) throw err

                console.log(`movie : ${req.body.name} inserted`)
            })
        })


        res.status(200)
        res.json({message: 'New Movie pushed', location: 'mongoose', id: newId})
    }
})

// IMPORTANT: we can't update id in mongodb
// router to update movie and create new if id not found
router.put('/:id', function(req, res){
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}/g) ||
        !req.body.rating.toString().match(/^[0-9].[0-9]/g)) 
        {
            res.status(404)
            res.json({message: 'Sorry! Bad Request', name: req.body.name,year: req.body.year, rating: req.body.rating, id: req.body.id})
        }
        else {
            
            MongoClient.connect(url, function(err, db){
                if(err) throw err
                var dbo = db.db('express')
                
                var query = { _id : parseInt(req.params.id)}
                var newValues = { $set: { 
                    // _id: req.body.id,
                    name: req.body.name,
                    year: req.body.year, 
                    rating: req.body.rating 
                }}
                var ress;
                dbo.collection('movies').updateMany(query, newValues, (function(err, res){
                    if(err) throw err
                    console.log(`req.params.id: ${req.params.id}`)
               }))
               res.json({message: "content updated"})
        })

    }
})


// router to delete movie
router.delete('/:id', function(req, res){
    
    MongoClient.connect(url, function(err, db){
        if (err) throw err

        myquery = { _id : parseInt(req.params.id)}
        console.log(parseInt(req.params.id))

        var dbo = db.db('express')
        // var ress = {}        //not working i.e. inside deleteOne function --> ress = res  --> res remain undefined 
        dbo.collection('movies').deleteOne(myquery, function(err, res){
            if(err) throw err
            // console.log(res.deletedCount + 'deleted Successfully')
            console.log(`one item  with id: ${req.params.id} deleted successfully`)
            db.close()

        })
        res.json({message: 'one item deleted successfully'})
        
    })
})

module.exports = router