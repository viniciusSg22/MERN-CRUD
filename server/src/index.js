require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PI = require("./models/People");
const PM = require("./models/Post");

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
  PM.find({}).then((post) => {
    res.send(post);
  });
});

app.get("/readOne/:_id", async (req, res) => {
  PM.findById({ _id: req.params._id }).then((post) => {
    res.send(post);
  });
});

app.post("/create", async (req, res) => {
  console.log(req.body)
  PM.create(req.body).then((post) => {
    res.send(post);
  });
});

app.put("/update/:_id", async (req, res) => {
  PM.findByIdAndUpdate({ _id: req.params._id }, req.body).then(() => {
    PM.findOne({ _id: req.params._id }).then((people) => {
      res.send(people);
    });
  });
});

app.delete("/delete/:_id", async (req, res) => {
  PM.findByIdAndDelete({ _id: req.params._id }).then(() => {
    res.send("Post deleted");
  });
});

app.listen(port, () => {
  console.log("Server listining on port ", port);
});
