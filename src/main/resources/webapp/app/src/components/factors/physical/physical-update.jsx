import React, { useEffect, useState } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import PhysicalFactorService from "./physical-service";
import AthleteService from "../../athlete/athlete-service";

export default function PhysicalFactorUpdate(props) {

    const [athletes, setAthletes] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [timeOfReflectionStart, setTimeOfReflectionStart] = useState('');
    const [thirtyMetersRunAtHighSpeed, setThirtyMetersRunAtHighSpeed] = useState('');
    const [thirtyMetersRunWithLowStart, setThirtyMetersRunWithLowStart] = useState('');
    const [sixtyMetersRunWithLowStart, setSixtyMetersRunWithLowStart] = useState('');
    const [eightyMetersRunWithHighStart, setEightyMetersRunWithHighStart] = useState('');
    const [oneHundredFiftyMetersRunWithHighStart, setOneHundredFiftyMetersRunWithHighStart] = useState('');
    const [awayJumpInPlace, setAwayJumpInPlace] = useState('');
    const [threeStepsJumpInPlace, setThreeStepsJumpInPlace] = useState('');
    const [tenStepsJumpInPlace, setTenStepsJumpInPlace] = useState('');
    const [runTimeOfLastTwentyMetersInOneHundredMetersRun, setRunTimeOfLastTwentyMetersInOneHundredMetersRun] = useState('');
    const [strengthCoefficient_K, setStrengthCoefficient_K] = useState('');
    const [thighsRaiseInPlaceForTenSeconds, setThighsRaiseInPlaceForTenSeconds] = useState('');
    const [status, setStatus] = useState('0');
    const [createAt, setCreateAt] = useState('');
    const [lastModified, setLastModified] = useState('');

    const handleChangeAthleteId = event => setAthleteId(event.target.value);
    const handleChangeTimeOfReflectionStart = event => setTimeOfReflectionStart(event.target.value);
    const handleChangeThirtyMetersRunAtHighSpeed = event => setThirtyMetersRunAtHighSpeed(event.target.value);
    const handleChangeThirtyMetersRunWithLowStart = event => setThirtyMetersRunWithLowStart(event.target.value);
    const handleChangeSixtyMetersRunWithLowStart = event => setSixtyMetersRunWithLowStart(event.target.value);
    const handleChangeEightyMetersRunWithHighStart = event => setEightyMetersRunWithHighStart(event.target.value);
    const handleChangeOneHundredFiftyMetersRunWithHighStart = event => setOneHundredFiftyMetersRunWithHighStart(event.target.value);
    const handleChangeAwayJumpInPlace = event => setAwayJumpInPlace(event.target.value);
    const handleChangeThreeStepsJumpInPlace = event => setThreeStepsJumpInPlace(event.target.value);
    const handleChangeTenStepsJumpInPlace = event => setTenStepsJumpInPlace(event.target.value);
    const handleChangeRunTimeOfLastTwentyMetersInOneHundredMetersRun = event => setRunTimeOfLastTwentyMetersInOneHundredMetersRun(event.target.value);
    const handleChangeStrengthCoefficient_K = event => setStrengthCoefficient_K(event.target.value);
    const handleChangeThighsRaiseInPlaceForTenSeconds = event => setThighsRaiseInPlaceForTenSeconds(event.target.value);

    useEffect(() => {
        if(id)  {
            PhysicalFactorService.getPhysicalFactorById(id).then( res => {
                let physicalFactor = res.data;
                setId(physicalFactor.id);
                setAthleteId(physicalFactor.athlete.id);
                setTimeOfReflectionStart(physicalFactor.timeOfReflectionStart);
                setThirtyMetersRunAtHighSpeed(physicalFactor.thirtyMetersRunAtHighSpeed);
                setThirtyMetersRunWithLowStart(physicalFactor.thirtyMetersRunWithLowStart);
                setSixtyMetersRunWithLowStart(physicalFactor.sixtyMetersRunWithLowStart);
                setEightyMetersRunWithHighStart(physicalFactor.eightyMetersRunWithHighStart);
                setOneHundredFiftyMetersRunWithHighStart(physicalFactor.oneHundredFiftyMetersRunWithHighStart);
                setAwayJumpInPlace(physicalFactor.awayJumpInPlace);
                setThreeStepsJumpInPlace(physicalFactor.threeStepsJumpInPlace);
                setTenStepsJumpInPlace(physicalFactor.tenStepsJumpInPlace);
                setRunTimeOfLastTwentyMetersInOneHundredMetersRun(physicalFactor.runTimeOfLastTwentyMetersInOneHundredMetersRun);
                setStrengthCoefficient_K(physicalFactor.strengthCoefficient_K);
                setThighsRaiseInPlaceForTenSeconds(physicalFactor.thighsRaiseInPlaceForTenSeconds);
                setStatus(physicalFactor.status);
                setCreateAt(physicalFactor.createAt);
                setLastModified(physicalFactor.lastModified);
            });
        }

        AthleteService.getAthletes().then((res) => {
            setAthletes(res.data);
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let physicalFactor = {
            id: id,
            athlete: {id: athleteId ? athleteId : athletes[0].id},
            timeOfReflectionStart: timeOfReflectionStart,
            thirtyMetersRunAtHighSpeed: thirtyMetersRunAtHighSpeed,
            thirtyMetersRunWithLowStart: thirtyMetersRunWithLowStart,
            sixtyMetersRunWithLowStart: sixtyMetersRunWithLowStart,
            eightyMetersRunWithHighStart: eightyMetersRunWithHighStart,
            oneHundredFiftyMetersRunWithHighStart: oneHundredFiftyMetersRunWithHighStart,
            awayJumpInPlace: awayJumpInPlace,
            threeStepsJumpInPlace: threeStepsJumpInPlace,
            tenStepsJumpInPlace: tenStepsJumpInPlace,
            runTimeOfLastTwentyMetersInOneHundredMetersRun: runTimeOfLastTwentyMetersInOneHundredMetersRun,
            strengthCoefficient_K: strengthCoefficient_K,
            thighsRaiseInPlaceForTenSeconds: thighsRaiseInPlaceForTenSeconds,
            status: status
        };

        if(!id) { 
            PhysicalFactorService.createPhysicalFactor(physicalFactor).then(res => {
                props.history.push('/physicalFactors');
            });
        } 
        else {
            PhysicalFactorService.updatePhysicalFactor(physicalFactor, id).then( res => {
                props.history.push('/physicalFactors');
            });
        }
    }

    const title = <h2>{ id ? "Sửa Yếu tố thể lực" : "Thêm Yếu tố thể lực" }</h2>;

    return(
        <div>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="athlete-id">ID Vận động viên</Label>
                        <Input type="select" name="athlete-id" id="athlete-id" value={athleteId} onChange={handleChangeAthleteId}>
                            {athletes.map((athlete, i) => (
                                <option>{athlete.id}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-time-of-reflection-start">1. Thời gian phản xạ xuất phát (s)</Label>
                        <Input type="text" id="time-of-reflection-start" name="criteria" value={timeOfReflectionStart} onChange={handleChangeTimeOfReflectionStart} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-thirty-meters-run-at-high-speed">2. Chạy 30m tốc độ cao (s)</Label>
                        <Input type="text" id="thirty-meters-run-at-high-speed" name="criteria" value={thirtyMetersRunAtHighSpeed} onChange={handleChangeThirtyMetersRunAtHighSpeed} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-thirty-meters-run-with-low-start">3. Chạy 30m xuất phát thấp (s)</Label>
                        <Input type="text" id="thirty-meters-run-with-low-start" name="criteria" value={thirtyMetersRunWithLowStart} onChange={handleChangeThirtyMetersRunWithLowStart} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-sixty-meters-run-with-low-start">4. Chạy 60m xuất phát thấp (s)</Label>
                        <Input type="text" id="sixty-meters-run-with-low-start" name="criteria" value={sixtyMetersRunWithLowStart} onChange={handleChangeSixtyMetersRunWithLowStart} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-eighty-meters-run-with-high-start">5. Chạy 80m xuất phát cao (s)</Label>
                        <Input type="text" id="eighty-meters-run-with-high-start" name="criteria" value={eightyMetersRunWithHighStart} onChange={handleChangeEightyMetersRunWithHighStart} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-one-hundred-fifty-meters-run-with-high-start">6. Chạy 150m xuất phát cao (s)</Label>
                        <Input type="text" id="one-hundred-fifty-meters-run-with-high-start" name="criteria" value={oneHundredFiftyMetersRunWithHighStart} onChange={handleChangeOneHundredFiftyMetersRunWithHighStart} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-away-jump-in-place">7. Bật xa tại chỗ (m)</Label>
                        <Input type="text" id="away-jump-in-place" name="criteria" value={awayJumpInPlace} onChange={handleChangeAwayJumpInPlace} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="three-steps-jump-in-place">8. Bật 3 bước tại chỗ (m)</Label>
                        <Input type="text" id="three-steps-jump-in-place" name="criteria" value={threeStepsJumpInPlace} onChange={handleChangeThreeStepsJumpInPlace} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-ten-steps-jump-in-place">9. Bật 10 bước tại chỗ (m)</Label>
                        <Input type="text" id="ten-steps-jump-in-place" name="criteria" value={tenStepsJumpInPlace} onChange={handleChangeTenStepsJumpInPlace} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-run-time-of-last-twenty-meters-in-one-hundred-meters-run">10. Thời gian của 20m cuối trong chạy 100m (s)</Label>
                        <Input type="text" id="run-time-of-last-twenty-meters-in-one-hundred-meters-run" name="criteria" value={runTimeOfLastTwentyMetersInOneHundredMetersRun} onChange={handleChangeRunTimeOfLastTwentyMetersInOneHundredMetersRun} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-strength-coefficient-K">11. Hệ số sức bền K (s)</Label>
                        <Input type="text" id="strength-coefficient-K" name="criteria" value={strengthCoefficient_K} onChange={handleChangeStrengthCoefficient_K} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-thighs-raise-in-place-for-ten-seconds">12. Nâng cao đùi tại chỗ 10s (lần)</Label>
                        <Input type="text" id="thighs-raise-in-place-for-ten-seconds" name="criteria" value={thighsRaiseInPlaceForTenSeconds} onChange={handleChangeThighsRaiseInPlaceForTenSeconds} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Trạng thái</Label>
                        <Input type="text" name="status" id="status" value={status === '1' ? "Đã phân loại" : "Chưa phân loại"} readOnly/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Lưu</Button>{' '}
                        <Button color="secondary" tag={Link} to="/physicalFactors">Hủy</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>

    );

}