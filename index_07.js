// index_07_IMPORTANT_database_myCode
// don't know  why not working --> bcoz not inserted app.use(express.json()) & app.use(expres.urlenoded())
// _07_database : model-Schema --> Retrieve Document --> Update Document --> Deleting Document 

// IMPORTANT has to learn how to get last inserted id + starting id if no id i.e. id = null

// get : show form on browser
// post : collect and save data from form
// put --> localhost:3000/person/find for full output
// put -->localhost:3000/person/find for one most relevant output  according to myquery

// delete --> localhost:3000/person/delete --> delete all according to myquery object 
// delete --> localhost:3000/person/deleteOne --> delete all according to myquery object
// delete --> localhost:3000/person/delete/(valid_id) --> delete all according to myquery object


var express = require('express')
var app = express()

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_db')

// middlewares    -->   very IMPORTANT. without them req.body = undefined
app.use(express.json());
app.use(express.urlencoded());

//Schema created
var personSchema = mongoose.Schema({
    // _id: {type: Number, required: true},
    name: String,
    age: {type: Number},          //error not showing, but also not adding to database
    nationality: {type: String, required: true}
})

// Model created
var Person = mongoose.model('Person', personSchema)

app.set('view engine', 'pug')
app.set('views', './views')

// displays form on brower, enter data,
app.get('/person', function(req, res){
    res.render('person')
})

// after clicking on Create_New_Person, the following data will be checked, then added to mongodb -> my_db -> people
// post -> localhost:3000/person
app.post('/person', function(req, res){
    var personInfo = req.body
    // console.log(req.body)

    if(!req.body.name || !personInfo.age || !personInfo.nationality){
        res.render('show_message', {
            mesage: "Sorry you entered wrong information", type: 'error'
        })
    }

    else {
        //id calculating
        // var newId = 

        var newPerson = new Person({
            _id: personInfo.id,
            name : personInfo.name,
            age : personInfo.age,
            nationality : personInfo.nationality
        })

        //IMPORTANT
        newPerson.save(function(err, Person){
            if(err)
                res.render('show_message', {message: 'Database error', type: 'error'})
            else
                res.render('show_message', { message: 'new person added', person: personInfo })
        })
        
    }

})

// put --> localhost:3000/person/find for full output
app.put('/person/find', (req, res) =>
    // Person.find(function(err, response){
    Person.find({nationality:"indian"}, "name" , function(err, response){     //only find names of people having nationality: indian
        res.json(response)
    })
)

//put -->localhost:3000/person/find for one most relevant output  according to myquery
app.put('/person/find/:name', (req,res) => {
    var name = req.params.name
    var myquery = {"name" : name}
    Person.findOne(myquery, (err, response) => {
        res.json(response)
    })
})

// ------------------------ update
// put --> localhost:3000/person/updateOne  --> updateOne most relevant document according to myquery & newValues
app.put('/person/updateOne', (req, res) => {
    var myquery = {name: "George"}
    var newValues = { nationality: "russian"}
    
    Person.updateOne(myquery, newValues, (err, response) => {
        if(err) throw err

        res.json({message: 'one document with ' + myquery + ' document modified with ' + newValues})

    })
})

// put --> localhost:3000/person/update  --> update all document according to myquery & newValues
app.put('/person/update', (req, res) => {
    var myquery = {name: "George"}
    var newValues = { nationality: "russian"}
    
    Person.update(myquery, newValues, (err, response) => {
        if(err) throw err
        // console.log(response)
        res.json({message: response.modifiedCount + ' documents upated' + myquery  + newValues})

    })
})

// put --> localhost:3000/person/update/:id  --> update all document according to myquery & newValues
app.put('/person/update/:id', (req, res) => {
    var myquery = {name: "George"}
    var id = parseInt(req.params.id)
    var newValues = { nationality: "american"}
    
    Person.findByIdAndUpdate((id ), newValues, (err, response) => {
        if(err) throw err
        // console.log(response)
        res.json(' documents upated')

    })
})

//---------------- for Delete
// delete --> localhost:3000/person/delete --> delete all according to myquery object 
app.delete('/person/delete', (req, res) => {
    var myquery = {nationality: 'indian'}
    Person.remove(myquery, (err, response) => {
        if(err) throw err
        console.log(response)
        res.json({message: response.deletedCount + ' file deleted successfully'})
    })
})

// delete --> localhost:3000/person/deleteOne --> delete all according to myquery object
app.delete('/person/deleteOne', (req, res) => {
    var myquery = {nationality: 'indian'}
    Person.findOneAndRemove(myquery, (err, response) => {
        if(err) throw err
        console.log(response)
        res.json({message: response.name + ' file deleted successfully'})
    })
})

// delete --> localhost:3000/person/delete/(valid_id) --> delete all according to myquery object
app.delete('/person/delete/:id', (req, res) => {
    var myquery = {_id: req.params.id}
    // Person.findByIdAndRemove("507f1f77bcf86cd799439011");
    // res.json({message: ' file deleted successfully'})
    Person.findByIdAndRemove(myquery, (err, response) => {
        if(err) throw err
        if(!response) res.json('file not found')
        else{
            console.log(response)
            res.json({message: ' file deleted successfully', details: response})
        }
    })
})

app.listen(3000)
