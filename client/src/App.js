import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Log from "./pages/Log";
import Signup from "./pages/Signup";
import MyBlog from "./pages/MyBlog";
import AllBlogs from "./pages/AllBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <AllBlogs />,
  },
  {
    path: "/login",
    element: <Log />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/myBlogs",
    element: <MyBlog />,
  },
  {
    path: "/allBlogs",
    element: <AllBlogs />,
  },
  {
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    path: "/blog-details/:id",
    element: <BlogDetails />,
  },
  {
    path:"/about-us",
    element:<About/>
  },{
    path:"*",
    element:<ErrorPage/>
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
