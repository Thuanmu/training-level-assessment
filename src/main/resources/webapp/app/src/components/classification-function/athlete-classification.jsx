import React, { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";

import AthleteService from "../athlete/athlete-service";
import PhysicalFactorService from "../factors/physical/physical-service";
import TechnicalFactorService from "../factors/technical/technical-service";
import PsychophysiologyFactorService from "../factors/psychophysiology/psychophysiology-service";
import FormFactorService from "../factors/form/form-service";
import AthleteClass from "./athleteClass";
import AthleteClassificationService from "../classification-function/athlete-classification-service";

export default function AthleteClassification(props) {

  const [athletes, setAthletes] = useState([]);
  const [physicalFactors, setPhysicalFactors] = useState([]);
  const [technicalFactors, setTechnicalFactors] = useState([]);
  const [psychophysiologyFactors, setPsychophysiologyFactors] = useState([]);
  const [formFactors, setFormFactors] = useState([]);

  useEffect(() => {
    AthleteService.getAthletes().then((res) => {
      setAthletes(res.data);
    });

    PhysicalFactorService.getPhysicalFactorsByStatus().then((res) => {
      setPhysicalFactors(res.data);
    });

    TechnicalFactorService.getTechnicalFactorsByStatus().then((res) => {
      setTechnicalFactors(res.data);
    });

    PsychophysiologyFactorService.getPsychophysiologyFactorsByStatus().then((res) => {
      setPsychophysiologyFactors(res.data);
    });
    
    FormFactorService.getFormFactorsByStatus().then((res) => {
      setFormFactors(res.data);
    });

  }, []);

  const handleClassify = () => {
    if (physicalFactors.length === athletes.length && technicalFactors.length === athletes.length && psychophysiologyFactors.length === athletes.length && formFactors.length === athletes.length) {
      let athletesList = [];
      const NUMBER_OF_SELECTED_CRITERIA = 18;
      let isContainEmptyElement = false; 

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

        for (let i = 0; i < NUMBER_OF_SELECTED_CRITERIA; i++) {
          if (criterias[i] === null) {
            isContainEmptyElement = true;
            break;
          }
        }

        if (isContainEmptyElement) {
          break;
        }

        athletesList[i] = {
          id: athletes[i].id,
          totalScoresOfCriterias: 0,
          grade: null,
          athleteRank: null,
          criteriasList: criterias
        }
      }
    
      if (!isContainEmptyElement) {
        AthleteClass.classifyTrainingLevel(athletesList);
        // document.write(JSON.stringify(athletesList));

        for (let i = 0; i < athletes.length; i++) {
          athletes[i].totalScoresOfCriterias = athletesList[i].totalScoresOfCriterias;
          athletes[i].grade = athletesList[i].grade;
          athletes[i].athleteRank = athletesList[i].athleteRank;
          AthleteService.updateAthlete(athletes[i], athletes[i].id).then( res => {
          });
        }

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
          };
          AthleteClassificationService.createAthleteClassification(athleteClassification).then(res => {
          });

          physicalFactors[i].status = '1';
          technicalFactors[i].status = '1';
          psychophysiologyFactors[i].status = '1';
          formFactors[i].status = '1';

          PhysicalFactorService.updatePhysicalFactor(physicalFactors[i], physicalFactors[i].id).then( res => {
          });
          TechnicalFactorService.updateTechnicalFactor(technicalFactors[i], technicalFactors[i].id).then( res => {
          });
          PsychophysiologyFactorService.updatePsychophysiologyFactor(psychophysiologyFactors[i], psychophysiologyFactors[i].id).then( res => {
          });
          FormFactorService.updateFormFactor(formFactors[i], formFactors[i].id).then( res => {
          });
        }
        alert("Bạn đã phân loại các vận động viên thành công.");
        props.history.push(`/rankingsList`);
      }
      else {
        alert("Vui lòng nhập đầy đủ các chỉ tiêu cho các yếu tố của các vận động viên.");
      }
    }
    else if (physicalFactors.length === 0 && technicalFactors.length === 0 && psychophysiologyFactors.length === 0 && formFactors.length === 0) {
      alert("Các yếu tố của các vận động viên đã được phân loại. Vui lòng thêm các yếu tố mới để được phân loại.");
    }
    else {
      alert("Vui lòng thêm các yếu tố cho các vận động viên.");
    }
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

