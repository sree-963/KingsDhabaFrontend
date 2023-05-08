import React from "react";
import "./products.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ProductCreate from "./components/ProductCreate";

const Products = () => {
  return (
    <div className="product-alignments">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-product">
          <Navbar type="products" />
        </div>
        <div className="bottom-product">
          <ProductCreate/>
        </div>
      </div>
    </div>
  );
};

export default Products;
