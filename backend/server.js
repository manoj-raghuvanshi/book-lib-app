const express = require('express');

const bodyParser = require("body-parser");

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", (req, res, next) => {
    res.send("api works");
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log("api is up");
});

module.exports = app;
