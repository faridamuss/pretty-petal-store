import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button
} from "react-router-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p.id === match.params.id);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text=></Rating>
                </ListGroup.Item>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
