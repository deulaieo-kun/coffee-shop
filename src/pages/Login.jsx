import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/images/snack.png";

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8" sm="10" className="m-auto text-center">
              <form className="form mb-5 br-3" onSubmit={submitHandler}>
                <div className="pb-5 banner">
                  <img src={logo} alt="Burgers and Fries" />
                </div>
                <div className="p-2">
                  <h4>Login to your account</h4>
                </div>
                <div className="form__group pt-4">
                  <input
                    type="email"
                    placeholder="Enter your email:"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form__group pb-4">
                  <input
                    type="password"
                    placeholder="Enter your password:"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <span>
                Don't have an account?{" "}
                <Link to="/register">Create an account</Link>
              </span>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
