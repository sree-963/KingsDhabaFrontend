import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CompleteOrder from "./Components/CompleteOrder";
const Order = () => {
  return (
    <div className="user-alignments">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-user">
          <Navbar type="orders" />
        </div>
        <div className="bottom-user">
          <CompleteOrder />
        </div>
      </div>
    </div>
  );
};

export default Order;
