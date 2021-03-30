import React, { Component } from "react";
import {Button, ButtonGroup, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { Link } from 'react-router-dom';
import FormFactorService from "./form-service";

export default class FormFactorUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            athleteId: '',
            queteletQuotient: '',
            createAt: '',
            lastModified: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeId = event => {
        this.setState({id: event.target.value});
    }
    handleChangeAthleteId = event => {
        this.setState({athleteId: event.target.value});
    }
    handleChangeQueteletQuotient = event => {
        this.setState({queteletQuotient: event.target.value});
    }
    handleChangeCreateAt = event => {
        this.setState({createAt: event.target.value});
    }
    handleChangeLastModified = event => {
        this.setState({lastModified: event.target.value});
    }

    componentDidMount() {
        if(this.state.id !== 'new') {
            FormFactorService.getFormFactorById(this.state.id).then( res => {
                let formFactor = res.data;
                this.setState({
                    id: formFactor.id,
                    athleteId: formFactor.athlete.id,
                    queteletQuotient: formFactor.queteletQuotient,
                    createAt: formFactor.createAt,
                    lastModified: formFactor.lastModified
                });
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let formFactor = {
            id: this.state.id,
            athlete: {id: this.state.athleteId},
            queteletQuotient: this.state.queteletQuotient,
            createAt: this.state.createAt,
            lastModified: this.state.lastModified
        };
        
        if(this.state.id === 'new') {
            FormFactorService.createFormFactor(formFactor).then(res => {
                this.props.history.push('/formFactors');
            });
        } 
        else {
            FormFactorService.updateFormFactor(formFactor, this.state.id).then( res => {
                this.props.history.push('/formFactors');
            });
        }
    }

    render() {
        const title = <h2>{this.state.id ? 'Sửa Yếu tố hình thái' : 'Thêm Yếu tố hình thái'}</h2>;

        return(
            <div>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="athlete-id">ID Vận động viên</Label>
                        <Input type="text" name="athlete-id" id="athlete-id" value={this.state.athleteId} onChange={this.handleChangeAthleteId} />
                    </FormGroup>
                        <FormGroup>
                            <Label for="quetelet-quotient">Chỉ số Quetelet (g/cm)</Label>
                            <Input type="text" name="queteletQuotient" id="quetelet-quotient" value={this.state.queteletQuotient} onChange={this.handleChangeQueteletQuotient} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="create-at">Ngày tạo</Label>
                            <Input type="text" name="create-at" id="create-at" value={this.state.createAt} onChange={this.handleChangeCreateAt} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last-modified">Cập nhật lần cuối</Label>
                            <Input type="text" name="last-modified" id="last-modified" value={this.state.lastModified} onChange={this.handleChangeLastModified} />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/formFactors">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }

}