import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PostComponent from "./Components/Product/ProductComponent";
import PostDetailsComponent from "./Components/Product/ProductDetailComponent";

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
