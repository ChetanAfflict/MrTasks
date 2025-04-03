import React, { useState } from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: "$999", description: "A high-performance laptop." },
  { id: 2, name: "Smartphone", category: "Electronics", price: "$699", description: "A latest model smartphone." },
  { id: 3, name: "Headphones", category: "Accessories", price: "$199", description: "Noise-canceling headphones." },
  { id: 4, name: "Smartwatch", category: "Wearables", price: "$299", description: "A feature-rich smartwatch." }
];

const ProductTable = ({ products, onSelect }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} onClick={() => onSelect(product)} style={{ cursor: "pointer" }}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const ProductDetail = ({ product }) => {
  if (!product) return <p>Select a product to see details.</p>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Category: {product.category}</Card.Subtitle>
        <Card.Text>
          <strong>Price:</strong> {product.price}
        </Card.Text>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};


const App = () =>{
  const [selectedProduct, setSelectedProduct] = useState(null);

  return(
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>Product List</h2>
          <ProductTable products={products} onSelect={setSelectedProduct}/>
        </Col>
        <Col md={4}>
          <h2>Product Details</h2>
          <ProductDetail product={selectedProduct} />
        </Col>
      </Row>
    </Container>
  );
};
export default App;
