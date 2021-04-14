import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap';
import AthleteService from '../athlete/athlete-service.js';
import AthleteClassificationService from "../classification-function/athlete-classification-service.js";

export default function TechnicalFactorChart(props) {

    const [athletes, setAthletes] = useState([]);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');

    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds] = useState([]);
    const [labels, setLabels] = useState([]);

    const handleOption = (athleteId, athleteName) => {
        setAthleteId(athleteId);
        setAthleteName(athleteName);
        AthleteClassificationService.getAthleteClassificationByAthleteIdAndLastDateOfMonth(athleteId).then((res) => {
            let athleteClassifications = res.data;
            let performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds = [];

            for (let i = 0; i < athleteClassifications.length; i++) {
                performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds[i] = athleteClassifications[i].technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
            }

            setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds(performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeeds);
        });
    }

    useEffect(() => {
        AthleteService.getAthletes().then((res) => {
            setAthletes(res.data);
            let athletes = res.data;
            if (athletes.length > 0) {
                handleOption(athletes[0].id, athletes[0].athleteName);
            }
        });

        AthleteClassificationService.getAthleteClassificationByLastDateOfMonth().then((res) => {
            let athleteClassifications = res.data;
            if (athleteClassifications.length > 0) {
                let monthYears = [];
                for (let i = 0; i < athleteClassifications.length; i++) {
                    monthYears[i] = athleteClassifications[i].createAt.substring(3,10);
                }
                setLabels(monthYears.reverse());
            }
        });
    },[]);

    return (
        <div>
            <Container>
                <h2>Biểu đồ yếu tố kỹ thuật</h2>
                &nbsp;
              {athletes.length > 0 && labels.length > 0 ? (
                <div>
                 <UncontrolledDropdown inNavbar>
                    <Label md="5">ID Vận động viên</Label>
                    <DropdownToggle nav caret>{athleteId}</DropdownToggle>
                    <DropdownMenu>
                        {athletes.map((athlete, i) => (
                            <DropdownItem onClick = {() => handleOption(athlete.id, athlete.athleteName)}>{athlete.id}</DropdownItem>
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
                 <div>Không tìm thấy biểu đồ yếu tố kỹ thuật nào</div>
              )}
            </Container>
        </div>
    );
}