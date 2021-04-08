import React, { useEffect, useState } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import AthleteService from "./athlete-service";

export default function Athlete(props) {

    const [athletes, setAthletes] = useState([]);

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
        if (grade === '') {
            AthleteService.deleteAthlete(id).then( (res) => {
                setAthletes(athletes.filter(athlete => athlete.id !== id));
            });
        }
        else {
            alert("Bạn không thể xóa vận động viên đã phân loại");
        }
    }

    useEffect(() => {
        AthleteService.getAthletes().then((res) => {
            setAthletes(res.data);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>
                    <Row>
                        <Col md="5">Danh sách Vận động viên</Col>
                        <Col md="5"></Col>
                        <Col md="2">
                            <Button size="sm" color="success" onClick={addAthlete}>Thêm Vận động viên</Button>
                        </Col>
                    </Row>
                </h2>
                &nbsp;
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên vận động viên</th>
                            <th>Ngày sinh</th>
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
                                <td>{athlete.id}</td>
                                <td>{athlete.athleteName}</td>
                                <td>{athlete.dateOfBirth}</td>
                                <td>{athlete.hometown}</td>
                                <td>{athlete.totalScoresOfCriterias}</td>
                                <td>{athlete.grade}</td>
                                <td>{athlete.athleteRank}</td>
                                <td>{athlete.createAt}</td>
                                <td>{athlete.lastModified}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" color="info" onClick={() => viewAthlete(athlete.id)} >Xem</Button>
                                        <Button size="sm" color="primary" onClick={() => editAthlete(athlete.id)} >Sửa</Button>
                                        <Button size="sm" color="danger" onClick={() => deleteAthlete(athlete.id, athlete.grade)} >Xóa</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );

}