import React, { useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/products", form);
      toast.success("Product added");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product", err);
      toast.error("Failed to add");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" onChange={handleChange} required />
        <input type="text" placeholder="Description" name="description" onChange={handleChange} required />
        <input type="number" placeholder="Price" name="price" onChange={handleChange} required />
        <input type="text" placeholder="Category" name="category" onChange={handleChange} />
        <input type="number" placeholder="Stock" name="stock" onChange={handleChange} required />
        <input type="text" placeholder="Image URL" name="image" onChange={handleChange} />
        <button type="submit" className="cursor-pointer">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
