const express = require("express");
const {
  getAllBlogoController,
  getBlogByIdController,
  createBlogoController,
  updateBlogoController,
  deleteBlogoController,
  userBlogController,
} = require("../controllers/blogController");

//router object
const router = express.Router();

// routes

//GET || ALL BLOGS
router.get("/all-blog", getAllBlogoController);

//GET || Single bologe Detils
router.get("/single-blog/:id", getBlogByIdController);

//POST || Create Blog
router.post("/create-blog", createBlogoController);

//PUT  || update blog
router.put("/update-blog/:id", updateBlogoController);

//DELETE  || update blog
router.delete("/delete-blog/:id", deleteBlogoController);

//GET || User Blog

router.get("/user-blg/:id", userBlogController);
module.exports = router;
