import React, { Component } from "react";
import {Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import FormFactorService from "../../../services/form-factor-service";

export default class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formFactors: [],
      currentUser: undefined
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
  
  editFormFactor(id, status) {
    if (status === 0) {
      this.props.history.push(`/formFactors/${id}/edit`);
    }
    else {
      alert("Bạn không thể sửa yếu tố hình thái đã phân loại");
    }
  }

  deleteFormFactor(id, status) {
    if (status === 0) {
      FormFactorService.deleteFormFactor(id).then( (res) => {
        this.setState({formFactors: this.state.formFactors.filter(formFactor => formFactor.id !== id)});
      });
    }
    else {
      alert("Bạn không thể xóa yếu tố hình thái đã phân loại");
    }
  }

  componentDidMount() {
    let user = AuthenticationService.getCurrentUser();
    this.setState({currentUser: user});
    if (user) {
      if (user.roles.includes("ROLE_COACH")) {
        FormFactorService.getAllFormFactorsByCoachId(user.id).then((res) => {
          this.setState({formFactors: res.data});
        });
      }
      else {
        FormFactorService.getAllFormFactorsByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
          this.setState({formFactors: res.data});
        });
      }
    }
    else {
      this.props.history.push(`/login`);
    }
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
            {this.state.currentUser && this.state.currentUser.roles.includes("ROLE_COACH") ? (
                <div>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <Button size="sm" color="success" onClick={this.addFormFactor}>Thêm yếu tố</Button>
                </div>
              ) : (
                ''
            )}
            </Col>
          </Row>
        </h2>
        &nbsp;
       {this.state.formFactors.length > 0 ? (
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Mã yếu tố hình thái</th>
              <th>Mã vận động viên</th>
              <th>Tên vận động viên</th>
              <th>Chỉ số Quetelet (g/cm)</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formFactors.map((formFactor, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{formFactor.formFactorCode}</td>
                <td>{formFactor.athlete.athleteCode}</td>
                <td>{formFactor.athlete.athleteName}</td>
                <td>{formFactor.queteletQuotient}</td>
                <td>{formFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                <td>{formFactor.createAt}</td>
                <td>
                  <ButtonGroup>
                    <Button size="sm" color="info" onClick={() => this.viewFormFactor(formFactor.id)}>Xem</Button>
                    {this.state.currentUser.roles.includes("ROLE_COACH") ? (
                      <div>
                        <Button size="sm" color="primary" onClick={() => this.editFormFactor(formFactor.id, formFactor.status)}>Sửa</Button>
                        <Button size="sm" color="danger" onClick={() => this.deleteFormFactor(formFactor.id, formFactor.status)}>Xóa</Button>
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
        <div>Không tìm thấy yếu tố hình thái nào</div>
       )}
      </Container>
    </div> 
    );
  }

}