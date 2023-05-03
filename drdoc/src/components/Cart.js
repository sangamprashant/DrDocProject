import React, { useState, useEffect } from "react";
import "./css/Cart.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyCart = () => {
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);
  const [cartId, setCartId] = useState();
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/cart/items", {
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
    fetch(`http://localhost:5000/api/cart/${cartId}/item/${itemId}`, {
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
      const response = await fetch(
        `http://localhost:5000/api/cart/add/${itemId}`,
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
        `http://localhost:5000/api/cart/remove/${itemId}`,
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
    return accumulator + item.product.salesPrice * item.quantity;
  }, 0);

  return (
    <section
      className="h-100"
      style={{ backgroundColor: "#eee", paddingTop: "40px",marginBottom:"40px" }}
    >
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {items.length === 0 ? (
            <>
              <div className="empty-cart">
                <h1 style={{ color: "red" }}>Your Cart Is Empty</h1>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <button
                  onClick={() => {
                    navigate(`/store`);
                  }}
                  className="btn-shop-now"
                >
                  Shop Now
                </button>
              </div>
            </>
          ) : (
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>
              {items.map((item) => {
                return (
                  <div key={item.product._id}>
                    <div className="card rounded-3 mb-4">
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.title}
                              className="img-fluid rounded-3"
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">
                              {item.product.title}
                            </p>
                            <p>
                              <span className="text-muted">
                                {" "}
                                {item.product.description}{" "}
                              </span>
                            </p>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex  btn-black">
                            <button
                              className="  px-2"
                              onClick={() => {
                                handleRemoveOne(item.product._id);
                              }}
                            >
                              -
                            </button>
                            <p className="form-control form-control-sm">
                              {item.quantity}
                            </p>
                            <button
                              className=" px-2 "
                              onClick={() => {
                                handleAddOne(item.product._id);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div
                            className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">Price:{item.product.salesPrice}</h5>
                          </div>

                          <hr />
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">
                              Total Item value={" "}
                              {item.quantity * item.product.salesPrice}{" "}
                            </h5>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a
                              className="text-danger"
                              onClick={() => {
                                removeItemFromCart(cartId, item._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
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
              <div className="card mb-5">
                <div className="card-body p-4">
                  <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">
                        Order total:
                      </span>{" "}
                      <span className="lead fw-normal">
                        RS.{totalSalesPrice}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-warning btn-block btn-lg"
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate(`/${loggeduser.userName}/makeorder`);
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
