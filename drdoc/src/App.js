import "./App.css";
import Bar from "./components/Bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import PagenotFound from "./components/PagenotFound";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Signup from "./components/screen/Signup";
import Signin from "./components/screen/SignIn";
import Createpost from "./components/screen/CreatePost";
import React, { createContext, useState } from "react";
import { LoginContext } from "./context/LoginContext";
import Settings from "./components/screen/Settings";
import Modal from "./components/Modal";
import OtherUserProfile from "./components/OtherUserProfile";
import Chat from "./components/Chat";
import Store from "./components/Store";
import Dashboard from "./components/Dashboard";
import MyCart from "./components/Cart";
import MyOrders from "./components/MyOrders";
import AddMedicine from "./components/AddMedicine";
import MyProduct from "./components/MyProduct";
import ProductOpen from "./components/ProductOpen";
import MakeOrder from "./components/MakeOrder";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ChatMessage, setChatMessage] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <LoginContext.Provider
          value={{ setUserLogin, setModalOpen, setChatMessage }}
        >
          <Bar login={userLogin}  />
          <Routes>
            <Route path="/" element={<Landing login={userLogin} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/createpost" element={<Createpost />} />
            <Route exact path="/profile" element={<OtherUserProfile />} />
            <Route exact path="/message" element={<Chat />} />
            <Route exact path="/store" element={<Store />} />
            <Route exact path=":userName/makeorder" element={<MakeOrder />} />
            <Route exact path=":userName/my" element={<MakeOrder />} />
            <Route exact path=":userName/settings" element={<Settings />} />
            <Route exact path=":userName/setting/seller/dashboard" element={ <Dashboard/> } />
            <Route exact path=":userName/setting/seller/addmedicine" element={ <AddMedicine/> } />
            <Route exact path=":userName/cart" element={ <MyCart/> } />
            <Route exact path=":userName/myorders" element={ <MyOrders/> } />
            <Route exact path=":userName/myproducts" element={ <MyProduct /> } />
            <Route exact path=":seller/product/clicked/:productId" element={<ProductOpen login={userLogin}/>} />
            <Route path="*" element={<PagenotFound />} />
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
