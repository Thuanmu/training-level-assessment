import React, { useEffect, useState } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import TechnicalFactorService from "./technical-service";
import AthleteService from "../../athlete/athlete-service";
import CodeGeneration from "../../../utilities/code-generation";

export default function TechnicalFactorUpdate(props) {

    const [athletes, setAthletes] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [technicalFactorCode, setTechnicalFactorCode] = useState('');
    const [athleteCode, setAthleteCode] = useState('');
    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed] = useState('');
    const [status, setStatus] = useState('0');
    const [createAt, setCreateAt] = useState('');

    const handleChangeAthleteCode = event => setAthleteCode(event.target.value);
    const handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = event => setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(event.target.value);
    
    useEffect(() => {
        if(id)  {
            TechnicalFactorService.getTechnicalFactorById(id).then( res => {
                let technicalFactor = res.data;
                setId(technicalFactor.id);
                setTechnicalFactorCode(technicalFactor.technicalFactorCode);
                setAthleteCode(technicalFactor.athlete.athleteCode);
                setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed);
                setStatus(technicalFactor.status);
                setCreateAt(technicalFactor.createAt);
            });
        }

        AthleteService.getAthletes().then((res) => {
            setAthletes(res.data);
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let notNullAthleteCode = athleteCode ? athleteCode : athletes[0].athleteCode;
        AthleteService.getAthleteByAthleteCode(notNullAthleteCode).then((res) => {
            let athlete = res.data;
            let code = CodeGeneration.generateCode('TE', notNullAthleteCode.substring(2), true);
            let technicalFactor = {
                id: id,
                technicalFactorCode: id ? technicalFactorCode : code,
                athlete: athlete,
                performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed: performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed,
                status: status
            };

            if(!id) {
                TechnicalFactorService.getTechnicalFactorByTechnicalFactorCode(code).then(res => {
                    let uniqueTechnicalFactor = res.data;
                    if (uniqueTechnicalFactor.technicalFactorCode === technicalFactor.technicalFactorCode) {
                        if (uniqueTechnicalFactor.status === '1') {
                            alert(`Vận động viên mã ${uniqueTechnicalFactor.athlete.athleteCode} đã được phân loại trong tháng ${uniqueTechnicalFactor.createAt}. Vui lòng xóa bảng xếp hạng tháng ${uniqueTechnicalFactor.createAt} trước khi thêm để phân loại lại.`);
                            props.history.push('/technicalFactors');
                        }
                        else {
                            alert(`Yếu tố kỹ thuật của vận động viên mã ${uniqueTechnicalFactor.athlete.athleteCode} trong tháng ${uniqueTechnicalFactor.createAt} đã tồn tại. Vui lòng xóa yếu tố kỹ thuật mã ${uniqueTechnicalFactor.technicalFactorCode} trước khi thêm.`);
                            props.history.push('/technicalFactors');
                        }
                    }
                    else {
                        TechnicalFactorService.createTechnicalFactor(technicalFactor).then(res => {
                            props.history.push('/technicalFactors');
                        });
                    }
                });
            } 
            else {
                TechnicalFactorService.updateTechnicalFactor(technicalFactor, id).then( res => {
                    props.history.push('/technicalFactors');
                });
            }
        });
    }

    const title = <h2>{ id ? "Sửa yếu tố kỹ thuật" : "Thêm yếu tố kỹ thuật" }</h2>;

    return(
        <div>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    {id ? (
                        <FormGroup>
                            <Label for="code">Mã yếu tố kỹ thuật</Label>
                            <Input type="text" name="code" id="code" value={technicalFactorCode} readOnly={id ? true : false}/>
                        </FormGroup>
                        ) : ''}
                    <FormGroup>
                        <Label for="athlete-code">Mã vận động viên</Label>
                        <Input type={id ? "text" : "select"} name="athlete-code" id="athlete-code" value={athleteCode} onChange={handleChangeAthleteCode} readOnly={id ? true : false}>
                            {athletes.map((athlete, i) => (
                                <option>{athlete.athleteCode}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="performance-difference">Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</Label>
                        <Input type="text" name="performance-difference" id="performance-difference" value={performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} onChange={handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Trạng thái</Label>
                        <Input type="text" name="status" id="status" value={status === '1' ? "Đã phân loại" : "Chưa phân loại"} readOnly/>
                    </FormGroup>
                    {id ? (
                        <FormGroup>
                            <Label for="create-at">Ngày tạo</Label>
                            <Input type="text" name="create-at" id="create-at" value={createAt} readOnly/>
                        </FormGroup>
                    ) : ''}
                    <FormGroup>
                        <Button color="primary" type="submit">Lưu</Button>{' '}
                        <Button color="secondary" tag={Link} to="/technicalFactors">Hủy</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );

}