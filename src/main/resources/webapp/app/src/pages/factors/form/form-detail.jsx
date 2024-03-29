import { faArrowCircleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import FormFactorService from "../../../services/form-factor-service";

export default function FormFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [formFactor, setFormFactor] = useState({});
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);

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
                    <dd>{formFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{formFactor.createAt}</dd>
                </dl>
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <span>
                      <Button color="primary" tag={Link} to={`/formFactors/${formFactor.id}/edit`} >
                        <FontAwesomeIcon icon={faEdit}/>
                        &nbsp;
                        <span>Sửa</span>
                      </Button>
                      &nbsp;
                   </span>
                ) : (
                  ''
                )}
                <Button color="secondary" tag={Link} to="/formFactors">
                    <FontAwesomeIcon icon={faArrowCircleLeft}/>
                    &nbsp;
                    <span>Quay lại</span>
                </Button>
            </Container>
        </div>
    );
}