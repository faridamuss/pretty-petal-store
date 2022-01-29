import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, successProductReview]);

  // const addToCartHandler = () => {
  //   navigate(`../cart/${params.id}? qty = ${qty}`)

  // }
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    navigate("/cart");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="shadow btn btn-secondary my-4" to="/">
        Go Back to Products
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6} style={{ position: "center"}} >
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6} className="long shadow btn btn-light my-0"> 
              <ListGroup
                variant="flush"
                className="p-3 mb-5 bg-white rounded"
              >
                <ListGroup.Item>
                  <h3 style={{padding: "20px"}} >{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item style={{padding: "20px"}}>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} customer reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item style={{padding: "30px"}}>
                {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            
          </Row>
          <Row>
            <Col md={15} className="my-sm-1">
            <h2 style={{color:"#872f5e", padding: "20px" }}><strong>Reviews</strong></h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush" className="shadow p-3 mb-5 bg-white rounded">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                <h2 style={{color:"#872f5e", }}><strong>Write a customer review</strong></h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating mt-4" >
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment mt-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary mt-2">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* ADD TO CART */}
          <Col md={4} className="long shadow d-block mr-0 ml-auto">
              <Card>
                <ListGroup variant="flush" className="p-3 mb-4 bg-white rounded">
                  <ListGroup.Item>
                    <Row>
                      <Col style={{color:"#872f5e"}} >Price:</Col>
                      <Col>
                        <strong style={{color:"#872f5e"}}>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col style={{color:"#872f5e"}}>Availability:</Col>
                      <Col style={{color:"#872f5e"}}>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col style={{color:"#872f5e"}}>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item style={{color:"#872f5e"}}>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-dark"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
        </>
      )}
    </>
  );
};
export default ProductScreen;
