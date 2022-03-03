// for _13_testing_signup_from_inotebook
const mongoose = require('mongoose')
// const {Schema} = mongoose    //Important If not this way, then use "mongoose.Schema" in place "Schema"

const userSchema = new mongoose.Schema({            //IMPORTANT always remember to user add mongoose. before Schema
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true, minLength: 10},
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema)