import React, { useEffect, useState } from "react";
import {Alert, Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import AuthenticationService from "../../services/authentication-service";
import AthleteService from '../../services/athlete-service';

export default function Athlete(props) {

    const [athletes, setAthletes] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    const addAthlete = () => {
        props.history.push(`/athletes/new`);
    }

    const viewAthlete = id => {
        props.history.push(`/athletes/${id}/detail`);
    }
    
    const editAthlete = id => {
        props.history.push(`/athletes/${id}/edit`);
    }

    const deleteAthlete = (id, grade) => {
        if (!grade) {
            AthleteService.deleteAthlete(id).then( (res) => {
                setAthletes(athletes.filter(athlete => athlete.id !== id));
            });
        }
        else {
            alert("Bạn không thể xóa vận động viên đã phân loại");
            // return (
            // <div>
            //     <Alert color="danger">Bạn không thể xóa vận động viên đã phân loại</Alert>
            // </div>
            // );
        }
    }

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);
        if (user) {
            if (user.roles.includes("ROLE_COACH")) {
                AthleteService.getAllAthletesByCoachId(user.id).then((res) => {
                    setAthletes(res.data);
                });
            }
            else {
                AthleteService.getAllAthletesByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
                    setAthletes(res.data);
                });
            }
        }
        else {
            props.history.push(`/login`);
        }
    },[]);

    return(
        <div>
            <Container>
                <h2>
                    <Row>
                        <Col md="5">Danh sách vận động viên</Col>
                        <Col md="5"></Col>
                        <Col md="2">
                            {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                                <div>
                                    &nbsp;
                                    <Button size="sm" color="success" onClick={addAthlete}>Thêm vận động viên</Button>
                                </div>
                            ) : (
                             ''
                            )}
                        </Col>
                    </Row>
                </h2>
                &nbsp;
              {athletes.length > 0 ? (
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
                            <th>Cập nhật lần cuối</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {athletes.map((athlete, i) => (
                            <tr key = {athlete.id}>
                                <td>{i + 1}</td>
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
                                        <Button size="sm" color="info" onClick={() => viewAthlete(athlete.id)} >Xem</Button>
                                        </div>
                                        {currentUser.roles.includes("ROLE_COACH") ? (
                                            <div>
                                                <Button size="sm" color="primary" onClick={() => editAthlete(athlete.id)}>Sửa</Button>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        {currentUser.roles.includes("ROLE_COACH") ? (
                                            <div>
                                                <Button size="sm" color="danger" onClick={() => deleteAthlete(athlete.id, athlete.grade)}>Xóa</Button>
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
              ) : (
                <div>Không tìm thấy vận động viên nào</div>
              )}
            </Container>
        </div>

    );

}