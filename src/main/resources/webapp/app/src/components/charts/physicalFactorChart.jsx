import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap';
import AthleteService from '../athlete/athlete-service.js';
import AthleteClassificationService from "../classification-function/athlete-classification-service.js";

export default function PhysicalFactorChart(props) {
    
    const [athletes, setAthletes] = useState([]);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');
    
    const [timeOfReflectionStarts, setTimeOfReflectionStarts] = useState([]);
    const [thirtyMetersRunAtHighSpeeds, setThirtyMetersRunAtHighSpeeds] = useState([]);
    const [thirtyMetersRunWithLowStarts, setThirtyMetersRunWithLowStarts] = useState([]);
    const [sixtyMetersRunWithLowStarts, setSixtyMetersRunWithLowStarts] = useState([]);
    const [eightyMetersRunWithHighStarts, setEightyMetersRunWithHighStarts] = useState([]);
    const [oneHundredFiftyMetersRunWithHighStarts, setOneHundredFiftyMetersRunWithHighStarts] = useState([]);
    const [awayJumpInPlaces, setAwayJumpInPlaces] = useState([]);
    const [threeStepsJumpInPlaces, setThreeStepsJumpInPlaces] = useState([]);
    const [tenStepsJumpInPlaces, setTenStepsJumpInPlaces] = useState([]);
    const [runTimeOfLastTwentyMetersInOneHundredMetersRuns, setRunTimeOfLastTwentyMetersInOneHundredMetersRuns] = useState([]);
    const [strengthCoefficient_Ks, setStrengthCoefficient_Ks] = useState([]);
    const [thighsRaiseInPlaceForTenSecondsList, setThighsRaiseInPlaceForTenSecondsList] = useState([]);

    const [labels, setLabels] = useState([]);

    const handleOption = (athleteId, athleteName) => {
        setAthleteId(athleteId);
        setAthleteName(athleteName);
        AthleteClassificationService.getAthleteClassificationByAthleteIdAndLastDateOfMonth(athleteId).then((res) => {
            let athleteClassifications = res.data;
            let timeOfReflectionStarts = [];
            let thirtyMetersRunAtHighSpeeds = [];
            let thirtyMetersRunWithLowStarts = [];
            let sixtyMetersRunWithLowStarts = [];
            let eightyMetersRunWithHighStarts = [];
            let oneHundredFiftyMetersRunWithHighStarts = [];
            let awayJumpInPlaces = [];
            let threeStepsJumpInPlaces = [];
            let tenStepsJumpInPlaces = [];
            let runTimeOfLastTwentyMetersInOneHundredMetersRuns = [];
            let strengthCoefficient_Ks = [];
            let thighsRaiseInPlaceForTenSecondsList = [];

            for (let i = 0; i < athleteClassifications.length; i++) {
                timeOfReflectionStarts[i] = athleteClassifications[i].physicalFactor.timeOfReflectionStart;
                thirtyMetersRunAtHighSpeeds[i] = athleteClassifications[i].physicalFactor.thirtyMetersRunAtHighSpeed;
                thirtyMetersRunWithLowStarts[i] = athleteClassifications[i].physicalFactor.thirtyMetersRunWithLowStart;
                sixtyMetersRunWithLowStarts[i] = athleteClassifications[i].physicalFactor.sixtyMetersRunWithLowStart;
                eightyMetersRunWithHighStarts[i] = athleteClassifications[i].physicalFactor.eightyMetersRunWithHighStart;
                oneHundredFiftyMetersRunWithHighStarts[i] = athleteClassifications[i].physicalFactor.oneHundredFiftyMetersRunWithHighStart;
                awayJumpInPlaces[i] = athleteClassifications[i].physicalFactor.awayJumpInPlace;
                threeStepsJumpInPlaces[i] = athleteClassifications[i].physicalFactor.threeStepsJumpInPlace;
                tenStepsJumpInPlaces[i] = athleteClassifications[i].physicalFactor.tenStepsJumpInPlace;
                runTimeOfLastTwentyMetersInOneHundredMetersRuns[i] = athleteClassifications[i].physicalFactor.runTimeOfLastTwentyMetersInOneHundredMetersRun;
                strengthCoefficient_Ks[i] = athleteClassifications[i].physicalFactor.strengthCoefficient_K;
                thighsRaiseInPlaceForTenSecondsList[i] = athleteClassifications[i].physicalFactor.thighsRaiseInPlaceForTenSeconds;
            }

            setTimeOfReflectionStarts(timeOfReflectionStarts);
            setThirtyMetersRunAtHighSpeeds(thirtyMetersRunAtHighSpeeds);
            setThirtyMetersRunWithLowStarts(thirtyMetersRunWithLowStarts);
            setSixtyMetersRunWithLowStarts(sixtyMetersRunWithLowStarts);
            setEightyMetersRunWithHighStarts(eightyMetersRunWithHighStarts);
            setOneHundredFiftyMetersRunWithHighStarts(oneHundredFiftyMetersRunWithHighStarts);
            setAwayJumpInPlaces(awayJumpInPlaces);
            setThreeStepsJumpInPlaces(threeStepsJumpInPlaces);
            setTenStepsJumpInPlaces(tenStepsJumpInPlaces);
            setRunTimeOfLastTwentyMetersInOneHundredMetersRuns(runTimeOfLastTwentyMetersInOneHundredMetersRuns);
            setStrengthCoefficient_Ks(strengthCoefficient_Ks);
            setThighsRaiseInPlaceForTenSecondsList(thighsRaiseInPlaceForTenSecondsList);
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
                <h2>Biểu đồ yếu tố thể lực</h2>
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
                                data: timeOfReflectionStarts,
                                label: "Thời gian phản xạ xuất phát (s)",
                                borderColor: "Lime",
                                fill: false
                            },
                            {
                                data: thirtyMetersRunAtHighSpeeds,
                                label: "Chạy 30m tốc độ cao (s)",
                                borderColor: "Blue",
                                fill: false
                            },
                            {
                                data: thirtyMetersRunWithLowStarts,
                                label: "Chạy 30m xuất phát thấp (s)",
                                borderColor: "Cyan",
                                fill: false
                            },
                            {
                                data: sixtyMetersRunWithLowStarts,
                                label: "Chạy 60m xuất phát thấp (s)",
                                borderColor: "Magenta",
                                fill: false
                            },
                            {
                                data: eightyMetersRunWithHighStarts,
                                label: "Chạy 80m xuất phát cao (s)",
                                borderColor: "Gray",
                                fill: false
                            },
                            {
                                data: oneHundredFiftyMetersRunWithHighStarts,
                                label: "Chạy 150m xuất phát cao (s)",
                                borderColor: "Maroon",
                                fill: false
                            },
                            {
                                data: awayJumpInPlaces,
                                label: "Bật xa tại chỗ (m)",
                                borderColor: "Olive",
                                fill: false
                            },
                            {
                                data: threeStepsJumpInPlaces,
                                label: "Bật 3 bước tại chỗ (m)",
                                borderColor: "Green",
                                fill: false
                            },
                            {
                                data: tenStepsJumpInPlaces,
                                label: "Bật 10 bước tại chỗ (m)",
                                borderColor: "Purple",
                                fill: false
                            },
                            {
                                data: runTimeOfLastTwentyMetersInOneHundredMetersRuns,
                                label: "Thời gian chạy 20m cuối trong chạy 100m (s)",
                                borderColor: "Teal",
                                fill: false
                            },
                            {
                                data: strengthCoefficient_Ks,
                                label: "Hệ số sức bền K (s)",
                                borderColor: "Navy",
                                fill: false
                            },
                            {
                                data: thighsRaiseInPlaceForTenSecondsList,
                                label: "Nâng cao đùi tại chỗ 10s (lần)",
                                borderColor: "Yellow",
                                fill: false
                            }
                        ]
                    }}
                    options={{
                        title: {
                          display: true,
                          text: `Biểu đồ yếu tố thể lực của vận động viên ${athleteName}` 
                        },
                        legend: {
                          display: true,
                          position: "bottom"
                        }
                    }}
                 />
                </div>
              ) : (
                 <div>Không tìm thấy biểu đồ yếu tố thể lực nào</div>
              )}
            </Container>
        </div>
    );
}