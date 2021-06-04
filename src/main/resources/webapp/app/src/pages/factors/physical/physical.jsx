import { faEdit, faEye, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import {Alert, Button, ButtonGroup, Col, Container, Modal, ModalBody, Row, Table} from "reactstrap";
import AuthenticationService from "../../../services/authentication-service";
import PhysicalFactorService from "../../../services/physical-factor-service";
import { Link } from "react-router-dom";

export default function Physical(props) {

    const [physicalFactors, setPhysicalFactors] = useState([]);
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

    const addPhysicalFactor = () => {
      props.history.push(`/physicalFactors/new`);
    }
  
    const viewPhysicalFactor = id => {
      props.history.push(`/physicalFactors/${id}/detail`);
    }
  
    const editPhysicalFactor = (id, status) => {
      if (status === 0) {
        props.history.push(`/physicalFactors/${id}/edit`);
      }
      else {
        setMessage("Bạn không thể sửa yếu tố thể lực đã được phân loại!");
        handleOpen();
        setTimeout(() => {
          setVisible(false);
          props.history.push('/physicalFactors');
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
          PhysicalFactorService.getAllPhysicalFactorsByCoachId(params).then((res) => {
            
            const { physicalFactors, totalPages } = res.data;

            setPhysicalFactors(physicalFactors);
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
          PhysicalFactorService.getAllPhysicalFactorsByAthleteCodeUsed(params).then((res) => {
            const { physicalFactors, totalPages } = res.data;

            setPhysicalFactors(physicalFactors);
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
    }, [page, pageSize, physicalFactors.length]);


    return(
      <div>
        <Container>
          <h2>
            <Row>
              <Col md="5">Yếu tố thể lực</Col>
              <Col md="5"></Col>
              <Col md="2">
                {currentUser && currentUser.roles.includes("ROLE_COACH") ? (
                   <div className="add-button">
                      <Button color="success" onClick={addPhysicalFactor}>
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
         {physicalFactors.length > 0 ? (
          <div>
           <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã yếu tố thể lực</th>
                <th>Mã vận động viên</th>
                <th>Tên vận động viên</th>
                <th>Thời gian phản xạ xuất phát (s)</th>
                <th>Chạy 30m tốc độ cao (s)</th>
                <th>Chạy 30m xuất phát thấp (s)</th>
                <th>Chạy 60m xuất phát thấp (s)</th>
                <th>Chạy 80m xuất phát cao (s)</th>
                <th>Chạy 150m xuất phát cao (s)</th>
                <th>Bật xa tại chỗ (m)</th>
                <th>Bật 3 bước tại chỗ (m)</th>
                <th>Bật 10 bước tại chỗ (m)</th>
                <th>Thời gian chạy 20m cuối trong chạy 100m (s)</th>
                <th>Hệ số sức bền K (s)</th>
                <th>Nâng cao đùi tại chỗ 10s (lần)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {physicalFactors.map((physicalFactor, i) => (
                <tr>
                  <td>{pageSize * (page - 1) + (i + 1)}</td>
                  <td>{physicalFactor.physicalFactorCode}</td>
                  <td>{physicalFactor.athlete.athleteCode}</td>
                  <td>{physicalFactor.athlete.athleteName}</td>
                  <td>{physicalFactor.timeOfReflectionStart}</td>
                  <td>{physicalFactor.thirtyMetersRunAtHighSpeed}</td>
                  <td>{physicalFactor.thirtyMetersRunWithLowStart}</td>
                  <td>{physicalFactor.sixtyMetersRunWithLowStart}</td>
                  <td>{physicalFactor.eightyMetersRunWithHighStart}</td>
                  <td>{physicalFactor.oneHundredFiftyMetersRunWithHighStart}</td>
                  <td>{physicalFactor.awayJumpInPlace}</td>
                  <td>{physicalFactor.threeStepsJumpInPlace}</td>
                  <td>{physicalFactor.tenStepsJumpInPlace}</td>
                  <td>{physicalFactor.runTimeOfLastTwentyMetersInOneHundredMetersRun}</td>
                  <td>{physicalFactor.strengthCoefficient_K}</td>
                  <td>{physicalFactor.thighsRaiseInPlaceForTenSeconds}</td>
                  <td>{physicalFactor.status === 1 ? "Đã phân loại" : "Chưa phân loại"}</td>
                  <td>{physicalFactor.createAt}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="info" onClick={() => viewPhysicalFactor(physicalFactor.id)}>
                        <FontAwesomeIcon icon={faEye}/>
                        &nbsp;
                        <span>Xem</span>
                      </Button>
                      {currentUser.roles.includes("ROLE_COACH") ? (
                        <div>
                          <Button size="sm" color="primary" onClick={() => editPhysicalFactor(physicalFactor.id, physicalFactor.status)} >
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
                          <Button size="sm" color="danger" tag={Link} to={`/physicalFactors/${physicalFactor.id}/delete`}>
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
            <Alert color="warning">Không tìm thấy yếu tố thể lực nào.</Alert>
          </div>
         )}
        </Container>
      </div> 
    );
}