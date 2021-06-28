import { faEdit, faEye, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import {Alert, Button, ButtonGroup, Col, Container, Modal, ModalBody, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import TechnicalFactorService from "../../../services/technical-factor-service";
import { Link } from "react-router-dom";

export default function Technical(props) {

  const [technicalFactors, setTechnicalFactors] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setVisible(true);
  const handleToggle = () => setVisible(!visible);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const addTechnicalFactor = () => {
    props.history.push(`/technicalFactors/new`);
  }

  const viewTechnicalFactor = id => {
    props.history.push(`/technicalFactors/${id}/detail`);
  }

  const editTechnicalFactor = (id, status) => {
    if (status === 0) {
      props.history.push(`/technicalFactors/${id}/edit`);
    }
    else {
      setMessage("Bạn không thể sửa yếu tố kỹ thuật đã phân loại");
      handleOpen();
      setTimeout(() => {
        setVisible(false);
        props.history.push('/technicalFactors');
      }, 2000);
    }
  }

  useEffect(() => {
    let user = AuthenticationService.getCurrentUser();
    setCurrentUser(user);
    let params = {};
      if (user) {
        if (user.roles.includes("ROLE_COACH")) {
          params = {
            coachId: user.id,
            page: page - 1,
            size: pageSize
          }
          TechnicalFactorService.getAllTechnicalFactorsByCoachId(params).then((res) => {
  
            const { technicalFactors, totalPages } = res.data;

            setTechnicalFactors(technicalFactors);
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
        else {
          params = {
            athleteCodeUsed: user.athleteCodeUsed,
            page: page - 1,
            size: pageSize
          }
          TechnicalFactorService.getAllTechnicalFactorsByAthleteCodeUsed(params).then((res) => {
            const { technicalFactors, totalPages } = res.data;

            setTechnicalFactors(technicalFactors);
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
  }, [page, pageSize, technicalFactors.length]);


    return(
        <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố kỹ thuật</Col>
              <Col md="5"></Col>
              <Col md="2">
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <div className="add-button">
                      <Button color="success" onClick={addTechnicalFactor}>
                        <FontAwesomeIcon icon={faPlusSquare}/>
                        &nbsp;
                        <span>Thêm yếu tố</span>
                      </Button>
                   </div>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </h2>
          &nbsp;
          <Modal isOpen={visible} toggle={handleToggle}>
            <ModalBody>
             <Alert color="danger" isOpen={visible} toggle={handleToggle}>
               {message}
             </Alert>
            </ModalBody>
          </Modal>
         {technicalFactors.length > 0 ? (
          <div>
           <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã yếu tố kỹ thuật</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Hiệu số thành tích chạy 30m xuất phát thấp với chạy 30m tốc độ cao (s)</th>
                <th>Thời gian tiếp đất khi đạt tốc độ cao (s)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {technicalFactors.map((technicalFactor, i) => (
                <tr>
                  <td>{pageSize * (page - 1) + (i + 1)}</td>
                  <td>{technicalFactor.technicalFactorCode}</td>
                  <td>{technicalFactor.athlete.athleteCode}</td>
                  <td>{technicalFactor.athlete.athleteName}</td>
                  <td>{technicalFactor.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed}</td>
                  <td>{technicalFactor.groundingTimeWhenReachingHighSpeed}</td>
                  <td>{technicalFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{technicalFactor.createAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewTechnicalFactor(technicalFactor.id)}>
                        <FontAwesomeIcon icon={faEye}/>
                        &nbsp;
                        <span>Xem</span>
                      </Button>
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="primary" onClick={() => editTechnicalFactor(technicalFactor.id, technicalFactor.status)} >
                            <FontAwesomeIcon icon={faEdit}/>
                            &nbsp;
                            <span>Sửa</span>
                          </Button>
                        </div>
                        ) : (
                          ''
                      )}
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="danger" tag={Link} to={`/technicalFactors/${technicalFactor.id}/delete`} >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            &nbsp;
                            <span>Xóa</span>
                          </Button>
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
            <Alert color="warning">Không tìm thấy yếu tố kỹ thuật nào.</Alert>
          </div>
         )}
        </Container>
      </div> 
    );
}