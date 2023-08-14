var express = require("express");
var router = express.Router();

const PostedJobs = require("../models/jobs");

router.get('/:email', function(req, res) {
  const email = req.params.email;

  PostedJobs.find({ mail: email }, function(err, appliedjobs) {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching jobs');
    } else {
        console.log(appliedjobs)
      res.json(appliedjobs);
    }
  });
});

module.exports = router;