import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { createProduct, getCategories } from "../../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AddProductForm from "../../components/AddProductForm";

const AddProduct = () => {
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
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    categoryCount: 0,
  });

  const {
    data: { user, token },
  } = isAuth();

  const init = () => {
    getCategories().then((response) => {
      console.log(response);
      if (response.error) {
        setValues({ ...values, error: response.error });
        toast.error(response.error);
      } else {
        console.log("response:", response);
        response.data &&
          setValues({
            ...values,
            categories: response.data,
            categoryCount: response.data.length,
            formData: new FormData(),
          });
      }
    });
  };

  useEffect(() => {
    init();
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

    createProduct(user._id, token, values.formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        toast.error(data.error);
      } else {
        toast.success(`Product created successfully`);
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
          />
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default AddProduct;
