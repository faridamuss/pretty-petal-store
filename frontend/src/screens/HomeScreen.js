import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="long shadow btn btn-light">
          Go Back
        </Link>
      )}
      <h1 style={{padding: "5px", color:"#980F5A" }}><strong>WELCOME TO OUR FLOWER STORE</strong>
      </h1><p style={{padding: "10px", fontSize:"16px"}}>Welcome to our Pretty Petal store. Our store is open for curb side pick up Wednesday to Saturday. We deliver city wide & to the Ottawa surroundings. Tuesday to Saturday. Please contact us by phone or email for your needs or simply order here. Fresh new inventory arrives every Tuesday afternoon. We have new products available on our website - changing with the seasons. Let flowers bring some cheer to you from us. Thank You 💐💐💐</p>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={20} md={9} lg={5} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
