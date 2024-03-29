import React, { useEffect, useState } from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { Link } from 'react-router-dom';
import AthleteService from '../../services/athlete-service';
import moment from "moment";
import CodeGeneration from "../../utils/code-generation";
import AuthenticationService from "../../services/authentication-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons";

export default function AthleteUpdate(props) {

    const [athletes, setAthletes] = useState([]);
    const [athleteId, setAthleteId] = useState(props.match.params.id);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [hometown, setHometown] = useState('');
    const [totalScoresOfCriterias, setTotalScoresOfCriterias] = useState('');
    const [grade, setGrade] = useState('');
    const [athleteRank, setAthleteRank] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [lastModified, setLastModified] = useState('');

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOpen = () => setVisible(true);
    const handleToggle = () => setVisible(!visible);

    const handleAthleteName = event => setAthleteName(event.target.value);
    const handleDateOfBirth = event => setDateOfBirth(event.target.value);
    const handleGender = value => setGender(value);
    const handleHometown = event => setHometown(event.target.value);
    const handleTotalScoresOfCriterias = event => setTotalScoresOfCriterias(event.target.value);
    const handleGrade = event => setGrade(event.target.value);
    const handleAthleteRank = event => setAthleteRank(event.target.value);
    
    useEffect(() => {
        if(athleteId)  {
            AthleteService.getAthleteById(athleteId).then( res => {
                let athlete = res.data;
                setAthleteId(athlete.id);
                setAthleteCode(athlete.athleteCode);
                setAthleteName(athlete.athleteName);
                setDateOfBirth(athlete.dateOfBirth);
                setGender(athlete.gender);
                setHometown(athlete.hometown);
                setTotalScoresOfCriterias(athlete.totalScoresOfCriterias);
                setGrade(athlete.grade);
                setAthleteRank(athlete.athleteRank);
                setCreateAt(athlete.createAt);
                setLastModified(athlete.lastModified);
            });
        }

        AthleteService.getAllAthletes().then((res) => {
            setAthletes(res.data);
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = AuthenticationService.getCurrentUser();
        let code = CodeGeneration.generateCode('AT', athletes.length > 0 ? athletes[athletes.length - 1].athleteCode.substring(2) : "00000", false);
        // document.write(JSON.stringify(athletes));
        let athlete = {
            id: athleteId,
            athleteCode: athleteId ? athleteCode : code,
            athleteName: athleteName,
            dateOfBirth: athleteId ? dateOfBirth : moment(dateOfBirth).format("DD-MM-YYYY"),
            gender: gender,
            hometown: hometown,
            totalScoresOfCriterias: totalScoresOfCriterias,
            grade: grade,
            athleteRank: athleteRank,
            user: {id : user.id}
        };
    
        if(!athleteId) {
            AthleteService.createAthlete(athlete).then(
                (response) => {
                    if (response.data.message === "Athlete have been added!") {
                        setMessage("Vận động viên đã được thêm!");
                    }
                    setSuccess(true);
                    setTimeout(() => {
                        setVisible(false);
                        props.history.push('/athletes');
                    }, 2000);
                }
            );
        } 
        else {
            AthleteService.updateAthlete(athlete, athleteId).then(
                (response) => {
                    if (response.data.message === "Athlete have been edited!") {
                        setMessage("Vận động viên đã được chỉnh sửa!");
                    }
                    setSuccess(true);
                    setTimeout(() => {
                        setVisible(false);
                        props.history.push('/athletes');
                    }, 2000);
                }
            );
        }

        handleOpen();
    }

    
    const title = <h2>{ athleteId ? "Sửa vận động viên" : "Thêm vận động viên" }</h2>;
            
    return(
        <div>
            <Container className="add-edit-container">
                {title}
             {!success && (
                <Form onSubmit={handleSubmit}>
                    {athleteId ? (
                        <FormGroup>
                            <Label for="code">Mã vận động viên</Label>
                            <Input type="text" name="code" id="code" value={athleteCode} readOnly={athleteId ? true : false}/>
                        </FormGroup>
                    ) : ''}
                    <FormGroup>
                        <Label for="athlete-name">Tên vận động viên</Label>
                        <Input type="text"  name="athlete-name" id="athlete-name" value={athleteName} onChange={handleAthleteName} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date-of-birth">Ngày sinh</Label>
                        <Input type={athleteId ? "text" : "date"} name="date-of-birth" id="date-of-birth" value={dateOfBirth} onChange={handleDateOfBirth} required/>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <Row>
                            <Label md="2">Giới tính</Label>
                        </Row>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" name="gender" value={gender} checked={gender === 0 ? true : false} onChange={() => handleGender(0)} required/>{' '}
                                    Nam
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" name="gender" value={gender} checked={gender === 1 ? true : false} onChange={() => handleGender(1)} required/>{' '}
                                    Nữ
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="home-town">Quê quán</Label>
                        <Input type="text" name="name" id="name" value={hometown} onChange={handleHometown} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="total-scores-of-criterias">Tổng điểm</Label>
                        <Input type="text" name="total-scores-of-criterias" id="total-scores-of-criterias" value={totalScoresOfCriterias} onChange={handleTotalScoresOfCriterias} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="grade">Xếp loại</Label>
                        <Input type="text" name="grade" id="grade" value={grade} onChange={handleGrade} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="athlete-rank">Xếp hạng</Label>
                        <Input type="text" name="athlete-rank" id="athlete-rank" value={athleteRank} onChange={handleAthleteRank} readOnly />
                    </FormGroup>
                    {athleteId ? (
                        <div>
                            <FormGroup>
                                <Label for="create-at">Ngày tạo</Label>
                                <Input type="text" name="create-at" id="create-at" value={createAt} readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastModified">Ngày cập nhật</Label>
                                <Input type="text" name="lastModified" id="lastModified" value={lastModified} readOnly/>
                            </FormGroup>
                        </div>
                    ) : ''}
                    <FormGroup>
                        <Button color="primary" type="submit">
                            <FontAwesomeIcon icon={faSave}/>
                            &nbsp;
                            <span>Lưu</span>
                        </Button>{' '}
                        <Button color="secondary" tag={Link} to="/athletes">
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