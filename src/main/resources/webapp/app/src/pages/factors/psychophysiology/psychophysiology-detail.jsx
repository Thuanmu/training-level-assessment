import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import PsychophysiologyFactorService from "../../../services/psychophysiology-factor-service";

export default function PsychophysiologyFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [psychophysiologyFactor, setPsychophysiologyFactor] = useState({});
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);

        PsychophysiologyFactorService.getPsychophysiologyFactorById(id).then( res => {
            var psychophysiologyFactor = res.data;
            setPsychophysiologyFactor(psychophysiologyFactor);
            setAthleteCode(psychophysiologyFactor.athlete.id);
            setAthleteName(psychophysiologyFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết yếu tố tâm-sinh lý</h2>
                <dl>
                    <dt>
                        <span>Mã yếu tố tâm-sinh lý</span>
                    </dt>
                    <dd>{psychophysiologyFactor.psychophysiologyFactorCode}</dd>
                    <dt>
                        <span>Mã vận động viên</span>
                    </dt>
                    <dd>{athleteCode}</dd>
                    <dt>
                        <span>Tên vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>Thời gian phản xạ đơn (s)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.singleReflectionTime}</dd>
                    <dt>
                        <span>Chỉ số dung tích sống (ml/kg)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.livingCapacityQuotient}</dd>
                    <dt>
                        <span>Tần số tim 5s sau chạy 100m (lần/ph)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.heartRateAtFiveSecondsAfterOneHundredMetersRun}</dd>
                    <dt>
                        <span>Tần số tim hồi phục 30s sau chạy 100m (lần/phút)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun}</dd>
                    <dt>
                        <span>Hàm lượng axit lactic sau chạy 100m (mmol/lít)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun}</dd>
                    <dt>
                        <span>Trạng thái</span>
                    </dt>
                    <dd>{psychophysiologyFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{psychophysiologyFactor.createAt}</dd>
                </dl>
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <span>
                      <Button color="primary" tag={Link} to={`/psychophysiologyFactors/${psychophysiologyFactor.id}/edit`} >Sửa</Button>
                      &nbsp;
                   </span>
                ) : (
                  ''
                )}
                <Button color="info" tag={Link} to="/psychophysiologyFactors">Quay lại</Button>
            </Container>
        </div>
    );
}