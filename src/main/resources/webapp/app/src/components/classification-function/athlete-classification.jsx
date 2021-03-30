import React, { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";

import AthleteService from "../athlete/athlete-service";
import PhysicalFactorService from "../factors/physical/physical-service";
import TechnicalFactorService from "../factors/technical/technical-service";
import PsychophysiologyFactorService from "../factors/psychophysiology/psychophysiology-service";
import FormFactorService from "../factors/form/form-service";
import AthleteClass from "./athleteClass";
import AthleteClassificationService from "../classification-function/athlete-classification-service";
import NowDateTime from "../../utilities/now-date-time";
// import RankingsService from "../rankings/rankings-service";

export default function AthleteClassification(props) {

  const [athletes, setAthletes] = useState([]);
  const [physicalFactors, setPhysicalFactors] = useState([]);
  const [technicalFactors, setTechnicalFactors] = useState([]);
  const [psychophysiologyFactors, setPsychophysiologyFactors] = useState([]);
  const [formFactors, setFormFactors] = useState([]);

  useEffect(() => {
    AthleteService.getAthletes().then((res) => {
    setAthletes(res.data.reverse());
    });

    PhysicalFactorService.getPhysicalFactors().then((res) => {
      setPhysicalFactors(res.data.reverse());
    });

    TechnicalFactorService.getTechnicalFactors().then((res) => {
      setTechnicalFactors(res.data.reverse());
    });

    PsychophysiologyFactorService.getPsychophysiologyFactors().then((res) => {
      setPsychophysiologyFactors(res.data.reverse());
    });
    
    FormFactorService.getFormFactors().then((res) => {
      setFormFactors(res.data.reverse());
    });

  }, []);

  const handleClassify = () => {
    let athletesList = [];
    for (let i = 0; i < athletes.length; i++) {
      let criterias = [];
      criterias[0] = physicalFactors[i].timeOfReflectionStart;
      criterias[1] = physicalFactors[i].thirtyMetersRunAtHighSpeed;
      criterias[2] = physicalFactors[i].thirtyMetersRunWithLowStart;
      criterias[3] = physicalFactors[i].sixtyMetersRunWithLowStart;
      criterias[4] = physicalFactors[i].eightyMetersRunWithHighStart;
      criterias[5] = physicalFactors[i].oneHundredFiftyMetersRunWithHighStart;
      criterias[6] = physicalFactors[i].awayJumpInPlace;
      criterias[7] = physicalFactors[i].threeStepsJumpInPlace;
      criterias[8] = physicalFactors[i].tenStepsJumpInPlace;
      criterias[9] = physicalFactors[i].runTimeOfLastTwentyMetersInOneHundredMetersRun;
      criterias[10] = physicalFactors[i].strengthCoefficient_K;
      criterias[11] = physicalFactors[i].thighsRaiseInPlaceForTenSeconds;
      criterias[12] = technicalFactors[i].performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
      criterias[13] = psychophysiologyFactors[i].singleReflectionTime;
      criterias[14] = psychophysiologyFactors[i].livingCapacityQuotient;
      criterias[15] = psychophysiologyFactors[i].restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun;
      criterias[16] = psychophysiologyFactors[i].lacticAcidContentAfterOneHundredMetersRun;
      criterias[17] = formFactors[i].queteletQuotient;

      athletesList[i] = {
        id: physicalFactors[i].athletes.id,
        totalScoresOfCriterias: 0,
        grade: null,
        athleteRank: null,
        criteriasList: criterias
      }
    }
    
    AthleteClass.classifyTrainingLevel(athletesList);
    // document.write(JSON.stringify(athletesList));

    for (let i = 0; i < athletes.length; i++) {
      athletes[i].totalScoresOfCriterias = athletesList[i].totalScoresOfCriterias;
      athletes[i].grade = athletesList[i].grade;
      athletes[i].athleteRank = athletesList[i].athleteRank;

      AthleteService.updateAthlete(athletes[i], athletes[i].id).then( res => {
      });
    }

    let datetime = NowDateTime.getNowDateTime();

    for (let i = 0; i < athletes.length; i++) {    
      let athleteClassification = {
        athlete: athletes[i],
        physicalFactor: physicalFactors[i],
        technicalFactor: technicalFactors[i],
        psychophysiologyFactor: psychophysiologyFactors[i],
        formFactor: formFactors[i],
        totalScoresOfCriterias: athletesList[i].totalScoresOfCriterias,
        grade: athletesList[i].grade,
        athleteRank: athletesList[i].athleteRank,
        athleteCount: athletes.length,
        createAt: datetime
      };
      AthleteClassificationService.createAthleteClassification(athleteClassification).then(res => {
      });
    }

    props.history.push(`/rankingsList`);
  }
  
    return (
      <div>
        <Container>
          <h2>Phân loại trình độ tập luyện của các VĐV chạy 100m cấp cao</h2>
          &nbsp;
          <Button size="sm" color="primary" onClick={handleClassify} >Phân loại</Button>
        </Container>
      </div>
    );
}

