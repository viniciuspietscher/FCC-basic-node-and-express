require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/views/index.html")
});
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": "Hello json".toUpperCase()})
  } else {
    res.json({"message": "Hello json"})
  }
})
app.use("/public", express.static(__dirname + "/public"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})