import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PostComponent from "./Components/Product/ProductComponent";
import PostDetailsComponent from "./Components/Product/ProductDetailComponent";
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(process.env.REACT_APP_API_URL, {
  reconnection: true,
  transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters)
});

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostComponent />} />
        <Route path="/product/:id" element={<PostDetailsComponent />} />
      </Routes>
    </>
  );
}

export default App;
