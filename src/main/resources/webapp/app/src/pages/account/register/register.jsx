import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthenticationService from "../../../services/authentication-service";
import { Container, Label, Spinner } from "reactstrap";
import { useEffect } from "react";

export default function Register(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [roles, setRoles] = useState([]);
  const [athleteCodeUsed, setAthleteCodeUsed] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeRoles = (event) => setRoles([event.target.value]);

  const handleAthleteCodeUsed = (event) =>
    setAthleteCodeUsed(event.target.value);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Thông tin này là bắt buộc.
        </div>
      );
    }
  };

  const validateEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Email không hợp lệ.
        </div>
      );
    }
  };

  const validateUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          Tên tài khoản phải có độ dài từ 3 đến 20 ký tự.
        </div>
      );
    }
  };

  const validatePassword = (value) => {
    
    if (value.length < 6 || value.length > 40) {
    
      return (
        <div className="alert alert-danger" role="alert">
          Mật khẩu phải có độ dài từ 6 đến 40 ký tự.
        </div>
      );
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthenticationService.register(
        username,
        email,
        password,
        roles,
        athleteCodeUsed
      ).then(
        (response) => {
          if (response.data.message === "User registered successfully!") {
            setMessage("Đăng ký thành công!");
          }
          setSuccess(true);
          setTimeout(() => {
            // setVisible(false);
            props.history.push("/login");
          }, 2000);
        },
        (error) => {
          const ResMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          if (ResMessage === "Error: Username is already taken!") {
            setMessage("Tên tài khoản đã tồn tại!");
          } else if (ResMessage === "Error: Email is already in use!") {
            setMessage("Email đã được sử dụng!");
          }

          setSuccess(false);
        }
      );
    }
  };

  // document.write(JSON.stringify(roles));

  return (
    <div>
      <Container id="signUp-container">
        <h2>Đăng ký</h2>
        <Form onSubmit={handleRegister} ref={form}>
          {!success && (
            <div>
              <div className="form-group">
                <Label>Tên tài khoản</Label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Nhập tên tài khoản của bạn"
                  value={username}
                  onChange={handleChangeUsername}
                  validations={[required, validateUsername]}
                />
              </div>
              <div className="form-group">
                <Label>Email</Label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={handleChangeEmail}
                  validations={[required, validateEmail]}
                />
              </div>
              <div className="form-group">
                <Label>Mật khẩu</Label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={handleChangePassword}
                  validations={[required, validatePassword]}
                />
              </div>
              <div className="form-group">
                <Label>Loại tài khoản</Label>
                <Select
                  className="form-control"
                  name="roles"
                  onChange={handleChangeRoles}
                  validations={[required]}
                >
                  <option>-- Chọn loại tài khoản --</option>
                  <option value="ROLE_COACH">Huấn luyện viên</option>
                  <option value="ROLE_ATHLETE">Vận động viên</option>
                </Select>
              </div>
              {roles && roles.includes("ROLE_ATHLETE") ? (
                <div className="form-group">
                  <Label>Mã vận động viên sử dụng</Label>
                  <Input
                    type="text"
                    className="form-control"
                    name="athleteCodeUsed"
                    value={athleteCodeUsed}
                    onChange={handleAthleteCodeUsed}
                    validations={[required]}
                  />
                </div>
              ) : null}
              &nbsp;
              <div className="form-group">
                <button className="btn btn-primary btn-block">Đăng ký</button>
                {/* <Spinner size="sm" type="grow" color="secondary" /> */}
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
