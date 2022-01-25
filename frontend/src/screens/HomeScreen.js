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
      <h1 style={{ color: "#980F5A", padding: "10px" }}><strong>LATEST PRODUCTS</strong>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row >
            {products.map((product) => (
              <Col key={product._id} sm={19} md={8} lg={3} xl={3}>
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
