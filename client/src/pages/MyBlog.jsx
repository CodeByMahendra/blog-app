import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <>
      <Navbar />
      <div className="show-blog">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.createdAt}
            />
          ))
        ) : (
          <div className="create-blog">
            <h1>You Have'nt Created a blog..!!</h1>

            <button className="btn" onClick={() => navigate("/create-blog")}>
              Create a Blog Now ...
            </button>
          </div>
        )}
      </div> 


    </>
  );
};

export default MyBlog;
