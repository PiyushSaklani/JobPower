var express = require("express");
var router = express.Router();

const User = require("../../models/users.model"); // add User model

router.post('/:email', function(req, res) {
  const email = req.params.email;
//   console.log(email);

  User.findOne({ email: email }, function(err, user) { // check if user with email exists
    if (err) {
      console.log(err);
      res.status(500).send('Error checking user');
    } else {
      if (user) {
        // console.log('User with email ' + email + ' exists.');
        res.send(user); // send response
      } else {
        // console.log('User with email ' + email + ' does not exist.');
        res.send(false); // send response
      }
    }
  });
});

module.exports = router;