import React, { useRef, useState, useEffect } from "react";
import "../../styles/header.css";
import logo from "../../assets/images/snack.png";
import { Container } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { bindActionCreators } from "redux";
import { Modal } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as actionCart from "../../store/actions/actionCart";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "About Us",
    path: "/aboutUs",
  },
];

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { getAllProductsByUser } = bindActionCreators(
    actionCart,
    useDispatch()
  );

  useEffect(() => {
    if (localStorage.email) {
      getAllProductsByUser(localStorage.email).then((response) => {
        setCartProducts(response.payload);
      });
    }
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const logout = (e) => {
    e.preventDefault();
    auth.signOut();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("email");
      setCartProducts([]);
      navigate("/login");
    }, 1000);
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

  const closeShowLogin = (e) => {
    e.preventDefault();
    setShowLogin(false);
    navigate("/login");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon">
              <Link to="/checkout">
                <i
                  className="ri-shopping-basket-line"
                  onClick={!localStorage.email ? () => setShowLogin(true) : ""}
                ></i>
              </Link>
              <span className="cart__badge">
                {cartProducts ? cartProducts?.length : 0}
              </span>
            </span>

            <Modal show={showLogin}>
              <Modal.Header className="addTOCart__btn">
                <Modal.Title className="text-white">Oops!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-dark">
                Please login to continue adding to cart and checking out.
              </Modal.Body>
              <Modal.Footer>
                <button
                  variant="secondary"
                  className="addTOCart__btn"
                  onClick={closeShowLogin}
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>

            {localStorage.email ? (
              <span onClick={logout}>
                <i className="ri-logout-circle-r-line"></i>
              </span>
            ) : (
              <span className="user">
                <Link to="/login">
                  <i className="ri-user-line"></i>
                </Link>
              </span>
            )}

            {localStorage.email === "admin@gmail.com" ? (
              <Link to="/admin">
                <i className="ri-settings-3-line text-dark"></i>
              </Link>
            ) : (
              <div className="d-none"></div>
            )}

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
