import React, { useEffect, useState } from "react";
import "./css/MyProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

    // Toast functions
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    fetch("/api/myproduct", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProducts(result));
  }, []);

  const handelDeleteProduct = (id) => {
    fetch(`/api/delete/product/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleted: true }),
    })
      .then((res) => res.json())
      .then((result) => {
        // Filter out the deleted product from the current state
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        console.log(result);
        notifyB(result.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="UserProduct">
        <h1>My Products</h1>
        <div className="productBoxContainer">
          {products.length === 0 ? (
            <h3>No product uploaded </h3>
          ) : (
            products.map((product) => (
              <>
                {!product.deleted && (
                  <div className="productBox" key={product._id}>
                    <img
                      src={product.imageUrl}
                      alt=""
                      onClick={() => {
                        navigate(
                          `/setting/products/edit/product/${product._id}`
                        );
                      }}
                    />
                    <span>{product.type}</span>
                    <h4
                      onClick={() => {
                        navigate(
                          `/setting/products/edit/product/${product._id}`
                        );
                      }}
                    >
                      {product.title}
                    </h4>
                    <p
                      onClick={() => {
                        navigate(
                          `/setting/products/edit/product/${product._id}`
                        );
                      }}
                    >
                      {product.description}
                    </p>
                    <h6>Sales price: {product.salesPrice} </h6>
                    <h6>Mrp: {product.mrp}</h6>
                    <h6 style={{ color: "blue" }}>
                      Tagline: {product.tagline}
                    </h6>
                    {product.stock <= 10 ? (
                      <p style={{ color: "red" }}>
                        Alert: Hurry! {product.stock} Stock left
                      </p>
                    ) : (
                      ""
                    )}
                    <p>sold by : {product.uploadedBy.name} </p>
                    <button
                      className="delete_product"
                      onClick={() => {
                        handelDeleteProduct(product._id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                )}
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
