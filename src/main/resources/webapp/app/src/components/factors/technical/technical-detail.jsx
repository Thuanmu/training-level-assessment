import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import TechnicalFactorService from "./technical-service";

export default function TechnicalFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [technicalFactor, setTechnicalFactor] = useState({});

    useEffect(() => {
        TechnicalFactorService.getTechnicalFactorById(id).then( res => {
            var technicalFactor = res.data;
            setTechnicalFactor(technicalFactor);
            setAthleteId(technicalFactor.athlete.id);
            setAthleteName(technicalFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết Yếu tố kỹ thuật</h2>
                <dl>
                    <dt>
                        <span>ID</span>
                    </dt>
                    <dd>{technicalFactor.id}</dd>
                    <dt>
                        <span>ID Vận động viên</span>
                    </dt>
                    <dd>{athleteId}</dd>
                    <dt>
                        <span>Tên Vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</span>
                    </dt>
                    <dd>{technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed}</dd>
                    <dt>
                        <span>Trạng thái</span>
                    </dt>
                    <dd>{technicalFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{technicalFactor.createAt}</dd>
                    <dt>
                        <span>Cập nhật lần cuối</span>
                    </dt>
                    <dd>{technicalFactor.lastModified}</dd>
                </dl>
                <Button color="primary" tag={Link} to={`/technicalFactors/${technicalFactor.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/technicalFactors">Quay lại</Button>
            </Container>
        </div>
    );
}