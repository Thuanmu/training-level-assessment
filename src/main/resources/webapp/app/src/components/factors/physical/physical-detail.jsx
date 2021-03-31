import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import PhysicalFactorService from "./physical-service";

export default function PhysicalFactorDetail(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [physicalFactor, setPhysicalFactor] = useState({});

    useEffect(() => {
        PhysicalFactorService.getPhysicalFactorById(id).then( res => {
            var physicalFactor = res.data;
            setPhysicalFactor(physicalFactor);
            setAthleteId(physicalFactor.athlete.id);
            setAthleteName(physicalFactor.athlete.athleteName);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết Yếu tố thể lực</h2>
                <dl>
                    <dt>
                        <span>ID</span>
                    </dt>
                    <dd>{physicalFactor.id}</dd>
                    <dt>
                        <span>ID Vận động viên</span>
                    </dt>
                    <dd>{athleteId}</dd>
                    <dt>
                        <span>Tên Vận động viên</span>
                    </dt>
                    <dd>{athleteName}</dd>
                    <dt>
                        <span>1. Thời gian phản xạ xuất phát (s)</span>
                    </dt>
                    <dd>{physicalFactor.timeOfReflectionStart}</dd>
                    <dt>
                        <span>2. Chạy 30m tốc độ cao (s)</span>
                    </dt>
                    <dd>{physicalFactor.thirtyMetersRunAtHighSpeed}</dd>
                    <dt>
                        <span>3. Chạy 30m xuất phát thấp (s)</span>
                    </dt>
                    <dd>{physicalFactor.thirtyMetersRunWithLowStart}</dd>
                    <dt>
                        <span>4. Chạy 60m xuất phát thấp (s)</span>
                    </dt>
                    <dd>{physicalFactor.sixtyMetersRunWithLowStart}</dd>
                    <dt>
                        <span>5. Chạy 80m xuất phát cao (s)</span>
                    </dt>
                    <dd>{physicalFactor.eightyMetersRunWithHighStart}</dd>
                    <dt>
                        <span>6. Chạy 150m xuất phát cao (s)</span>
                    </dt>
                    <dd>{physicalFactor.oneHundredFiftyMetersRunWithHighStart}</dd>
                    <dt>
                        <span>7. Bật xa tại chỗ (m)</span>
                    </dt>
                    <dd>{physicalFactor.awayJumpInPlace}</dd>
                    <dt>
                        <span>8. Bật 3 bước tại chỗ (m)</span>
                    </dt>
                    <dd>{physicalFactor.threeStepsJumpInPlace}</dd>
                    <dt>
                        <span>9. Bật 10 bước tại chỗ (m)</span>
                    </dt>
                    <dd>{physicalFactor.tenStepsJumpInPlace}</dd>
                    <dt>
                        <span>10. Thời gian của 20m cuối trong chạy 100m (s)</span>
                    </dt>
                    <dd>{physicalFactor.runTimeOfLastTwentyMetersInOneHundredMetersRun}</dd>
                    <dt>
                        <span>11. Hệ số sức bền K (s)</span>
                    </dt>
                    <dd>{physicalFactor.strengthCoefficient_K}</dd>
                    <dt>
                        <span>12. Nâng cao đùi tại chỗ 10s (lần)</span>
                    </dt>
                    <dd>{physicalFactor.thighsRaiseInPlaceForTenSeconds}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{physicalFactor.createAt}</dd>
                    <dt>
                        <span>Cập nhật lần cuối</span>
                    </dt>
                    <dd>{physicalFactor.lastModified}</dd>
                </dl>
                <Button color="primary" tag={Link} to={`/physicalFactors/${physicalFactor.id}/edit`} >Sửa</Button>
                &nbsp;
                <Button color="info" tag={Link} to="/physicalFactors">Quay lại</Button>
            </Container>
        </div>
    );
}