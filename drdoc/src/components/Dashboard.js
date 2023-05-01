import React, { useState, useEffect } from "react";


import "./css/StatusUpdate.css";
import conf from "./img/confirm.png";
import deliver from "./img/deliver.png";
import ship from "./img/ship.png";
import packimg from "./img/pack.png";
import cancel from"./img/cancel.png";

const StatusUpdate = () => {
  const [pack, setPack] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [shipped, setShipped] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [packedOrdersDisplay, setPackedOrdersDisplay] = useState([]);
  const [confirmedOrdersDisplay, setConfirmedOrdersDisplay] = useState([]);
  const [shippedOrdersDisplay, setShippedOrdersDisplay] = useState([]);
  const [deliveredOrdersDisplay, setDeliveredOrdersDisplay] = useState([]);
  const [canceledOrdersDisplay, setCanceledOrdersDisplay] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const handlePacked = () => {
    setPack(true);
    setConfirm(false);
    setShipped(false);
    setDelivered(false);
    setCanceled(false);
  };
  const handlecomfirmed = () => {
    setPack(false);
    setConfirm(true);
    setShipped(false);
    setDelivered(false);
    setCanceled(false);
  };
  const handleShipped = () => {
    setPack(false);
    setConfirm(false);
    setShipped(true);
    setDelivered(false);
    setCanceled(false);
  };
  const handleDelivered = () => {
    setPack(false);
    setConfirm(false);
    setShipped(false);
    setDelivered(true);
    setCanceled(false);
  };
  const handleCanceled = () => {
    setPack(false);
    setConfirm(false);
    setShipped(false);
    setDelivered(false);
    setCanceled(true);
  };
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await response.json();
      // handle the updated order as needed
    } catch (error) {
      console.error(error);
      // handle error as needed
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`/orders/status`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data = await response.json();
      console.log(data);
      setConfirmedOrdersDisplay(data.confirmedOrders);
      setShippedOrdersDisplay(data.shippedOrders);
      setPackedOrdersDisplay(data.packingOrders);
      setDeliveredOrdersDisplay(data.deliveredOrders);
      setCanceledOrdersDisplay(data.canceledOrders);
    }
    fetchOrders();
  }, [
    userId,
    handleStatusChange,
    handlePacked,
    handlecomfirmed,
    handleShipped,
    handleDelivered,
  ]);

  return (
    <div className="cart">
      <main className="page payment-page" style={{ paddingTop: "80px" }}>
        <div className="main">
        <div className="box-container">
  <div className="box box1" onClick={handlecomfirmed}>
    <div className="text">
      <h2 className="topic-heading">
        {confirmedOrdersDisplay ? (
          <>{confirmedOrdersDisplay.length}</>
        ) : (
          0
        )}
      </h2>
      <h2 className="topic">Confirmed</h2>
    </div>
    <img src={conf} alt="Views" />
  </div>
  <div className="box box1" onClick={handlePacked}>
    <div className="text">
      <h2 className="topic-heading">
        {packedOrdersDisplay ? (
          <>{packedOrdersDisplay.length}</>
        ) : (
          0
        )}
      </h2>
      <h2 className="topic">Packing</h2>
    </div>
    <img src={packimg} alt="Views" />
  </div>
  <div className="box box1" onClick={handleShipped}>
    <div className="text">
      <h2 className="topic-heading">
        {shippedOrdersDisplay ? (
          <>{shippedOrdersDisplay.length}</>
        ) : (
          0
        )}
      </h2>
      <h2 className="topic">Shipped</h2>
    </div>
    <img src={ship} alt="Views" />
  </div>
  <div className="box box1" onClick={handleDelivered}>
    <div className="text">
      <h2 className="topic-heading">
        {deliveredOrdersDisplay ? (
          <>{deliveredOrdersDisplay.length}</>
        ) : (
          0
        )}
      </h2>
      <h2 className="topic">Delivered</h2>
    </div>
    <img src={deliver} alt="Views" />
  </div>
  <div className="box box1" onClick={handleCanceled}>
    <div className="text">
      <h2 className="topic-heading">
        {canceledOrdersDisplay ? (
          <>{canceledOrdersDisplay.length}</>
        ) : (
          0
        )}
      </h2>
      <h2 className="topic">Canceled</h2>
    </div>
    <img src={cancel} alt="Views" />
  </div>
</div>

          <div className="report-container">
            <div className="report-header">
              {confirm && <h1 className="recent-Articles">Confirmed</h1>}
              {pack && <h1 className="recent-Articles">Packing</h1>}
              {shipped && <h1 className="recent-Articles">Shipped</h1>}
              {delivered && <h1 className="recent-Articles">Delivered</h1>}
              {canceled && <h1 className="recent-Articles">Canceled</h1>}
              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <h3 className="t-op">image</h3>
                <h3 className="t-op">Product</h3>
                <h3 className="t-op">Customer</h3>
                <h3 className="t-op">Quantity</h3>
                <h3 className="t-op">Price</h3>
                <h3 className="t-op">Address</h3>
                <h3 className="t-op">Status</h3>
              </div>
              <div className="items">
                <hr />
                {confirm && (
                  <>
                    {confirmedOrdersDisplay ? (
                      <>
                        {confirmedOrdersDisplay.map((order) => (
                          <div key={order._id} className="item1">
                            {order.items.map((item) => (
                              <>
                                {
                                  <>
                                    <img
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        marginRight: "7%",
                                      }}
                                      src={item.product.url}
                                      alt="product image"
                                    />
                                    <h3 className="t-op-nextlvl">
                                      {item.product.title}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {order.boughtBy}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {item.quantity}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {item.product.salesprice}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {order.deliveryAddress}
                                    </h3>
                                    <div>
                                      <h3 className="t-op-nextlvl label-tag">
                                        {order.status}
                                      </h3>
                                      <h3
                                        className="t-op-nextlvl label-tag"
                                        style={{
                                          backgroundColor: "red",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleStatusChange(
                                            order._id,
                                            "Packing"
                                          )
                                        }
                                      >
                                        Confirmed Order
                                      </h3>
                                    </div>

                                    <hr />
                                  </>
                                }
                              </>
                            ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {pack && (
                  <>
                    {packedOrdersDisplay ? (
                      <>
                        {packedOrdersDisplay.map((order) => (
                          <div key={order._id} className="item1">
                            {order.items.map((item) => (
                              <>
                                <>
                                  <img
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      marginRight: "7%",
                                    }}
                                    src={item.product.url}
                                    alt="product image"
                                  />
                                  <h3 className="t-op-nextlvl">
                                    {item.product.title}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {order.boughtBy}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {item.quantity}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {item.product.salesprice}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {order.deliveryAddress}
                                  </h3>
                                  <div>
                                    <h3 className="t-op-nextlvl label-tag">
                                      {order.status}
                                    </h3>
                                    <h3
                                      className="t-op-nextlvl label-tag"
                                      style={{ backgroundColor: "red" }}
                                      onClick={() =>
                                        handleStatusChange(order._id, "Shipped")
                                      }
                                    >
                                      Shipped Order
                                    </h3>
                                  </div>
                                  <hr />
                                </>
                              </>
                            ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {shipped && (
                  <>
                    {shippedOrdersDisplay ? (
                      <>
                        {shippedOrdersDisplay.map((order) => (
                          <div key={order._id} className="item1">
                            {order.items.map((item) => (
                              <>
                                <>
                                  <img
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      marginRight: "7%",
                                    }}
                                    src={item.product.url}
                                    alt="product image"
                                  />
                                  <h3 className="t-op-nextlvl">
                                    {item.product.title}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {order.boughtBy}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {item.quantity}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {item.product.salesprice}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {order.deliveryAddress}
                                  </h3>
                                  <div>
                                    <h3 className="t-op-nextlvl label-tag">
                                      {order.status}
                                    </h3>
                                    <h3
                                      className="t-op-nextlvl label-tag"
                                      style={{ backgroundColor: "red" }}
                                      onClick={() =>
                                        handleStatusChange(
                                          order._id,
                                          "Delivered"
                                        )
                                      }
                                    >
                                      Delivered Order
                                    </h3>
                                  </div>
                                  <hr />
                                </>
                              </>
                            ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {delivered && (
                  <>
                    {deliveredOrdersDisplay ? (
                      <>
                        {deliveredOrdersDisplay.map((order) => (
                          <div key={order._id} className="item1">
                            {order.items.map((item) => (
                              <>
                                <>
                                  <img
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      marginRight: "7%",
                                    }}
                                    src={item.product.url}
                                    alt="product image"
                                  />
                                  <h3 className="t-op-nextlvl">
                                    {item.product.title}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {order.boughtBy}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {item.quantity}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {item.product.salesprice}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    {order.deliveryAddress}
                                  </h3>
                                  <h3 className="t-op-nextlvl label-tag">
                                    {order.status}
                                  </h3>
                                  <hr />
                                </>
                              </>
                            ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {canceled && (
                  <>
                  {canceledOrdersDisplay&&
                      <>
                        {canceledOrdersDisplay.map((order) => (
                          <div key={order._id} className="item1">
                            {order.items.map((item) => (
                              <>
                                {
                                  <>
                                    <img
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        marginRight: "7%",
                                      }}
                                      src={item.product.url}
                                      alt="product image"
                                    />
                                    <h3 className="t-op-nextlvl">
                                      {item.product.title}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {order.boughtBy}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {item.quantity}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {item.product.salesprice}
                                    </h3>
                                    <h3 className="t-op-nextlvl">
                                      {order.deliveryAddress}
                                    </h3>
                                    <div>
                                      <h3 className="t-op-nextlvl label-tag">
                                        {order.status}
                                      </h3>
                                    </div>

                                    <hr />
                                  </>
                                }
                              </>
                            ))}
                          </div>
                        ))}
                      </>
}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatusUpdate;
