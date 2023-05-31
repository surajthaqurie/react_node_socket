import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PostComponent from "./Components/Product/ProductComponent";
import PostDetailsComponent from "./Components/Product/ProductDetailComponent";

const socket = require("socket.io-client")("http://localhost:4001");

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
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
