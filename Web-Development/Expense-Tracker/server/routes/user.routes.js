const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            success: false,
            message: "Please add email or password",
            data: null
        }); 
    }
    User.findOne({ email: email })
        .then(async (savedUser) => {
            if (!savedUser) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Email ID or Password",
                    data: null
                });
            }
            // check password
            let user = await User.login(email,password)
            console.log("authenticated :" , user)
            if (user) {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                const { id, name, email } = savedUser;
                res.json({
                    success: true,
                    message: "Login successfully!",
                    data: { id, name, email, token: 'Bearer ' + token }
                });
            } else {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid Email ID or Password",
                        data: null
                    });
            }
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "something went wrong!",
                data: null
            })
        });
});

router.post("/sign-up", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({
            success: false,
            message: "Please add all fields!",
            data: null
        });
    }

    if (password.length < 4 || password.length > 8) {
        return res.status(422).json({
            success: false,
            message: "Password length must be 4 - 8",
            data: null
        });
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                console.log("saved user :",savedUser)
                return res.status(400).json({
                    success: false,
                    message: "User already exists with that email.",
                    data: null
                });
            }




            // creating a new user
            const user = new User({ name, email, password });
            console.log("user ",user)
            user
                .save()
                .then((data) => {
                    const { id, name, email } = data;
                    const token = jwt.sign({ _id: data._id }, JWT_SECRET);
                    res.json({
                        success: true,
                        message: "Sign up successfully!",
                        data: { id, name, email, token: 'Bearer ' + token }
                    });
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        message: err,
                        data: null
                    });
                });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "something went wrong!",
                data: null
            })
        });
})

module.exports = router
