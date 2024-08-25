import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

function Blogaction() {
  const { id } = useParams();
  console.log(id);
  const [blogdata, setBlogData] = useState({
    title: "",
    image: "",
    description: "",
  });
  console.log(blogdata);
  const getBlogData = async () => {
    await axios
      .get("http://localhost:3000/blog/blog/" + id)
      .then((blog) => {
        console.log(blog), setBlogData(blog.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getBlogData();
  }, [id]);
  const navigate = useNavigate();
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/blog/add", blogdata)
        .then((res) => {
          console.log(res.data), navigate("/blogs");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdeBlog = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/blog/update/${id}`, blogdata)
        .then((res) => {
          console.log(res), navigate("/blogs");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="mt-3 text-3xl font-semibold text-center text-primary">
        {id && id != "add" ? "Update" : "Add"} Blog
      </h1>
      <div className="d-flex justify-content-center align-items-center">
        <Card className="bg-white p-4 mt-4 w-50">
          <Form
            className="mt-6 p-2 "
            onSubmit={id && id != "add" ? handleUpdeBlog : handleAddBlog}
          >
            <Row className="d-flex flex-column justify-content-center align-content-center">
              <Col lg="6">
                <Form.Group className=" mb-3">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    required
                    onChange={(e) =>
                      setBlogData({ ...blogdata, title: e.target.value })
                    }
                    defaultValue={blogdata.title}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className=" mb-3">
                  <Form.Label>Blog Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    required
                    onChange={(e) =>
                      setBlogData({ ...blogdata, description: e.target.value })
                    }
                    defaultValue={blogdata.description}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className=" mb-3">
                  <Form.Label>Blog Image Url</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="image"
                    required
                    onChange={(e) =>
                      setBlogData({ ...blogdata, image: e.target.value })
                    }
                    defaultValue={blogdata.image}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-6">
              <Button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                {id && id != "add" ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Blogaction;
