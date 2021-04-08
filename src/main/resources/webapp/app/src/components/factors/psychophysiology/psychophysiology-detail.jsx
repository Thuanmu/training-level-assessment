import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import PsychophysiologyFactorService from "./psychophysiology-service";

export default function PsychophysiologyFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [psychophysiologyFactor, setPsychophysiologyFactor] = useState({});

    useEffect(() => {
        PsychophysiologyFactorService.getPsychophysiologyFactorById(id).then( res => {
            var psychophysiologyFactor = res.data;
            setPsychophysiologyFactor(psychophysiologyFactor);
            setAthleteId(psychophysiologyFactor.athlete.id);
            setAthleteName(psychophysiologyFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết Yếu tố tâm-sinh lý</h2>
                <dl>
                    <dt>
                        <span>ID</span>
                    </dt>
                    <dd>{psychophysiologyFactor.id}</dd>
                    <dt>
                        <span>ID Vận động viên</span>
                    </dt>
                    <dd>{athleteId}</dd>
                    <dt>
                        <span>Tên Vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>14. Thời gian phản xạ đơn (s)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.singleReflectionTime}</dd>
                    <dt>
                        <span>15. Chỉ số dung tích sống (ml/kg)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.livingCapacityQuotient}</dd>
                    <dt>
                        <span>16. Tần số tim hồi phục 30s sau chạy 100m (lần/phút)</span>
                    </dt>
                    <dd>{psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun}</dd>
                    <dt>
                        <span>17. Hàm lượng axit lactic sau chạy 100m (mmol/lít)</span>
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
                    <dt>
                        <span>Cập nhật lần cuối</span>
                    </dt>
                    <dd>{psychophysiologyFactor.lastModified}</dd>
                </dl>
                <Button color="primary" tag={Link} to={`/psychophysiologyFactors/${psychophysiologyFactor.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/psychophysiologyFactors">Quay lại</Button>
            </Container>
        </div>
    );
}