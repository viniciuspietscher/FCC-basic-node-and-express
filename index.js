require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

// Use body-parser to parse POST Requests
app.use(bodyParser.urlencoded({extended: false}));
// Get data from POST requests
app.post("/name", (req, res) => {
  res.json({"name": `${req.body.first} ${req.body.last}`});
})

// root level request logger middleware for all methods
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})
// serve index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/views/index.html")
});
// json route
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") { // checks .env file for env variable MESSAGE_STYLE
    res.json({"message": "Hello json".toUpperCase()})
  } else {
    res.json({"message": "Hello json"})
  }
})
// chain middleware to create a time server
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time})
})
// get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  res.json({"echo": req.params.word})
})
// get query parameter input from the client
app.get("/name", (req, res) => {
  res.json({"name": `${req.query.first} ${req.query.last}`})
})
// serve static assets
app.use("/public", express.static(__dirname + "/public"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})