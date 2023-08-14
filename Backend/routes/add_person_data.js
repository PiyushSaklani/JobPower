const express = require("express");
const router = express.Router();

const Person_Data = require("../models/person_data");

router.post('/', function (req, res) {

  const new_person = new Person_Data({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    gender: req.body.gender,
    mail: req.body.mail,
    phone_number: req.body.phone_number,
    school: req.body.school,
    board: req.body.board,
    university: req.body.university,
    study_field: req.body.study_field,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    skills: req.body.skills
  });

  Person_Data.findOneAndDelete({ mail: new_person.mail }) // Find and delete any existing person with the same email
    .then(() => {
      new_person.save() // Add the new person to the database
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;