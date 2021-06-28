import React, { useEffect, useState } from "react";
import {Alert, Button, ButtonGroup, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table} from "reactstrap";
import AuthenticationService from "../../services/authentication-service";
import AthleteService from '../../services/athlete-service';
import Pagination from "@material-ui/lab/Pagination";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare, faEye, faEdit, faTrashAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Athlete(props) {

    const [athletes, setAthletes] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [searchAthleteName, setSearchAthleteName] = useState('');

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handleChangeSearchAthleteName = (event) => {
        setSearchAthleteName(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    const addAthlete = () => {
        props.history.push(`/athletes/new`);
    }

    const viewAthlete = id => {
        props.history.push(`/athletes/${id}/detail`);
    }
    
    const editAthlete = id => {
        props.history.push(`/athletes/${id}/edit`);
    }

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);
        if (user) {
            if (user.roles.includes("ROLE_COACH")) {

                let  params = {
                    coachId: user.id,
                    athleteName: searchAthleteName,
                    page: page - 1,
                    size: pageSize
                }
                AthleteService.getAllAthletesByCoachIdAndPaging(params).then((res) => {
                    const { athletes, totalPages } = res.data;

                    setAthletes(athletes);
                    setCount(totalPages);

                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        localStorage.removeItem("user");
                    }
                });
            }
            else {
                let  params = {
                    athleteCodeUsed: user.athleteCodeUsed,
                    athleteName: searchAthleteName,
                    page: page - 1,
                    size: pageSize
                }
                AthleteService.getAllAthletesByAthleteCodeUsedAndPaging(params).then((res) => {
                    const { athletes, totalPages } = res.data;

                    setAthletes(athletes);
                    setCount(totalPages);

                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        localStorage.removeItem("user");
                    }
                });
            }
        }
        else {
            props.history.push(`/login`);
        }
    },[searchAthleteName, page, pageSize, athletes.length]);

    return(
        <div>
            <Container>
                <h2>
                    <Row>
                        <Col md="5">Danh sách vận động viên</Col>
                        <Col md="4"></Col>
                        <Col md="3">
                            {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                                <div className="add-button">
                                    <Button color="success" onClick={addAthlete}>
                                        <FontAwesomeIcon icon={faPlusSquare}/>
                                        &nbsp;
                                        <span>Thêm vận động viên</span>
                                    </Button>
                                </div>
                            ) : (
                             ''
                            )}
                        </Col>
                    </Row>
                    &nbsp;
                    <Row>
                     <Col md="4">
                     <InputGroup>
                        <Input
                            type="search"
                            name="search"
                            placeholder="Tìm kiếm bởi tên vận động viên"
                            value={searchAthleteName}
                            onChange={handleChangeSearchAthleteName}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                            <FontAwesomeIcon icon={faSearch}/>
                            {/* &nbsp;
                            <span>Tìm kiếm</span> */}
                            </InputGroupText>
                        </InputGroupAddon>
                     </InputGroup>
                     </Col>
                    </Row>
                </h2>
                &nbsp;
              {athletes.length > 0 ? (
                <div>
                  <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã vận động viên</th>
                            <th>Tên vận động viên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Quê quán</th>
                            <th>Tổng điểm</th>
                            <th>Xếp loại</th>
                            <th>Xếp hạng</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {athletes.map((athlete, i) => (
                            <tr key = {athlete.id}>
                                <td>{pageSize * (page - 1) + (i + 1)}</td>
                                <td>{athlete.athleteCode}</td>
                                <td>{athlete.athleteName}</td>
                                <td>{athlete.dateOfBirth}</td>
                                <td>{athlete.gender === 0 ? "Nam" : "Nữ"}</td>
                                <td>{athlete.hometown}</td>
                                <td>{athlete.totalScoresOfCriterias}</td>
                                <td>{athlete.grade}</td>
                                <td>{athlete.athleteRank}</td>
                                <td>{athlete.createAt}</td>
                                <td>{athlete.lastModified}</td>
                                <td>
                                    <ButtonGroup>
                                        <div>
                                            <Button size="sm" color="info" onClick={() => viewAthlete(athlete.id)}>
                                                <FontAwesomeIcon icon={faEye}/>
                                                &nbsp;
                                                <span>Xem</span>
                                            </Button>
                                        </div>
                                        {currentUser.roles.includes("ROLE_COACH") ? (
                                            <div>
                                                <Button size="sm" color="primary" onClick={() => editAthlete(athlete.id)}>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                    &nbsp;
                                                    <span>Sửa</span>
                                                </Button>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        {currentUser.roles.includes("ROLE_COACH") ? (
                                            <div>
                                                <Button size="sm" color="danger" tag={Link} to={`/athletes/${athlete.id}/delete`}>
                                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                                    &nbsp;
                                                    <span>Xóa</span>
                                                </Button>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    className="my-5"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    onChange={handlePageChange}
                  /> 
                </div>
              ) : (
                <div>
                    <Alert color="warning">Không tìm thấy vận động viên nào.</Alert>
                </div>
              )}
            </Container>
        </div>

    );

}