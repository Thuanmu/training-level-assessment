import { faBan, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import AthleteService from "../../services/athlete-service";
// import {NotificationContainer, NotificationManager} from 'react-notifications';

export const AthleteDeleteDialog = (props) => {
  const [athleteId, setAthleteId] = useState(props.match.params.id);
  const [athlete, setAthlete] = useState({});

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleToggle = () => setVisible(!visible);

  const handleClose = () => {
    props.history.push(`/athletes`);
  };

  const deleteAthlete = () => {
    handleOpen();

    AthleteService.deleteAthlete(athleteId).then(
      (response) => {
        if (response.data.message === "Athlete has been deleted!") {
          setSuccess(true);
          setMessage("Vận động viên đã được xóa!");
        }
        
        // NotificationManager.success(response.data.message, null, 3000);
        setTimeout(() => {
          setVisible(false);
          handleClose();
        }, 2000);
      },

      (error) => {
        const ResMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (ResMessage === "Error: You can't delete an athlete with factors added!") {
          setMessage("Bạn không thể xóa vận động viên đã thêm các yếu tố");
        }
        // NotificationManager.error(ResMessage, null, 3000);
        setTimeout(() => {
          setVisible(false);
          handleClose();
        }, 2000);
      }
    );
  };

  useEffect(() => {
    AthleteService.getAthleteById(athleteId).then((res) => {
      setAthlete(res.data);
    });
  }, []);

  return (
    <div>
      {/* <NotificationContainer/> */}
      <Container>
        <Modal isOpen toggle={handleClose}>
          {!message && (
            <div>
              <ModalHeader toggle={handleClose}>
                <span>Xác nhận thao tác xóa</span>
              </ModalHeader>
              <ModalBody>
                <span>Bạn có chắc chắn muốn xóa vận động viên này?</span>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                  <FontAwesomeIcon icon={faBan} />
                  &nbsp;
                  <span>Hủy</span>
                </Button>
                <Button color="danger" onClick={deleteAthlete}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  &nbsp;
                  <span>Xóa</span>
                </Button>
              </ModalFooter>
            </div>
          )}
          <ModalBody>
            <Alert
              color={success ? "success" : "danger"}
              isOpen={visible}
              toggle={handleToggle}
            >
              {message}
            </Alert>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};
