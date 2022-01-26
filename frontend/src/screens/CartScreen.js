import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const navigate = useNavigate()
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // console.log('remove');
    dispatch(removeFromCart(id));
   
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8} >
      <h2 style={{color:"#980F5A", padding: "5px"}}><strong>SHOPPING CART</strong></h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={4} style={{padding: "10px", align: "right"}}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2} style={{padding: "10px", align: "right"}}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}style={{padding: "10px", textAlign: "center"}}>${item.price}</Col>
                  <Col md={2} style={{padding: "10px", textAlign: "center"}}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} style={{padding: "10px", align: "right"}}>
                    <Button
                      type="button"
                      variant="btn btn-outline-primary"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                    Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} style={{padding: "40px", align: "right"}}>
        <Card>
          <ListGroup variant="long shadow flush">
            <ListGroup.Item>
              <h2 styling={{padding: "20px", textAlign: "center"}}>
                Subtotal items (
                {cartItems.reduce((acc, item) => (parseInt(acc) + parseInt( item.qty)), 0)})
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="long shadow btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;
