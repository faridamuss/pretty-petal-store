import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  
  return (
    <Form onSubmit={submitHandler} form-inline my-2 my-lg-0>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='form-control mr-lg-3'
      ></Form.Control>
      <Button  type='submit' variant='btn btn-secondary' className='d-flex'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox;
