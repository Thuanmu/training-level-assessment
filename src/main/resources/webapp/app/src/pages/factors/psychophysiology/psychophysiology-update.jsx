import React, { useEffect, useState } from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import PsychophysiologyFactorService from "../../../services/psychophysiology-factor-service";
import AthleteService from "../../../services/athlete-service";
import CodeGeneration from "../../../utils/code-generation";
import AuthenticationService from "../../../services/authentication-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons";

export default function PsychophysiologyFactorUpdate(props) {

    const [athletes, setAthletes] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [psychophysiologyFactorCode, setPsychophysiologyFactorCode] = useState('');
    const [athleteCode, setAthleteCode] = useState('');
    const [singleReflectionTime, setSingleReflectionTime] = useState('');
    const [livingCapacityQuotient, setLivingCapacityQuotient] = useState('');
    const [heartRateAtFiveSecondsAfterOneHundredMetersRun, setHeartRateAtFiveSecondsAfterOneHundredMetersRun] = useState('');
    const [restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun, setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun] = useState('');
    const [lacticAcidContentAfterOneHundredMetersRun, setLacticAcidContentAfterOneHundredMetersRun] = useState('');
    const [status, setStatus] = useState(0);
    const [createAt, setCreateAt] = useState('');

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOpen = () => setVisible(true);
    const handleToggle = () => setVisible(!visible);

    const handleChangeAthleteCode = event => setAthleteCode(event.target.value);
    const handleChangeSingleReflectionTime = event => setSingleReflectionTime(event.target.value);
    const handleChangeLivingCapacityQuotient = event => setLivingCapacityQuotient(event.target.value);
    const handleChangeHeartRateAtFiveSecondsAfterOneHundredMetersRun = event => setHeartRateAtFiveSecondsAfterOneHundredMetersRun(event.target.value);
    const handleChangeRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun = event => setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun(event.target.value);
    const handleChangeLacticAcidContentAfterOneHundredMetersRun = event => setLacticAcidContentAfterOneHundredMetersRun(event.target.value);

    useEffect(() => {
        if(id)  {
            PsychophysiologyFactorService.getPsychophysiologyFactorById(id).then( res => {
                let psychophysiologyFactor = res.data;
                setId(psychophysiologyFactor.id);
                setPsychophysiologyFactorCode(psychophysiologyFactor.psychophysiologyFactorCode);
                setAthleteCode(psychophysiologyFactor.athlete.athleteCode);
                setSingleReflectionTime(psychophysiologyFactor.singleReflectionTime);
                setLivingCapacityQuotient(psychophysiologyFactor.livingCapacityQuotient);
                setHeartRateAtFiveSecondsAfterOneHundredMetersRun(psychophysiologyFactor.heartRateAtFiveSecondsAfterOneHundredMetersRun);
                setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun(psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun);
                setLacticAcidContentAfterOneHundredMetersRun(psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun);
                setStatus(psychophysiologyFactor.status);
                setCreateAt(psychophysiologyFactor.createAt);
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
            let code = CodeGeneration.generateCode('PS', notNullAthleteCode.substring(2), true);
            let psychophysiologyFactor = {
                id: id,
                psychophysiologyFactorCode: id ? psychophysiologyFactorCode : code,
                athlete: athlete,
                singleReflectionTime: singleReflectionTime,
                livingCapacityQuotient: livingCapacityQuotient,
                heartRateAtFiveSecondsAfterOneHundredMetersRun: heartRateAtFiveSecondsAfterOneHundredMetersRun,
                restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun: restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun,
                lacticAcidContentAfterOneHundredMetersRun: lacticAcidContentAfterOneHundredMetersRun,
                status: status
            };
            
            if(!id) {
                PsychophysiologyFactorService.getPsychophysiologyFactorByPsychophysiologyFactorCode(code).then(res => {
                    let uniquePsychophysiologyFactor = res.data;
                    if (uniquePsychophysiologyFactor.psychophysiologyFactorCode === psychophysiologyFactor.psychophysiologyFactorCode) {
                        if (uniquePsychophysiologyFactor.status === 1) {
                            setMessage(`Vận động viên mã ${uniquePsychophysiologyFactor.athlete.athleteCode} đã được phân loại trong tháng ${uniquePsychophysiologyFactor.createAt.substring(3,10)}. Vui lòng thêm yếu tố tâm-sinh lý cho vận động viên vào tháng sau.`);
                        }
                        else {
                            setMessage(`Yếu tố tâm-sinh lý của vận động viên mã ${uniquePsychophysiologyFactor.athlete.athleteCode} trong tháng ${uniquePsychophysiologyFactor.createAt.substring(3,10)} đã tồn tại. Vui lòng xóa yếu tố tâm-sinh lý mã ${uniquePsychophysiologyFactor.psychophysiologyFactorCode} trước khi thêm.`);
                        }
                    }
                    else {
                        PsychophysiologyFactorService.createPsychophysiologyFactor(psychophysiologyFactor).then(
                            (response) => {
                                if (response.data.message === "PsychophysiologyFactor have been added!") {
                                    setSuccess(true);
                                    setMessage("Yếu tố tâm-sinh lý đã được thêm!");
                                }
                                
                                setTimeout(() => {
                                    setVisible(false);
                                    props.history.push('/psychophysiologyFactors');
                                }, 2000);
                            }
                        );
                    }
                });
            } 
            else {
                PsychophysiologyFactorService.updatePsychophysiologyFactor(psychophysiologyFactor, id).then(
                    (response) => {
                        if (response.data.message === "PsychophysiologyFactor have been edited!") {
                            setSuccess(true);
                            setMessage("Yếu tố tâm-sinh lý đã được chỉnh sửa!");
                        }
                        
                        setTimeout(() => {
                            setVisible(false);
                            props.history.push('/psychophysiologyFactors');
                        }, 2000);
                    }
                );
            }
        });

        handleOpen();
    }

    const title = <h2>{ id ? "Sửa yếu tố tâm-sinh lý" : "Thêm yếu tố tâm-sinh lý" }</h2>;

    return(
        <div>
            <Container className="add-edit-container">
                {title}
             {!success && (
                <Form onSubmit={handleSubmit}>
                    {id ? (
                        <FormGroup>
                            <Label for="code">Mã yếu tố tâm-sinh lý</Label>
                            <Input type="text" name="code" id="code" value={psychophysiologyFactorCode} readOnly={id ? true : false}/>
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
                        <Label for="criteria-single-reflection-time">Thời gian phản xạ đơn (s)</Label>
                        <Input type="text" id="single-reflection-time" name="criteria" value={singleReflectionTime} onChange={handleChangeSingleReflectionTime} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-living-capacity-quotient">Chỉ số dung tích sống (ml/kg)</Label>
                        <Input type="text" id="living-capacity-quotient" name="criteria" value={livingCapacityQuotient} onChange={handleChangeLivingCapacityQuotient} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="heart-rate-at-five-seconds-after-one-hundred-meters-run">Tần số tim 5s sau chạy 100m (lần/ph)</Label>
                        <Input type="text" id="heart-rate-at-five-seconds-after-one-hundred-meters-run" name="criteria" value={heartRateAtFiveSecondsAfterOneHundredMetersRun} onChange={handleChangeHeartRateAtFiveSecondsAfterOneHundredMetersRun} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-restored-heart-rate-at-thirty-seconds-after-one-hundred-meters-run">Tần số tim hồi phục 30s sau chạy 100m (lần/phút)</Label>
                        <Input type="text" id="restored-heart-rate-at-thirty-seconds-after-one-hundred-meters-run" name="criteria" value={restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun} onChange={handleChangeRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-lactic-acid-content-after-one-hundred-meters-run">Hàm lượng axit lactic sau chạy 100m (mmol/lít)</Label>
                        <Input type="text" id="lactic-acid-content-after-one-hundred-meters-run" name="criteria" value={lacticAcidContentAfterOneHundredMetersRun} onChange={handleChangeLacticAcidContentAfterOneHundredMetersRun} />
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
                        <Button color="secondary" tag={Link} to="/psychophysiologyFactors">
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