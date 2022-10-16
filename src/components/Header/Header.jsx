import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/snack.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import "../../styles/header.css";
import { bindActionCreators } from "redux";
import * as actionUser from "../../store/actions/actionUser";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Spinner from "react-spinkit";
import { useAuthState } from "react-firebase-hooks/auth";

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
    display: "Cart",
    path: "/cart",
  },
];

const Header = () => {
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { logoutUser } = bindActionCreators(actionUser, useDispatch());
  const activeUser = useSelector((state) => state.activeUser);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  const logout = (e) => {
    e.preventDefault();
    auth.signOut();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("email");
      navigate("/login");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="m-5">
        <Spinner name="ball-spin-fade-loader" color="blue" fadeIn="none" />
      </div>
    );
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* ======= menu ======= */}
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

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {user || activeUser.email ? (
              <span onClick={logout}><i className="ri-logout-circle-r-line"></i></span>              
            ) : (
              <span className="user">
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            </span>
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
