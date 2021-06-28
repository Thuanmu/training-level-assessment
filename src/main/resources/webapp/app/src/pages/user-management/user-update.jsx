import React, { useEffect, useState } from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { Link } from 'react-router-dom';
import moment from "moment";
import UserService from "../../services/user-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons";

export default function UserUpdate(props) {

    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(props.match.params.id);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [roles, setRoles] = useState([]);
    const [athleteCodeUsed, setAthleteCodeUsed] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [job, setJob] = useState('');
    const [hometown, setHometown] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [lastModified, setLastModified] = useState('');

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOpen = () => setVisible(true);
    const handleToggle = () => setVisible(!visible);

    const handleChangeUsername = event => setUsername(event.target.value);
    const handleChangePassword = event => setPassword(event.target.value);
    const handleChangeEmail = event => setEmail(event.target.value);

    const handleChangeStatus = (status) => {
        if (status === 1) {
            setStatus(0);
        }
        else {
            setStatus(1);
        }
    }

    const handleChangeRoles = event => {
        let options = event.target.options;
        let length = options.length;
        let roles = [];
        for (let i = 0; i < length; i++) {
            if (options[i].selected) {
                let role = {
                    id : i + 1,
                    name: options[i].value
                };
                roles.push(role);
            }
        }
        setRoles(roles);
    }

    const handleChangeAthleteCodeUsed = event => setAthleteCodeUsed(event.target.value);
    const handleChangeFullName = event => setFullName(event.target.value);
    const handleChangeDateOfBirth = event => setDateOfBirth(event.target.value);
    const handleChangeGender = value => setGender(value);
    const handleChangeJob = event => setJob(event.target.value);
    const handleChangeHometown = event => setHometown(event.target.value);
    const handleChangeWorkplace = event => setWorkplace(event.target.value);
    
    useEffect(() => {
        if(userId)  {
            UserService.getUserById(userId).then( res => {
                let user = res.data;
                setUser(user);
                setUserId(user.id);
                setUsername(user.username);
                setEmail(user.email);
                setPassword(user.password);
                setStatus(user.status);
                setRoles(user.roles);
                setAthleteCodeUsed(user.athleteCodeUsed);
                setFullName(user.fullname);
                setDateOfBirth(user.dateOfBirth);
                setGender(user.gender);
                setJob(user.job);
                setHometown(user.hometown);
                setWorkplace(user.workplace);
                setCreateAt(user.createAt);
                setLastModified(user.lastModified);
            });
        }

    },[]);

    const handleCheckContainsRole = (roles, roleName) => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === roleName) {
                return true;
            }
        }
        
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            id: userId,
            username: username,
            password: password,
            email: email,
            status: status ? status : 0,
            roles: roles,
            athleteCodeUsed: athleteCodeUsed,
            fullname: fullName,
            dateOfBirth: userId ? dateOfBirth : moment(dateOfBirth).format("DD-MM-YYYY"),
            gender: gender,
            job: job,
            hometown: hometown,
            workplace: workplace
        };
    
        if(!userId) {
            UserService.createUser(user).then(
                (response) => {
                    if (response.data.message === "User have been added!") {
                        setMessage("Người dùng đã được thêm!");
                    }
                    setSuccess(true);
                    setTimeout(() => {
                        setVisible(false);
                        props.history.push('/users');
                    }, 2000);
                },

                (error) => {
                    const ResMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();

                    if (ResMessage === "Error: Username is already taken!") {
                        setMessage("Tên tài khoản đã tồn tại!");
                    }
                    else if (ResMessage === "Error: Email is already in use!") {
                        setMessage("Email đã được sử dụng!");
                    }   
                }
            );
        } 
        else {
            UserService.updateUser(user, userId).then(
                (response) => {
                    if (response.data.message === "User have been edited!") {
                        setSuccess(true);
                        setMessage("Người dùng đã được chỉnh sửa!");
                    }
                    setTimeout(() => {
                        setVisible(false);
                        props.history.push('/users');
                    }, 2000);
                }
            );
        }

        handleOpen();
    }

    
    const title = <h2>{ userId ? "Sửa người dùng" : "Thêm người dùng" }</h2>;
            
    return(
        <div>
            <Container className="add-edit-container">
                {title}
             {!success && (
                <Form onSubmit={handleSubmit}>
                    {userId ? (
                        <FormGroup>
                            <Label for="id">ID người dùng</Label>
                            <Input type="text" name="id" id="id" value={userId} readOnly={userId ? true : false}/>
                        </FormGroup>
                    ) : ''}
                    <FormGroup>
                        <Label for="username">Tên tài khoản</Label>
                        <Input type="text"  name="username" id="username" value={username} onChange={handleChangeUsername} required readOnly={userId ? true : false}/>
                    </FormGroup>
                    {!userId ? (
                        <FormGroup>
                            <Label for="password">Mật khẩu</Label>
                            <Input type="password" name="password" id="password" value={password} onChange={handleChangePassword} required/>
                        </FormGroup>
                    ) : ''}
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text"  name="email" id="email" value={email} onChange={handleChangeEmail} required readOnly={userId ? true : false}/>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Label md="2">Trạng thái</Label>
                        </Row>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="status" id="status" value={status} checked={status === 1 ? true : false} onChange={() => handleChangeStatus(status)} />{' '}
                                    Kích hoạt
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roles">Quyền</Label>
                            <Input type="select" name="roles" id="roles" multiple onChange={handleChangeRoles} required>
                                <option value="ROLE_ATHLETE" selected={handleCheckContainsRole(roles, "ROLE_ATHLETE")}>Vận động viên</option>
                                <option value="ROLE_COACH" selected={handleCheckContainsRole(roles, "ROLE_COACH")}>Huấn luyện viên</option>
                                <option value="ROLE_ADMIN" selected={handleCheckContainsRole(roles, "ROLE_ADMIN")}>Quản trị viên</option>
                            </Input>
                    </FormGroup>
                    {user && handleCheckContainsRole(roles,"ROLE_ATHLETE") ? (
                        <FormGroup>
                            <Label for="athleteCodeUsed">Mã vận động viên sử dụng</Label>
                            <Input type="text"  name="athleteCodeUsed" id="athleteCodeUsed" value={athleteCodeUsed} onChange={handleChangeAthleteCodeUsed} readOnly={userId ? true : false} required />
                        </FormGroup>) 
                    : null }
                    <FormGroup>
                        <Label for="full-name">Họ tên người dùng</Label>
                        <Input type="text"  name="full-name" id="full-name" value={fullName} onChange={handleChangeFullName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date-of-birth">Ngày sinh</Label>
                        <Input type={userId ? "text" : "date"} name="date-of-birth" id="date-of-birth" value={dateOfBirth} onChange={handleChangeDateOfBirth} required/>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <Row>
                            <Label md="1">Giới tính</Label>
                        </Row>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" name="gender" value={gender} checked={gender === 0 ? true : false} onChange={() => handleChangeGender(0)} required/>{' '}
                                    Nam
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" name="gender" value={gender} checked={gender === 1 ? true : false} onChange={() => handleChangeGender(1)} required/>{' '}
                                    Nữ
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="job">Nghề nghiệp</Label>
                        <Input type="text"  name="job" id="job" value={job} onChange={handleChangeJob} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="hometown">Quê quán</Label>
                        <Input type="text" name="name" id="name" value={hometown} onChange={handleChangeHometown}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="workplace">Nơi làm việc</Label>
                        <Input type="text"  name="workplace" id="workplace" value={workplace} onChange={handleChangeWorkplace} />
                    </FormGroup>
                    {userId ? (
                        <div>
                            <FormGroup>
                                <Label for="create-at">Ngày tạo</Label>
                                <Input type="text" name="create-at" id="create-at" value={createAt} readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastModified">Ngày cập nhật</Label>
                                <Input type="text" name="lastModified" id="lastModified" value={lastModified} readOnly/>
                            </FormGroup>
                        </div>
                    ) : ''}
                    <FormGroup>
                        <Button color="primary" type="submit">
                            <FontAwesomeIcon icon={faSave}/>
                            &nbsp;
                            <span>Lưu</span>
                        </Button>{' '}
                        <Button color="secondary" tag={Link} to="/users">
                            <FontAwesomeIcon icon={faArrowCircleLeft}/>
                            &nbsp;
                            <span>Quay lại</span>
                        </Button>
                    </FormGroup>
                </Form>
             )}
             <Alert color={success ? "success" : "danger"} isOpen={visible} toggle={handleToggle}>
                {message}
             </Alert>
            </Container>
        </div>
    );

}