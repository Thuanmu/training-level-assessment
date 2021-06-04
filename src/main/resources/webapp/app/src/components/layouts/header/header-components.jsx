import React from "react";
import { Container, NavbarBrand, NavLink, Row } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="../../../assets/images/TrainingLevel2.png" alt="Logo" width='100%'height='100%' />
  </div>
);

export const Brand = props => (
    <NavbarBrand href="/" className="brand-logo">
      <span className="brand-title">TrainingLevel100m</span>
    </NavbarBrand>
  );

export const Home = props => (
    <div>
      <Container fluid>
        <h2>Chào mừng đến với trang web đánh giá trình độ tập luyện của các vận động viên chạy 100m cấp cao </h2>
      </Container>
    </div>
);