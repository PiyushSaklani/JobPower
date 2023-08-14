const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema of Jobs
const jobs_data = new Schema({
    job_title:{
        type: String,
        required: true,
    },
    date_of_post:{
        type: String,
        required: true,
    },
    discription:{
        type: String,
        required: true,
    },
    type_of_job:{
        type: String,
        required: true,
    },
    duration_of_job:{
        type: String,
        required: true,
    },
    salary:{
        type: String,
        required: true,
    },
    deadline:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    mail:{
        type: String,
    }
})

module.exports = Jobs = mongoose.model('Jobs',jobs_data)

// {
//     "job_title": "Security architect",
//     "date_of_post": "12-05-2023",
//     "discription": "Designing and implementing security solutions, such as firewalls, intrusion detection and prevention systems, and data encryption systems, Providing guidance and training to other IT professionals and business stakeholders on security best practices and policies and Conducting security audits to ensure that security measures are being properly implemented and maintained.",
//     "type_of_job": "Full-Time Employment",
//     "duration_of_job": "N/A",
//     "salary": "65-75k/Month",
//     "deadline": "09-07-2023",
//     "company": "Cisco"
// }