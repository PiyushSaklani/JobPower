var express = require("express");
var router = express.Router();

const Jobs = require("../models/jobs");

router.get('/',function(req,res){
    Jobs.find(function(err,jobs){
        if(err){
            console.log(err);
        }else{
            res.json(jobs);
        }
    })
})

module.exports = router;