import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const handleonsubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/register/login`, { email, password })
      .then((user) => {
        console.log(user, "sucess");
        if (user.status == 200) {
          navigate("/blogs");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please Enter Valid Username or Password");
      });
  };
  return (
    <div>
      <div>
        <ToastContainer />

        <div>
          <h1 className="text-3xl font-semibold text-center text-primary">
            Sign In
          </h1>
          <div className="d-flex justify-content-center align-items-center">
            <Card className="bg-white p-4 mt-4 w-50">
              <Form className="mt-6 p-2 " onSubmit={handleonsubmit}>
                <Row className="d-flex flex-column justify-content-center align-content-center">
                  <Col lg="6">
                    <Form.Group className=" mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="name@example.com"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        type={type}
                        name="password"
                        required
                        value={password}
                      />
                      <InputGroup.Text id="basic-addon1">
                        {type === "password" ? (
                          <IoEyeOutline
                            onClick={() => setType("text")}
                            className="cursor-pointer text-gray-500"
                          />
                        ) : (
                          <IoEyeOffOutline
                            onClick={() => setType("password")}
                            className="cursor-pointer text-gray-500"
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center mt-6">
                  <Button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  >
                    Login
                  </Button>
                </div>
                <p className="mt-2 text-xs font-light text-center text-gray-700">
                  {" "}
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
