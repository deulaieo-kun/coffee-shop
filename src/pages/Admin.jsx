import React from 'react'
import AdminProducts from '../components/Admin/AdminProducts';
import AdminReviews from '../components/Admin/AdminReviews';
import "../styles/admin.css";

export default function Admin() {
  return (
    <div className="admin">
        <div className="content">
            <h3>Products</h3>
            <AdminProducts />
            <br />
            <br />
            <h3>Reviews</h3>
            <AdminReviews />
        </div>
    </div>
  )
}
