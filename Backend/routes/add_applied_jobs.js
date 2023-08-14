var express = require("express");
var router = express.Router();

const Applied_Jobs = require("../models/applied");

router.post('/',function(req,res){

    const new_applied_job = new Applied_Jobs({
        job_title:req.body.job_title,
        date_of_applied:req.body.date_of_applied,
        type_of_job:req.body.type_of_job,
        salary:req.body.salary,
        company:req.body.company,
        email:req.body.email,
    })

    new_applied_job.save().then(job => {
        res.status(200).json(job);
    }).catch(err => {
        res.status(400).send(err);
    })
})

module.exports = router;