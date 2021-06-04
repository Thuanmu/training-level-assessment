import { faEdit, faEye, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import {Alert, Button, ButtonGroup, Col, Container, Modal, ModalBody, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import FormFactorService from "../../../services/form-factor-service";
import { Link } from "react-router-dom";


export default function Form(props) {

  const [formFactors, setFormFactors] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setVisible(true);
  const handleToggle = () => setVisible(!visible);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const addFormFactor = () => {
      props.history.push('/formFactors/new');
  }

  const viewFormFactor = id => {
      props.history.push(`/formFactors/${id}/detail`);
  }
  
  const editFormFactor = (id, status) => {
    if (status === 0) {
      props.history.push(`/formFactors/${id}/edit`);
    }
    else {
      setMessage("Bạn không thể sửa yếu tố hình thái đã phân loại");
      handleOpen();
      setTimeout(() => {
        setVisible(false);
        props.history.push('/formFactors');
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
          FormFactorService.getAllFormFactorsByCoachId(params).then((res) => {
          
            const { formFactors, totalPages } = res.data;
  
            setFormFactors(formFactors);
            setCount(totalPages);
  
            console.log(res.data);
          })
          .catch((error) => {
              console.log(error);
          });
      }
      else {
        params = {
          athleteCodeUsed: user.athleteCodeUsed,
          page: page - 1,
          size: pageSize
        }
        FormFactorService.getAllFormFactorsByAthleteCodeUsed(params).then((res) => {
          const { formFactors, totalPages } = res.data;
  
            setFormFactors(formFactors);
            setCount(totalPages);
  
            console.log(res.data);
          })
          .catch((error) => {
              console.log(error);
          });
      }
    }
    else {
      props.history.push(`/login`);
    }
  }, [page, pageSize, formFactors.length]);

  return(
      <div>
      <Container>
        <h2>
          <Row>
            <Col md="5">Yếu tố hình thái</Col>
            <Col md="5"></Col>
            <Col md="2">
            {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
              <div className="add-button">
               <Button color="success" onClick={addFormFactor}>
                 <FontAwesomeIcon icon={faPlusSquare}/>
                 &nbsp;
                 <span>Thêm yếu tố</span>
               </Button>
              </div>
            ) : null}
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
       {formFactors.length > 0 ? (
       <div>  
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
            {formFactors.map((formFactor, i) => (
              <tr>
                <td>{pageSize * (page - 1) + (i + 1)}</td>
                <td>{formFactor.formFactorCode}</td>
                <td>{formFactor.athlete.athleteCode}</td>
                <td>{formFactor.athlete.athleteName}</td>
                <td>{formFactor.queteletQuotient}</td>
                <td>{formFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                <td>{formFactor.createAt}</td>
                <td>
                  <ButtonGroup>
                    <Button size="sm" color="info" onClick={() => viewFormFactor(formFactor.id)}>
                      <FontAwesomeIcon icon={faEye}/>
                      &nbsp;
                      <span>Xem</span>
                    </Button>
                    {currentUser.roles.includes("ROLE_COACH") ? (
                      <div>
                        <Button size="sm" color="primary" onClick={() => editFormFactor(formFactor.id, formFactor.status)}>
                          <FontAwesomeIcon icon={faEdit}/>
                          &nbsp;
                          <span>Sửa</span>
                        </Button>
                      </div>
                    ) : null}
                    {currentUser.roles.includes("ROLE_COACH") ? (
                      <div>
                       <Button size="sm" color="danger" tag={Link} to={`/formFactors/${formFactor.id}/delete`}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        &nbsp;
                        <span>Xóa</span>
                       </Button>
                      </div>
                    ) : null}
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
          <Alert color="warning">Không tìm thấy yếu tố hình thái nào.</Alert>
        </div>
       )}
      </Container>
    </div> 
  );
}