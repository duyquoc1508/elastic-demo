
const app = require("express")();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  console.log("A new request was here");
  res.send("Hello there");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
