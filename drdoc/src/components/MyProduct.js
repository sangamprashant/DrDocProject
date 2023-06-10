import React, { useEffect, useState } from "react";
import "./css/MyProduct.css";
import { Link, useNavigate } from "react-router-dom";

export default function MyProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/myproduct", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProducts(result));
  }, []);

  return (
    <div >
      <div className="UserProduct">
        <h1>My Products</h1>
        <div className="productBoxContainer">
          {products.length === 0 ? (
            <h3>No product uploaded </h3>
          ) : (
            products.map((product) => (
              <div
                className="productBox"
                key={product._id}
                onClick={() => {
                  navigate(`/setting/products/edit/product/${product._id}`);
                }}
              >
                <img src={product.imageUrl} alt="" />
                <span>{product.type}</span>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <h6>Sales price: {product.salesPrice} </h6>
                <h6>Mrp: {product.mrp}</h6>
                <h6 style={{ color: "blue" }}>Tagline: {product.tagline}</h6>
                {product.stock <= 10 ? (
                  <p style={{ color: "red" }}>
                    Alert: Hurry! {product.stock} Stock left
                  </p>
                ) : (
                  ""
                )}
                <p>sold by : {product.uploadedBy.name} </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
