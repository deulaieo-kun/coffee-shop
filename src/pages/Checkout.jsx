import React, { useState, useEffect } from "react";
import "../styles/checkout.css";
import empty from "../assets/images/empty-image.jpg";
import logo from "../assets/images/snack.png";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as actionCart from "../store/actions/actionCart";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeUser = localStorage;
  const { getAllProductsByUser, checkOut, deleteCartProduct } =
    bindActionCreators(actionCart, useDispatch());
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser.email) {
      navigate("/login");
    }
  });

  useEffect(() => {
    setLoading(true);
    if (localStorage.email) {
      getAllProductsByUser(activeUser.email).then((response) => {
        setCartProducts(response.payload);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    let value = 0;
    cartProducts?.forEach((product) => {
      const productValue =
        product.price * (product.quantity ? product.quantity : 1);
      value = value + productValue;
    });
    setTotal(value);
  }, [cartProducts]);

  const cartCheckOut = (e) => {
    e.preventDefault();
    if (total == "0") {
      setShowModalTwo(true);
    } else {
      setShowModalOne(true);
    }
    checkOut(activeUser.email).then((response) => {
      setCartProducts(response.payload);
    });
  };

  const deleteProduct = (productId) => {
    setLoading(true);
    if (localStorage.email) {
      deleteCartProduct(localStorage.email, productId).then((response) => {
        setCartProducts(response.payload);
      });
      setLoading(false);
      setShowDeleteModal(true);
    }
  };

  const closeModalOne = (e) => {
    e.preventDefault();
    setShowModalOne(false);
    navigate("/");
    window.location.reload();
  };

  const closeModalTwo = (e) => {
    e.preventDefault();
    setShowModalTwo(false);
  };

  const closeDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    window.location.reload();
  };

  const renderLoading = () => {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="error" />
        </Backdrop>
      </div>
    );
  };

  const setQuantity = (productId, quantity) => {
    const newProductList = [];

    cartProducts.forEach((data) => {
      if (productId === data.productId) {
        newProductList.push({
          productId: data.productId,
          productTitle: data.productTitle,
          imageLinkOne: data.imageLinkOne,
          price: data.price,
          category: data.category,
          quantity: quantity,
        });
      } else {
        newProductList.push(data);
      }
    });

    setCartProducts(newProductList);
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Cart" />
      <section className="h-100 h-custom bg-light">
        <MDBContainer className="py-3 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol lg="7">
                      <MDBTypography tag="h5">
                        <Link to="/foods" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                          Continue shopping
                        </Link>
                      </MDBTypography>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {cartProducts?.length} items in your cart
                          </p>
                        </div>
                      </div>

                      {cartProducts?.map((product) => (
                        <MDBCard className="mb-3" key={product.productId}>
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div className="cartImage">
                                  <img
                                    src={
                                      product.imageLinkOne
                                        ? `https://snackbreak.herokuapp.com/product/${product.productId}/download`
                                        : empty
                                    }
                                    alt={product.productTitle}
                                  />
                                </div>
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {loading
                                      ? renderLoading()
                                      : product.productTitle}
                                  </MDBTypography>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div className="checkout-form">
                                  <MDBInput
                                    min={1}
                                    defaultValue={1}
                                    type="number"
                                    size="sm"
                                    onChange={(e) =>
                                      setQuantity(
                                        product.productId,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="checkout-form">
                                  <MDBTypography
                                    tag="h5"
                                    className="mb-0 text-center"
                                  >
                                    ₱ {product.price}
                                  </MDBTypography>
                                </div>
                                <span
                                  className="addTOCart__btn"
                                  onClick={() =>
                                    deleteProduct(product.productId)
                                  }
                                >
                                  <MDBIcon fas icon="trash-alt" />
                                </span>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      ))}
                    </MDBCol>

                    <MDBCol lg="5">
                      <MDBCard className="text-white rounded-3">
                        <MDBCardBody className="bg-red">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0">
                              Checkout
                            </MDBTypography>
                            <MDBCardImage
                              src={logo}
                              fluid
                              className="rounded-3 checkout-logo"
                              alt="logo"
                            />
                          </div>

                          <form className="mt-4">
                            <MDBInput
                              className="mb-4"
                              label="Name"
                              type="text"
                              size="lg"
                              placeholder="Customer's Name"
                              contrast
                            />

                            <MDBInput
                              className="mb-4"
                              label="Phone Number"
                              type="text"
                              size="lg"
                              minLength="19"
                              maxLength="19"
                              placeholder="Customer's Phone Number"
                              contrast
                            />

                            <MDBInput
                              className="mb-4"
                              label="Address"
                              type="text"
                              size="lg"
                              placeholder="Customer's Address"
                              contrast
                            />

                            <MDBRow className="mb-4">
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="City"
                                  type="text"
                                  size="lg"
                                  placeholder="Ex. Cebu City"
                                  contrast
                                />
                              </MDBCol>
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="Postal Code"
                                  type="text"
                                  size="lg"
                                  minLength="3"
                                  placeholder="Ex. 6000"
                                  contrast
                                />
                              </MDBCol>
                            </MDBRow>
                          </form>

                          <hr />
                          <div>
                            {cartProducts?.map((product) => (
                              <div
                                className="d-flex justify-content-between"
                                key={product.productId}
                              >
                                <p>
                                  {product.productTitle} (
                                  {product.quantity ? product.quantity : 1})
                                </p>
                                <p>
                                  ₱{" "}
                                  {product.price *
                                    (product.quantity ? product.quantity : 1)}
                                  .00
                                </p>
                              </div>
                            ))}
                          </div>
                          <hr />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">₱ {total}.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Delivery Fee</p>
                            <p className="mb-2">₱ 50.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total</p>
                            <p className="mb-2">
                              ₱ {Math.round(total) + (total == "0" ? 0 : 50)}.00
                            </p>
                          </div>

                          <MDBBtn color="white" block size="lg">
                            <div
                              className="d-flex justify-content-between"
                              onClick={cartCheckOut}
                            >
                              <span>
                                ₱ {Math.round(total) + (total == "0" ? 0 : 50)}
                                .00
                              </span>
                              <span>
                                Checkout{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </MDBBtn>
                        </MDBCardBody>

                        <Modal show={showModalOne}>
                          <Modal.Header className="addTOCart__btn">
                            <Modal.Title className="text-white">
                              Congratulations!
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="text-dark">
                            Successful checkout! Please wait for a while and one
                            of our riders will get in touch with you soon.
                            Delivery time may span from 10-15 minutes, depending
                            on road traffic. Again, thank you for choosing Snack
                            Break!
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              variant="secondary"
                              className="addTOCart__btn"
                              onClick={closeModalOne}
                            >
                              Close
                            </button>
                          </Modal.Footer>
                        </Modal>

                        <Modal show={showModalTwo}>
                          <Modal.Header className="addTOCart__btn">
                            <Modal.Title className="text-white">
                              Oops!
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="text-dark">
                            It seems like you did not add anything to cart!
                            Please add your desired foods to your cart before
                            checking out. Thank you!
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              variant="secondary"
                              className="addTOCart__btn"
                              onClick={closeModalTwo}
                            >
                              Close
                            </button>
                          </Modal.Footer>
                        </Modal>

                        <Modal show={showDeleteModal}>
                          <Modal.Header className="addTOCart__btn">
                            <Modal.Title className="text-white">
                              Success
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="text-dark">
                            Item has been successfully deleted from your cart!
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              variant="secondary"
                              className="addTOCart__btn"
                              onClick={closeDeleteModal}
                            >
                              Close
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </Helmet>
  );
};

export default Checkout;
