import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Athlete from './athlete';
import ClassificationTable from "./classification-table";
import { connect } from 'react-redux';

export default function Criteria(props) {

    const [isHide, setIsHide] = useState(false);
    const [numericalOrder, setNumericalOrder] = useState(0);
    // const [athleteId, setAthleteId] = useState('');
    const [athleteName, setAthleteName] = useState('');

    const [timeOfReflectionStart, setTimeOfReflectionStart] = useState('');
    const [thirtyMetersRunAtHighSpeed, setThirtyMetersRunAtHighSpeed] = useState('');
    const [thirtyMetersRunWithLowStart, setThirtyMetersRunWithLowStart] = useState('');
    const [sixtyMetersRunWithLowStart, setSixtyMetersRunWithLowStart] = useState('');
    const [eightyMetersRunWithHighStart, setEightyMetersRunWithHighStart] = useState('');
    const [oneHundredFiftyMetersRunWithHighStart, setOneHundredFiftyMetersRunWithHighStart] = useState('');
    const [runTimeOfLastTwentyMetersInOneHundredMetersRun, setRunTimeOfLastTwentyMetersInOneHundredMetersRun] = useState('');
    const [strengthCoefficient_K, setStrengthCoefficient_K] = useState('');
    const [awayJumpInPlace, setAwayJumpInPlace] = useState('');
    const [threeStepsJumpInPlace, setThreeStepsJumpInPlace] = useState('');
    const [tenStepsJumpInPlace, setTenStepsJumpInPlace] = useState('');
    const [performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed, setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed] = useState('');
    const [singleReflectionTime, setSingleReflectionTime] = useState('');
    const [livingCapacityQuotient, setLivingCapacityQuotient] = useState('');
    const [restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun, setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun] = useState('');
    const [lacticAcidContentAfterOneHundredMetersRun, setLacticAcidContentAfterOneHundredMetersRun] = useState('');
    const [thighsRaiseInPlaceForTenSeconds, setThighsRaiseInPlaceForTenSeconds] = useState('');
    const [queteletQuotient, setQueteletQuotient] = useState('');

    if (isHide) {
      return null;
    }

    // const handleAthleteId = event => setAthleteId(event.target.value);
    const handleAthleteName = event => setAthleteName(event.target.value);

    const handleTimeOfReflectionStart = event => setTimeOfReflectionStart(event.target.value);
    const handleThirtyMetersRunAtHighSpeed = event => setThirtyMetersRunAtHighSpeed(event.target.value);
    const handleThirtyMetersRunWithLowStart = event => setThirtyMetersRunWithLowStart(event.target.value);
    const handleSixtyMetersRunWithLowStart = event => setSixtyMetersRunWithLowStart(event.target.value);
    const handleEightyMetersRunWithHighStart = event => setEightyMetersRunWithHighStart(event.target.value);
    const handleOneHundredFiftyMetersRunWithHighStart = event => setOneHundredFiftyMetersRunWithHighStart(event.target.value);
    const handleRunTimeOfLastTwentyMetersInOneHundredMetersRun = event => setRunTimeOfLastTwentyMetersInOneHundredMetersRun(event.target.value);
    const handleStrengthCoefficient_K = event => setStrengthCoefficient_K(event.target.value);
    const handleAwayJumpInPlace = event => setAwayJumpInPlace(event.target.value);
    const handleThreeStepsJumpInPlace = event => setThreeStepsJumpInPlace(event.target.value);
    const handleTenStepsJumpInPlace = event => setTenStepsJumpInPlace(event.target.value);
    const handlePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = event => setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(event.target.value);
    const handleSingleReflectionTime = event => setSingleReflectionTime(event.target.value);
    const handleLivingCapacityQuotient = event => setLivingCapacityQuotient(event.target.value);
    const handleRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun = event => setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun(event.target.value);
    const handleLacticAcidContentAfterOneHundredMetersRun = event => setLacticAcidContentAfterOneHundredMetersRun(event.target.value);
    const handleThighsRaiseInPlaceForTenSeconds = event => setThighsRaiseInPlaceForTenSeconds(event.target.value);
    const handleQueteletQuotient = event => setQueteletQuotient(event.target.value);

    const handleReset = () => {
      // setAthleteId("");
      setAthleteName("");
      setTimeOfReflectionStart("");
      setThirtyMetersRunAtHighSpeed("");
      setThirtyMetersRunWithLowStart("");
      setSixtyMetersRunWithLowStart("");
      setEightyMetersRunWithHighStart("");
      setOneHundredFiftyMetersRunWithHighStart("");
      setRunTimeOfLastTwentyMetersInOneHundredMetersRun("");
      setStrengthCoefficient_K("");
      setAwayJumpInPlace("");
      setThreeStepsJumpInPlace("");
      setTenStepsJumpInPlace("");
      setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed("");
      setSingleReflectionTime("");
      setLivingCapacityQuotient("");
      setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun("");
      setLacticAcidContentAfterOneHundredMetersRun("");
      setThighsRaiseInPlaceForTenSeconds("");
      setQueteletQuotient("");
    } 

    const {athletesCount} = props;
    var newAthletesList =  [];
    localStorage.removeItem("newAthletesList");

    const handleNext = () => {
      var temp =  document.getElementsByName("criteria");
      var criterias = [];
      for (var i = 0; i < temp.length; i++) {
        criterias.push(temp[i].value);
      }
      newAthletesList[numericalOrder] = {name: athleteName, totalScoresOfCriterias: 0, grade: null, rank: null, criteriasList: criterias};
      localStorage.setItem(`newAthletesList[${numericalOrder}]`, JSON.stringify(newAthletesList[numericalOrder]));
      if (numericalOrder < athletesCount - 1) setNumericalOrder(numericalOrder + 1);
      handleReset();
    }

    const handleClassify = () => {
      handleNext();
      for (let i = 0; i < athletesCount; i++) {
        newAthletesList[i] = JSON.parse(localStorage.getItem(`newAthletesList[${i}]`));
      }
      localStorage.setItem("newAthletesList", JSON.stringify(newAthletesList));
      Athlete.classifyTrainingLevel();
      let athletesList = JSON.parse(localStorage.getItem("athletesList"));
      for (let i = 0; i < newAthletesList.length; i++) {
        for (let j = 0; j < athletesList.length; j++) {
          if (newAthletesList[i].name === athletesList[j].name) {
            newAthletesList[i].totalScoresOfCriterias = athletesList[j].totalScoresOfCriterias;
            newAthletesList[i].grade = athletesList[j].grade;
            newAthletesList[i].rank = athletesList[j].rank;
          }
        }
      }
      setIsHide(true);
      render(<ClassificationTable newAthletesList={newAthletesList}/>)
    }

    var button;
    if (numericalOrder < athletesCount - 1) {
      button = <Button id="btn-next" size="sm" onClick={handleNext} >Tiếp theo</Button>; 
    }
    else button = <Button id="btn-classify" size="sm" onClick={handleClassify} >Phân loại</Button>;

      return (
        <div className="padding-title-title">
          <h2>Vận động viên thứ {numericalOrder + 1}</h2>
          &nbsp;
          <Form className="athlete-criteria">
            <FormGroup>
              <Row className="athlete-info">
                <Col md="6">
                  <Label for="athlete-name">Tên vận động viên</Label>
                  <Input type="text" id="athlete-name" name="athlete-name" value={athleteName} onChange={handleAthleteName} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="criteria-time-of-reflection-start">1. Thời gian phản xạ xuất phát (s)</Label>
              <Input type="text" id="time-of-reflection-start" name="criteria" value={timeOfReflectionStart} onChange={handleTimeOfReflectionStart} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-thirty-meters-run-at-high-speed">2. Chạy 30m tốc độ cao (s)</Label>
              <Input type="text" id="thirty-meters-run-at-high-speed" name="criteria" value={thirtyMetersRunAtHighSpeed} onChange={handleThirtyMetersRunAtHighSpeed} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-thirty-meters-run-with-low-start">3. Chạy 30m xuất phát thấp (s)</Label>
              <Input type="text" id="thirty-meters-run-with-low-start" name="criteria" value={thirtyMetersRunWithLowStart} onChange={handleThirtyMetersRunWithLowStart} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-sixty-meters-run-with-low-start">4. Chạy 60m xuất phát thấp (s)</Label>
              <Input type="text" id="sixty-meters-run-with-low-start" name="criteria" value={sixtyMetersRunWithLowStart} onChange={handleSixtyMetersRunWithLowStart} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-eighty-meters-run-with-high-start">5. Chạy 80m xuất phát cao (s)</Label>
              <Input type="text" id="eighty-meters-run-with-high-start" name="criteria" value={eightyMetersRunWithHighStart} onChange={handleEightyMetersRunWithHighStart} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-one-hundred-fifty-meters-run-with-high-start">6. Chạy 150m xuất phát cao (s)</Label>
              <Input type="text" id="one-hundred-fifty-meters-run-with-high-start" name="criteria" value={oneHundredFiftyMetersRunWithHighStart} onChange={handleOneHundredFiftyMetersRunWithHighStart} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-away-jump-in-place">7. Bật xa tại chỗ (m)</Label>
              <Input type="text" id="away-jump-in-place" name="criteria" value={awayJumpInPlace} onChange={handleAwayJumpInPlace} />
            </FormGroup>
            <FormGroup>
              <Label for="three-steps-jump-in-place">8. Bật 3 bước tại chỗ (m)</Label>
              <Input type="text" id="three-steps-jump-in-place" name="criteria" value={threeStepsJumpInPlace} onChange={handleThreeStepsJumpInPlace} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-ten-steps-jump-in-place">9. Bật 10 bước tại chỗ (m)</Label>
              <Input type="text" id="ten-steps-jump-in-place" name="criteria" value={tenStepsJumpInPlace} onChange={handleTenStepsJumpInPlace} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-run-time-of-last-twenty-meters-in-one-hundred-meters-run">10. Thời gian của 20m cuối trong chạy 100m (s)</Label>
              <Input type="text" id="run-time-of-last-twenty-meters-in-one-hundred-meters-run" name="criteria" value={runTimeOfLastTwentyMetersInOneHundredMetersRun} onChange={handleRunTimeOfLastTwentyMetersInOneHundredMetersRun} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-strength-coefficient-K">11. Hệ số sức bền K (s)</Label>
              <Input type="text" id="strength-coefficient-K" name="criteria" value={strengthCoefficient_K} onChange={handleStrengthCoefficient_K} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-thighs-raise-in-place-for-ten-seconds">12. Nâng cao đùi tại chỗ 10s (lần)</Label>
              <Input type="text" id="thighs-raise-in-place-for-ten-seconds" name="criteria" value={lacticAcidContentAfterOneHundredMetersRun} onChange={handleLacticAcidContentAfterOneHundredMetersRun} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-performance-difference-between-thirty-meters-run-with-low-start-and-thirty-meters-run-at-high-speed">13. Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</Label>
              <Input type="text" id="performance-difference-between-thirty-meters-run-with-low-start-and-thirty-meters-run-at-high-speed" name="criteria" value={performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} onChange={handlePerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-single-reflection-time">14. Thời gian phản xạ đơn (s)</Label>
              <Input type="text" id="single-reflection-time" name="criteria" value={singleReflectionTime} onChange={handleSingleReflectionTime} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-living-capacity-quotient">15. Chỉ số dung tích sống (ml/kg)</Label>
              <Input type="text" id="living-capacity-quotient" name="criteria" value={livingCapacityQuotient} onChange={handleLivingCapacityQuotient} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-restored-heart-rate-at-thirty-seconds-after-one-hundred-meters-run">16. Tần số tim hồi phục 30s sau chạy 100m (lần/phút)</Label>
              <Input type="text" id="restored-heart-rate-at-thirty-seconds-after-one-hundred-meters-run" name="criteria" value={restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun} onChange={handleRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-lactic-acid-content-after-one-hundred-meters-run">17. Hàm lượng axit lactic sau chạy 100m (mmol/lít)</Label>
              <Input type="text" id="lactic-acid-content-after-one-hundred-meters-run" name="criteria" value={thighsRaiseInPlaceForTenSeconds} onChange={handleThighsRaiseInPlaceForTenSeconds} />
            </FormGroup>
            <FormGroup>
              <Label for="criteria-quetelet-quotient">18. Chỉ số Quetelet (g/cm)</Label>
              <Input type="text" id="quetelet-quotient" name="criteria" value={queteletQuotient} onChange={handleQueteletQuotient} />
            </FormGroup>
            {button}
          </Form>
      </div>
      );

}

