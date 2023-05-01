import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyCart = () => {
  const [items, setItems] = useState([]);
  const [cartId, setCartId] = useState();
  const [grandPrice, setGrandPrice] = useState(0);
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartId(data.cart._id); // log cart data to console
        setItems(data.cart.items);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // remove from carta
  const removeItemFromCart = (cartId, itemId) => {
    console.log(cartId, itemId);
    fetch(`/cart/${cartId}/item/${itemId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          notifyB(data.message);
        } else {
          notifyA(data.error);
        }
        console.log(data.message); // log cart data to console
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //addone in cartb
  const handleAddOne = async (itemId) => {
    console.log(itemId);
    try {
      const response = await fetch(`/cart/add/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data = await response.json();
      if (data.message) {
        notifyB(data.message);
      } else {
        notifyA(data.error);
      }
      console.log(data.message);
      // update the items in state to reflect the increased quantity
      setItems(
        items.map((item) => {
          if (item._id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  //remove one item
  const handleRemoveOne = async (itemId) => {
    console.log(itemId);
    try {
      const response = await fetch(
        `/cart/remove/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const data = await response.json();
      if (data.message) {
        notifyB(data.message);
        // update the items in state to reflect the decreased quantity
        setItems(
          items.map((item) => {
            if (item._id === itemId) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          })
        );
      } else {
        notifyA(data.error);
      }
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const totalSalesPrice = items.reduce((accumulator, item) => {
    return accumulator + item.product.salesprice * item.quantity;
  }, 0);

  return (
    <section
      class="h-100"
      style={{ backgroundColor: "#eee", paddingTop: "40px" }}
    >
      <div class="container h-100 py-5">
        <div class="row d-flex justify-content-center align-items-center h-100">
          {items.length === 0 ? (
            <>
              <div className="empty-cart">
                <h1 style={{ color: "red" }}>Your Cart Is Empty</h1>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <button
                  onClick={() => {
                    navigate(`/products`);
                  }}
                  className="btn-shop-now"
                >
                  Shop Now
                </button>
              </div>
            </>
          ) : (
            <div class="col-10">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>
              {items.map((item) => {
                return (
                  <div key={item.product._id}>
                    <div class="card rounded-3 mb-4">
                      <div class="card-body p-4">
                        <div class="row d-flex justify-content-between align-items-center">
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={item.product.url}
                              alt={item.product.title}
                              class="img-fluid rounded-3"
                            />
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-3">
                            <p class="lead fw-normal mb-2">
                              {item.product.title}
                            </p>
                            <p>
                              <span class="text-muted">
                                {" "}
                                {item.product.description}{" "}
                              </span>
                            </p>
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button
                              class="btn  px-2"
                              onClick={() => {
                                handleRemoveOne(item.product._id);
                              }}
                            >
                              -
                            </button>

                            <input
                              id="form1"
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              class="form-control form-control-sm"
                            />

                            <button
                              class="btn px-2"
                              onClick={() => {
                                handleAddOne(item.product._id);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 class="mb-0">
                              {" "}
                              {item.quantity * item.product.salesprice}{" "}
                            </h5>
                          </div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a
                              class="text-danger"
                              onClick={() => {
                                removeItemFromCart(cartId, item._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div class="card mb-5">
                <div class="card-body p-4">
                  <div class="float-end">
                    <p class="mb-0 me-5 d-flex align-items-center">
                      <span class="small text-muted me-2">Order total:</span>{" "}
                      <span class="lead fw-normal">RS.{totalSalesPrice}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-warning btn-block btn-lg"
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate("/setting/makeorder");
                    }}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyCart;
