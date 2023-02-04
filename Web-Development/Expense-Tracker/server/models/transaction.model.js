const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema({
    date: {
        type: String,
        trim: true,
        required: true,
    },
    method: {
        type: String,
        trim: true,
        required: true,
        enum: ["Account", "Cash", "UPI"]
    },
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    income: {
        type: Boolean,
        required: true
    },
    expence: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: ObjectId,
        ref: "User",
    },
})

exports.Transaction = mongoose.model("Transaction", TransactionSchema)