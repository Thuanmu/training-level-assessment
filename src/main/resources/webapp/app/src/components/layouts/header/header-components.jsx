import React from "react";
import { Container, NavbarBrand, NavLink, Row, Alert } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

export const BrandIcon = (props) => (
  <div {...props} className="brand-icon">
    <img
      src="../../../assets/images/TrainingLevel2.png"
      alt="Logo"
      width="100%"
      height="100%"
    />
  </div>
);

export const Brand = (props) => (
  <NavbarBrand href="/" className="brand-logo">
    <span className="brand-title">TrainingLevel</span>
  </NavbarBrand>
);

export const Home = (props) => (
  <div>
    <Container fluid>
      <Alert color="primary">
        <h2>Hệ thống đánh giá trình độ tập luyện của vận động viên thể thao</h2>
        &nbsp;
        <ul id="home-list">
          <li>Phân loại vận động viên</li>
          <li>Xem bảng xếp hạng vận động viên</li>
          <li>Xem biểu đồ biểu diễn các yếu tố</li>
          <li>Quản lý các vận động viên</li>
          <li>Quản lý các yếu tố của các vận động viên</li>
        </ul>
      </Alert>
    </Container>
  </div>
);
