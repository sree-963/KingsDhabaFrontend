import React from "react";
import "./dashboard.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DashboardData from "./components/DashboardData";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-alignments">
        <div className="left" style={{height:"100vh"}}>
          <Sidebar />
        </div>
        <div className="right">
          <div className="top-dash">
            <Navbar type="dashboard" />
          </div>
          <div className="bottom-dash">
            <DashboardData />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
