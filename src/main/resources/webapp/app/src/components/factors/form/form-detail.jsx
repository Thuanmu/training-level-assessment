import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import FormFactorService from "./form-service";

export default function FormFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [formFactor, setFormFactor] = useState({});

    useEffect(() => {
        FormFactorService.getFormFactorById(id).then( res => {
            var formFactor = res.data;
            setFormFactor(formFactor);
            setAthleteCode(formFactor.athlete.athleteCode);
            setAthleteName(formFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết Yếu tố hình thái</h2>
                <dl>
                    <dt>
                        <span>Mã yếu tố hình thái</span>
                    </dt>
                    <dd>{formFactor.formFactorCode}</dd>
                    <dt>
                        <span>Mã vận động viên</span>
                    </dt>
                    <dd>{athleteCode}</dd>
                    <dt>
                        <span>Tên vận động viên</span>
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
                </dl>
                <Button color="primary" tag={Link} to={`/formFactors/${formFactor.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/formFactors">Quay lại</Button>
            </Container>
        </div>
    );
}