import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import PhysicalFactorService from "./physical-service";

export default function PhysicalFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [physicalFactor, setPhysicalFactor] = useState({});

    useEffect(() => {
        PhysicalFactorService.getPhysicalFactorById(id).then( res => {
            var physicalFactor = res.data;
            setPhysicalFactor(physicalFactor);
            setAthleteCode(physicalFactor.athlete.athleteCode);
            setAthleteName(physicalFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết Yếu tố thể lực</h2>
                <dl>
                    <dt>
                        <span>Mã yếu tố thể lực</span>
                    </dt>
                    <dd>{physicalFactor.physicalFactorCode}</dd>
                    <dt>
                        <span>Mã vận động viên</span>
                    </dt>
                    <dd>{athleteCode}</dd>
                    <dt>
                        <span>Tên vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>Thời gian phản xạ xuất phát (s)</span>
                    </dt>
                    <dd>{physicalFactor.timeOfReflectionStart}</dd>
                    <dt>
                        <span>Chạy 30m tốc độ cao (s)</span>
                    </dt>
                    <dd>{physicalFactor.thirtyMetersRunAtHighSpeed}</dd>
                    <dt>
                        <span>Chạy 30m xuất phát thấp (s)</span>
                    </dt>
                    <dd>{physicalFactor.thirtyMetersRunWithLowStart}</dd>
                    <dt>
                        <span>Chạy 60m xuất phát thấp (s)</span>
                    </dt>
                    <dd>{physicalFactor.sixtyMetersRunWithLowStart}</dd>
                    <dt>
                        <span>Chạy 80m xuất phát cao (s)</span>
                    </dt>
                    <dd>{physicalFactor.eightyMetersRunWithHighStart}</dd>
                    <dt>
                        <span>Chạy 150m xuất phát cao (s)</span>
                    </dt>
                    <dd>{physicalFactor.oneHundredFiftyMetersRunWithHighStart}</dd>
                    <dt>
                        <span>Bật xa tại chỗ (m)</span>
                    </dt>
                    <dd>{physicalFactor.awayJumpInPlace}</dd>
                    <dt>
                        <span>Bật 3 bước tại chỗ (m)</span>
                    </dt>
                    <dd>{physicalFactor.threeStepsJumpInPlace}</dd>
                    <dt>
                        <span>Bật 10 bước tại chỗ (m)</span>
                    </dt>
                    <dd>{physicalFactor.tenStepsJumpInPlace}</dd>
                    <dt>
                        <span>Thời gian của 20m cuối trong chạy 100m (s)</span>
                    </dt>
                    <dd>{physicalFactor.runTimeOfLastTwentyMetersInOneHundredMetersRun}</dd>
                    <dt>
                        <span>Hệ số sức bền K (s)</span>
                    </dt>
                    <dd>{physicalFactor.strengthCoefficient_K}</dd>
                    <dt>
                        <span>Nâng cao đùi tại chỗ 10s (lần)</span>
                    </dt>
                    <dd>{physicalFactor.thighsRaiseInPlaceForTenSeconds}</dd>
                    <dt>
                        <span>Trạng thái</span>
                    </dt>
                    <dd>{physicalFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{physicalFactor.createAt}</dd>
                </dl>
                <Button color="primary" tag={Link} to={`/physicalFactors/${physicalFactor.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/physicalFactors">Quay lại</Button>
            </Container>
        </div>
    );
}