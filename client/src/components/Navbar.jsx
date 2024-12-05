import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";

const Navbar = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  console.log(isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      dispatch(authActions.logout());
      navigate("/login");
      localStorage.clear();

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="nav">
      <h1 className="nav-title">Blog App</h1>
      <div className="nav-menus">
        <ul className="nav-1">
          <li>
            <Link to="/myBlogs">My Blog</Link>
          </li>
          <li>
            <Link to="/allBlogs">All Blog</Link>
          </li>
          <li>
            <Link to="/create-blog">Create-Blog</Link>
          </li>
        </ul>
      </div>
      <div className="nav-menus">
        <ul className="nav-2">
         

          {!isLogin && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              
            </>
          )}

             <li>
            <Link to="/about-us">About-Us</Link>
          </li>
          {isLogin &&  (          
              <>
              <li >
                <Link onClick={logoutHandler}>logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
