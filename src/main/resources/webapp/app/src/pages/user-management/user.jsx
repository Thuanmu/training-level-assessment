import { faEdit, faEye, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import {Alert, Badge, Button, ButtonGroup, Col, Container, Row, Table} from "reactstrap";
import AuthenticationService from "../../services/authentication-service";
import UserService from "../../services/user-service";
import { Link } from "react-router-dom";

export default function User(props) {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const addUser = () => {
    props.history.push(`/users/new`);
  }

  const viewUser = id => {
    props.history.push(`/users/${id}/detail`);
  }

  const editUser = id => {
    props.history.push(`/users/${id}/edit`);
  }
  
  useEffect(() => {
    let user = AuthenticationService.getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) {
        let params = {
          page: page - 1,
          size: pageSize
        }
        UserService.getAllUsers(params).then((res) => {
          setUsers(res.data);
          const { users, totalPages } = res.data;

          setUsers(users);
          setCount(totalPages);

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            localStorage.removeItem("user");
          }
        });
      }
    }
    else {
      props.history.push(`/login`);
    }
  }, [page, pageSize]);

  return(
    <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Danh sách người dùng</Col>
              <Col md="4"></Col>
              <Col md="3">
                <div className="add-button">
                    <Button color="success" onClick={addUser}>
                      <FontAwesomeIcon icon={faPlusSquare}/>
                      &nbsp;
                      <span>Thêm người dùng</span>
                    </Button>
                </div>
              </Col>
            </Row>
          </h2>
          &nbsp;
         {users.length > 0 ? (
          <div>
           <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID người dùng</th>
                <th>Tên tài khoản</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Quyền</th>
                <th>Mã vận động viên sử dụng</th>
                <th>Họ tên người dùng</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Nghề nghiệp</th>
                <th>Quê quán</th>
                <th>Nơi làm việc</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr>
                  <td>{pageSize * (page - 1) + (i + 1)}</td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <div>
                      <Badge color={user.status === 1 ? "success" : "danger"}>{user.status === 1 ? "Đã kích hoạt" : "Đã bị khóa"}</Badge>
                    </div>
                  </td>
                  <td>
                    {user.roles ? user.roles.map((role, j) => (
                      <div>
                        <Badge color="info">{role.name === "ROLE_ATHLETE" ? "Vận động viên" : role.name === "ROLE_COACH" ? "Huấn luyện viên" : "Quản trị viên"}</Badge>
                      </div>
                    )) 
                    : null}
                  </td>
                  <td>{user.athleteCodeUsed}</td>
                  <td>{user.fullname}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.gender === 0 ? "Nam" : "Nữ"}</td>
                  <td>{user.job}</td>
                  <td>{user.hometown}</td>
                  <td>{user.workplace}</td>
                  <td>{user.createAt}</td>
                  <td>{user.lastModified}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewUser(user.id)}>
                        <FontAwesomeIcon icon={faEye}/>
                        &nbsp;
                        <span>Xem</span>
                      </Button>
                      <Button size="sm" color="primary" onClick={() => editUser(user.id)}>
                        <FontAwesomeIcon icon={faEdit}/>
                        &nbsp;
                        <span>Sửa</span>
                      </Button>
                      <Button size="sm" color="danger" tag={Link} to={`/users/${user.id}/delete`} disabled={user.id === currentUser.id ? true : false}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        &nbsp;
                        <span>Xóa</span>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
           </Table>

           <Pagination
              className="my-5"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
           /> 
          </div>
         ) : (
          <div>
            <Alert color="warning">Không tìm thấy người dùng nào.</Alert>
          </div>
         )}
        </Container>
    </div> 
  );
}