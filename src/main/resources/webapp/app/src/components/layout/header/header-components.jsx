import React from "react";
import { Col, NavbarBrand, NavItem, NavLink, Row } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';

export const Brand = props => (
    <NavbarBrand href="/" className="brand-logo">
      <span className="brand-title">TrainingLevel100m</span>
    </NavbarBrand>
  );

export const Home = props => (
    <div className="padding-title">
        <h2>Chào mừng đến với trang web đánh giá trình độ tập luyện của các VĐV chạy 100m cấp cao </h2>
    </div>
);