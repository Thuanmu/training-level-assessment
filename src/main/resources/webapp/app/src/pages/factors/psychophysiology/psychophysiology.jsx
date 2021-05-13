import React, { useEffect, useState } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import PsychophysiologyFactorService from "../../../services/psychophysiology-factor-service";

export default function Psychophysiology(props) {

  const [psychophysiologyFactors, setPsychophysiologyFactors] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const addPsychophysiologyFactor = () => {
    props.history.push(`/psychophysiologyFactors/new`);
  }

  const viewPsychophysiologyFactor = id => {
    props.history.push(`/psychophysiologyFactors/${id}/detail`);
  }

  const editPsychophysiologyFactor = (id, status) => {
    if (status === 0) {
      props.history.push(`/psychophysiologyFactors/${id}/edit`);
    }
    else {
      alert("Bạn không thể sửa yếu tố tâm-sinh lý đã phân loại");
    }
  }

  const deletePsychophysiologyFactor = (id, status) => {
    if (status === 0) {
      PsychophysiologyFactorService.deletePsychophysiologyFactor(id).then( (res) => {
        setPsychophysiologyFactors(psychophysiologyFactors.filter(psychophysiologyFactor => psychophysiologyFactor.id !== id));
      });
    }
    else {
      alert("Bạn không thể xóa yếu tố tâm-sinh lý đã phân loại");
    }
  }

    useEffect(() => {
      let user = AuthenticationService.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        if (user.roles.includes("ROLE_COACH")) {
          PsychophysiologyFactorService.getAllPsychophysiologyFactorsByCoachId(user.id).then((res) => {
            setPsychophysiologyFactors(res.data);
          });
        }
        else {
          PsychophysiologyFactorService.getAllPsychophysiologyFactorsByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
            setPsychophysiologyFactors(res.data);
          });
        }
      }
      else {
        props.history.push(`/login`);
      }
    }, []);

    return(
        <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố tâm-sinh lý</Col>
              <Col md="5"></Col>
              <Col md="2">
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <div>
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      <Button size="sm" color="success" onClick={addPsychophysiologyFactor}>Thêm yếu tố</Button>
                   </div>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </h2>
          &nbsp;
         {psychophysiologyFactors.length > 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã yếu tố tâm sinh lý</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Phản xạ đơn (s)</th>
                <th>Chỉ số dung tích sống (ml/kg)</th>
                <th>Tần số tim 5s sau chạy 100m (lần/ph)</th>
                <th>Tần số tim hồi phục 30s sau chạy 100m (lần/ph)</th>
                <th>Hàm lượng axit lactic sau chạy 100m (mmol/lít)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {psychophysiologyFactors.map((psychophysiologyFactor, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{psychophysiologyFactor.psychophysiologyFactorCode}</td>
                  <td>{psychophysiologyFactor.athlete.athleteCode}</td>
                  <td>{psychophysiologyFactor.athlete.athleteName}</td>
                  <td>{psychophysiologyFactor.singleReflectionTime}</td>
                  <td>{psychophysiologyFactor.livingCapacityQuotient}</td>
                  <td>{psychophysiologyFactor.heartRateAtFiveSecondsAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{psychophysiologyFactor.createAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewPsychophysiologyFactor(psychophysiologyFactor.id)}>Xem</Button>
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="primary" onClick={() => editPsychophysiologyFactor(psychophysiologyFactor.id, psychophysiologyFactor.status)} >Sửa</Button>
                        </div>
                        ) : (
                          ''
                      )}
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="danger" onClick={() => deletePsychophysiologyFactor(psychophysiologyFactor.id, psychophysiologyFactor.status)} >Xóa</Button>
                        </div>
                      ) : (
                          ''
                      )}
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
         ) : (
          <div>Không tìm thấy yếu tố tâm-sinh lý nào</div>
         )}
        </Container>
      </div> 
    );
}