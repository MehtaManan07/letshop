import React, { useEffect } from "react";

const CheckoutSummary = ({ items, shippingCharges, totalPrice, run=undefined, setRun = f => f }) => {

  return (
    <ul className="list-group mb-3">
    {items.map((item) => (
      <li key={item._id} className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">{item.name} {`(${item.count} items)`} </h6>
          <small className="text-muted">Price: ${item.price}</small>
        </div>
        <span className="text-muted">${item.price * item.count}</span>
      </li>
    ))}
      <li className="list-group-item d-flex justify-content-between bg-light">
        <div className="text-success">
          <h6 className="my-0">Shipping Charges</h6>
        </div>
        <span className="text-success"> ${shippingCharges}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${totalPrice}</strong>
      </li>
    </ul>
  );
};

export default CheckoutSummary;
