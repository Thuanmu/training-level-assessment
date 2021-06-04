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
import UserService from "../../services/user-service";

export const UserDeleteDialog = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [user, setUser] = useState({});

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleToggle = () => setVisible(!visible);

  const handleClose = () => {
    props.history.push(`/users`);
    window.location.reload();
  };

  const deleteUser = () => {
    handleOpen();
    UserService.deleteUser(id).then((response) => {
      if (response.data.message === "User has been deleted!") {
        setMessage("Người dùng đã được xóa!");
      }
      setSuccess(true);
      setTimeout(() => {
        setVisible(false);
        handleClose();
      }, 2000);
    });
  };

  useEffect(() => {
    UserService.getUserById(id).then((res) => {
      setUser(res.data);
    });
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
                <span>Bạn có chắc chắn muốn xóa người dùng này?</span>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                  <FontAwesomeIcon icon={faBan} />
                  &nbsp;
                  <span>Hủy</span>
                </Button>
                <Button color="danger" onClick={deleteUser}>
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
