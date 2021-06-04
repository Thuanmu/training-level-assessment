import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthenticationService from "../../../services/authentication-service";
import {
  Alert,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

export default function Login(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const required = (value) => {
    if (!value) {
      return (
        <div>
          <Alert color="danger">Thông tin này là bắt buộc</Alert>
        </div>
      );
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthenticationService.login(username, password).then(
        (response) => {
          if (response.data !== null) {
            setMessage("Đăng nhập thành công!");
          }

          setLoading(false);
          setSuccess(true);
          // if (response.data.code === 401) {
          //   setMessage("Tài khoản hoặc mật khẩu đăng nhập không hợp lệ!");
          // }
          setTimeout(() => {
            props.history.push("/");
            window.location.reload();
          }, 2000);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          if (resMessage === "Request failed with status code 500") {
            setMessage("Tài khoản hoặc mật khẩu không đúng!");
          }
          if (resMessage === "Error: User has been locked!") {
            setMessage("Tài khoản này đã bị khóa!");
          }
          // setMessage(resMessage);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container id="login-container">
        <h2>Đăng nhập</h2>
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <Form onSubmit={handleLogin} ref={form}>
          {!success && (
            <div>
              <div className="form-group">
                <Label>Tên tài khoản</Label>
                {/* <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={handleChangeUsername}
                validations={[required]}
              />
            </InputGroup> */}
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={handleChangeUsername}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <Label>Mật khẩu</Label>
                {/* <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChangePassword}
              validations={[required]}
              />
            </InputGroup> */}
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChangePassword}
                  validations={[required]}
                />
              </div>
              &nbsp;
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    // <span className="spinner-border spinner-border-sm"></span>
                    <Spinner size="sm" color="light" />
                  )}
                  <span>Đăng nhập</span>
                </button>
                &nbsp;
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  success ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Container>
    </div>
  );
}
