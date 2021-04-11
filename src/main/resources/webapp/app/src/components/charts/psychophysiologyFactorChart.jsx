import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap';
import AthleteService from '../athlete/athlete-service.js';
import AthleteClassificationService from "../classification-function/athlete-classification-service.js";

export default function PsychophysiologyFactorChart(props) {
    
    const [athletes, setAthletes] = useState([]);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');
    
    const [singleReflectionTimes, setSingleReflectionTimes] = useState([]);
    const [livingCapacityQuotients, setLivingCapacityQuotients] = useState([]);
    const [restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns, setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns] = useState([]);
    const [lacticAcidContentAfterOneHundredMetersRuns, setLacticAcidContentAfterOneHundredMetersRuns] = useState([]);

    const [labels, setLabels] = useState([]);

    const handleOption = (athleteId, athleteName) => {
        setAthleteId(athleteId);
        setAthleteName(athleteName);
        AthleteClassificationService.getAthleteClassificationByAthleteIdAndLastDateOfMonth(athleteId).then((res) => {
            let athleteClassifications = res.data;
            let singleReflectionTimes = [];
            let livingCapacityQuotients = [];
            let restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns = [];
            let lacticAcidContentAfterOneHundredMetersRuns = [];

            for (let i = 0; i < athleteClassifications.length; i++) {
                singleReflectionTimes[i] = athleteClassifications[i].psychophysiologyFactor.singleReflectionTime;
                livingCapacityQuotients[i] = athleteClassifications[i].psychophysiologyFactor.livingCapacityQuotient;
                restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns[i] = athleteClassifications[i].psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun;
                lacticAcidContentAfterOneHundredMetersRuns[i] = athleteClassifications[i].psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun;
            }

            setSingleReflectionTimes(singleReflectionTimes);
            setLivingCapacityQuotients(livingCapacityQuotients);
            setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns(restoredHeartRateAtThirtySecondsAfterOneHundredMetersRuns);
            setLacticAcidContentAfterOneHundredMetersRuns(lacticAcidContentAfterOneHundredMetersRuns);
        });
    }

    useEffect(() => {
        AthleteService.getAthletes().then((res) => {
            setAthletes(res.data);
            let athletes = res.data;
            handleOption(athletes[0].id, athletes[0].athleteName);
        });

        AthleteClassificationService.getAthleteClassificationByLastDateOfMonth().then((res) => {
            let athleteClassifications = res.data;
            let monthYears = [];
            for (let i = 0; i < athleteClassifications.length; i++) {
                monthYears[i] = athleteClassifications[i].createAt.substring(3,10);
            }
            setLabels(monthYears.reverse());
        });
    },[]);

    return (
        <div>
            <Container>
                <h2>Biểu đồ yếu tố tâm-sinh lý</h2>
                {/* &nbsp; */}
                <UncontrolledDropdown inNavbar>
                    <Label md="5">ID Vận động viên</Label>
                    <DropdownToggle nav caret>{athleteId}</DropdownToggle>
                    <DropdownMenu>
                        {athletes.map((athlete, i) => (
                            <DropdownItem onClick = {() => handleOption(athlete.id, athlete.athleteName)}>{athlete.id}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
                {/* &nbsp; */}
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
            </Container>
        </div>
    );
}