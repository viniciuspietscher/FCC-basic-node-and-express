const express = require('express');
const app = express();
const port = 3000

app.get("/", function(req, res) {
  // res.send("Hello Express")
  // absolutePath = __dirname + "views/index.html"
  res.sendFile(__dirname+"/views/index.html")
});
app.get("/json", function(req, res) {
  res.json({"message": "Hello json"})
})
app.use("/public", express.static(__dirname + "/public"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})