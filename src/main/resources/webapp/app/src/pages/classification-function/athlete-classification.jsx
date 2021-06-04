import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "reactstrap";

import AthleteService from "../../services/athlete-service";
import PhysicalFactorService from "../../services/physical-factor-service";
import TechnicalFactorService from "../../services/technical-factor-service";
import PsychophysiologyFactorService from "../../services/psychophysiology-factor-service";
import FormFactorService from "../../services/form-factor-service";
import AthleteClassificationFunction from "../../utils/athlete-classification-function";
import AthleteClassificationService from "../../services/athlete-classification-service";
import AuthenticationService from "../../services/authentication-service";

export default function AthleteClassification(props) {

  const [athletes, setAthletes] = useState([]);
  const [physicalFactors, setPhysicalFactors] = useState([]);
  const [technicalFactors, setTechnicalFactors] = useState([]);
  const [psychophysiologyFactors, setPsychophysiologyFactors] = useState([]);
  const [formFactors, setFormFactors] = useState([]);
  const [athleteClassifications, setAthleteClassifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleToggle = () => setVisible(!visible);

  useEffect(() => {
    let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);
        if (user) {
            if (user.roles.includes("ROLE_COACH")) {
              AthleteService.getAllAthletesByCoachId(user.id).then((res) => {
                setAthletes(res.data);
              });

              PhysicalFactorService.getPhysicalFactorsByStatusAndCoachId(user.id).then((res) => {
                setPhysicalFactors(res.data);
                
              });
        
              TechnicalFactorService.getTechnicalFactorsByStatusAndCoachId(user.id).then((res) => {
                setTechnicalFactors(res.data);
              });
        
              PsychophysiologyFactorService.getPsychophysiologyFactorsByStatusAndCoachId(user.id).then((res) => {
                setPsychophysiologyFactors(res.data);
              });
            
              FormFactorService.getFormFactorsByStatusAndCoachId(user.id).then((res) => {
                setFormFactors(res.data);
              });
        
              AthleteClassificationService.getAllAthleteClassificationsByCoachId(user.id).then((res) => {
                setAthleteClassifications(res.data);
              });
            }
        }
        else {
            props.history.push(`/login`);
        }
  }, []);

  const handleClassify = () => {

    if (athletes.length > 0 && physicalFactors.length === athletes.length && technicalFactors.length === athletes.length && psychophysiologyFactors.length === athletes.length && formFactors.length === athletes.length) {
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
        criterias[10] = physicalFactors[i].thighsRaiseInPlaceForTenSeconds;
        criterias[11] = technicalFactors[i].groundingTimeWhenReachingHighSpeed;
        criterias[12] = psychophysiologyFactors[i].singleReflectionTime;
        criterias[13] = psychophysiologyFactors[i].livingCapacityQuotient;
        criterias[14] = psychophysiologyFactors[i].heartRateAtFiveSecondsAfterOneHundredMetersRun;
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
        AthleteClassificationFunction.classifyTrainingLevel(athletesList);
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
          AthleteClassificationService.createAthleteClassification(athleteClassification).then(
            (response) => {
              if (response.data.message === "You have classified successful athletes!") {
                setMessage("Bạn đã phân loại các vận động viên thành công!");
              }
              setSuccess(true);
            }
          );

          physicalFactors[i].status = 1;
          technicalFactors[i].status = 1;
          psychophysiologyFactors[i].status = 1;
          formFactors[i].status = 1;

          PhysicalFactorService.updatePhysicalFactor(physicalFactors[i], physicalFactors[i].id).then( res => {
          });
          TechnicalFactorService.updateTechnicalFactor(technicalFactors[i], technicalFactors[i].id).then( res => {
          });
          PsychophysiologyFactorService.updatePsychophysiologyFactor(psychophysiologyFactors[i], psychophysiologyFactors[i].id).then( res => {
          });
          FormFactorService.updateFormFactor(formFactors[i], formFactors[i].id).then( res => {
          });
        }

        setTimeout(() => {
          setVisible(false);
          props.history.push(`/rankingsList`);
        }, 2000);
      }
      else {
        setMessage("Vẫn còn yếu tố nhập thiếu chỉ tiêu. Vui lòng nhập đầy đủ các chỉ tiêu cho 4 yếu tố của mỗi vận động viên.");
      }
    }
    else if (athleteClassifications.length > 0 && physicalFactors.length === 0 && technicalFactors.length === 0 && psychophysiologyFactors.length === 0 && formFactors.length === 0) {
      setMessage("Các yếu tố của các vận động viên đã được phân loại. Vui lòng thêm các yếu tố mới để phân loại.");
    }
    else if (athleteClassifications.length === 0 && physicalFactors.length === 0 && technicalFactors.length === 0 && psychophysiologyFactors.length === 0 && formFactors.length === 0) {
      if (athletes.length === 0) {
        setMessage("Không tìm thấy vận động viên nào. Vui lòng thêm các vận động viên để phân loại.");
      }
      else {
        setMessage("Các vận động viên chưa từng được phân loại. Vui lòng thêm đủ 4 yếu tố cho mỗi vận động viên.");
      }
    }
    else {
      setMessage("Vẫn còn vận động viên chưa được thêm đủ 4 yếu tố. Vui lòng thêm đủ 4 yếu tố cho mỗi vận động viên.");
    }

    handleOpen();
  }
  // document.write(JSON.stringify(physicalFactors));
    return (
      <div>
        <Container>
          <h2>Phân loại trình độ tập luyện của các vận động viên chạy 100m cấp cao</h2>
          <div>
            <Button color="primary" onClick={handleClassify} >Phân loại</Button>
          </div>
          &nbsp;
          <Alert color={success ? "success" : "danger"} isOpen={visible} toggle={handleToggle}>
            {message}
          </Alert>
        </Container>
      </div>
    );
}

