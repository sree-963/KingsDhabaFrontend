import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import CreateDeal from "./Components/CreateDeal";
import Navbar from "../../../components/navbar/Navbar";
const TodayDeals = () => {
  return (
    <div className="product-alignments">
      <div className="left" style={{height:"100vh"}}>
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-product">
          <Navbar type="deals" />
        </div>
        <div className="bottom-product">
          <CreateDeal />
        </div>
      </div>
    </div>
  );
};

export default TodayDeals;
