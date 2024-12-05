import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button ,TextField,Typography} from "@mui/material";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/v1/user/register";
      console.log("Sending request to:", url);
      console.log("Request data:", user);

      const res = await axios.post(url, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUser({ fullName: "", username: "", password: "", email: "" }); // Reset form
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
      console.log("Error details:", error);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={onSubmitHandler} className="form">

        {/* <div className="signup"> */}

        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >

          

   <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            paddingTop={2}
            textAlign="center"
          >
            Signup
          </Typography>   
 
           <div className="signup-1">
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              type="text"
              placeholder="Enter your full-name"
            />
          </div>

          

          <div className="signup-1">
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter your user-name"
            />
          </div>

       

<div className="signup-1">
            <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Enter your E-mail"
            />
          </div>
        


          

<div className="signup-1">
            <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
            />
          </div>
         

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 1 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 1 }}
          >
            Have account? Please Login
          </Button>

       
        
         </Box>
      </form>
    </>
  );
};

export default Signup;

