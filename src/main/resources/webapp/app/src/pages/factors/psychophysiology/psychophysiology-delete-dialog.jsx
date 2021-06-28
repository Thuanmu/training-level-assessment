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
import PsychophysiologyFactorService from "../../../services/psychophysiology-factor-service";

export const PsychophysiologyFactorDeleteDialog = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [psychophysiologyFactor, setPsychophysiologyFactor] = useState({});

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleToggle = () => setVisible(!visible);

  const handleClose = () => {
    props.history.push(`/psychophysiologyFactors`);
  };

  const deletePsychophysiologyFactor = () => {
    handleOpen();
    if (psychophysiologyFactor.status === 0) {
      PsychophysiologyFactorService.deletePsychophysiologyFactor(id).then(
        (response) => {
          if (response.data.message === "PsychophysiologyFactor has been deleted!") {
            setSuccess(true);
            setMessage("Yếu tố tâm-sinh lý đã được xóa!");
          }
          
          setTimeout(() => {
            setVisible(false);
            handleClose();
          }, 2000);
        }
      );
    } else {
      setMessage("Bạn không thể xóa yếu tố tâm-sinh lý đã phân loại");
      setTimeout(() => {
        setVisible(false);
        handleClose();
      }, 2000);
    }
  };

  useEffect(() => {
    PsychophysiologyFactorService.getPsychophysiologyFactorById(id).then(
      (res) => {
        setPsychophysiologyFactor(res.data);
      }
    );
  }, []);

  return (
    <div>
      <Container>
        <Modal isOpen toggle={handleClose}>
          {!message && (
            <div>
              <ModalHeader toggle={handleClose}>
                <span>Xác nhận thao tác xóa</span>
              </ModalHeader>
              <ModalBody>
                <span>Bạn có chắc chắn muốn xóa yếu tố tâm-sinh lý này?</span>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                  <FontAwesomeIcon icon={faBan} />
                  &nbsp;
                  <span>Hủy</span>
                </Button>
                <Button color="danger" onClick={deletePsychophysiologyFactor}>
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
