import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="admin-section">
      <h2 className="admin-heading">🛍️ All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>Rs. {p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
