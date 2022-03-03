// testing signup from inotebook backend
const express = require('express')
const app = express()


const User = require('./models/Auth')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongoose', ()=> console.log('connected to database successfully'))

//IMPORTANT this is validationResult not validateResult
const {body , validationResult} = require('express-validator')      
// const { default: mongoose } = require('mongoose')

// nothing like app.use exist// app.use(expressjson())

app.use(express.json())
app.get('/',
[
    body('name', 'Enter valid name').isLength({min: 3}),
    body('email', 'Enter valid eMail').isEmail(),
    body('password', 'Enter valid password').isLength({min: 5})
],
 async (req, res) => {
    // console.log(req)
    const errors  = validationResult(req)
    if(!errors.isEmpty()){
        // console.log("Total errors: " + errors.size + "\n in " + errors.param[1] + errors.param[2] )
        console.log("Total errors: " + errors )
        return res.status(404).json({message: 'enter valid confidentials'})
    }

    else{
        // res.json(req.body)

        console.log(req.body)
        try {
            
            var newUser = await User.create( {        //User is mongoose model
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
                // name: "Alexa",
                // email: "amazon.com",
                // password: "heyAlexa"
            })
            console.log('\n newUser created')
            
            // await newUser.save()
            
            console.log("after save")
            res.json(req.body)
            // var newUser

            
            // let newUser = await User.create( {        //User is mongoose model
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: req.body.email
            // })
            
            // await newUser.save()
            console.log(`user saved successfully`)
            res.json(newUser)

            
            // newUser.save().then(() => console.log(`user signedup successfully`))         //IMPORTANT save by help of mongoose -- sytax


            // console.log(req.body)
            // console.log(req.body)
            // res.json(newUser)
            // res.send('ehhe')

        } catch (e) {
            console.log("error:" + e)
        }
    }
})

app.listen(5000, ()=> console.log(`app listening at localhost:5000`))