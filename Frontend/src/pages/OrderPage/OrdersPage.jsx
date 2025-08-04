import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./OrdersPage.css";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?"))
       return;

    try {
      await api.delete(`/orders/${orderId}`);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      console.log("Order deleted successfully");
      toast.success("Order deleted successfully");
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="orders-page">
      <h2 className="orders-heading">🧾 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-text">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className={`status ${order.status}`}>
                  {order.status.toUpperCase()}
                </span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="order-details">
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Total:</strong> Rs. {order.totalPrice}
                </p>
                <button
                  onClick={() => handleDelete(order._id)}
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Cancel Order
                </button>
              </div>

              <div className="product-list">
                {order.products.map((p, idx) => (
                  <div key={idx} className="product-item">
                    <p className="product-name">{p.productId?.name}</p>
                    <p className="product-qty">Qty: {p.quantity}</p>
                    <p className="product-price">
                      Rs. {p.productId?.price * p.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
