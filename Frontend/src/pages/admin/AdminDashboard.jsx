import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load admin stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{stats.orders}</p>
        </div>
        <div className="card">
          <h3>Total Sales</h3>
          <p>Rs. {stats.totalSales}</p>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/admin/users">👥 Manage Users</Link>
        <Link to="/admin/products">📦 Manage Products</Link>
        <Link to="/admin/orders">🧾 View Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
