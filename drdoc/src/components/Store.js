import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Store.css";
import { toast } from "react-toastify";

export default function Store() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("all");
  const navigate = useNavigate();

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const addToCart = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      const data = await response.json();
      if (data.message) {
        notifyB(data.message);
      } else {
        notifyA(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/product/store/${type}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProducts(result));
      
  }, [type]);

  return (
    <div style={{ marginTop: "-20px" }}>
      <section class="section menu" id="menu">
        <div class="menu-container ">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <input
              className="store-search-box"
              type="text"
              placeholder="search your medicine"
            />

            <button>cart</button>
            <button>My order</button>
            <button>hi</button>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="all">All Items</option>
              <option value="Capsules">Capsules</option>
              <option value="Liquid">Liquid</option>
              <option value="Drops">Drops</option>
              <option value="Inhalers">Inhalers</option>
              <option value="Injections">Injections</option>
            </select>
          </div>
          <br />
          {products.length === 0 ? (
            <h3>No product uploaded </h3>
          ) : (
            products.map((product) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  class="row justify-content-center mb-3"
                  style={{ width: "90%" }}
                >
                  <div class="col-md-12">
                    <div class="card shadow-0 border rounded-3">
                      <div class="card-body">
                        <div class="row g-0">
                          <div class="col-xl-3 col-md-4 d-flex justify-content-center"  onClick={() => {
                  navigate(`/${product.uploadedBy.name}/product/clicked/${product._id}`);}}>
                  
                            <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                              <img src={product.imageUrl} class="w-100" />
                              <a href="#!">
                                <div class="hover-overlay">
                                  <div
                                    class="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(253, 253, 253, 0.15)",
                                    }}
                                  ></div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div class="col-xl-6 col-md-5 col-sm-7">
                            <h5>{product.title}</h5>
                            <div class="d-flex flex-row">
                              <div class="text-warning mb-1 me-2">
                                <span class="ms-1">{product.tagline}</span>
                              </div>
                            </div>

                            <p class="text mb-4 mb-md-0">
                              {product.description}
                            </p>
                            <div class="d-flex flex-row">
                              <div class="text-warning mb-1 me-2">
                                <span class="ms-1">{product.type}</span>
                              </div>
                            </div>
                          </div>

                          <div class="col-xl-3 col-md-3 col-sm-5">
                            <div class="d-flex flex-row align-items-center mb-1">
                              <h4 class="mb-1 me-1">RS.{product.salesPrice}</h4>
                              <span class="text-danger">
                                <s>RS.{product.mrp}</s>
                              </span>
                            </div>
                            <h6 class="text-success">Free shipping</h6>
                            <div class="mt-4">
                              <button
                                class="btn btn-primary shadow-0"
                                type="button"
                                onClick={() => addToCart(product._id)}
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
