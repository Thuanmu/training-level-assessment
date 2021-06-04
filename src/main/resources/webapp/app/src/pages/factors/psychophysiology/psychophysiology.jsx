import { faEdit, faEye, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import {Alert, Button, ButtonGroup, Col, Container, Modal, ModalBody, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import PsychophysiologyFactorService from "../../../services/psychophysiology-factor-service";
import { Link } from "react-router-dom";

export default function Psychophysiology(props) {

  const [psychophysiologyFactors, setPsychophysiologyFactors] = useState([]);
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

  const addPsychophysiologyFactor = () => {
    props.history.push(`/psychophysiologyFactors/new`);
  }

  const viewPsychophysiologyFactor = id => {
    props.history.push(`/psychophysiologyFactors/${id}/detail`);
  }

  const editPsychophysiologyFactor = (id, status) => {
    if (status === 0) {
      props.history.push(`/psychophysiologyFactors/${id}/edit`);
    }
    else {
      setMessage("Bạn không thể sửa yếu tố tâm-sinh lý đã phân loại");
      handleOpen();
      setTimeout(() => {
        setVisible(false);
        props.history.push('/psychophysiologyFactors');
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
          PsychophysiologyFactorService.getAllPsychophysiologyFactorsByCoachId(params).then((res) => {
            
            const { psychophysiologyFactors, totalPages } = res.data;

            setPsychophysiologyFactors(psychophysiologyFactors);
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
          PsychophysiologyFactorService.getAllPsychophysiologyFactorsByAthleteCodeUsed(params).then((res) => {
            const { psychophysiologyFactors, totalPages } = res.data;

            setPsychophysiologyFactors(psychophysiologyFactors);
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
    }, [page, pageSize, psychophysiologyFactors.length]);

    return(
        <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố tâm-sinh lý</Col>
              <Col md="5"></Col>
              <Col md="2">
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <div className="add-button">
                      <Button color="success" onClick={addPsychophysiologyFactor}>
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
         {psychophysiologyFactors.length > 0 ? (
          <div>
           <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã yếu tố tâm sinh lý</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Phản xạ đơn (s)</th>
                <th>Chỉ số dung tích sống (ml/kg)</th>
                <th>Tần số tim 5s sau chạy 100m (lần/ph)</th>
                <th>Tần số tim hồi phục 30s sau chạy 100m (lần/ph)</th>
                <th>Hàm lượng axit lactic sau chạy 100m (mmol/lít)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {psychophysiologyFactors.map((psychophysiologyFactor, i) => (
                <tr>
                  <td>{pageSize * (page - 1) + (i + 1)}</td>
                  <td>{psychophysiologyFactor.psychophysiologyFactorCode}</td>
                  <td>{psychophysiologyFactor.athlete.athleteCode}</td>
                  <td>{psychophysiologyFactor.athlete.athleteName}</td>
                  <td>{psychophysiologyFactor.singleReflectionTime}</td>
                  <td>{psychophysiologyFactor.livingCapacityQuotient}</td>
                  <td>{psychophysiologyFactor.heartRateAtFiveSecondsAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.lacticAcidContentAfterOneHundredMetersRun}</td>
                  <td>{psychophysiologyFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{psychophysiologyFactor.createAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewPsychophysiologyFactor(psychophysiologyFactor.id)}>
                        <FontAwesomeIcon icon={faEye}/>
                        &nbsp;
                        <span>Xem</span>
                      </Button>
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="primary" onClick={() => editPsychophysiologyFactor(psychophysiologyFactor.id, psychophysiologyFactor.status)} >
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
                          <Button size="sm" color="danger" tag={Link} to={`/psychophysiologyFactors/${psychophysiologyFactor.id}/delete`} >
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
            <Alert color="warning">Không tìm thấy yếu tố tâm-sinh lý nào.</Alert>
          </div>
         )}
        </Container>
      </div> 
    );
}