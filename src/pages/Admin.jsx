import React from "react";
import "../styles/admin.css";
import AdminProducts from "../components/Admin/AdminProducts";
import AdminReviews from "../components/Admin/AdminReviews";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

export default function Admin() {
  return (
    <Helmet title="Admin">
      <CommonSection title="Admin Page" />
      <div className="admin">
        <div className="content">
          <h3 className="fw-bold text-red">PRODUCTS</h3>
          <AdminProducts />
          <br />
          <br />
          <h3 className="fw-bold text-red">REVIEWS</h3>
          <AdminReviews />
        </div>
      </div>
    </Helmet>
  );
}
