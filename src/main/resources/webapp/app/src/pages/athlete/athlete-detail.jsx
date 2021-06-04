import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AthleteService from '../../services/athlete-service';
import AuthenticationService from "../../services/authentication-service";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';



export default function AthleteDetail(props) {

    const [athleteId, setAthleteId] = useState(props.match.params.id);
    const [athlete, setAthlete] = useState({});
    const [currentUser, setCurrentUser] = useState(undefined);
    

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);

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
                        <span>Giới tính</span>
                    </dt>
                    <dd>{athlete.gender === 0 ? "Nam" : "Nữ"}</dd>
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
                        <span>Ngày cập nhật</span>
                    </dt>
                    <dd>{athlete.lastModified}</dd>
                </dl>
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <span>
                      <Button color="primary" tag={Link} to={`/athletes/${athlete.id}/edit`} >
                          <FontAwesomeIcon icon={faEdit}/>
                          &nbsp;
                          <span>Sửa</span>
                      </Button>
                      &nbsp;
                   </span>
                ) : (
                    ''
                )}
                <Button color="secondary" tag={Link} to="/athletes">
                    <FontAwesomeIcon icon={faArrowCircleLeft}/>
                    &nbsp;
                    <span>Quay lại</span>
                </Button>
            </Container>
        </div>
    );

}