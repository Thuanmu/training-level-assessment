import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Label, Table, UncontrolledDropdown} from "reactstrap";
import AthleteClassificationService from "../classification-function/athlete-classification-service.js"

export default function Rankings(props) {

  const [athleteClassifications, setAthleteClassifications] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [monthYear, setMonthYear] = useState('');

  

  useEffect(() => {
    AthleteClassificationService.getAthleteClassificationByLastDateOfMonth().then((res) => {
      setAthleteClassifications(res.data);
      let athleteClassifications = res.data;
      AthleteClassificationService.getRankingsByMonthAndYear(athleteClassifications[0].createAt.substring(3,5), athleteClassifications[0].createAt.substring(6,10)).then((res) => {
        setRankings(res.data);
        setMonthYear(athleteClassifications[0].createAt.substring(3,10));
      });
    });
  },[]);

  const handleOption = (month, year, monthYear) => {
    setMonthYear(monthYear);
    AthleteClassificationService.getRankingsByMonthAndYear(month, year).then((res) => {
      setRankings(res.data);
    });
  }

    return(
        <div>
        <Container>
          <h2>Bảng xếp hạng trình độ tập luyện</h2>
          &nbsp;
          <UncontrolledDropdown inNavbar>
            <Label md="5">Tháng</Label>
            <DropdownToggle nav caret>{monthYear}</DropdownToggle>
            <DropdownMenu>
              {athleteClassifications.map((athleteClassification, i) => (
                <DropdownItem onClick = {() => handleOption(athleteClassification.createAt.substring(3,5), athleteClassification.createAt.substring(6,10), athleteClassification.createAt.substring(3,10))}>{athleteClassification.createAt.substring(3,10)}</DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          &nbsp;
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID Vận động viên</th>
                <th>Tên vận động viên</th>
                <th>ID Yếu tố thể lực</th>
                <th>ID Yếu tố kỹ thuật</th>
                <th>ID Yếu tố tâm-sinh lý</th>
                <th>ID Yếu tố hình thái</th>
                <th>Tổng điểm</th>
                <th>Xếp loại</th>
                <th>Xếp hạng</th>
                <th>Số Vận động viên</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((athleteClassification, i) => (
                <tr>
                  <td><Link to={`/athletes/${athleteClassification.athlete.id}/detail`}>{athleteClassification.athlete.id}</Link></td>
                  <td>{athleteClassification.athlete.athleteName}</td>
                  <td><Link to={`/physicalFactors/${athleteClassification.physicalFactor.id}/detail`}>{athleteClassification.physicalFactor.id}</Link></td>
                  <td><Link to={`/technicalFactors/${athleteClassification.technicalFactor.id}/detail`}>{athleteClassification.technicalFactor.id}</Link></td>
                  <td><Link to={`/psychophysiologyFactors/${athleteClassification.psychophysiologyFactor.id}/detail`}>{athleteClassification.psychophysiologyFactor.id}</Link></td>
                  <td><Link to={`/formFactors/${athleteClassification.formFactor.id}/detail`}>{athleteClassification.formFactor.id}</Link></td>
                  <td>{athleteClassification.totalScoresOfCriterias}</td>
                  <td>{athleteClassification.grade}</td>
                  <td>{athleteClassification.athleteRank}</td>
                  <td>{athleteClassification.athleteCount}</td>
                  <td>{athleteClassification.createAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div> 
    );
}