const express = require('express')
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');

swaggerDocument = require('./swagger.json');
dotenv.config();

app.use(cors({
    origin: "*"
}));

const port = process.env.PORT;
const db = require('./db/connection.js')

// connect to the database
db.on('open', () => {
    console.log('Successfully connected to the database!')
    const server = app.listen(port, () => console.log(`listening on ${port}`));
}).on('error', (err) => {
    console.log("error: - ", err)
})

app.use(express.json())
// test route
app.get("/", (req, res) => {
    res.send("Server is running!")
})
// user auth route
app.use(require("./routes/user.routes"))
// transaction GET POST route
app.use(require("./routes/transaction.routes"))

// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));