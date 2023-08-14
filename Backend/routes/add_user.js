var express = require("express");
var router = express.Router();

const User = require("../../models/users.model"); // add User model

router.post('/',function(req,res){

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

    newUser.save().then(job => {
        res.status(200).json(job);
    }).catch(err => {
        res.status(400).send(err);
    })
})

module.exports = router;
