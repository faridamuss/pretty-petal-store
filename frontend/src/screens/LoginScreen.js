import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin;
  const navigate = useNavigate();
  //const { search } = useLocation(); 
  //const { location} = useLocation();
  const redirect = [...searchParams].length > 0 ? [...searchParams][0][1] : "/";
  //const redirect = new URLSearchParams(search).get('querystringkey');
  //const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
  };

  return (
    <FormContainer>
      <h1 style={{color:"#872f5e", }}><strong>SIGN IN</strong></h1>
      {error && <Message variant = 'danger'> {error} </Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="form-label mt-2">
          <Form.Label><strong>Email Address</strong></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="form-label mt-2">
          <Form.Label><strong>Password</strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="form-label mt-2">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
