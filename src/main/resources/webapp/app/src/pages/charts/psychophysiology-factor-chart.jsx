import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Alert, Container, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap';
import AthleteService from '../../services/athlete-service';
import AuthenticationService from "../../services/authentication-service";
import AthleteClassificationService from "../../services/athlete-classification-service";

export default function PsychophysiologyFactorChart(props) {
    
    const [athletes, setAthletes] = useState([]);
    const [athleteCode, setAthleteCode] = useState('');
    const [athleteName, setAthleteName] = useState('');
    
    const [singleReflectionTimes, setSingleReflectionTimes] = useState([]);
    const [livingCapacityQuotients, setLivingCapacityQuotients] = useState([]);
    const [heartRateAtFiveSecondsAfterOneHundredMetersRuns, setHeartRateAtFiveSecondsAfterOneHundredMetersRuns] = useState([]);
    const [restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns, setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns] = useState([]);
    const [lacticAcidContentAfterOneHundredMetersRuns, setLacticAcidContentAfterOneHundredMetersRuns] = useState([]);

    const [labels, setLabels] = useState([]);

    const handleOption = (athleteCode, athleteName) => {
        setAthleteCode(athleteCode);
        setAthleteName(athleteName);
        AthleteClassificationService.getAthleteClassificationByAthleteCode(athleteCode).then((res) => {
            let athleteClassifications = res.data;
            let singleReflectionTimes = [];
            let livingCapacityQuotients = [];
            let heartRateAtFiveSecondsAfterOneHundredMetersRuns = [];
            let restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns = [];
            let lacticAcidContentAfterOneHundredMetersRuns = [];

            for (let i = 0; i < athleteClassifications.length; i++) {
                singleReflectionTimes[i] = athleteClassifications[i].psychophysiologyFactor.singleReflectionTime;
                livingCapacityQuotients[i] = athleteClassifications[i].psychophysiologyFactor.livingCapacityQuotient;
                heartRateAtFiveSecondsAfterOneHundredMetersRuns[i] = athleteClassifications[i].psychophysiologyFactor.heartRateAtFiveSecondsAfterOneHundredMetersRun;
                restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns[i] = athleteClassifications[i].psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun;
                lacticAcidContentAfterOneHundredMetersRuns[i] = athleteClassifications[i].psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun;
            }

            setSingleReflectionTimes(singleReflectionTimes);
            setLivingCapacityQuotients(livingCapacityQuotients);
            setHeartRateAtFiveSecondsAfterOneHundredMetersRuns(heartRateAtFiveSecondsAfterOneHundredMetersRuns);
            setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns(restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns);
            setLacticAcidContentAfterOneHundredMetersRuns(lacticAcidContentAfterOneHundredMetersRuns);
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
                <h2>Biểu đồ yếu tố tâm-sinh lý</h2>
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
                                data: singleReflectionTimes,
                                label: "Phản xạ đơn (s)",
                                borderColor: "Orange",
                                fill: false
                            },
                            {
                                data: livingCapacityQuotients,
                                label: "Chỉ số dung tích sống (ml/kg)",
                                borderColor: "HotPink",
                                fill: false
                            },
                            {
                                data: heartRateAtFiveSecondsAfterOneHundredMetersRuns,
                                label: "Tần số tim 5s sau chạy 100m (lần/ph)",
                                borderColor: "Blue",
                                fill: false
                            },
                            {
                                data: restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns,
                                label: "Tần số tim hồi phục 30s sau chạy 100m (lần/ph)",
                                borderColor: "MediumSpringGreen",
                                fill: false
                            },
                            {
                                data: lacticAcidContentAfterOneHundredMetersRuns,
                                label: "Hàm lượng LA sau chạy 100m (mmol/lít)",
                                borderColor: "Orchid",
                                fill: false
                            }
                        ]
                    }}
                    options={{
                        title: {
                          display: true,
                          text: `Biểu đồ yếu tố tâm-sinh lý của vận động viên ${athleteName}` 
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
                    <Alert color="warning">Không tìm thấy biểu đồ yếu tố tâm-sinh lý nào.</Alert>
                </div>
              )}
            </Container>
        </div>
    );
}