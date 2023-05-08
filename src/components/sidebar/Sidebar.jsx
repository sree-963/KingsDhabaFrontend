import React, { useContext } from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import AppsIcon from "@mui/icons-material/Apps";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import InfoIcon from '@mui/icons-material/Info';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { SideBarContext } from "../../Contex/SidebarContext";

const Sidebar = () => {
  const Styles = ({ isActive }) => {
    return {
      color: isActive ? "yellow" : "white",
      fontSize: isActive ? "14px" : "12px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "15px",
      height: "40px",
      borderRadius: "5px",
    };
  };
  const { Close } = useContext(SideBarContext);
  return (
    <>
      <div
        className="sidebar"
        style={{ width: Close ? "15vw" : "5vw", transition: "all .6s " }}
      >
        <div className="top">
          <img src={require("../../assets/king dhaba admin logo.png")} alt="" />
          <h2 style={{ display: Close ? "block" : "none" }}>Admin</h2>
        </div>
        <div className="middle">

          <NavLink style={Styles} to="/admin/dashboard">
            <abbr title="Dashboard"> <DashboardIcon className="icon" /></abbr>
            <h3 className={Close ? "open" : "close"}>Dashboard</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/categories">
            <abbr title="Categories"><CategoryIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>Categories</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/products">
            <abbr title="Products">  <AppsIcon /></abbr>
            <h3 style={{ display: Close ? "block" : "none" }}>Products</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/users">
            <abbr title="Users"><PersonIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>Users</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/deals">
            <abbr title="Today Deals"> <LocalOfferIcon /></abbr>
            <h3 style={{ display: Close ? "block" : "none" }}>Today Deals</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/deliveryboy">
            <abbr title="Delivery Boy"> <DirectionsBikeIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>Delivery Boy</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/orders">
            <abbr title="Orders"> <FastfoodIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>Orders</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/notification">
            <abbr title="Notifications"> <NotificationsActiveIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>Notifications</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/aboutus">
            <abbr title="About Us"><InfoIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>About Us</h3>
          </NavLink>

          <NavLink style={Styles} to="/admin/privacypolicy">
            <abbr title="Privacy Policy"><PrivacyTipIcon /></abbr>
            <h3 className={Close ? "open" : "close"}>Privacy Policy</h3>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
