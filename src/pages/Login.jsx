import React, { useState, useEffect } from "react";
import "../styles/login.css";
import logo from "../assets/images/snack.png";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { auth, googleProvider } from "../firebase";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as actionUser from "../store/actions/actionUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const { loginUser, loginUserViaProvider } = bindActionCreators(
    actionUser,
    useDispatch()
  );
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.email) {
      navigate("/");
    }
  }, [localStorage.email]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser({ email: email, password: password })
      .then(() => {
        localStorage.setItem("email", email);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setInvalidUser(true);
      });
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleProvider)
      .then((response) => {
        loginUserViaProvider(response?.additionalUserInfo.profile.email);
        localStorage.setItem(
          "email",
          response?.additionalUserInfo.profile.email
        );
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8" sm="10" className="m-auto text-center pb-5">
              <Form className="form mb-5 br-3" onSubmit={handleSubmit}>
                <div className="pb-5 banner">
                  <img src={logo} alt="Burgers and Fries" />
                </div>
                <div className="pt-2">
                  <h4 className="pb-3">Login to your account</h4>
                  <button
                    className="addTOCart__btn w-50"
                    onClick={googleSignIn}
                  >
                    <span className="text-white">Login with Google</span>
                  </button>
                </div>
                <h6 className="pt-4">OR</h6>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label className="w-100 text-start">Email:</Form.Label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={invalidUser}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Invalid User
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="w-100 text-start">
                    Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="form__group"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={invalidUser}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Invalid User
                  </Form.Control.Feedback>
                </Form.Group>

                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </Form>
              <span>
                Don't have an account?{" "}
                <Link to="/register">
                  <u className="text-danger">Create an account</u>
                </Link>
              </span>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
