import React, { useState } from "react";
import { Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Row, UncontrolledButtonDropdown, UncontrolledDropdown } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';
import {Brand, Home} from './header-components';
import "./header.css";

export default function Header(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return(
        <div className="header">
            <Navbar color="dark" fixed="top" expand="md">
                <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
                <Brand/>
                <Collapse isOpen={menuOpen} navbar>
                    <Nav>
                        <NavItem>
                            <NavLink href="/">Trang chủ</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Yếu tố</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="/physical">Thể lực</DropdownItem>
                                <DropdownItem href="/technical">Kỹ thuật</DropdownItem>
                                <DropdownItem href="/psychophysiology">Tâm-sinh lý</DropdownItem>
                                <DropdownItem href="/form">Hình thái</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink href="/athlete-classification">Phân loại trình độ tập luyện</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/rankings">Bảng xếp hạng</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}