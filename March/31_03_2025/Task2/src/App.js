import React, { useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Parent Component
const ParentComponent = () => {
  const [items, setItems] = useState([]); // Stores the list of items
  const [selectedItem, setSelectedItem] = useState(null); // Stores selected item
  const [show, setShow] = useState(false); // Modal visibility state
  const [form, setForm] = useState({ id: "", name: "", description: "" }); // Form state

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add / Edit)
  const handleSubmit = () => {
    if (form.id) {
      // Update item
      setItems(items.map((item) => (item.id === form.id ? form : item)));
    } else {
      // Add new item
      setItems([...items, { ...form, id: Date.now().toString() }]);
    }
    handleClose();
  };

  // Delete item
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Show modal and set form data
  const handleShow = (item = null) => {
    setSelectedItem(item);
    setForm(item ? { ...item } : { id: "", name: "", description: "" });
    setShow(true);
  };

  // Close modal
  const handleClose = () => setShow(false);

  return (
    <div className="container mt-4">
      <h2>Parent Component</h2>
      <Button onClick={() => handleShow()} variant="primary">
        Add an Item
      </Button>
      <ChildComponent items={items} handleShow={handleShow} handleDelete={handleDelete} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{form.id ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {form.id ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Child Component
const ChildComponent = ({ items, handleShow, handleDelete }) => {
  return (
    <div className="mt-3">
      <h3>Child Component - Items List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(item)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Main App Component
const App = () => {
  return <ParentComponent />;
};

export default App;