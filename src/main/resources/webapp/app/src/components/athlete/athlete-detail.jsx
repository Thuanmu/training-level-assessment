import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AthleteService from "./athlete-service";

export default function AthleteDetail(props) {

    const [athleteId, setAthleteId] = useState(props.match.params.id);
    const [athlete, setAthlete] = useState({});

    useEffect(() => {
        AthleteService.getAthleteById(athleteId).then( res => {
            setAthlete(res.data);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết vận động viên</h2>
                <dl>
                    <dt>
                        <span>Mã vận động viên</span>
                    </dt>
                    <dd>{athlete.athleteCode}</dd>
                    <dt>
                        <span>Tên vận động viên</span>
                    </dt>
                    <dd>{athlete.athleteName}</dd>
                    <dt>
                        <span>Ngày sinh</span>
                    </dt>
                    <dd>{athlete.dateOfBirth}</dd>
                    <dt>
                        <span>Quê quán</span>
                    </dt>
                    <dd>{athlete.hometown}</dd>
                    <dt>
                        <span>Tổng điểm</span>
                    </dt>
                    <dd>{athlete.totalScoresOfCriterias}</dd>
                    <dt>
                        <span>Xếp loại</span>
                    </dt>
                    <dd>{athlete.grade}</dd>
                    <dt>
                        <span>Xếp hạng</span>
                    </dt>
                    <dd>{athlete.athleteRank}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{athlete.createAt}</dd>
                    <dt>
                        <span>Cập nhật lần cuối</span>
                    </dt>
                    <dd>{athlete.lastModified}</dd>
                </dl>
                <Button color="primary" tag={Link} to={`/athletes/${athlete.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/athletes">Quay lại</Button>
            </Container>
        </div>
    );

}