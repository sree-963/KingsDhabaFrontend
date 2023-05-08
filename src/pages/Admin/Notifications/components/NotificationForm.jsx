import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notificationForm.scss";

const NotificationForm = () => {
  const [userData, setUserData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
  });
  const [notificationSent, setNotificationSent] = useState(false);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const [notificationDataforBoy, setNotificationDataforBoy] = useState({
    title: "",
    message: "",
  });
  const [notificationSentforBoy, setNotificationSentforBoy] = useState(false);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response.users;
      setUserData(fullData);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeliveryBoys = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allDeliveryBoys`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setDeliveryData(fullData);
      console.log(deliveryData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSelection = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "allUsers") {
      setSelectedUser(null);
    } else {
      const selectedUser = userData.find((user) => user.id === selectedValue);
      setSelectedUser(selectedUser);
    }
  };

  const handleBoySelection = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "allBoys") {
      setSelectedBoy(null);
    } else {
      const selectedBoy = deliveryData[0].find(
        (item) => item._id === selectedValue
      );
      setSelectedBoy(selectedBoy);
    }
  };

  const handleTitleChange = (event) => {
    setNotificationData((prevData) => ({
      ...prevData,
      title: event.target.value,
    }));
  };
  const handleMessageChange = (event) => {
    setNotificationData((prevData) => ({
      ...prevData,
      message: event.target.value,
    }));
  };
  const handleTitleChangeForBoy = (event) => {
    setNotificationDataforBoy((prevData) => ({
      ...prevData,
      title: event.target.value,
    }));
  };

  const handleMessageChangeForBoy = (event) => {
    setNotificationDataforBoy((prevData) => ({
      ...prevData,
      message: event.target.value,
    }));
  };
  const handleSubmit = async () => {
    if (!selectedUser && userData.length === 0) {
      alert("No users available");
      return;
    }

    if (notificationData.title === "" || notificationData.message === "") {
      alert("Please enter a title and message");
      return;
    }

    const requestData = {
      userId: selectedUser ? selectedUser.id : "allUsers",
      title: notificationData.title,
      message: notificationData.message,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/send-notification`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Update the content type to JSON
          },
          body: JSON.stringify(requestData), // Convert the requestData object to JSON string
        }
      );

      const data = await response.json(); // Parse the response body as JSON

      console.log(data);
      if (response.ok) {
        setNotificationSent(true);
        setSelectedUser(null);
        setNotificationData({
          title: "",
          message: "",
        });
      } else {
        setNotificationSent(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitForBoy = async () => {
    if (!selectedBoy && deliveryData.length === 0) {
      alert("No delivery boys available");
      return;
    }

    if (
      notificationDataforBoy.title === "" ||
      notificationDataforBoy.message === ""
    ) {
      alert("Please enter a title and message");
      return;
    }

    const requestDataforBoy = {
      deliveryBoyId: selectedBoy ? selectedBoy._id : "allBoys",
      title: notificationDataforBoy.title,
      message: notificationDataforBoy.message,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/send-notification-deliveryBoy`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Update the content type to JSON
          },
          body: JSON.stringify(requestDataforBoy), // Convert the requestData object to JSON string
        }
      );

      const data = await response.json(); // Parse the response body as JSON

      console.log(data);
      if (response.ok) {
        setNotificationSentforBoy(true);
        setSelectedBoy(null);
        setNotificationDataforBoy({
          title: "",
          message: "",
        });
      } else {
        setNotificationSentforBoy(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
    getDeliveryBoys();
  }, []);
  return (
    <div className="notifications-box">
      <div className="user-notification-box">
        <h3>User Notification's</h3>
        <div className="user-notification-form">
          <div className="left-msg">
            <p>Select user</p>
            <p>Title</p>
            <p>Message</p>
          </div>
          <div className="middle-msg">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="right-msg">
            <select onChange={(e) => handleUserSelection(e)}>
              <option value="all">All Users</option>
              {userData.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullname}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Title"
              value={notificationData.title}
              onChange={handleTitleChange}
            />
            <textarea
              placeholder="Message"
              value={notificationData.message}
              onChange={handleMessageChange}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        {notificationSent && (
          <p style={{ color: "green", fontWeight: "bolder" }}>
            Notification sent successfully
          </p>
        )}
      </div>
      <div className="delivery-notification-box">
        <h3>Delivery Boy Notification's</h3>
        <div className="delivery-notification-form">
          <div className="left-msg">
            <p>Select user</p>
            <p>Title</p>
            <p>Message</p>
          </div>
          <div className="middle-msg">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="right-msg">
            <select onChange={(e) => handleBoySelection(e)}>
              <option value="all">All Boys</option>
              {deliveryData &&
                deliveryData[0] &&
                deliveryData[0].map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.fullname}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="Title"
              value={notificationDataforBoy.title}
              onChange={handleTitleChangeForBoy}
            />
            <textarea
              placeholder="Message"
              value={notificationDataforBoy.message}
              onChange={handleMessageChangeForBoy}
            />
          </div>
        </div>
        <button onClick={handleSubmitForBoy}>Submit</button>
        {notificationSentforBoy && (
          <p style={{ color: "orange", fontWeight: "bolder" }}>
            Notification sent successfully
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationForm;
