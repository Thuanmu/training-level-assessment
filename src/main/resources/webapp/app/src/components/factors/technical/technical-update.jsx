import React, { useEffect, useState } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import TechnicalFactorService from "./technical-service";

export default function TechnicalFactorUpdate(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [lastModified, setLastModified] = useState('');

    const handleChangeAthleteId = event => setAthleteId(event.target.value);
    const handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = event => setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(event.target.value);
    const handleChangeCreateAt = event => setCreateAt(event.target.value);
    const handleChangeLastModified = event => setLastModified(event.target.value);

    useEffect(() => {
        if(id !== 'new')  {
            TechnicalFactorService.getTechnicalFactorById(id).then( res => {
                let technicalFactor = res.data;
                setId(technicalFactor.id);
                setAthleteId(technicalFactor.athlete.id);
                setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed);
                setCreateAt(technicalFactor.createAt);
                setLastModified(technicalFactor.lastModified);
            });
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let technicalFactor = {
            id: id,
            athlete: {id: athleteId},
            performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed: performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed,
            createAt: createAt,
            lastModified: lastModified
        };
        
        if(id === 'new') {
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
                        <Input type="text" name="athlete-id" id="athlete-id" value={athleteId} onChange={handleChangeAthleteId} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="performance-difference">Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</Label>
                        <Input type="text" name="performance-difference" id="performance-difference" value={performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} onChange={handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="create-at">Ngày tạo</Label>
                        <Input type="text" name="create-at" id="create-at" value={createAt} onChange={handleChangeCreateAt} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="last-modified">Cập nhật lần cuối</Label>
                        <Input type="text" name="last-modified" id="last-modified" value={lastModified} onChange={handleChangeLastModified} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/technicalFactors">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );

}