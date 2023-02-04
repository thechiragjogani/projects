const mongoose = require("mongoose");

let mongoDB = process.env.MONGO_DB_URI

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;