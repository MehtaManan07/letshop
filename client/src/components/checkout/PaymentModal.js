import React from 'react'
import { Modal } from "react-bootstrap";
import DropIn from "braintree-web-drop-in-react";

const PaymentModal = ({ show, handleClose, data, items, purchase }) => {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.clientToken !== "" && items.length > 0 ? (
            <div className="">
              <DropIn
                options={{ authorization: data.clientToken }}
                onInstance={(instance) => (data.instance = instance)}
              />
              <button onClick={purchase} className="btn btn-block btn-success">
                Pay
              </button>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    )
}

export default PaymentModal
