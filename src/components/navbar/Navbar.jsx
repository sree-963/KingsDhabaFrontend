import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { FaBars } from "react-icons/fa";
import { SideBarContext } from "../../Contex/SidebarContext";
import { AiOutlineLogout } from "react-icons/ai";
const Navbar = ({ type }) => {
  const { Close, handleSidebarView } = useContext(SideBarContext);

  const navigate = useNavigate();

  let head;
  switch (type) {
    case "dashboard":
      head = {
        name: "Dashboard",
      };
      break;
    case "categories":
      head = {
        name: "Categories",
      };
      break;
    case "products":
      head = {
        name: "Products",
      };
      break;
    case "users":
      head = {
        name: "Users",
      };
      break;
    case "deals":
      head = {
        name: "Today Deals",
      };
      break;
    case "deliveryboy":
      head = {
        name: "Delivery Boy",
      };
      break;
    case "orders":
      head = {
        name: "Orders",
      };
      break;
    case "aboutus":
      head = {
        name: "About Us",
      };
      break;
    case "privacypolicy":
      head = {
        name: "Privacy Policy",
      };
      break;
      case "notifications":
      head = {
        name: "Notifications",
      };
      break;
    default:
      break;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div className="navbar" style={{ width: Close ? "82vw" : "92vw" }}>
        <FaBars
          className="fabar"
          onClick={handleSidebarView}
          Close={Close}
          size={25}
        />
        <div className="left-nav">
          <h2>{head.name}</h2>
        </div>
        <div className="right-nav">
          <button onClick={logout}>
            <AiOutlineLogout className="logout" size={20} />
            <span onClick={logout}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
