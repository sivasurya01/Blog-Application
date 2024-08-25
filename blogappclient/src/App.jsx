import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Blogs from "./Pages/Blogs";
import Blogaction from "./Pages/Blogaction";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/blogs",
      element: <Blogs />,
    },
    {
      path: "/blogaction/:id",
      element: <Blogaction />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
