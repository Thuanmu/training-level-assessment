import React, { useEffect, useState } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import PsychophysiologyFactorService from "./psychophysiology-service";

export default function PsychophysiologyFactorUpdate(props) {

    const [id, setId] = useState(props.match.params.id);
    const [athleteId, setAthleteId] = useState('');
    const [singleReflectionTime, setSingleReflectionTime] = useState('');
    const [livingCapacityQuotient, setLivingCapacityQuotient] = useState('');
    const [restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun, setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun] = useState('');
    const [lacticAcidContentAfterOneHundredMetersRun, setLacticAcidContentAfterOneHundredMetersRun] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [lastModified, setLastModified] = useState('');

    const handleChangeAthleteId = event => setAthleteId(event.target.value);
    const handleChangeSingleReflectionTime = event => setSingleReflectionTime(event.target.value);
    const handleChangeLivingCapacityQuotient = event => setLivingCapacityQuotient(event.target.value);
    const handleChangeRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun = event => setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun(event.target.value);
    const handleChangeLacticAcidContentAfterOneHundredMetersRun = event => setLacticAcidContentAfterOneHundredMetersRun(event.target.value);
    const handleChangeCreateAt = event => setCreateAt(event.target.value);
    const handleChangeLastModified = event => setLastModified(event.target.value);

    useEffect(() => {
        if(id !== 'new')  {
            PsychophysiologyFactorService.getPsychophysiologyFactorById(id).then( res => {
                let psychophysiologyFactor = res.data;
                setId(psychophysiologyFactor.id);
                setAthleteId(psychophysiologyFactor.athlete.id);
                setSingleReflectionTime(psychophysiologyFactor.singleReflectionTime);
                setLivingCapacityQuotient(psychophysiologyFactor.livingCapacityQuotient);
                setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun(psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun);
                setLacticAcidContentAfterOneHundredMetersRun(psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun);
                setCreateAt(psychophysiologyFactor.createAt);
                setLastModified(psychophysiologyFactor.lastModified);
            });
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let psychophysiologyFactor = {
            id: id,
            athlete: {id: athleteId},
            singleReflectionTime: singleReflectionTime,
            livingCapacityQuotient: livingCapacityQuotient,
            restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun: restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun,
            lacticAcidContentAfterOneHundredMetersRun: lacticAcidContentAfterOneHundredMetersRun,
            createAt: createAt,
            lastModified: lastModified
        };
        
        if(id === 'new') {
            PsychophysiologyFactorService.createPsychophysiologyFactor(psychophysiologyFactor).then(res => {
                props.history.push('/psychophysiologyFactors');
            });
        } 
        else {
            PsychophysiologyFactorService.updatePsychophysiologyFactor(psychophysiologyFactor, id).then( res => {
                props.history.push('/psychophysiologyFactors');
            });
        }
    }

    const title = <h2>{ id ? "Sửa Yếu tố tâm-sinh lý" : "Thêm Yếu tố tâm-sinh lý" }</h2>;

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
                        <Label for="criteria-single-reflection-time">14. Thời gian phản xạ đơn (s)</Label>
                        <Input type="text" id="single-reflection-time" name="criteria" value={singleReflectionTime} onChange={handleChangeSingleReflectionTime} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-living-capacity-quotient">15. Chỉ số dung tích sống (ml/kg)</Label>
                        <Input type="text" id="living-capacity-quotient" name="criteria" value={livingCapacityQuotient} onChange={handleChangeLivingCapacityQuotient} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-restored-heart-rate-at-thirty-seconds-after-one-hundred-meters-run">16. Tần số tim hồi phục 30s sau chạy 100m (lần/phút)</Label>
                        <Input type="text" id="restored-heart-rate-at-thirty-seconds-after-one-hundred-meters-run" name="criteria" value={restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun} onChange={handleChangeRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria-lactic-acid-content-after-one-hundred-meters-run">17. Hàm lượng axit lactic sau chạy 100m (mmol/lít)</Label>
                        <Input type="text" id="lactic-acid-content-after-one-hundred-meters-run" name="criteria" value={lacticAcidContentAfterOneHundredMetersRun} onChange={handleChangeLacticAcidContentAfterOneHundredMetersRun} />
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
                        <Button color="secondary" tag={Link} to="/psychophysiologyFactors">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>

    );


}