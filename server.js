const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require("passport");

const app = express();

const PORT = 8080;
const DB_NAME = "Testing"

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");
// ------------
// Routes by AP
var add_jobs = require("./Backend/routes/add_jobs");
var get_jobs = require("./Backend/routes/get_jobs");
var add_applied_jobs = require("./Backend/routes/add_applied_jobs");
var get_applied_jobs = require("./Backend/routes/get_applied_jobs");
var add_person_data = require("./Backend/routes/add_person_data");
var get_person_data = require("./Backend/routes/get_person_data");
var add_rperson_data = require("./Backend/routes/add_r_person_data");
var get_rperson_data = require("./Backend/routes/get_r_person_data");
var get_posted_jobs = require("./Backend/routes/get_posted_jobs");
var check_user = require("./Backend/routes/check_user");
var add_user = require("./Backend/routes/add_user");
var all_applicants = require("./Backend/routes/get_all_applied_jobs");



app.use(cors());
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// To localhost
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);
// ------------
app.use("/add_jobs_data",add_jobs)
app.use("/get_jobs_data",get_jobs)
app.use("/add_applied_jobs_data",add_applied_jobs)
app.use("/get_applied_jobs_data",get_applied_jobs)
app.use("/add_person_data",add_person_data)
app.use("/get_person_data",get_person_data)
app.use("/add_rperson_data",add_rperson_data)
app.use("/get_rperson_data",get_rperson_data)
app.use("/get_posted_jobs",get_posted_jobs)
app.use("/add_user",add_user)
app.use("/check_user",check_user)
app.use("/all_applicants",all_applicants)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
