import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col style={{color: "#8F4068"}} className="text-center py-3"><strong>Copyright &copy; Pretty Petals, LHL Final Project, 2022</strong>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
