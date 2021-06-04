import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Alert, Container, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap';
import AthleteService from '../../services/athlete-service';
import AuthenticationService from "../../services/authentication-service";
import AthleteClassificationService from "../../services/athlete-classification-service";

export default function TechnicalFactorChart(props) {

    const [athletes, setAthletes] = useState([]);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');

    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds] = useState([]);
    const [groundingTimeWhenReachingHighSpeeds, setGroundingTimeWhenReachingHighSpeeds] = useState([]);

    const [labels, setLabels] = useState([]);

    const handleOption = (athleteCode, athleteName) => {
        setAthleteCode(athleteCode);
        setAthleteName(athleteName);
        AthleteClassificationService.getAthleteClassificationByAthleteCode(athleteCode).then((res) => {
            let athleteClassifications = res.data;
            let performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds = [];
            let groundingTimeWhenReachingHighSpeeds = [];

            for (let i = 0; i < athleteClassifications.length; i++) {
                performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds[i] = athleteClassifications[i].technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
                groundingTimeWhenReachingHighSpeeds[i] = athleteClassifications[i].technicalFactor.groundingTimeWhenReachingHighSpeed;
            }

            setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds(performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds);
            setGroundingTimeWhenReachingHighSpeeds(groundingTimeWhenReachingHighSpeeds);
        });
    }

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        if (user) {
            if (user.roles.includes("ROLE_COACH")) {
                AthleteService.getAllAthletesByCoachId(user.id).then((res) => {
                    setAthletes(res.data);
                    let athletes = res.data;
                    if (athletes.length > 0) {
                        handleOption(athletes[0].athleteCode, athletes[0].athleteName);
                    }
                });

                AthleteClassificationService.getAllAthleteClassificationsByCoachId(user.id).then((res) => {
                    let athleteClassifications = res.data;
                    if (athleteClassifications.length > 0) {
                        let monthYears = [];
                        for (let i = 0; i < athleteClassifications.length; i++) {
                            monthYears[i] = athleteClassifications[i].createAt.substring(3,10);
                        }
                        setLabels(monthYears.reverse());
                    }
                });
            }
            else {
                AthleteService.getAllAthletesByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
                    setAthletes(res.data);
                    let athletes = res.data;
                    if (athletes.length > 0) {
                        handleOption(athletes[0].athleteCode, athletes[0].athleteName);
                    }
                });

                AthleteClassificationService.getAllAthleteClassificationsByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
                    let athleteClassifications = res.data;
                    if (athleteClassifications.length > 0) {
                        let monthYears = [];
                        for (let i = 0; i < athleteClassifications.length; i++) {
                            monthYears[i] = athleteClassifications[i].createAt.substring(3,10);
                        }
                        setLabels(monthYears.reverse());
                    }
                });
            }
        }
        else {
            props.history.push(`/login`);
        }
    },[]);

    return (
        <div>
            <Container>
                <h2>Biểu đồ yếu tố kỹ thuật</h2>
              {athletes.length > 0 && labels.length > 0 ? (
                <div>
                 <UncontrolledDropdown inNavbar>
                    <Label md="5">Mã vận động viên</Label>
                    <DropdownToggle nav caret>{athleteCode}</DropdownToggle>
                    <DropdownMenu>
                        {athletes.map((athlete, i) => (
                            <DropdownItem onClick = {() => handleOption(athlete.athleteCode, athlete.athleteName)}>{athlete.athleteCode}</DropdownItem>
                        ))}
                    </DropdownMenu>
                 </UncontrolledDropdown>
                 <Line
                    data={{
                        labels: labels, 
                        datasets: [
                            {
                                data: performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds,
                                label: "Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)",
                                borderColor: "red",
                                fill: false
                            },
                            {
                                data: groundingTimeWhenReachingHighSpeeds,
                                label: "Thời gian tiếp đất khi đạt tốc độ cao (s)",
                                borderColor: "yellow",
                                fill: false
                            }
                        ]
                    }}
                    options={{
                        title: {
                          display: true,
                          text: `Biểu đồ yếu tố kỹ thuật của vận động viên ${athleteName}` 
                        },
                        legend: {
                          display: true,
                          position: "bottom"
                        }
                    }}
                 />
                </div>
              ) : (
                <div>
                    <Alert color="warning">Không tìm thấy biểu đồ yếu tố kỹ thuật nào.</Alert>
                </div>
              )}
            </Container>
        </div>
    );
}