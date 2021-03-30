import React, { useEffect, useState } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import PhysicalFactorService from "./physical-service";

export default function Physical(props) {

    const [physicalFactors, setPhysicalFactors] = useState([]);

    const addPhysicalFactor = () => {
      props.history.push(`/physicalFactors/new`);
    }
  
    const viewPhysicalFactor = id => {
      props.history.push(`/physicalFactors/${id}/detail`);
    }
  
    const editPhysicalFactor = id => {
      props.history.push(`/physicalFactors/${id}/edit`);
    }
  
    const deletePhysicalFactor = id => {
      PhysicalFactorService.deletePhysicalFactor(id).then( (res) => {
        setPhysicalFactors(physicalFactors.filter(physicalFactor => physicalFactor.id !== id));
      });
    }
  

    useEffect(() => {
      PhysicalFactorService.getPhysicalFactors().then((res) => {
        setPhysicalFactors(res.data.reverse());
      });
    }, []);


    return(
      <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố thể lực</Col>
              <Col md="5"></Col>
              <Col md="2">
                <Button size="sm" color="success" onClick={addPhysicalFactor}>Thêm Yếu tố thể lực</Button>
              </Col>
            </Row>
          </h2>
          &nbsp;
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Vận động viên</th>
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
                <th>Ngày tạo</th>
                <th>Cập nhật lần cuối</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {physicalFactors.map((physicalFactor, i) => (
                <tr>
                  <td>{physicalFactor.id}</td>
                  <td>{physicalFactor.athlete.id}</td>
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
                  <td>{physicalFactor.createAt}</td>
                  <td>{physicalFactor.lastModified}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewPhysicalFactor(physicalFactor.id)}>Xem</Button>
                      <Button size="sm" color="primary" onClick={() => editPhysicalFactor(physicalFactor.id)} >Sửa</Button>
                      <Button size="sm" color="danger" onClick={() => deletePhysicalFactor(physicalFactor.id)} >Xóa</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div> 
    );
}