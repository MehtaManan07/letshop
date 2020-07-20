import React from "react";
import { Table } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

const ProductTable = ({ products, deleteOneProduct }) => {

  return (
    <Table responsive bordered hover striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Items Sold</th>
          <th>Shipping</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { products && products.map((product, index) => (
          <tr key={index + 21}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>product.category.name</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.sold}</td>
            <td>
              {product.shipping ? (
                <i className="fa fa-check-circle" />
              ) : (
                <i className="fa fa-times-circle" />
              )}
            </td>
            <td>
              <div className="d-flex justify-content-around">
              <Link to={`/update/product/${product._id}`}>
              <i
                style={{ cursor: "pointer", color: 'rgba(0,0,255,0.5)' }}
                className="fa fa-edit"
              />
              </Link>
              <i
                style={{ cursor: "pointer", color: 'rgba(255,0,0,0.5)' }}
                onClick={() => deleteOneProduct(product._id)}
                className="fa fa-trash"
              />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
