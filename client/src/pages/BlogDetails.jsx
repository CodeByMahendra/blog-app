import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [inputs, setInputs] = useState({});
  const [blog, setBlog] = useState({});
  const id = useParams().id;

  console.log("id=",id)
  const navigate = useNavigate();

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/getBlog/${id}`
      );
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/blog/updateBlog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      console.log("data==", data);

      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/myBlogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Box
          width={"35%"}
          borderRadius={5}
          padding={2}
          margin="auto"
          boxShadow={"20px 20px 20px 6px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={1}
            color="gray"
          >
            Update A Hub
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 1, fontSize: "17px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 1, fontSize: "17px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 1, fontSize: "17px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
