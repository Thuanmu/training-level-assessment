import React, { useEffect, useState } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import TechnicalFactorService from "./technical-service";
import AthleteService from "../../athlete/athlete-service";

export default function TechnicalFactorUpdate(props) {

    const [athletes, setAthletes] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [lastModified, setLastModified] = useState('');

    const handleChangeAthleteId = event => setAthleteId(event.target.value);
    const handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = event => setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(event.target.value);
    
    useEffect(() => {
        if(id)  {
            TechnicalFactorService.getTechnicalFactorById(id).then( res => {
                let technicalFactor = res.data;
                setId(technicalFactor.id);
                setAthleteId(technicalFactor.athlete.id);
                setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed);
                setCreateAt(technicalFactor.createAt);
                setLastModified(technicalFactor.lastModified);
            });
        }

        AthleteService.getAthletes().then((res) => {
            setAthletes(res.data);
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let technicalFactor = {
            id: id,
            athlete: {id: athleteId ? athleteId : athletes[0].id},
            performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed: performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed,
            createAt: createAt,
            lastModified: lastModified
        };

        if(!id) {
            TechnicalFactorService.createTechnicalFactor(technicalFactor).then(res => {
                props.history.push('/technicalFactors');
            });
        } 
        else {
            TechnicalFactorService.updateTechnicalFactor(technicalFactor, id).then( res => {
                props.history.push('/technicalFactors');
            });
        }
    }

    const title = <h2>{ id ? "Sửa Yếu tố kỹ thuật" : "Thêm Yếu tố kỹ thuật" }</h2>;

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
                        <Label for="performance-difference">Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</Label>
                        <Input type="text" name="performance-difference" id="performance-difference" value={performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} onChange={handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Lưu</Button>{' '}
                        <Button color="secondary" tag={Link} to="/technicalFactors">Hủy</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );

}