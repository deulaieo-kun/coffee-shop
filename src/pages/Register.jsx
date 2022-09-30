import React from "react";
import firebase from "firebase/compat/app";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/images/snack.png";
import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Validation
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [userList] = useCollection(db.collection("users"));
  const [user] = useAuthState(auth);
  const activeUser = useSelector((state) => state.activeUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || activeUser.email) {
      navigate("/");
    }
  });

  const checkIfValid = () => {
    let isValid = true;
    userList?.docs.forEach((doc) => {
      // Check if username is valid
      if (doc.data().username === username || !username) {
        isValid = false;
        setInvalidUsername(true);
      } else {
        setInvalidUsername(false);
      }

      // Check if email is valid
      if (doc.data().email === email || !email) {
        isValid = false;
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    });

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

    if (checkIfValid()) {
      db.collection("users").add({
        username: username,
        email: email,
        password: password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setShowModal(true);
    }
  };

  const closeRegistration = () => {
    setShowModal(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };


  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8" sm="10" className="m-auto text-center">
              <div className="form mb-5 br-3">
                <div className="pb-5 banner">
                  <img src={logo} alt="Burgers and Fries" />
                </div>
                <div className="p-2">
                  <h4>Create an Account</h4>
                </div>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label className="w-100 text-start">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control auth-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={invalidUsername}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Username already exists!
                  </Form.Control.Feedback>
                </Form.Group>

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
                <Form.Label className="w-100 text-start">Password:</Form.Label>
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
                <Form.Label className="w-100 text-start">Confirm Password:</Form.Label>
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
                  <Modal.Header>
                    <Modal.Title className="text-dark">
                      Congratulation!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-dark">
                    Successful Registration!
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      variant="secondary"
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
                Already have an account? <Link to="/login"><u className="text-danger">Login</u></Link>
              </span>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
