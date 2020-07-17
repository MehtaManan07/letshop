import React from "react";
import { Modal, Table } from "react-bootstrap";

const ProductsModal = ({ show, onHide, order }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            { order && order.products.map((product,index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.count}</td>
                <td>{product.count*product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ProductsModal;
