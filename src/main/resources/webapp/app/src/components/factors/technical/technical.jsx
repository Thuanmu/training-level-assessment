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

  const editTechnicalFactor = (id, status) => {
    if (status === '0') {
      props.history.push(`/technicalFactors/${id}/edit`);
    }
    else {
      alert("Bạn không thể sửa yếu tố kỹ thuật đã phân loại");
    }
  }

  const deleteTechnicalFactor = (id, status) => {
    if (status === '0') {
      TechnicalFactorService.deleteTechnicalFactor(id).then( (res) => {
        setTechnicalFactors(technicalFactors.filter(technicalFactor => technicalFactor.id !== id));
      });
    }
    else {
      alert("Bạn không thể xóa yếu tố kỹ thuật đã phân loại");
    }
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
                <Button size="sm" color="success" onClick={addTechnicalFactor}>Thêm yếu tố kỹ thuật</Button>
              </Col>
            </Row>
          </h2>
          &nbsp;
         {technicalFactors.length > 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã yếu tố kỹ thuật</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {technicalFactors.map((technicalFactor, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{technicalFactor.technicalFactorCode}</td>
                  <td>{technicalFactor.athlete.athleteCode}</td>
                  <td>{technicalFactor.athlete.athleteName}</td>
                  <td>{technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed}</td>
                  <td>{technicalFactor.status === '1' ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{technicalFactor.createAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewTechnicalFactor(technicalFactor.id)}>Xem</Button>
                      <Button size="sm" color="primary" onClick={() => editTechnicalFactor(technicalFactor.id, technicalFactor.status)} >Sửa</Button>
                      <Button size="sm" color="danger" onClick={() => deleteTechnicalFactor(technicalFactor.id, technicalFactor.status)} >Xóa</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
         ) : (
          <div>Không tìm thấy yếu tố kỹ thuật nào</div>
         )}
        </Container>
      </div> 
    );
}