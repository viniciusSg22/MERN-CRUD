require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PI = require("./models/People");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

app.get("/read", async (req, res) => {
  PI.find({}).then((people) => {
    res.send(people);
  });
});

app.get("/readOne/:_id", async (req, res) => {
  PI.findById({ _id: req.params._id }).then((people) => {
    res.send(people);
  });
});

app.post("/create", async (req, res) => {
  PI.create(req.body).then((people) => {
    res.send(people);
  });
});

app.put("/update/:_id", async (req, res) => {
  let _id = "622ba5f17314d126cd6239af";
  PI.findByIdAndUpdate({ _id: req.params._id }, req.body).then(() => {
    PI.findOne({ _id: req.params._id }).then((people) => {
      res.send(people);
    });
  });
});

app.delete("/delete/:_id", async (req, res) => {
  let _id = "622ba5f17314d126cd6239af";
  PI.findByIdAndDelete({ _id: req.params._id }).then(() => {
    res.send("People deleted");
  });
});

app.listen(port, () => {
  console.log("Server listining on port ", port);
});
