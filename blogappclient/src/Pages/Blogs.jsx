import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  console.log(blogs);
  const getBlogs = async () => {
    axios
      .get("http://localhost:3000/blog")
      .then((blogs) => setBlogs(blogs.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getBlogs();
  }, []);
  const blogDelete = async (id) => {
    await axios
      .delete("http://localhost:3000/blog/delete/" + id)
      .then((res) => {
        console.log(res), window.location.reload();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="p-2">
      <div className="mt-4 d-flex justify-content-end">
        <Link to={"/blogaction/add"}>
          <Button>Add Blog</Button>
        </Link>
      </div>
      <Row style={{ overflow: "hidden" }}>
        {blogs?.map((data, index) => {
          return (
            <Col lg="4">
              <BlogCard
                key={index}
                title={data.title}
                description={data.description}
                img={
                  "https://thumbs.dreamstime.com/b/ontwerp-zonder-titel-327731093.jpg"
                }
                id={data._id}
                blogDelete={blogDelete}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Blogs;
