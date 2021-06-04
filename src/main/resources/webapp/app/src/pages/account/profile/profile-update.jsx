import React, { useEffect, useState } from "react";
import {Badge, Button, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { Link } from 'react-router-dom';
import UserService from "../../../services/user-service";
import AuthenticationService from "../../../services/authentication-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons";

export default function ProfileUpdate(props) {

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
    const [currentUser, setCurrentUser] = useState(undefined);


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
                setPassword(user.password);
                setEmail(user.email);
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

        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            id: userId,
            username: username,
            password: password,
            email: email,
            status: status,
            roles: roles,
            athleteCodeUsed: athleteCodeUsed,
            fullname: fullName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            job: job,
            hometown: hometown,
            workplace: workplace,
        };

        UserService.updateUser(user, userId).then( res => {
            props.history.push(`/profile/${userId}/edit`);
        });
    }

    
    const title = <h2>Sửa hồ sơ cá nhân</h2>;
            
    return(
        <div>
            <Container className="add-edit-container">
                {title}
                <Form onSubmit={handleSubmit}>
                    {userId ? (
                        <FormGroup>
                            <Label for="id">ID người dùng</Label>
                            <Input type="text" name="id" id="id" value={userId} readOnly={userId ? true : false}/>
                        </FormGroup>
                    ) : ''}
                    <FormGroup>
                        <Label for="username">Tên tài khoản</Label>
                        <Input type="text"  name="username" id="username" value={username} readOnly/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text"  name="email" id="email" value={email} readOnly/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Trạng thái</Label>
                        <div>
                            <Badge color="secondary">{user.status === 1 ? "Đã kích hoạt" : "Đã bị khóa"}</Badge>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roles">Quyền</Label>
                            {user.roles ? user.roles.map((role, j) => (
                                <div>
                                    <Badge color="secondary">{role.name === "ROLE_ATHLETE" ? "Vận động viên" : role.name === "ROLE_COACH" ? "Huấn luyện viên" : "Quản trị viên"}</Badge>
                                </div>
                            )) 
                            : null}  
                    </FormGroup>
                    {currentUser && currentUser.roles.includes("ROLE_ATHLETE") ? (
                        <FormGroup>
                            <Label for="athleteCodeUsed">Mã vận động viên sử dụng</Label>
                            <Input type="text"  name="athleteCodeUsed" id="athleteCodeUsed" value={athleteCodeUsed} readOnly/>
                        </FormGroup>) 
                    : null }
                    <FormGroup>
                        <Label for="full-name">Họ tên người dùng</Label>
                        <Input type="text"  name="full-name" id="full-name" value={fullName} onChange={handleChangeFullName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date-of-birth">Ngày sinh</Label>
                        <Input type={userId ? "text" : "date"} name="date-of-birth" id="date-of-birth" value={dateOfBirth} onChange={handleChangeDateOfBirth} />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <Row>
                            <Label md="2">Giới tính</Label>
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
                        <Button color="secondary" tag={Link} to={`/profile/${userId}`}>
                            <FontAwesomeIcon icon={faArrowCircleLeft}/>
                            &nbsp;
                            <span>Quay lại</span>
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );

}