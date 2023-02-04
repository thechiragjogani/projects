const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const JWT_SECRET = process.env.JWT_SECRET;

const requireLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "you must be logged in",
            data: null
        });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "you must be logged in",
                data: null
            });
        }
        const { _id } = payload;
        User.findById(_id).then((userData) => {
            req.user = userData
            next();
        });
    });
};

module.exports = requireLogin