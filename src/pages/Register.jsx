import React, { useState, useEffect } from "react";
import "../styles/login.css";
import logo from "../assets/images/snack.png";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as actionUser from "../store/actions/actionUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const { registerUser } = bindActionCreators(actionUser, useDispatch());
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.email) {
      navigate("/");
    }
  });

  const checkIfValid = () => {
    let isValid = true;

    // Check if password is same with confirmPassword
    if (password !== confirmPassword || !password) {
      setInvalidPassword(true);
      isValid = false;
    } else {
      setInvalidPassword(false);
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (checkIfValid()) {
      // Call Registration API
      registerUser({
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response, "response");
          setInvalidEmail(false);
          setLoading(false);
          setShowModal(true);
        })
        .catch((error) => {
          setInvalidEmail(true);
          console.log(error, "error");
        });
    }
  };

  const closeRegistration = () => {
    setLoading(true);
    setShowModal(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
    setLoading(false);
  };

  if (loading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8" sm="10" className="m-auto text-center pb-5">
              <div className="form mb-5 br-3">
                <div className="pb-5 banner">
                  <img src={logo} alt="Burgers and Fries" />
                </div>
                <div className="p-2">
                  <h4>Create an Account</h4>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-2">
                    <Form.Label className="w-100 text-start">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      className="form-control auth-input"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={invalidEmail}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Email already exists!
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label className="w-100 text-start">
                      Password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      className="form-control auth-input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={invalidPassword}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      The password confirmation does not match
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="w-100 text-start">
                      Confirm Password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      className="form-control auth-input"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={invalidPassword}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      The password confirmation does not match
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Modal show={showModal}>
                    <Modal.Header className="addTOCart__btn">
                      <Modal.Title className="text-white">
                        Congratulations!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-dark text-center">
                      Successful Registration! <br />
                      You may now login with your new account.
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        variant="secondary"
                        className="addTOCart__btn"
                        onClick={() => closeRegistration()}
                      >
                        Close
                      </button>
                    </Modal.Footer>
                  </Modal>

                  <button type="submit" className="addTOCart__btn">
                    Sign Up
                  </button>
                </Form>
              </div>
              <span>
                Already have an account?{" "}
                <Link to="/login">
                  <u className="text-danger">Login</u>
                </Link>
              </span>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
