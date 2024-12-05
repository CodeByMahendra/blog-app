import express from 'express';
import { allBlogsController, createBlogs, deleteBlogById, getBlogById, updateBlog, userBlogController } from '../controllers/blogController.js';
const router = express.Router()

// get all blogs
router.get("/all-blog",allBlogsController)
router.post('/createBlog',createBlogs)
router.post('/updateBlog/:id',updateBlog)
router.get("/getBlog/:id",getBlogById)
router.delete("/delete/:id",deleteBlogById)
router.get("/user-blog/:id",userBlogController)
export default router