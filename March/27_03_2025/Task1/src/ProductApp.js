import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const ProductApp = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", price: "" });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setProducts(products.map((p) => (p.id === form.id ? form : p)));
      setEditing(false);
    } else {
      setProducts([...products, { ...form, id: uuidv4() }]);
    }
    setForm({ id: "", name: "", price: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-submit">
          {editing ? "Update" : "Add"} Product
        </button>
      </form>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductApp;
