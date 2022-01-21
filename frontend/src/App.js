import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

import OrderScreen from "./screens/OrderScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart">
              <Route path=":id" element={<CartScreen />} />
              <Route path="" element={<CartScreen />} />
            </Route>
            <Route path="/">
              <Route path="login" element={<LoginScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/login">
              <Route path="shipping" element={<ShippingScreen />} />
            </Route>
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin">
              <Route path="userlist" element={<UserListScreen />} />
              <Route path="user/*" element={<UserEditScreen />} />
              <Route path="user/:id/*" element={<UserEditScreen />} />
              <Route path="productlist" element={<ProductListScreen />} />
              <Route path="productlist/:pageNumber" element={<ProductListScreen />} />
              <Route path="product" element={<ProductEditScreen />} />
              <Route path="product/:id/*" element={<ProductEditScreen />} />
    
              <Route path="orderlist" element={<OrderListScreen />} />
            </Route>
            <Route path="/search">
              <Route path=":keyword" element={<HomeScreen />} />
              <Route path=":keyword/page/:pageNumber" element={<HomeScreen />} />
              
            </Route>
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            
            <Route path="/order">
              <Route path=":id" element={<OrderScreen />} />
            </Route>

            <Route path="/page">
              <Route path=":pageNumber" element={<HomeScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
