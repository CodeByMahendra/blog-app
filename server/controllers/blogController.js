import mongoose from "mongoose";
import Blog from "../models/blogModel.js"
import User from "../models/userModel.js";

export const allBlogsController = async (req,res)=>{
    try {
        const blogs = await Blog.find({}).populate('user');
        if(!blogs){
            return res.status(404).json({
                message:"Blogs are not found",
                success:false
            })
        }
        return res.status(200).json({blogCount: blogs.length ,  message:"All blogs are",success:true,blogs})
    } catch (error) {
        console.log(error)
    }

}


export const createBlogs = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        // Validate input
        if (!title || !description || !image || !user) {
            return res.status(401).json({ message: "All fields are required", success: false });
        }

        // Check if user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(401).json({ message: "Unable to find user", success: false });
        }

        // Create a new blog
        const newBlogs = new Blog({ title, description, image, user });
        await newBlogs.save();

        // Link blog to the user
        existingUser.blogs.push(newBlogs);
        await existingUser.save();

        // Respond with success
        return res.status(200).json({
            message: "New blog added successfully",
            success: true,
            blogdata: newBlogs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const updateBlog = async (req,res)=>{
    try {
        const {id} =req.params;
        
        const{title,description,image} = req.body;

        const blog = await Blog.findByIdAndUpdate(id,{...req.body},{new:true});

        return res.status(200).json({message:" blogs update successfully", success:true,blog})


    } catch (error) {
        console.log(error)   
    }
}


export const getBlogById = async (req,res)=>{
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).send({
            success: false,
            message: "blog not found with this is",
          });
        }
        return res.status(200).send({
          success: true,
          message: "fetch single blog",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error while getting single blog",
          error,
        });
      }

}

export const deleteBlogById = async (req,res)=>{
    try {
    const blog = await Blog.findByIdAndDelete(req.params.id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
 
      return res.status(200).json({message:" your blog is delete :", success:true,blog})
        
    } catch (error) {
        console.log(error)
    }
}


export const userBlogController = async (req,res)=>{
    try {
        const userBlog = await User.findById(req.params.id).populate("blogs")
       
        return res.status(200).json({message:"users blogs",userBlog ,success:true})
    } catch (error) {
        
    }
}
