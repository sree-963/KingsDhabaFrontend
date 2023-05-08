import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import AddAbout from "./AddAbout/AddAbout";
const AddAboutUs = () => {
  return (
    <div className="product-alignments">
      <div className="left" style={{height:"100vh"}}>
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-product">
          <Navbar type="aboutus" />
        </div>
        <div className="bottom-product">
          <AddAbout />
        </div>
      </div>
    </div>
  );
};

export default AddAboutUs;
