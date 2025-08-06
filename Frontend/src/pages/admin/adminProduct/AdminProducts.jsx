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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/admin/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleEdit = async (product) => {
    const updateProduct = {};
    for (const key of Object.keys(product)) {
      const newValue = prompt(`Enter new ${key}:`, product[key]);
      if (newValue !== null && newValue !== "") {
        updateProduct[key] = newValue;
      }
    }
    try {
      const updatedProduct = await api.put(
        `/admin/products/${product._id}`,
        updateProduct
      );
      setProducts(
        products.map((p) => (p._id === product._id ? updatedProduct.data : p))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="admin-section">
      <h2 className="admin-heading">🛍️ All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="admin-table">
          <thead className="admin-table-header">
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
                <td>
                  <button
                    onClick={() => handleEdit(p)}
                    className="btn edit-btn"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn delete-btn"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
