import React, { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Form, Button, Row, Col,Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const navigate = useNavigate();

  //const { search } = useLocation();
  //const { location} = useLocation();
  //   const redirect = [...searchParams].length > 0 ? [...searchParams][0][1] : "/";
  //const redirect = new URLSearchParams(search).get('querystringkey');
  //const redirect = location.search ? location.search.split('=')[1] : '/'
  const [showMessage, setShowMessage ] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        if(success) {  setShowMessage(true); } 
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
}
      if (!user.name || success) {
       dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        // console.log(user.name);
        setName(user.name);
        setEmail(user.email);
      }
    }
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     if (success) {
    //       dispatch({ type: USER_UPDATE_PROFILE_RESET });
    //     }
    //   }, 3000);
   
    //   return () => clearTimeout(timer);
    // }, [success, dispatch]);

  }, [dispatch, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return ( <Row>
    <Col md={3}>
      <h2>User Profile</h2>
      <Toast show={showMessage} delay={3000} autohide>
          <Toast.Body>Profile updated</Toast.Body>
 </Toast>
      {message && <Message variant='danger'>{message}</Message>}
      {}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </Col>
    <Col md={9}>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
