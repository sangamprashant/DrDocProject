import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MakeOrder = () => {
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);

  const [number, setNumber] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();

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
        setItems(data.cart.items);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const totalMrpPrice = items.reduce((accumulator, item) => {
    return accumulator + item.product.mrp * item.quantity;
  }, 0);
  const totalSalesPrice = items.reduce((accumulator, item) => {
    return accumulator + item.product.salesPrice * item.quantity;
  }, 0);

  const PlaceOrder = (deliveryAddress, name, mobileNumber, totalPrice) => {
    fetch(`http://localhost:5000/api/order/done`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ deliveryAddress, name, mobileNumber, totalPrice }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          notifyB(data.message);
          navigate(`/${loggeduser.userName}/myorders`);
        } else {
          notifyA(data.error);
        }
        console.log(data.message); // log cart data to console
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="cart">
      <main className="page payment-page" style={{ paddingTop: "30px" }}>
        <section className="payment-form dark">
          <div className="container">
            <div className="container block-heading">
              <h2>Payment</h2>
              <p>ThankYou To Purchase from our app:)</p>
            </div>
            <form>
              <div className="products">
                <h3 className="title">Checkout</h3>
                {items.map((item) => {
                  return (
                    <div key={item.product._id}>
                      <div
                        className="item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <img
                          style={{ width: "150px", height: "150px" }}
                          src={item.product.imageUrl}
                          alt="fr"
                        />
                        <div style={{ width: "200px" }}>
                          <p className="item-name">{item.product.title}</p>
                          <p className="item-description">
                            {item.product.description}
                          </p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <p className="item-name">Quantity</p>
                          <h6>{item.quantity}</h6>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            className="price"
                            style={{ textDecoration: "line-through" }}
                          >
                            Rs. {item.product.mrp}
                          </span>
                          <span className="price">
                            Rs. {item.product.salesPrice}
                          </span>
                          <hr />
                          <span className="price">
                            Rs. {item.quantity * item.product.salesPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <div
                    className="total"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      Total:
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "10px" }}>MRP:</div>
                      <div
                        className="price"
                        style={{ textDecoration: "line-through" }}
                      >
                        Rs. {totalMrpPrice}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "10px" }}>Sales Price:</div>
                      <div className="price" style={{ fontWeight: "bold" }}>
                        Rs. {totalSalesPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-details">
                <h3 className="title">Deliver Details</h3>
                <div className="row">
                  <div className="form-group col-sm-7">
                    <label>Name</label>
                    <input
                      value={name}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-sm-5">
                    <label for="">Mobile Number</label>

                    <input
                      value={number}
                      type="text"
                      className="form-control"
                      placeholder="Mobile Number"
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-sm-12">
                    <label for="card-number">Complete address</label>
                    <input
                      value={address}
                      type="text"
                      className="form-control"
                      placeholder="Complete address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group col-sm-12">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      style={{ padding: "10px 30px 10px 30px" }}
                      onClick={() => {
                        PlaceOrder(address, name, number, totalSalesPrice);
                      }}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MakeOrder;
