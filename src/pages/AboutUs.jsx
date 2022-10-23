import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import "../styles/admin.css";
import about from "../assets/images/about-us.png";

export default function Admin() {
  return (
    <Helmet title="Admin">
      <CommonSection title="About Us" />
      <h3 className="text-red text-center fw-bold p-5">About Snack Break</h3>
      <div className="row align-content-center justify-content-center pb-5 px-5">
        <div className="col-md-6 col-sm-10 order-md-1">
          <img src={about} alt="About Us" className="w-100" />
        </div>
        <div className="col-md-6 col-sm-10 order-md-0">
          <p className="">
            We are a small team of people who work hard to make a living. We are
            one of the people who represent the working class and need to
            prepare food. We understand the need to make enjoyable food while
            preparing it at the least possible time to keep it efficient,
            especially during busy hours. We have come up with a solution that
            best fits your problem. Let us help you focus on your craft and
            reward your dedication with a hearty meal. You can choose from our
            freshly baked pizzas, desserts, or our 100% beef burgers. Order now!
          </p>
          <p className="fst-italic">
            P.S. As we are a starting restaurant, we cannot cater credit cards
            or other online payment modes yet when ordering online. In the near
            future, online payment modes shall be added to our services, but for
            now, you may pay thru Cash-on-Delivery. Please enjoy our
            heartwarming and nutritious foods only here at Snack Break!
          </p>
        </div>
      </div>
    </Helmet>
  );
}
