import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  getProducts,
  getCategories,
  deleteParticularProduct,
} from "../../functions/admin";
import Cards from "../../components/Admin/Cards";
import { CardDeck, Toast } from "react-bootstrap";
import { isAuth } from "../../functions/auth";
import ProductTable from "../../components/Admin/ProductTable";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const userId = isAuth().data.user._id;
  const token = isAuth().data.token;

  const cards = [
    {
      className: "green-border",
      color: "rgba(0,100,0,0.5)",
      endNum: products.length,
      cardText: "Total number of Products",
      cardTitle: "Total Products",
    },
    {
      className: "blue-border",
      color: "rgba(0,0,255,0.5)",
      endNum: categories.length,
      cardText: "Total number of categories",
      cardTitle: "Total categories",
    },
    {
      className: "red-border",
      color: "rgba(255,0,0,0.5)",
      endNum: products.length,
      cardText: "Total number of products cancelled till date",
      cardTitle: "Cancelled products",
    },
  ];

  const loadAllProducts = () => {
    getProducts().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
        setProducts(response.data);
      }
    });
  };

  const loadAllCategories = () => {
    getCategories().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
        setCategories(response.data);
      }
    });
  };

  const deleteOneProduct = (productId) => {
    deleteParticularProduct(productId, userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        loadAllProducts();
        toast.error(`Product deleted successfully`);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, []);

  return (
    <Layout title="Manage Products" className="container-fluid">
      {products && (
        <CardDeck>
          {cards.map((card) => (
            <Cards
              key={card.cardText}
              className={card.className}
              cardTitle={card.cardTitle}
              endNum={card.endNum}
              color={card.color}
              cardText={card.cardText}
            />
          ))}
        </CardDeck>
      )}
      <br/> <hr/>
      <ProductTable
        deleteOneProduct={deleteOneProduct}
        products={products}
        editProduct={deleteOneProduct}
      />
      <ToastContainer />
    </Layout>
  );
};

export default ManageProducts;
