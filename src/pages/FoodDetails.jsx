import React, { useState, useEffect } from "react";
import "../styles/product-details.css";
import empty from "../assets/images/empty-image.jpg";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "react-bootstrap";
import { renderLoading } from "../utilities/loader";
import * as actionProduct from "../store/actions/actionProduct";
import * as actionCart from "../store/actions/actionCart";

const FoodDetails = () => {
  const [foods, setFoods] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [successAddCartModal, setSuccessAddCartModal] = useState(false);
  const { id } = useParams();
  const { getAllProducts, getProduct } = bindActionCreators(
    actionProduct,
    useDispatch()
  );
  const { addToCart } = bindActionCreators(actionCart, useDispatch());
  const navigate = useNavigate();

  const addProductToCart = (productId) => {
    if (localStorage.email) {
      addToCart(localStorage.email, productId);
      setSuccessAddCartModal(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProduct(id).then((response) => {
      setFoods(response.payload);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    getAllProducts().then((response) => {
      setSelectedFoods(
        response.payload.filter(
          (data) => data.category.toLowerCase() === foods.category.toLowerCase()
        )
      );
    });
  }, [foods]);

  const renderFoods = () => {
    if (selectedFoods.length >= 4) {
      return selectedFoods.slice(0, 4).map((selectedFoods) => (
        <Col
          lg="3"
          md="4"
          sm="6"
          xs="6"
          key={selectedFoods.productId}
          className="mb-4"
        >
          <Link to={`/foods/${selectedFoods.productId}`}>
            <div className="product__item">
              <div className="product__img">
                <img
                  src={
                    selectedFoods.imageLinkOne
                      ? `https://snackbreak.herokuapp.com/product/${selectedFoods.productId}/download`
                      : empty
                  }
                  alt={selectedFoods.productTitle}
                  className="w-50"
                />
              </div>

              <div className="product__content">
                <h5>{selectedFoods.productTitle}</h5>
                <div className=" d-flex align-items-center justify-content-between ">
                  <span className="product__price">
                    ₱ {selectedFoods.price}
                  </span>
                  <button
                    className="addTOCart__btn"
                    onClick={
                      !localStorage.email
                        ? () => setShowLogin(true)
                        : () => addProductToCart(selectedFoods.productId)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </Col>
      ));
    }
    return selectedFoods.map((selectedFoods) => (
      <Col
        lg="3"
        md="4"
        sm="6"
        xs="6"
        key={selectedFoods.productId}
        className="mb-4"
      >
        <Link to={`/foods/${selectedFoods.productId}`}>
          <div className="product__item">
            <div className="product__img">
              <img
                src={
                  selectedFoods.imageLinkOne
                    ? `https://snackbreak.herokuapp.com/product/${selectedFoods.productId}/download`
                    : empty
                }
                alt={selectedFoods.productTitle}
                className="w-50"
              />
            </div>

            <div className="text-dark text-center">
              <h5>{selectedFoods.productTitle}</h5>
              <span>₱ {selectedFoods.price}</span>
            </div>
          </div>
        </Link>
      </Col>
    ));
  };

  const closeShowLogin = (e) => {
    e.preventDefault();
    setShowLogin(false);
    navigate("/login");
  };

  const closeSuccessAddCartModal = (e) => {
    e.preventDefault();
    setSuccessAddCartModal(false);
    navigate("/foods");
    window.location.reload();
  };

  return (
    <Helmet title="Product-details">
      <CommonSection title={foods.productTitle} />
      <section>
        <Container>
          <Row>
            <Col lg="5" md="5">
              <div className="product__main-img d-flex justify-content-center">
                <img
                  src={
                    foods.imageLinkOne
                      ? `https://snackbreak.herokuapp.com/product/${foods.productId}/download`
                      : empty
                  }
                  alt={foods.productTitle}
                  className="w-75"
                />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content pt-5">
                <h2 className="product__title mb-3">
                  {loading ? renderLoading() : foods.productTitle}
                </h2>
                <p className="product__price">
                  {" "}
                  Price: <span>₱ {foods.price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{foods.category}</span>
                </p>

                <Link to="/foods">
                  <button className="addTOCart__btn">Back to Menu</button>
                </Link>
                <button
                  className="addTOCart__btn mx-2"
                  onClick={
                    !localStorage.email
                      ? () => setShowLogin(true)
                      : () => addProductToCart(foods.productId)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6 className="desc">Description:</h6>
                <div className="tab__content">
                  <p>{foods.description}</p>
                </div>
              </div>
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>
            <div className="row">{renderFoods()}</div>
          </Row>

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

          <Modal show={successAddCartModal}>
            <Modal.Header className="addTOCart__btn">
              <Modal.Title className="text-white">Great Choice!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-dark">
              Selected food has been successfully added to your cart!
            </Modal.Body>
            <Modal.Footer>
              <button
                variant="secondary"
                className="addTOCart__btn"
                onClick={closeSuccessAddCartModal}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
