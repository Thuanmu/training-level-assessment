import React, { useEffect, useState } from "react";
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarToggler, NavItem, NavLink, Row, UncontrolledButtonDropdown, UncontrolledDropdown } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';
import {Brand, Home} from './header-components';
import "./header.css";
import AuthenticationService from "../../../services/authentication-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faCalculator, faChartBar, faChartLine, faHome, faList, faPoll, faRegistered, faRunning, faSignInAlt, faSignOutAlt, faTasks, faThList, faUser, faUserCircle, faUserCog, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const logOut = () => {
        AuthenticationService.logout();
      };

    return(
        <div className="header">
            <Navbar color="dark" fixed="top" expand="md">
                <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
                <Brand/>
                <Collapse isOpen={menuOpen} navbar>
                    <Nav>
                        <NavItem>
                            <NavLink className="nav" href="/">
                                <FontAwesomeIcon icon={faHome}/>
                                &nbsp;
                                <span>Trang chủ</span>
                            </NavLink>
                        </NavItem>
                        {!currentUser || (currentUser && (currentUser.roles.includes("ROLE_COACH") || currentUser.roles.includes("ROLE_ATHLETE"))) ? (
                            <NavItem>
                                <NavLink className="nav" href="/athletes">
                                    <FontAwesomeIcon icon={faRunning}/>
                                    &nbsp;
                                    <span>Vận động viên</span>
                                </NavLink>
                            </NavItem>
                        ) : (
                            ''
                        )}
                        {!currentUser || (currentUser && (currentUser.roles.includes("ROLE_COACH") || currentUser.roles.includes("ROLE_ATHLETE"))) ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="nav" nav caret>
                                    <FontAwesomeIcon icon={faThList}/>
                                    &nbsp;
                                    <span>Yếu tố</span>
                                </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="/physicalFactors">
                                            {/* <FontAwesomeIcon icon={faAsterisk}/>
                                            &nbsp; */}
                                            <span>Thể lực</span>
                                        </DropdownItem>
                                        <DropdownItem href="/technicalFactors">Kỹ thuật</DropdownItem>
                                        <DropdownItem href="/psychophysiologyFactors">Tâm-sinh lý</DropdownItem>
                                        <DropdownItem href="/formFactors">Hình thái</DropdownItem>
                                    </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            ''
                        )}
                        {!currentUser || (currentUser && currentUser.roles.includes("ROLE_COACH")) ? (
                            <NavItem>
                                <NavLink className="nav" href="/athlete-classification">
                                    {/* <FontAwesomeIcon icon={faTasks}/> */}
                                    <FontAwesomeIcon icon={faCalculator}/>
                                    &nbsp;
                                    <span>Phân loại trình độ tập luyện</span>
                                </NavLink>
                            </NavItem>
                        ) : (
                            ''
                        )}
                        {!currentUser || (currentUser && (currentUser.roles.includes("ROLE_COACH") || currentUser.roles.includes("ROLE_ATHLETE"))) ? (
                            <NavItem>
                                <NavLink className="nav" href="/rankingsList">
                                    <FontAwesomeIcon icon={faPoll}/>
                                    &nbsp;
                                    <span>Bảng xếp hạng</span>
                                </NavLink>
                            </NavItem>
                        ) : (
                            ''
                        )}
                        {!currentUser || (currentUser && (currentUser.roles.includes("ROLE_COACH") || currentUser.roles.includes("ROLE_ATHLETE"))) ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="nav" nav caret>
                                    <FontAwesomeIcon icon={faChartLine}/>
                                    &nbsp;
                                    <span>Biểu đồ</span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href="/physicalFactorChart">Yếu tố thể lực</DropdownItem>
                                    <DropdownItem href="/technicalFactorChart">Yếu tố kỹ thuật</DropdownItem>
                                    <DropdownItem href="/psychophysiologyFactorChart">Yếu tố tâm-sinh lý</DropdownItem>
                                    <DropdownItem href="/formFactorChart">Yếu tố hình thái</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            ''
                        )}
                        {currentUser && currentUser.roles.includes("ROLE_ADMIN") ? (
                            <NavItem>
                                <NavLink className="nav" href="/users">
                                    <FontAwesomeIcon icon={faUserCog}/>
                                    &nbsp;
                                    <span>Quản lý người dùng</span>
                                </NavLink>
                            </NavItem>
                        ) : (
                            ''
                        )}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="nav" nav caret>
                                <FontAwesomeIcon icon={faUser}/>
                                &nbsp;
                                <span>Tài khoản</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {currentUser ? (
                                    <div>
                                        <DropdownItem href={`/profile/${currentUser.id}`}>
                                            <FontAwesomeIcon icon={faUserCircle}/>
                                            &nbsp;
                                            <span>Hồ sơ cá nhân</span>
                                        </DropdownItem>
                                        <DropdownItem href="/login" onClick={logOut}>
                                            <FontAwesomeIcon icon={faSignOutAlt}/>
                                            &nbsp;
                                            <span>Đăng xuất</span>
                                        </DropdownItem>
                                    </div>
                                ) : (
                                    <div>
                                        <DropdownItem href="/login">
                                            <FontAwesomeIcon icon={faSignInAlt}/>
                                            &nbsp;
                                            <span>Đăng nhập</span>
                                        </DropdownItem>
                                        <DropdownItem href="/register">
                                            <FontAwesomeIcon icon={faUserPlus}/>
                                            &nbsp;
                                            <span>Đăng ký</span>
                                        </DropdownItem>
                                    </div>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}