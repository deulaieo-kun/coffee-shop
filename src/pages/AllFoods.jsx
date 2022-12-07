import React, { useState, useEffect } from "react";
import "../styles/all-foods.css";
import empty from "../assets/images/empty-image.jpg";
import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/dessert-category.png";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { renderLoading } from "../utilities/loader";
import * as actionProduct from "../store/actions/actionProduct";
import * as actionCart from "../store/actions/actionCart";

const AllFoods = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAddCartModal, setSuccessAddCartModal] = useState(false);
  const { getAllProducts } = bindActionCreators(actionProduct, useDispatch());
  const { addToCart } = bindActionCreators(actionCart, useDispatch());
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllProducts().then((response) => {
      setTimeout(() => {
        const allProducts = response.payload;

        if (activeFilter !== "ALL") {
          setProducts(
            allProducts.filter((data) => data.category === activeFilter)
          );
          setLoading(false);
        } else {
          setProducts(allProducts);
          setLoading(false);
        }
      }, 1000);
    });
  }, [activeFilter]);

  const addProductToCart = (productId) => {
    if (localStorage.email) {
      addToCart(localStorage.email, productId);
      setSuccessAddCartModal(true);
    }
  };

  const renderFoods = () => {
    return products.map((item) => (
      <Col lg="3" md="4" sm="6" xs="6" key={item.productId} className="mb-4">
        <div className="product__item">
          <Link to={`/foods/${item.productId}`}>
            <div className="product__img">
              <img
                src={
                  item.imageLinkOne
                    ? `https://online-food-delivery-be-production.up.railway.app/product/${item.productId}/download`
                    : empty
                }
                alt={item.productTitle}
                className="w-50"
              />
            </div>
          </Link>
          <div className="product__content">
            <h5>{item.productTitle.substring(0, 12)}...</h5>
            <div className=" d-flex align-items-center justify-content-between ">
              <span className="product__price">₱ {item.price}</span>
              <button
                className="addTOCart__btn"
                onClick={
                  !localStorage.email
                    ? () => setShowLogin(true)
                    : () => addProductToCart(item.productId)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
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
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Menu</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <button
                  className={`all__btn  ${
                    activeFilter === "ALL" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setActiveFilter("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    activeFilter === "Burger" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setActiveFilter("Burger")}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Burger
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    activeFilter === "Pizza" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setActiveFilter("Pizza")}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Pizza
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    activeFilter === "Dessert" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setActiveFilter("Dessert")}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Dessert
                </button>
              </div>
            </Col>

            <div className="row pt-5">
              {loading ? renderLoading() : renderFoods()}
            </div>

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
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
