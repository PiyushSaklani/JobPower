var express = require("express");
var router = express.Router();

const Jobs = require("../models/jobs");

router.post('/',function(req,res){

    const new_job = new Jobs({
        job_title:req.body.job_title,
        date_of_post:req.body.date_of_post,
        discription:req.body.discription,
        type_of_job:req.body.type_of_job,
        duration_of_job:req.body.duration_of_job,
        salary:req.body.salary,
        deadline:req.body.deadline,
        company:req.body.company,
        mail:req.body.mail,
    })

    new_job.save().then(job => {
        res.status(200).json(job);
    }).catch(err => {
        res.status(400).send(err);
    })
})

module.exports = router;