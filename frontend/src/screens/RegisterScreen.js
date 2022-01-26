import React, { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);


  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();

  //const { search } = useLocation();
  //const { location} = useLocation();
  const redirect = [...searchParams].length > 0 ? [...searchParams][0][1] : "/";
  //const redirect = new URLSearchParams(search).get('querystringkey');
  //const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 style={{color:"#872f5e", }}><strong>REGISTER AS A NEW USER</strong></h1>
      {message && <Message variant="danger"> {message} </Message>}
      {error && <Message variant="danger"> {error} </Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="form-label mt-2"> 
          <Form.Label style={{color:"#980F5A", paddingTop: "5px", fontSize:"18px" }}><strong>Name</strong></Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="form-label mt-2">
          <Form.Label style={{color:"#980F5A", paddingTop: "5px", fontSize:"18px" }} ><strong>Email Address</strong></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="form-label mt-2">
          <Form.Label style={{color:"#980F5A", paddingTop: "5px", fontSize:"18px" }}><strong>Password</strong></Form.Label>
          <Form.Control 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="form-label mt-2">
          <Form.Label style={{color:"#980F5A", paddingTop: "5px", fontSize:"18px" }} ><strong>Confirm Password</strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="form-label mt-2">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col style={{color:"#980F5A", paddingTop: "10px", fontSize:"18px", textAlign: 'left'}}>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
