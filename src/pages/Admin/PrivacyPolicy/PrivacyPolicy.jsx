import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import PrivacyPolicyAdd from "./Components/PrivacyPolicyAdd";
const PrivacyPolicy = () => {
  return (
    <div className="product-alignments">
      <div className="left" style={{height:"100vh"}}>
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-product">
          <Navbar type="privacypolicy" />
        </div>
        <div className="bottom-product">
          <PrivacyPolicyAdd />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
