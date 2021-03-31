import React, { Component } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import FormFactorService from "./form-service";

export default class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formFactors: []
    };

    this.addFormFactor = this.addFormFactor.bind(this);
    this.editFormFactor = this.editFormFactor.bind(this);
    this.deleteFormFactor = this.deleteFormFactor.bind(this);
    this.viewFormFactor = this.viewFormFactor.bind(this);
  }

  addFormFactor() {
      this.props.history.push('/formFactors/new');
  }

  viewFormFactor(id) {
      this.props.history.push(`/formFactors/${id}/detail`);
  }
  
  editFormFactor(id) {
      this.props.history.push(`/formFactors/${id}/edit`);
  }

  deleteFormFactor(id) {
    FormFactorService.deleteFormFactor(id).then( (res) => {
      this.setState({formFactors: this.state.formFactors.filter(formFactor => formFactor.id !== id)});
    });
  }

  componentDidMount() {
    FormFactorService.getFormFactors().then((res) => {
      this.setState({formFactors: res.data.reverse()});
    });
  }

  render() {
    return(
      <div>
      <Container>
        <h2>
          <Row>
            <Col md="5">Yếu tố hình thái</Col>
            <Col md="5"></Col>
            <Col md="2">
              <Button size="sm" color="success" onClick={this.addFormFactor}>Thêm Yếu tố hình thái</Button>
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
              <th>Chỉ số Quetelet (g/cm)</th>
              <th>Ngày tạo</th>
              <th>Cập nhật lần cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formFactors.map((formFactor, i) => (
              <tr>
                <td>{formFactor.id}</td>
                <td>{formFactor.athlete.id}</td>
                <td>{formFactor.athlete.athleteName}</td>
                <td>{formFactor.queteletQuotient}</td>
                <td>{formFactor.createAt}</td>
                <td>{formFactor.lastModified}</td>
                <td>
                  <ButtonGroup>
                    <Button size="sm" color="info" onClick={() => this.viewFormFactor(formFactor.id)}>Xem</Button>
                    <Button size="sm" color="primary" onClick={() => this.editFormFactor(formFactor.id)}>Sửa</Button>
                    <Button size="sm" color="danger" onClick={() => this.deleteFormFactor(formFactor.id)}>Xóa</Button>
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

}