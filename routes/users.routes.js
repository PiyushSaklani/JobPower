var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");

// Load input validation
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jobpower14@gmail.com",
        pass: "xcsdbolaiymfadra"
    }
})

// Load User model
const User = require("../models/users.model");
const { use } = require("passport");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// Getting one user
router.get("/:id", function (req, res) {
    User.findById(req.params.id).then(user =>
        res.json(user)
    )
        .catch(err => console.log(err));
});

// POST request 
// Add a user to db
router.post("/signup", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.status(200).json(user);
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                });
            });
        }
    });
});

// PUT Request
// Edit User Details
router.route('/edit_profile/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            res.json(data)
            console.log('Student updated successfully !')
        }
    })
})


// POST request 
// Login
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            email: email,
                            name: user.name,
                            role: user.role
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: " Password incorrect" });
            }
        });
    });
});

// Sending Link for reset password
router.post("/sendpasswordLink", async (req, res) => {
    const email = req.body.email;
    // console.log(req.body)

    if (!email) {
        return res.status(401).json({ status: 401, message: "Enter your email" })
    }
    try {
        const userFind = await User.findOne({ email: email });
        console.log("userfind", userFind)

        //token for reset password
        const token = jwt.sign({ _id: userFind._id }, keys.secretOrKey, {
            expiresIn: "120s"
        });
        // console.log("token", token)

        const mailoptions = {
            from: "jobpower14@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `This link is valid for 2 minutes http://localhost:3000/resetpassword/${userFind._id}/${token}`
        }

        transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                console.log("Error", error);
                res.status(401).json({ status: 401, message: "email not send" })
            } else {
                console.log("Email sent", info.response);
                res.status(201).json({ status: 201, message: "Email sent Successfully" })
            }
        })
    } catch (error) {
        res.status(401).json({ status: 401, message: "Invalid User" })
    }

});

// verify user for forgot password time
// router.get("/resetpassword/:id/:token", async (req, res) => {
//     const { id, token } = req.params;

//     try {
//         const verifyToken = jwt.verify(token, keysecret);
//         console.log(verifyToken)

//         const validuser = await User.findOne({ _id: id });

//         console.log(verifyToken)

//         if (validuser && verifyToken._id) {
//             res.status(201).json({ status: 201, validuser })
//         } else {
//             res.status(401).json({ status: 401, message: "user not exist" })
//         }

//     } catch (error) {
//         res.status(401).json({ status: 401, error })
//     }
// });

// Updating password
router.post("/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(password)

    try {
        const validuser = await User.findOne({ _id: id});

        // const verifyToken = jwt.verify(token, keysecret);

        if (validuser) {
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpass = await User.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setnewuserpass.save();
            res.status(201).json({ status: 201, setnewuserpass })

        } else {
            res.status(401).json({ status: 401, message: "user does not exist" })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})

router.delete('/del_user/:id', (req, res) => {
    User.findById(req.params.id).then(user =>
        user.remove().then(() => res.json({ success: true }))
    )
        .catch(err => res.status(404).json({ success: false }));
});

//send Email link for reset password
// router.post('/sendpasswordLink', async (res, req) => {
//     const email = req.body;
//     console.log(req.body)

//     if (!email){
//         return res.status(401).json({status:401, message: "Enter your email"})
//     }
//     try {
//         const userFind = await User.findOne({email:email});
//         console.log("userfind", userFind)
//     } catch (error) {

//     }
// });

module.exports = router;

