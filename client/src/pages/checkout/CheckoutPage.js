import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { getCart, emptyCart } from "../../functions/cart";
import { Link } from "react-router-dom";
import AddressForm from "../../components/checkout/AddressForm";
import { isAuth } from "../../functions/auth";
import { getBraintreeClientToken, processPaymentt } from "../../functions/core";
import PaymentModal from "../../components/checkout/PaymentModal";
import "react-toastify/dist/ReactToastify.min.css";
import { toast, ToastContainer } from "react-toastify";
import { createOrder } from "../../functions/order";

const CheckoutPage = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [data, setData] = useState({
    success: false,
    clientToken: "",
    error: "",
    instance: {},
  });
  const [address, setAddress] = useState({
    main: "",
    optional: "",
    country: "",
    state: "",
    zip: 0,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const addressSubmitHandler = (event) => {
    event.preventDefault();
    if (address.main === "" || address.state === "" || address.country === "") {
      toast.error(`All fields are required`);
      console.log("address");
    } else {
      setShow(true);
      setAddress(address)
    }
  };

  const userId = isAuth() && isAuth().data.user._id;
  const token = isAuth() && isAuth().data.token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({ ...data, success: true, clientToken: response.clientToken });
      }
    });
  };

  const purchase = () => {
    const billingAddress = Object.values(address).join(", ");
    let nonce;
    let getnonce = data.instance
      .requestPaymentMethod()
      .then((response) => {
        console.log(response);
        nonce = response.nonce;
        // console.log("Send nonce and total", nonce, calculatedTotal(products));
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: totalPrice,
        };

        processPaymentt(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            handleClose();
            const orderData = {
              products: items,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: billingAddress
            };
            createOrder(userId, token, orderData)
            .then(respons => {
              emptyCart(() => {
                setAddress({
                  main: "",
                  optional: "",
                  country: "",
                  state: "",
                  zip: 0,
                });
                setRun(!run);
              });
            })
          })
          .catch((error) => {
            console.log(error);
            setData({ ...data, error: error.message });
          });
      })
      .catch((error) => {
        console.log("token error:", error);
        setData({ ...data, error: error.message });
      });
  };

  const onChangeHandler = (name) => (event) => {
    setAddress({ ...address, [name]: event.target.value });
  };

  useEffect(() => {
    setItems(getCart());
    getToken(userId, token);
  }, [run]);

  const calculatedsubTotal = items.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0);

  const shippingAmount = calculatedsubTotal > 150 ? `Free` : 20;
  let totalPrice;
  if (shippingAmount === "Free") {
    totalPrice = calculatedsubTotal;
  } else {
    totalPrice = calculatedsubTotal + shippingAmount;
  }

  return (
    <Layout title="Checkout" className="container mb-5">
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-success badge-pill">
              {items.length}
            </span>
          </h4>
          <CheckoutSummary
            setRun={setRun}
            run={run}
            totalPrice={totalPrice}
            shippingCharges={shippingAmount}
            items={items}
          />
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button
              className="btn btn-outline-danger btn-lg  btn-block"
              type="submit"
            >
              Back to Cart
            </button>
          </Link>
        </div>

        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <AddressForm
            onChangeHandler={onChangeHandler}
            addressSubmitHandler={addressSubmitHandler}
            address={address}
          />
        </div>
      </div>
      <PaymentModal
        show={show}
        handleClose={handleClose}
        data={data}
        items={items}
        purchase={purchase}
      />
      <ToastContainer />
    </Layout>
  );
};

export default CheckoutPage;

// createOrder(userId, token, orderData);
// setData({ ...data, success: response.success });
// emptyCart(() => {
//   setRun(!run);
//   toast.success(`Payment of $${calculatedTotal()} was successful`);
// });
