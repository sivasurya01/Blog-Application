const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
function connection() {
  mongoose
    .connect("mongodb://localhost:27017/blogapplication", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
app.get("/", (req, res) => {
  res.send("Hello server is Running!");
});
app.use("/register", require("./controller/user/usercontrol"));
app.use("/login", require("./controller/user/usercontrol"));
app.use("/blog", require("./controller/blog/blogcontrol"));

app.listen(3000, () => {
  app.use((req, res, next) => {
    next(createError.NotFound());
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  });
  connection();
  console.log("application runing");
});
