import React from 'react'
import { Table, Badge } from 'react-bootstrap';
import moment from "moment";
import ProductsModal from '../../components/Admin/ProductsModal'

const OrderTable = ({ ...props }) => {
    return (
        <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Id</th>
            {/* <th>Transaction Id</th> */}
            <th>Amount</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, i) => (
            <tr style={{ cursor: "pointer" }} key={i}>
              <td>{i + 1}</td>
              <td>{order._id}</td>
              {/* <td>{order.transaction_id}</td> */}
              <td>${order.amount}</td>
              <td>{order.user.name}</td>
              <td>{moment(order.createdAt).fromNow()}</td>
              <td>
                <Badge variant="success"> {order.status} </Badge>
              </td>
              {/* <td>{showStatus(order)}</td> */}
              <td>{order.address}</td>
              <td
                className="btn btn-warning btn-sm"
                onClick={() => props.onClickHandler(order)}
              >
                View Products
              </td>
            </tr>
          ))}
          <ProductsModal
            order={props.particularOrder}
            show={props.show}
            onHide={() => props.setShow(false)}
          />
        </tbody>
      </Table>
    )
}

export default OrderTable
