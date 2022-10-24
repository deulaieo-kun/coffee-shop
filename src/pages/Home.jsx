import React from "react";
import "../styles/home.css";
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";
import heroImg from "../assets/images/hero.png";
import whyImg from "../assets/images/location.png";
import networkImg from "../assets/images/network.png";
import burger from "../assets/images/product_01.jpg";
import pizza from "../assets/images/product_2.2.jpg";
import dessert from "../assets/images/dessert.png";
import Category from "../components/UI/category/Category.jsx";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "We promise to make it quick, from preparing your foood until it reaches your location.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "You can also dine in our restaurant for faster transactions, we got you covered on that too.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Going home with no food? Just order online and we'll prepare your order in advance for you.",
  },
];

const Home = () => {
  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait for <br /> food at
                  <span> your door</span>
                </h1>

                <p>
                  No need to get out of the house and wait in long lines to
                  satisfy your cravings, order now at Snack Break!
                </p>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>{" "}
                    Very low shipping fee
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>{" "}
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                we got your <span>cravings</span> covered
              </h2>
              <p className="mb-1 mt-4 feature__text">
                With just a few taps on your phone, feast upon our hearty meals
              </p>
              <p className="feature__text">
                no matter where you are without breaking your budget{" "}
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="px-5 rounded-2">
        <h2 className="tasty__treat-title text-center pb-5">
          Our <span>Menu</span>
        </h2>
        <div className="card mb-4 shadow p-3 rounded-2 border-top">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src={burger}
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-3"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Burgers</h5>
                <p className="card-text">
                  Juicy, big, loaded with toppings of your choice; from high
                  quality beef medium to well with cheese and bacon on a
                  multigrain bun; a huge single or triple burger with all the
                  fixings, cheese, lettuce, tomato, onions and special sauce or
                  mayonnaise, grab yours now and feast on Snack Break's beefy
                  burgers!
                </p>
                <Link to="/foods">
                  <button className="addTOCart__btn card-text">
                    Go to Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4 shadow p-3 rounded-2 border-top">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src={pizza}
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-3"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Pizzas</h5>
                <p className="card-text">
                  A dish of Italian origin consisting of a flattened disk of
                  bread dough topped with some combination of olive oil,
                  oregano, tomato, olives, mozzarella or other cheese, and many
                  other ingredients, baked quickly— you'll never get enough of
                  this treat for you and your loved ones, only here on Snack
                  Break!
                </p>
                <Link to="/foods">
                  <button className="addTOCart__btn card-text">
                    Go to Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-1 shadow p-3 rounded-2 border-top">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src={dessert}
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-3"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Desserts</h5>
                <p className="card-text">
                  Craving for something that'll take the heat of the summer and
                  satisfy your sweet tooth? Look no more for Snack Break is here
                  to the rescue!
                </p>
                <Link to="/foods">
                  <button className="addTOCart__btn card-text">
                    Go to Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Snack Break?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Snack Break can guarantee that our meals are made with the
                  best ingredients so that you can enjoy our foods without
                  having to worry about its quality before ordering, added to
                  that our significantly reduced waiting time for great customer
                  experience, only here on Snack Break!
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Fresh and
                      Tasty Foods
                    </p>
                    <p className="choose__us-desc">
                      Let your stomachs and hearts be filled with our heavenly
                      meals.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Quality
                      support
                    </p>
                    <p className="choose__us-desc">
                      Having troubles? Let us help you have a better customer
                      experience.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      We are confident in serving you our meals anytime,
                      anywhere.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Having doubts? Take a quick look at what our reputable
                  customers have to say in the foods that we serve!
                </p>
                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
