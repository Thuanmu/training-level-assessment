import React, { useEffect, useState } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import PhysicalFactorService from "../../../services/physical-factor-service";

export default function Physical(props) {

    const [physicalFactors, setPhysicalFactors] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    const addPhysicalFactor = () => {
      props.history.push(`/physicalFactors/new`);
    }
  
    const viewPhysicalFactor = id => {
      props.history.push(`/physicalFactors/${id}/detail`);
    }
  
    const editPhysicalFactor = (id, status) => {
      if (status === 0) {
        props.history.push(`/physicalFactors/${id}/edit`);
      }
      else {
        alert("Bạn không thể sửa yếu tố thể lực đã được phân loại");
      }
    }
  
    const deletePhysicalFactor = (id, status) => {
      if (status === 0) {
        PhysicalFactorService.deletePhysicalFactor(id).then( (res) => {
          setPhysicalFactors(physicalFactors.filter(physicalFactor => physicalFactor.id !== id));
        });
      }
      else {
        alert("Bạn không thể xóa yếu tố thể lực đã phân loại");
      }
    }
  

    useEffect(() => {
      let user = AuthenticationService.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        if (user.roles.includes("ROLE_COACH")) {
          PhysicalFactorService.getAllPhysicalFactorsByCoachId(user.id).then((res) => {
            setPhysicalFactors(res.data);
          });
        }
        else {
          PhysicalFactorService.getAllPhysicalFactorsByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
            setPhysicalFactors(res.data);
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
              <Col md="5">Yếu tố thể lực</Col>
              <Col md="5"></Col>
              <Col md="2">
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <div>
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      <Button size="sm" color="success" onClick={addPhysicalFactor}>Thêm yếu tố</Button>
                   </div>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </h2>
          &nbsp;
         {physicalFactors.length > 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã yếu tố thể lực</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Thời gian phản xạ xuất phát (s)</th>
                <th>Chạy 30m tốc độ cao (s)</th>
                <th>Chạy 30m xuất phát thấp (s)</th>
                <th>Chạy 60m xuất phát thấp (s)</th>
                <th>Chạy 80m xuất phát cao (s)</th>
                <th>Chạy 150m xuất phát cao (s)</th>
                <th>Bật xa tại chỗ (m)</th>
                <th>Bật 3 bước tại chỗ (m)</th>
                <th>Bật 10 bước tại chỗ (m)</th>
                <th>Thời gian chạy 20m cuối trong chạy 100m (s)</th>
                <th>Hệ số sức bền K (s)</th>
                <th>Nâng cao đùi tại chỗ 10s (lần)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {physicalFactors.map((physicalFactor, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{physicalFactor.physicalFactorCode}</td>
                  <td>{physicalFactor.athlete.athleteCode}</td>
                  <td>{physicalFactor.athlete.athleteName}</td>
                  <td>{physicalFactor.timeOfReflectionStart}</td>
                  <td>{physicalFactor.thirtyMetersRunAtHighSpeed}</td>
                  <td>{physicalFactor.thirtyMetersRunWithLowStart}</td>
                  <td>{physicalFactor.sixtyMetersRunWithLowStart}</td>
                  <td>{physicalFactor.eightyMetersRunWithHighStart}</td>
                  <td>{physicalFactor.oneHundredFiftyMetersRunWithHighStart}</td>
                  <td>{physicalFactor.awayJumpInPlace}</td>
                  <td>{physicalFactor.threeStepsJumpInPlace}</td>
                  <td>{physicalFactor.tenStepsJumpInPlace}</td>
                  <td>{physicalFactor.runTimeOfLastTwentyMetersInOneHundredMetersRun}</td>
                  <td>{physicalFactor.strengthCoefficient_K}</td>
                  <td>{physicalFactor.thighsRaiseInPlaceForTenSeconds}</td>
                  <td>{physicalFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{physicalFactor.createAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewPhysicalFactor(physicalFactor.id)}>Xem</Button>
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="primary" onClick={() => editPhysicalFactor(physicalFactor.id, physicalFactor.status)} >Sửa</Button>
                        </div>
                        ) : (
                          ''
                      )}
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="danger" onClick={() => deletePhysicalFactor(physicalFactor.id, physicalFactor.status)} >Xóa</Button>
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
          <div>Không tìm thấy yếu tố thể lực nào</div>
         )}
        </Container>
      </div> 
    );
}