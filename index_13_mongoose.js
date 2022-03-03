// mongoose middleware with models

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose')

// importing model from model/user.js
const User = require('./models/user')

// using model in this file
// IMPORTANT model --> m -> lowercase || Scheam --> S ->uppercase

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required:true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     }
// })

// const User = mongoose.model('inoteboo', userSchema)      // model created

// if with out async function
// const user = new User( {
//     name: 'kyle',
//     email: 'kylye@gmail.com',
//     password:'kyleIsKing'
// })

run()

async function run(){
    try {
        
        // save is
        const user = await User.create( {         //IMPORTANT: with .create method no need to use user.save && with .create method no need to add new keyword
            name: 'kyle',
            email: 'kylyyyy@gmail.com',
            password:'kyleIsKing'
        })
        
        console.log('user successfully pushed\n ' + "user: " + user)
        user.name = "kamlesh"
        await user.save()

        console.log('user successfully edited\n ' + "user: " + user)
    
    } catch (e) {
        console.log("error: " + e.message)
    }
}

// user.save().then( ()=> console.log(`saved! check database`) ).catch( (e) =>{ console.log("errors: " + e) })    // save always awaits or then


// app.listen(port, ()=> console.log(`app listening at localhost:${port}`))