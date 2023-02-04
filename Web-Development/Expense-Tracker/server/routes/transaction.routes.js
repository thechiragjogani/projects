const express = require("express");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const { Transaction } = require("../models/transaction.model")

router.get("/transaction", requireLogin, (req, res) => {
    Transaction.find({ addedBy: req.user._id })
        .then(results => {
            res.json({
                success: true,
                message: "Transactions fetched successfully!",
                data: results
            })
        })
        .catch(err => {
            console.log(err)
            res.json({
                success: false,
                message: "Something went wrong!",
                data: null
            })
        })
})

router.post("/transaction", requireLogin, (req, res) => {
    const { date, method, amount, desc, income, expence } = req.body;
    if (!date || !method || !amount) {
        return res.json({
            success: false,
            message: "please add all the fields!",
            data: null
        })
    }

    req.user.password = undefined;
    req.user.__v = undefined;

    if (Number(amount) === 0 || Number(amount) < 0) {
        return res.json({
            success: false,
            message: "please add valid amount!",
            data: null
        })
    }

    // take only 2 decimal digit
    let newAmount = Number(amount).toFixed(2)
    const transaction = new Transaction({
        date, method, amount: newAmount, desc, income, expence, addedBy: req.user
    })

    transaction.save()
        .then(result => {
            result.addedBy = result.addedBy._id
            res.json({
                success: true,
                message: "Transaction added successfully!",
                data: result
            })
        })
        .catch(err => {
            console.log(err)
            res.json({
                success: false,
                message: "Something went wrong!",
                data: null
            })
        })
})

module.exports = router

