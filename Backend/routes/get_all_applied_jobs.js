var express = require("express");
var router = express.Router();

const AppliedJobs = require("../models/applied");

router.get('/', function(req, res) {
  AppliedJobs.find({}, function(err, appliedjobs) {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching jobs');
    } else {
      res.json(appliedjobs);
    }
  });
});

module.exports = router;