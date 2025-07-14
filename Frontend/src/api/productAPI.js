import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/products',
});

// GET all
export const getAllProducts = () => API.get('/');

// GET one
export const getSingleProduct = (id) => API.get(`/${id}`);

// CREATE
export const createProduct = (newProduct) => API.post('/', newProduct);

// UPDATE
export const updateProduct = (id, updatedProduct) => API.put(`/${id}`, updatedProduct);

// DELETE
export const deleteProduct = (id) => API.delete(`/${id}`);
