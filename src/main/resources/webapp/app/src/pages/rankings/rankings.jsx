import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Alert, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Label, Table, UncontrolledDropdown} from "reactstrap";
import AthleteClassificationService from "../../services/athlete-classification-service";
import AuthenticationService from "../../services/authentication-service";

export default function Rankings(props) {

  const [athleteClassifications, setAthleteClassifications] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [currentUser, setCurrentUser] = useState(undefined);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const handleOption = (month, year, monthYear) => {
    setMonth(month);
    setYear(year);
    setMonthYear(monthYear);
    let params = {};
    if (currentUser) {
      if (currentUser.roles.includes("ROLE_COACH")) {
        params = {
          month: month,
          year: year,
          coachId: currentUser.id,
          page: page - 1,
          size: pageSize
        }
        AthleteClassificationService.getAthleteClassificationsByMonthAndYearAndCoachId(params).then((res) => {

          const { athleteClassifications, totalPages } = res.data;

            setRankings(athleteClassifications);
            setCount(totalPages);

            console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            localStorage.removeItem("user");
          }
        });
      }
      else {
        params = {
          month: month,
          year: year,
          athleteCodeUsed: currentUser.athleteCodeUsed,
          page: page - 1,
          size: pageSize
        }
        AthleteClassificationService.getAthleteClassificationsByMonthAndYearAndAthleteCodeUsed(params).then((res) => {
          const { athleteClassifications, totalPages } = res.data;

            setRankings(athleteClassifications);
            setCount(totalPages);

            console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            localStorage.removeItem("user");
          }
        });
      }
    }
  }

  useEffect(() => {
    handleOption(month, year, monthYear);
  },[page, pageSize, monthYear]);
  
  useEffect(() => {
      let user = AuthenticationService.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        if (user.roles.includes("ROLE_COACH")) {
          AthleteClassificationService.getAllAthleteClassificationsByCoachId(user.id).then((res) => {
            setAthleteClassifications(res.data);
            let athleteClassifications = res.data;
            if (athleteClassifications.length > 0) {
              handleOption(athleteClassifications[0].createAt.substring(3,5), athleteClassifications[0].createAt.substring(6,10), athleteClassifications[0].createAt.substring(3,10));
            }
          });
        }
        else {
          AthleteClassificationService.getAllAthleteClassificationsByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
            setAthleteClassifications(res.data);
            let athleteClassifications = res.data;
            if (athleteClassifications.length > 0) {
              handleOption(athleteClassifications[0].createAt.substring(3,5), athleteClassifications[0].createAt.substring(6,10), athleteClassifications[0].createAt.substring(3,10));
            }
          });
        }
      }
      else {
        props.history.push(`/login`);
      }
  },[]);

  //  document.write(JSON.stringify(count));

    return(
      <div>
        <Container>
          <h2>Bảng xếp hạng trình độ tập luyện</h2>
         {athleteClassifications.length > 0 ? (  
          <div>
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
                <th>#</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Mã yếu tố thể lực</th>
                <th>Mã yếu tố kỹ thuật</th>
                <th>Mã yếu tố tâm-sinh lý</th>
                <th>Mã yếu tố hình thái</th>
                <th>Tổng điểm</th>
                <th>Xếp loại</th>
                <th>Xếp hạng</th>
                <th>Tổng số vận động viên</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((athleteClassification, i) => (
                <tr>
                  <td>{pageSize * (page - 1) + (i + 1)}</td>
                  <td><Link to={`/athletes/${athleteClassification.athlete.id}/detail`}>{athleteClassification.athlete.athleteCode}</Link></td>
                  <td>{athleteClassification.athlete.athleteName}</td>
                  <td><Link to={`/physicalFactors/${athleteClassification.physicalFactor.id}/detail`}>{athleteClassification.physicalFactor.physicalFactorCode}</Link></td>
                  <td><Link to={`/technicalFactors/${athleteClassification.technicalFactor.id}/detail`}>{athleteClassification.technicalFactor.technicalFactorCode}</Link></td>
                  <td><Link to={`/psychophysiologyFactors/${athleteClassification.psychophysiologyFactor.id}/detail`}>{athleteClassification.psychophysiologyFactor.psychophysiologyFactorCode}</Link></td>
                  <td><Link to={`/formFactors/${athleteClassification.formFactor.id}/detail`}>{athleteClassification.formFactor.formFactorCode}</Link></td>
                  <td>{athleteClassification.totalScoresOfCriterias}</td>
                  <td>{athleteClassification.grade}</td>
                  <td>{athleteClassification.athleteRank}</td>
                  <td>{athleteClassification.athleteCount}</td>
                  <td>{athleteClassification.createAt}</td>
                </tr>
              ))}
            </tbody>
           </Table>

           <Pagination
              className="my-5"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
           /> 
          </div>
         ) : (
          <div>
            <Alert color="warning">Không tìm thấy bảng xếp hạng nào.</Alert>
          </div>
         )}
        </Container>
      </div> 
    );
}