import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import FormFactorService from "./form-service";

export default function FormFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [formFactor, setFormFactor] = useState({});

    useEffect(() => {
        FormFactorService.getFormFactorById(id).then( res => {
            var formFactor = res.data;
            setFormFactor(formFactor);
            setAthleteId(formFactor.athlete.id);
            setAthleteName(formFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết Yếu tố hình thái</h2>
                <dl>
                    <dt>
                        <span>ID</span>
                    </dt>
                    <dd>{formFactor.id}</dd>
                    <dt>
                        <span>ID Vận động viên</span>
                    </dt>
                    <dd>{athleteId}</dd>
                    <dt>
                        <span>Tên Vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>Chỉ số Quetelet (g/cm)</span>
                    </dt>
                    <dd>{formFactor.queteletQuotient}</dd>
                    <dt>
                        <span>Trạng thái</span>
                    </dt>
                    <dd>{formFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{formFactor.createAt}</dd>
                    <dt>
                        <span>Cập nhật lần cuối</span>
                    </dt>
                    <dd>{formFactor.lastModified}</dd>
                </dl>
                <Button color="primary" tag={Link} to={`/formFactors/${formFactor.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/formFactors">Quay lại</Button>
            </Container>
        </div>
    );
}