import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../../api/api";
import "../AdminDashboard.css";
import "./AdminSales.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminSales = () => {
  const [sales, setSales] = useState({ totalOrders: 0, totalRevenue: 0 });
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get("/admin/sales");
        setSales(res.data);
      } catch (err) {
        console.error("Failed to fetch sales summary:", err);
      }
    };

    const fetchMonthlySales = async () => {
      try {
        const res = await api.get("/admin/monthly-sales");
        setMonthlySales(res.data);
      } catch (err) {
        console.error("Failed to fetch monthly sales:", err);
      }
    };

    fetchSales();
    fetchMonthlySales();
  }, []);

  const chartData = {
    labels: monthlySales.map((s) => s.month),
    datasets: [
      {
        label: "Revenue",
        data: monthlySales.map((s) => s.revenue),
        backgroundColor: (context) => {
          const bg = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          bg.addColorStop(0, "#00c6ff");
          bg.addColorStop(1, "#0072ff");
          return bg;
        },
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#444", // 👈 Text color based on background
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "📈 Monthly Sales Revenue",
        color: "#2c3e50", // 👈 Title color
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333", // X-axis labels
        },
        grid: {
          color: "#eee", // X-axis grid line
        },
      },
      y: {
        ticks: {
          color: "#333",
        },
        grid: {
          color: "#eee",
        },
      },
    },
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Month,Revenue",
        ...monthlySales.map((s) => `${s.month},${s.revenue}`),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthly_sales.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="admin-sales-container">
      <h2 className="admin-heading">📊 Sales Report</h2>

      <div className="sales-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p>{sales.totalOrders}</p>
        </div>
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>Rs. {sales.totalRevenue}</p>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <button onClick={exportToCSV} className="export-btn">
        ⬇️ Export CSV
      </button>

      <h3 className="table-title">📅Monthly Breakdown</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {monthlySales.map((s, i) => (
            <tr key={i}>
              <td>{s.month}</td>
              <td>Rs. {s.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSales;
