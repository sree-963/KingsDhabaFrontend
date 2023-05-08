import axios from "axios";
import { React, useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { BiCategoryAlt,BiDish } from "react-icons/bi";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { IoAppsOutline, IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineDeliveryDining,MdOutlineNotificationsActive } from "react-icons/md";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";


import "../dashboard.scss";
// import OrderApi from '../../Orders/Components/OrderApi'
import { NavLink } from "react-router-dom";
const DashboardData = () => {
  const [userData, setUserData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [productData, setProductData] = useState("");
  const [userLength, setUserLength] = useState("");
  const [categoryLength, setCategoryLength] = useState("");
  const [productLength, setProductLength] = useState("");
  const [orderLength, setOrderLength] = useState("")
  const [deliveryBoy, setDeliveryBoy] = useState("")
  const [dBoyLength, setDBoyLength] = useState("")
  const [exclusive, setExclusive] = useState("")
  const [exclusiveLength, setExclusiveLength] = useState("")
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        // `http://localhost:9090/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response.users;
      const orderLen = offData.response.totalCartsCount
      setUserData(fullData);
      setOrderLength(orderLen);
      if (fullData.length > 0) {
        const length = fullData.length;
        setUserLength(length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      const offData = response.data;
      const fullData = offData.response;
      setCategoryData(fullData);
      setCategoryLength(fullData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all-products`
      );
      const offData = response.data;
      const fullData = offData.products;
      setProductData(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setProductLength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDeliveryPersons = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/allDeliveryBoys`,
          config
        );
        const offData = response.data;
        const fullData = offData.response;
  
        setDeliveryBoy(fullData);
  
        if (fullData.length > 0) {
          const nestedArray = fullData[0];
          const length = nestedArray.length;
          setDBoyLength(length);
        }
      } catch (error) {
        console.log(error);
      }
  };

  const getExclusiveProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/exclusive-dishes `
      );
      const offData = response.data;
      const fullData = offData.products;
      setExclusive(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setExclusiveLength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getUsers();
    getCategories();
    getProducts();
    getDeliveryPersons();
    getExclusiveProducts();
  }, []);

  const data = [
    {
      head: "Total Categories",
      length: categoryLength,
      logo: <BiCategoryAlt size={70} opacity=".2" />,
      color: "#28A745	",
      path: "/admin/categories",
    },
    {
      head: "Total Products",
      length: productLength,
      logo: <IoAppsOutline size={70} opacity=".3" />,
      color: "#F1AE16",
      path: "/admin/products",
    },
    {
      head: "Total Users",
      length: userLength,
      logo: <FaRegUser size={70} opacity=".3" />,
      color: "#17A2B8",
      path: "/admin/users",
    },
    {
      head: "Exclusive Dishes",
      length: exclusiveLength,
      logo: <BiDish size={70} opacity=".3" />,
      color: "purple",
      path:"/admin/deals"
    },
    
    {
      head: "Total Orders",
      length: orderLength,
      logo: <IoFastFoodOutline size={70} opacity=".3" />,
      color: "#DC3545",
      path:"/admin/orders"
    },
    {
      head: "Delivery Boys",
      length: dBoyLength,
      logo: <MdOutlineDeliveryDining size={70} opacity=".3" />,
      color: "lightpink",
      path:"/admin/deliveryboy"
    },
    {
      head: "Notifications",
      // length: exclusiveLength,
      logo: <MdOutlineNotificationsActive size={70} opacity=".3" />,
      color: "burlywood",
      path:"/admin/notification"
    },
    

  ];
  const [shake, setshake] = useState(true);
  return (
    <div className="Dashboard">
      {data.map((item) => {
        const { head, length, logo, color, path } = item;
        return (
          <div>
            <div
              className="boxes"
              style={{
                backgroundColor: color,
                width: "250px",
                height: "152px",
                borderRadius: "5px",
              }}
            >
              <div className="Boxes">
                <div className="box-top">
                  <div className="box-bottom-left">{length}</div>
                  <p className="head">{head}</p>
                </div>
                <div className="box-logo">
                  <span>{logo}</span>
                </div>
              </div>
              <div className="more-info">
                <div className="MOREINFO">
                  <NavLink to={path} className="moreinfo">
                    More Info
                    <span style={{ color: "white" }}>
                      <BsArrowRightCircleFill />
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardData;
