import React, { useState, useEffect } from "react";

import "./css/MyOrders.css";
import { toast } from "react-toastify";

const MyOrders = () => {
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(
        `http://localhost:5000/api/${loggeduser.userName}/myorders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const data = await response.json();
      setOrders(data.orders);
    }
    fetchOrders();
  }, [cancelOrder]);

  return (
    <div className="cart">
      <main className="page payment-page" style={{ paddingTop: "30px" }}>
        <section className="payment-form ">
          <div className="container">
            <div className="block-heading">
              <h2 style={{textAlign:"center"}}>My Orders</h2>

              <p style={{textAlign:"center"}}>Thank you for purchasing from our app :)</p>
            </div>
            <form>
              <div className="products">
                <h3 className="title">Items</h3>
                <hr/>
                {orders.map((order) => (
                  <div key={order._id}>
                    <h2>OrderId: #{order._id}</h2>
                    <p>Delivery Address: {order.deliveryAddress}</p>
                    <p>Total Ammount Paid: {order.totalPrice}</p>
                    <ul>
                      {order.items.map((item) => (
                        <div key={item._id}>
                          <div className="row">
                            <div className="col">
                              <div className="card card-2">
                                <div className="card-body">
                                  <div
                                    className="media  "
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div className="media-body my-auto text-right">
                                      <div className="row my-auto flex-column flex-md-row">
                                        <div className="col my-auto">
                                          <div className="sq align-self-center">
                                            <img
                                              className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0"
                                              src={item.product.imageUrl}
                                              style={{
                                                width: "335px",
                                              }}
                                              alt={item.product.name}
                                            />
                                          </div>
                                          Title:
                                          <h6 className="mb-0">
                                            {item.product.title}
                                          </h6>{" "}
                                        </div>

                                        <div className="col my-auto">
                                          Description:{" "}
                                          <small>
                                            {item.product.description}{" "}
                                          </small>
                                        </div>
                                        <div className="col my-auto">
                                          <small>Qty : {item.quantity}</small>
                                        </div>
                                        <div className="col my-auto">
                                          Price:
                                          <h6 className="mb-0">
                                            &#8377;
                                            {item.quantity *
                                              item.product.salesPrice}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr className="my-3 " />
                                  <div className="row">
                                    <div className="col-md-3 mb-3">
                                      <small>
                                        {" "}
                                        Track Order{" "}
                                        <span>
                                          <i
                                            className=" ml-2 fa fa-refresh"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      </small>
                                    </div>
                                    <div className="col mt-auto">
                                      <div className="progress my-auto">
                                        <div
                                          className="progress-bar progress-bar  rounded"
                                          style={{
                                            width:
                                              order.status === "Packing"
                                                ? "50%"
                                                : order.status === "Shipped"
                                                ? "70%"
                                                : order.status === "Delivered"
                                                ? "100%"
                                                : order.status === "Canceled"
                                                ? "100%"
                                                : "25%",

                                            backgroundColor:
                                              order.status === "Canceled"
                                                ? "red"
                                                : order.status === "Packing"
                                                ? "blue"
                                                : order.status === "Shipped"
                                                ? "#AB47BC"
                                                : order.status === "Delivered"
                                                ? "green"
                                                : "yellow",
                                          }}
                                          role="progressbar"
                                          aria-valuenow="25"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>

                                      <div className="media row justify-content-between ">
                                        <div className="col-auto flex-col-auto">
                                          <small className="text-right mr-sm-2">
                                            {order.status}
                                          </small>
                                          <span>
                                            <i className="fa fa-circle"></i>
                                          </span>
                                        </div>
                                        {order.status !== "Delivered" &&
                                          order.status !== "Canceled" && (
                                            <div
                                              className="col-auto flex-col-auto"
                                              onClick={() => {
                                                cancelOrder(order._id);
                                              }}
                                            >
                                              <small className="text-right mr-sm-2">
                                                Cancel
                                              </small>
                                              <span>
                                                <i className="fa fa-circle"></i>
                                              </span>
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                    <hr />
                  </div>
                ))}
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyOrders;
