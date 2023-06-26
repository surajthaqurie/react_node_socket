import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import PostComponent from "./Components/Product/ProductComponent";
// import PostDetailsComponent from "./Components/Product/ProductDetailComponent";
import socketIOClient from "socket.io-client";
import LoginComponent from "./Components/Login/LoginComponent";
import HomeComponent from "./Components/Home/HomeComponent";

import "../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css";
import "../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css";

export const socket = socketIOClient(process.env.REACT_APP_API_URL, {
  reconnection: true,
  transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters),
});

function App() {
  const token = localStorage.getItem("token");

  const renderHomeRoute = token ? (
    <Route path="/" element={<HomeComponent socket={socket} />} />
  ) : (
    <Route path="/" element={<LoginComponent />} />
  );

  return (
    <>
      Admin Dashboard
      <Routes>
        {renderHomeRoute}
        {/* <Route path="/product/:id" element={<PostDetailsComponent />} /> */}
      </Routes>
    </>
  );
}

export default App;
