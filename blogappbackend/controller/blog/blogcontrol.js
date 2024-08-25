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
      req.params.id, // Use req.params.id to get the ID from the URL
      {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true } // Option to return the updated document
    )
    .then((updatedBlog) => {
      if (updatedBlog) {
        res.status(200).json(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBlog = await blogmodel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog deleted successfully", data: deletedBlog });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the blog" });
  }
});

module.exports = router;
