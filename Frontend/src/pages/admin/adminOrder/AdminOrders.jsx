import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="admin-section">
      <h2 className="admin-heading">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Placed On</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.userId?.email}</td>
                <td>Rs. {o.totalPrice}</td>
                <td>{o.status}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
