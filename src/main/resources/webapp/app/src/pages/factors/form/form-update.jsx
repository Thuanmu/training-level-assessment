import React, { Component } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import FormFactorService from "../../../services/form-factor-service";
import AthleteService from "../../../services/athlete-service";
import CodeGeneration from "../../../utils/code-generation";
import AuthenticationService from "../../../services/authentication-service";

export default class FormFactorUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            athletes: [],
            formFactorCode: '',
            athleteCode: '',
            queteletQuotient: '',
            status: 0,
            createAt: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeId = event => {
        this.setState({id: event.target.value});
    }
    handleChangeAthleteCode = event => {
        this.setState({athleteCode: event.target.value});
    }
    handleChangeQueteletQuotient = event => {
        this.setState({queteletQuotient: event.target.value});
    }
    
    componentDidMount() {
        if(this.state.id) {
            FormFactorService.getFormFactorById(this.state.id).then( res => {
                let formFactor = res.data;
                this.setState({
                    id: formFactor.id,
                    formFactorCode: formFactor.formFactorCode,
                    athleteCode: formFactor.athlete.athleteCode,
                    queteletQuotient: formFactor.queteletQuotient,
                    status: formFactor.status,
                    createAt: formFactor.createAt
                });
            });
        }

        let user = AuthenticationService.getCurrentUser();
        if (user.roles.includes("ROLE_COACH")) {
            AthleteService.getAllAthletesByCoachId(user.id).then((res) => {
                this.setState({athletes: res.data});
            });
        }
        else {
            AthleteService.getAllAthletesByAthleteCodeUsed(user.athleteCodeUsed).then((res) => {
                this.setState({athletes: res.data});
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let notNullAthleteCode = this.state.athleteCode ? this.state.athleteCode : this.state.athletes[0].athleteCode;
        AthleteService.getAthleteByAthleteCode(notNullAthleteCode).then((res) => {
            let athlete = res.data;
            let code = CodeGeneration.generateCode('FO', notNullAthleteCode.substring(2), true);
            let formFactor = {
                id: this.state.id,
                formFactorCode: this.state.id ? this.state.formFactorCode : code,
                athlete: athlete,
                queteletQuotient: this.state.queteletQuotient,
                status: this.state.status,
            };
            
            if(!this.state.id) {
                FormFactorService.getFormFactorByFormFactorCode(code).then(res => {
                    let uniqueFormFactor = res.data;
                    if (uniqueFormFactor.formFactorCode === formFactor.formFactorCode) {
                        if (uniqueFormFactor.status === 1) {
                            alert(`Vận động viên mã ${uniqueFormFactor.athlete.athleteCode} đã được phân loại trong tháng ${uniqueFormFactor.createAt}. Vui lòng xóa bảng xếp hạng tháng ${uniqueFormFactor.createAt} trước khi thêm để phân loại lại.`);
                            this.props.history.push('/formFactors');
                        }
                        else {
                            alert(`Yếu tố hình thái của vận động viên mã ${uniqueFormFactor.athlete.athleteCode} trong tháng ${uniqueFormFactor.createAt} đã tồn tại. Vui lòng xóa yếu tố hình thái mã ${uniqueFormFactor.formFactorCode} trước khi thêm.`);
                            this.props.history.push('/formFactors');
                        }
                    }
                    else {
                        FormFactorService.createFormFactor(formFactor).then(res => {
                            this.props.history.push('/formFactors');
                        });
                    }
                });
            } 
            else {
                FormFactorService.updateFormFactor(formFactor, this.state.id).then( res => {
                    this.props.history.push('/formFactors');
                });
            }
        });
    }

    render() {
        const title = <h2>{this.state.id ? 'Sửa yếu tố hình thái' : 'Thêm yếu tố hình thái'}</h2>;

        return(
            <div>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        {this.state.id ? (
                            <FormGroup>
                                <Label for="code">Mã yếu tố hình thái</Label>
                                <Input type="text" name="code" id="code" value={this.state.formFactorCode} readOnly={this.state.id ? true : false}/>
                            </FormGroup>
                        ) : ''}
                        <FormGroup>
                            <Label for="athlete-code">Mã vận động viên</Label>
                            <Input type={this.state.id ? "text" : "select"} name="athlete-code" id="athlete-code" value={this.state.athleteCode} onChange={this.handleChangeAthleteCode} readOnly={this.state.id ? true : false}>
                                {this.state.athletes.map((athlete, i) => (
                                    <option>{athlete.athleteCode}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="quetelet-quotient">Chỉ số Quetelet (g/cm)</Label>
                            <Input type="text" name="queteletQuotient" id="quetelet-quotient" value={this.state.queteletQuotient} onChange={this.handleChangeQueteletQuotient} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Trạng thái</Label>
                            <Input type="text" name="status" id="status" value={this.state.status === '1' ? "Đã phân loại" : "Chưa phân loại"} readOnly/>
                        </FormGroup>
                        {this.state.id ? (
                            <FormGroup>
                                <Label for="create-at">Ngày tạo</Label>
                                <Input type="text" name="create-at" id="create-at" value={this.state.createAt} readOnly/>
                            </FormGroup>
                        ) : ''}
                        <FormGroup>
                            <Button color="primary" type="submit">Lưu</Button>{' '}
                            <Button color="secondary" tag={Link} to="/formFactors">Hủy</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }

}