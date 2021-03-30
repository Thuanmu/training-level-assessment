import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import PsychophysiologyFactorService from "./psychophysiology-service";

export default function Psychophysiology(props) {

  const [psychophysiologyFactors, setPsychophysiologyFactors] = useState([]);

  const addPsychophysiologyFactor = () => {
    props.history.push(`/psychophysiologyFactors/new`);
  }

  const viewPsychophysiologyFactor = id => {
    props.history.push(`/psychophysiologyFactors/${id}/detail`);
  }

  const editPsychophysiologyFactor = id => {
    props.history.push(`/psychophysiologyFactors/${id}/edit`);
  }

  const deletePsychophysiologyFactor = id => {
    PsychophysiologyFactorService.deletePsychophysiologyFactor(id).then( (res) => {
      setPsychophysiologyFactors(psychophysiologyFactors.filter(psychophysiologyFactor => psychophysiologyFactor.id !== id));
    });
  }

    useEffect(() => {
      PsychophysiologyFactorService.getPsychophysiologyFactors().then((res) => {
        setPsychophysiologyFactors(res.data.reverse());
      });
    }, []);

    return(
        <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố tâm-sinh lý</Col>
              <Col md="4"></Col>
              <Col md="3">
                <Button size="sm" color="success" onClick={addPsychophysiologyFactor}>Thêm Yếu tố tâm-sinh lý</Button>
              </Col>
            </Row>
          </h2>
          &nbsp;
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Vận động viên</th>
                <th>Tên Vận động viên</th>
                <th>Phản xạ đơn (s)</th>
                <th>Chỉ số dung tích sống (ml/kg)</th>
                <th>Tần số tim hồi phục 30s sau chạy 100m (lần/ph)</th>
                <th>Hàm lượng LA sau chạy 100m (mmol/lít)</th>
                <th>Ngày tạo</th>
                <th>Cập nhật lần cuối</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {psychophysiologyFactors.map((psychophysiologyFactor, i) => (
                <tr>
                  <td>{psychophysiologyFactor.id}</td>
                  <td>{psychophysiologyFactor.athlete.id}</td>
                  <td>{psychophysiologyFactor.athlete.athleteName}</td>
                  <td>{psychophysiologyFactor.singleReflectionTime}</td>
                  <td>{psychophysiologyFactor.livingCapacityQuotient}</td>
                  <td>{psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.createAt}</td>
                  <td>{psychophysiologyFactor.lastModified}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewPsychophysiologyFactor(psychophysiologyFactor.id)}>Xem</Button>
                      <Button size="sm" color="primary" onClick={() => editPsychophysiologyFactor(psychophysiologyFactor.id)} >Sửa</Button>
                      <Button size="sm" color="danger" onClick={() => deletePsychophysiologyFactor(psychophysiologyFactor.id)} >Xóa</Button>
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