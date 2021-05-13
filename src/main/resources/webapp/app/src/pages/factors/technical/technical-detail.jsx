import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import TechnicalFactorService from "../../../services/technical-factor-service";

export default function TechnicalFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [technicalFactor, setTechnicalFactor] = useState({});
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);

        TechnicalFactorService.getTechnicalFactorById(id).then( res => {
            var technicalFactor = res.data;
            setTechnicalFactor(technicalFactor);
            setAthleteCode(technicalFactor.athlete.athleteCode);
            setAthleteName(technicalFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết yếu tố kỹ thuật</h2>
                <dl>
                    <dt>
                        <span>Mã yếu tố kỹ thuật</span>
                    </dt>
                    <dd>{technicalFactor.technicalFactorCode}</dd>
                    <dt>
                        <span>Mã vận động viên</span>
                    </dt>
                    <dd>{athleteCode}</dd>
                    <dt>
                        <span>Tên vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</span>
                    </dt>
                    <dd>{technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed}</dd>
                    <dt>
                        <span>Thời gian tiếp đất khi đạt tốc độ cao (s)</span>
                    </dt>
                    <dd>{technicalFactor.groundingTimeWhenReachingHighSpeed}</dd>
                    <dt>
                        <span>Trạng thái</span>
                    </dt>
                    <dd>{technicalFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{technicalFactor.createAt}</dd>
                </dl>
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <span>
                      <Button color="primary" tag={Link} to={`/technicalFactors/${technicalFactor.id}/edit`} >Sửa</Button>
                      &nbsp;
                   </span>
                ) : (
                  ''
                )}
                <Button color="info" tag={Link} to="/technicalFactors">Quay lại</Button>
            </Container>
        </div>
    );
}