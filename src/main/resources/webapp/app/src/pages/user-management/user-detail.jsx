import { faArrowCircleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Container } from "reactstrap";
import AuthenticationService from "../../services/authentication-service";
import UserService from "../../services/user-service";

export default function UserDetail(props) {

    const [userId, setUserId] = useState(props.match.params.id);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(undefined);
    

    useEffect(() => {
        let user = AuthenticationService.getCurrentUser();
        setCurrentUser(user);

        UserService.getUserById(userId).then( res => {
            setUser(res.data);
        });
    },[]);

    return(
        <div>
            <Container>
                <h2>Xem chi tiết người dùng</h2>
                <dl>
                    <dt>
                        <span>ID người dùng</span>
                    </dt>
                    <dd>{user.id}</dd>
                    <dt>
                        <span>Tên tài khoản</span>
                    </dt>
                    <dd>{user.username}</dd>
                    <dt>
                        <span>Email</span>
                    </dt>
                    <dd>{user.email}</dd>
                    <dt>
                        <span>Trạng thái</span>
                    </dt>
                    <dd>
                        <div>
                            <Badge color={user.status === 1 ? "success" : "danger"}>{user.status === 1 ? "Đã kích hoạt" : "Đã bị khóa"}</Badge>
                        </div>
                    </dd>
                    <dt>
                        <span>Quyền</span>
                    </dt>
                    <dd>
                    {user.roles ? user.roles.map((role, j) => (
                      <div>
                        <Badge color="info">{role.name === "ROLE_ATHLETE" ? "Vận động viên" : role.name === "ROLE_COACH" ? "Huấn luyện viên" : "Quản trị viên"}</Badge>
                      </div>
                    )) 
                    : null}    
                    </dd>
                    <dt>
                        <span>Mã vận động viên sử dụng</span>
                    </dt>
                    <dd>{user.athleteCodeUsed}</dd>
                    <dt>
                        <span>Họ tên người dùng</span>
                    </dt>
                    <dd>{user.fullname}</dd>
                    <dt>
                        <span>Ngày sinh</span>
                    </dt>
                    <dd>{user.dateOfBirth}</dd>
                    <dt>
                        <span>Giới tính</span>
                    </dt>
                    <dd>{user.gender === 0 ? "Nam" : "Nữ"}</dd>
                    <dt>
                        <span>Nghề nghiệp</span>
                    </dt>
                    <dd>{user.job}</dd>
                    <dt>
                        <span>Quê quán</span>
                    </dt>
                    <dd>{user.hometown}</dd>
                    <dt>
                        <span>Nơi làm việc</span>
                    </dt>
                    <dd>{user.workplace}</dd>
                    <dt>
                        <span>Ngày tạo</span>
                    </dt>
                    <dd>{user.createAt}</dd>
                    <dt>
                        <span>Ngày cập nhật</span>
                    </dt>
                    <dd>{user.lastModified}</dd>
                </dl>
                {currentUser && currentUser.roles.includes("ROLE_ADMIN") ? (
                   <span>
                      <Button color="primary" tag={Link} to={`/users/${user.id}/edit`} >
                        <FontAwesomeIcon icon={faEdit}/>
                        &nbsp;
                        <span>Sửa</span>
                      </Button>
                      &nbsp;
                   </span>
                ) : (
                    ''
                )}
                <Button color="secondary" tag={Link} to="/users">
                    <FontAwesomeIcon icon={faArrowCircleLeft}/>
                    &nbsp;
                    <span>Quay lại</span>
                </Button>
            </Container>
        </div>
    );

}