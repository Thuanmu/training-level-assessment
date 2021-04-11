import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap';
import AthleteService from '../athlete/athlete-service.js';
import AthleteClassificationService from "../classification-function/athlete-classification-service.js";

export default function FormFactorChart(props) {

    const [athletes, setAthletes] = useState([]);
    const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');

    const [queteletQuotients, setQueteletQuotients] = useState([]);
    const [labels, setLabels] = useState([]);

    const handleOption = (athleteId, athleteName) => {
        setAthleteId(athleteId);
        setAthleteName(athleteName);
        AthleteClassificationService.getAthleteClassificationByAthleteIdAndLastDateOfMonth(athleteId).then((res) => {
            let athleteClassifications = res.data;
            let queteletQuotients = [];

            for (let i = 0; i < athleteClassifications.length; i++) {
                queteletQuotients[i] = athleteClassifications[i].formFactor.queteletQuotient;
            }

            setQueteletQuotients(queteletQuotients);
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
                <h2>Biểu đồ yếu tố hình thái</h2>
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
                                data: queteletQuotients,
                                label: "Chỉ số Quetelet (g/cm)",
                                borderColor: "Gold",
                                fill: false
                            }
                        ]
                    }}
                    options={{
                        title: {
                          display: true,
                          text: `Biểu đồ yếu tố hình thái của vận động viên ${athleteName}` 
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