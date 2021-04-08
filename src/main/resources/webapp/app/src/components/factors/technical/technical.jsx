import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import TechnicalFactorService from "./technical-service";

export default function Technical(props) {

  const [technicalFactors, setTechnicalFactors] = useState([]);

  const addTechnicalFactor = () => {
    props.history.push(`/technicalFactors/new`);
  }

  const viewTechnicalFactor = id => {
    props.history.push(`/technicalFactors/${id}/detail`);
  }

  const editTechnicalFactor = id => {
    props.history.push(`/technicalFactors/${id}/edit`);
  }

  const deleteTechnicalFactor = id => {
    TechnicalFactorService.deleteTechnicalFactor(id).then( (res) => {
      setTechnicalFactors(technicalFactors.filter(technicalFactor => technicalFactor.id !== id));
    });
  }


  useEffect(() => {
    TechnicalFactorService.getTechnicalFactors().then((res) => {
      setTechnicalFactors(res.data);
    });
  }, []);


    return(
        <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố kỹ thuật</Col>
              <Col md="5"></Col>
              <Col md="2">
                <Button size="sm" color="success" onClick={addTechnicalFactor}>Thêm Yếu tố kỹ thuật</Button>
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
                <th>Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Cập nhật lần cuối</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {technicalFactors.map((technicalFactor, i) => (
                <tr>
                  <td>{technicalFactor.id}</td>
                  <td>{technicalFactor.athlete.id}</td>
                  <td>{technicalFactor.athlete.athleteName}</td>
                  <td>{technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed}</td>
                  <td>{technicalFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{technicalFactor.createAt}</td>
                  <td>{technicalFactor.lastModified}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewTechnicalFactor(technicalFactor.id)}>Xem</Button>
                      <Button size="sm" color="primary" onClick={() => editTechnicalFactor(technicalFactor.id)} >Sửa</Button>
                      <Button size="sm" color="danger" onClick={() => deleteTechnicalFactor(technicalFactor.id)} >Xóa</Button>
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