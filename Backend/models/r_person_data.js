const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema of Jobs
const rperson_data = new Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    mail:{
        type: String,
        required: true,
    },
    phone_number:{
        type: String,
    },
})

module.exports = RPersonData = mongoose.model('RPersonData',rperson_data)

// {
//     first_name: String,
//     last_name: String,
//     age: Number,
//     gender: String,
//     mail: String,
//     phone_number: String,
//     school: String,
//     board: String,
//     university: String,
//     study_field: String,
//     start_date: String,
//     end_date: String,
//     skills: String
//   }