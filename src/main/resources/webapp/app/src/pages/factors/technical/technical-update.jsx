import React, { useEffect, useState } from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import TechnicalFactorService from "../../../services/technical-factor-service";
import AthleteService from "../../../services/athlete-service";
import CodeGeneration from "../../../utils/code-generation";
import AuthenticationService from "../../../services/authentication-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons";

export default function TechnicalFactorUpdate(props) {

    const [athletes, setAthletes] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [technicalFactorCode, setTechnicalFactorCode] = useState('');
    const [athleteCode, setAthleteCode] = useState('');
    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed] = useState('');
    const [groundingTimeWhenReachingHighSpeed, setGroundingTimeWhenReachingHighSpeed] = useState('');
    const [status, setStatus] = useState(0);
    const [createAt, setCreateAt] = useState('');

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOpen = () => setVisible(true);
    const handleToggle = () => setVisible(!visible);

    const handleChangeAthleteCode = event => setAthleteCode(event.target.value);
    const handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = event => setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(event.target.value);
    const handleChangeGroundingTimeWhenReachingHighSpeed = event => setGroundingTimeWhenReachingHighSpeed(event.target.value);


    useEffect(() => {
        
        if(id)  {
            TechnicalFactorService.getTechnicalFactorById(id).then( res => {
                let technicalFactor = res.data;
                setId(technicalFactor.id);
                setTechnicalFactorCode(technicalFactor.technicalFactorCode);
                setAthleteCode(technicalFactor.athlete.athleteCode);
                setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed);
                setGroundingTimeWhenReachingHighSpeed(technicalFactor.groundingTimeWhenReachingHighSpeed);
                setStatus(technicalFactor.status);
                setCreateAt(technicalFactor.createAt);
            });
        }

        let user = AuthenticationService.getCurrentUser();
        AthleteService.getAllAthletesByCoachId(user.id).then((res) => {
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
                groundingTimeWhenReachingHighSpeed: groundingTimeWhenReachingHighSpeed,
                status: status
            };

            if(!id) {
                TechnicalFactorService.getTechnicalFactorByTechnicalFactorCode(code).then(res => {
                    let uniqueTechnicalFactor = res.data;
                    if (uniqueTechnicalFactor.technicalFactorCode === technicalFactor.technicalFactorCode) {
                        if (uniqueTechnicalFactor.status === 1) {
                            setMessage(`Vận động viên mã ${uniqueTechnicalFactor.athlete.athleteCode} đã được phân loại trong tháng ${uniqueTechnicalFactor.createAt.substring(3,10)}. Vui lòng thêm yếu tố kỹ thuật cho vận động viên vào tháng sau.`);
                        }
                        else {
                            setMessage(`Yếu tố kỹ thuật của vận động viên mã ${uniqueTechnicalFactor.athlete.athleteCode} trong tháng ${uniqueTechnicalFactor.createAt.substring(3,10)} đã tồn tại. Vui lòng xóa yếu tố kỹ thuật mã ${uniqueTechnicalFactor.technicalFactorCode} trước khi thêm.`);
                        }
                    }
                    else {
                        TechnicalFactorService.createTechnicalFactor(technicalFactor).then(
                            (response) => {
                                if (response.data.message === "TechnicalFactor have been added!") {
                                    setSuccess(true);
                                    setMessage("Yếu tố kỹ thuật đã được thêm!");
                                }
                                
                                setTimeout(() => {
                                    setVisible(false);
                                    props.history.push('/technicalFactors');
                                }, 2000);
                            }
                        );
                    }
                });
            } 
            else {
                TechnicalFactorService.updateTechnicalFactor(technicalFactor, id).then(
                    (response) => {
                        if (response.data.message === "TechnicalFactor have been edited!") {
                            setSuccess(true);
                            setMessage("Yếu tố kỹ thuật đã được chỉnh sửa!");
                        }
                        
                        setTimeout(() => {
                            setVisible(false);
                            props.history.push('/technicalFactors');
                        }, 2000);
                    }
                );
            }
        });

        handleOpen();
    }

    const title = <h2>{ id ? "Sửa yếu tố kỹ thuật" : "Thêm yếu tố kỹ thuật"}</h2>;

    return(
        <div>
            <Container className="add-edit-container">
                {title}
             {!success && (
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
                        <Input type="text" name="performance-difference" id="performance-difference" value={performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} onChange={handleChangePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="grounding-time-when-reaching-high-speed">Thời gian tiếp đất khi đạt tốc độ cao (s)</Label>
                        <Input type="text" name="grounding-time-when-reaching-high-speed" id="grounding-time-when-reaching-high-speed" value={groundingTimeWhenReachingHighSpeed} onChange={handleChangeGroundingTimeWhenReachingHighSpeed} />
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
                        <Button color="primary" type="submit">
                            <FontAwesomeIcon icon={faSave}/>
                            &nbsp;
                            <span>Lưu</span>
                        </Button>{' '}
                        <Button color="secondary" tag={Link} to="/technicalFactors">
                            <FontAwesomeIcon icon={faArrowCircleLeft}/>
                            &nbsp;
                            <span>Quay lại</span>
                        </Button>
                    </FormGroup>
                </Form>
             )}
             <Alert color={success ? "success" : "danger"} isOpen={visible} toggle={handleToggle}>
                {message}
             </Alert>
            </Container>
        </div>
    );

}