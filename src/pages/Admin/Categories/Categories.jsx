import React from "react";
import "./categories.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
// import SideNew from "../../../components/NewSidebar/SideNew";
import Navbar from "../../../components/navbar/Navbar";
import CategoriesList from "./components/CreateCategory";
// import CategoriesList from "../../../test";

const Categories = () => {
  return (
    <div className="categories-alignments">
      <div className="left" style={{height:"100vh"}}>
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-cat">
          <Navbar type="categories" />
        </div>
        <div className="bottom-cat">
          <CategoriesList />
        </div>
      </div>
    </div>
  );
};

export default Categories;
