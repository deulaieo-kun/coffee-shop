import React from "react";
import Slider from "react-slick";
import "../../../styles/slider.css";
import * as actionReview from "../../../store/actions/actionReview";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import empty from "../../../assets/images/empty-image.jpg";

const TestimonialSlider = () => {
  const { getAllReviews } = bindActionCreators(actionReview, useDispatch());
  const reviewList = useSelector((state) => state.reviewList);

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <Slider {...settings}>
      {reviewList.map((review) => (
        <div key={review.reviewId}>
          <p className="review__text">{review.description}</p>
          <div className=" slider__content d-flex align-items-center gap-3 ">
            <img
              src={
                review.imageLink
                  ? `https://snackbreak.herokuapp.com/review/${review.reviewId}/download`
                  : empty
              }
              alt={review.reviewAuthor}
              className=" rounded"
            />
            <h6>{review.reviewAuthor}</h6>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TestimonialSlider;
