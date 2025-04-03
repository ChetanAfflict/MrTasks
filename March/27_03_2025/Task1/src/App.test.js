import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductApp from "./ProductApp";

describe("ProductApp Component", () => {
  test("renders Product Management heading", () => {
    render(<ProductApp />);
    expect(screen.getByText("Product Management")).toBeInTheDocument();
  });

  test("adds a new product", () => {
    render(<ProductApp />);

    fireEvent.change(screen.getByPlaceholderText("Product Name"), {
      target: { value: "Laptop" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("Add Product"));

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  test("edits a product", () => {
    render(<ProductApp />);

    fireEvent.change(screen.getByPlaceholderText("Product Name"), {
      target: { value: "Phone" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "500" },
    });
    fireEvent.click(screen.getByText("Add Product"));

    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("Product Name"), {
      target: { value: "Smartphone" },
    });
    fireEvent.click(screen.getByText("Update Product"));

    expect(screen.getByText("Smartphone")).toBeInTheDocument();
    expect(screen.queryByText("Phone")).not.toBeInTheDocument();
  });

  test("deletes a product", () => {
    render(<ProductApp />);

    fireEvent.change(screen.getByPlaceholderText("Product Name"), {
      target: { value: "Tablet" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "300" },
    });
    fireEvent.click(screen.getByText("Add Product"));

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.queryByText("Tablet")).not.toBeInTheDocument();
  });
});
