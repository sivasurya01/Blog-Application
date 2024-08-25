const router = require("express").Router();
const blogmodel = require("../../models/blogmodel");
router.get("/", async (req, res) => {
  try {
    await blogmodel
      .find({})
      .then((blogs) => res.send(blogs))
      .catch((e) => res.send(e));
  } catch (error) {
    console.log(error);
  }
});
router.post("/add", (req, res) => {
  try {
    const data = req.body;
    blogmodel
      .create(data)
      .then((blog) => res.json(blog))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.get("/blog/:id", (req, res) => {
  let id = req.params.id;
  blogmodel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
router.patch("/update/:id", (req, res) => {
  blogmodel
    .findByIdAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
router.delete("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    blogmodel.findByIdAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
