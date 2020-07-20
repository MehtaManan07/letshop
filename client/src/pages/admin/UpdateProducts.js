import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { getCategories, updateParticularProduct } from "../../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AddProductForm from "../../components/Product/AddProductForm";
import { getSingleProduct } from "../../functions/core";

const UpdateProduct = (props) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    picture: "",
    loading: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    categoryCount: 0,
  });

  const {
    data: { user, token },
  } = isAuth();

  const init = (productId) => {
    getSingleProduct(productId).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response)
        setValues({
          ...values,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          category: response.data.category._id,
          shipping: response.data.shipping,
          quantity: response.data.quantity,
          formData: new FormData(),
        });
        loadCategories();
      }
    });
  };

  const loadCategories = () => {
    getCategories().then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error });
        toast.error(response.error);
      } else {
        response.data &&
          setValues({
            categories: response.data,
            categoryCount: response.data.length,
            formData: new FormData(),
          });
      }
    });
  };

  useEffect(() => {
    init(props.match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "picture" ? event.target.files[0] : event.target.value;
    values.formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateParticularProduct(
      props.match.params.productId,
      user._id,
      token,
      values.formData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        toast.error(data.error);
      } else {
        toast.success(`Product updated successfully`);
        setValues({
          ...values,
          picture: "",
          name: "",
          description: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  return (
    <Layout title="Add a new product" description="Add a new product">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <AddProductForm
            values={values}
            onSubmitHandler={onSubmitHandler}
            handleChange={handleChange}
            buttonText="Update Product"
          />
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default UpdateProduct;
