const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET ALL BLOG
exports.getAllBlogoController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Bloge Found",
      });
    }
    return res.status(200).send({
      userCount: blogs.length,
      success: true,
      message: "all blogs data",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error While Getting Blogs",
      success: false,
      error: error.message,
    });
  }
};

//GET SINGLE BLOG
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found eith this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fatch Single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error While Getting Single Blogs",
      success: false,
      error: error.message,
    });
  }
};

// //create BLOG
exports.createBlogoController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "please Provide all fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find User",
      });
    }

    const newBlog = new blogModel({ title, description, image });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created !",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error While Creting Blogs",
      success: false,
      error: error.message,
    });
  }
};

//update BLOG
exports.updateBlogoController = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Bloge Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error While Updating Blogs",
      success: false,
      error: error.message,
    });
  }
};

//delete BLOG
// exports.deleteBlogoController = async (req, res) => {
//   try {
//     const blog = await blogModel
//     .findByIdAndDelete(req.params.id)
//       .populate("user");

//       await blog.user.blogs.pull(blog);
//     await blog.user.save();
//     return res.status(200).send({
//       success: true,
//       message: "Blog Deleted!",
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       message: "Error While Deleting Blogs",
//       success: false,
//       error: error.message,
//     });
//   }
// };

exports.deleteBlogoController = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

//GET USER BLOG
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};
