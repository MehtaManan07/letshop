import React from "react";
import { Table } from "react-bootstrap";

const UserPurchaseHistory = ({ orders }) => {
  return (
    <Table responsive hover striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Order Id</th>
          <th>Transaction Id</th>
          <th>Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order, index) => (
           order.category && (
              <tr key={index}>
                <td>{index + 1}</td>
                <td> {order._id} </td>
                <td> {order.transaction_id} </td>
                <td> {order.name} </td>
                <td> {order.category.name} </td>
                <td> {order.amount} </td>
                <td> {order.quantity} </td>
              </tr>
            )
          ))}
      </tbody>
    </Table>
  );
};

export default UserPurchaseHistory;
