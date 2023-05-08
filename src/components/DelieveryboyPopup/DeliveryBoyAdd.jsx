import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deliveryboy.scss";
import Loading from "../../pages/Admin/login/Loading/Loading";

const DeliveryBoyAdd = ({ handleCloseModal2, getusers }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url = "https://kingsdhaba.onrender.com/delivery/signup";
    // const url =`${process.env.REACT_APP_API_URL}/delivery/signup`
    try {
      const response = await axios.post(
        url,
        { fullname: fullName, mobile: mobile, password: password, area: area },
        config
      );

      setFullName("");
      setMobile("");
      setPassword("");
      setArea("");
      getusers();
    } catch (err) {
      console.log(err, "Hi");
    } finally {
      setLoading(false);
      handleCloseModal2();
    }
  };

  const handleClose = () => {
    handleCloseModal2();
  };
  useEffect(() => {
    getusers();
  }, []);

  return (
    <>
      {loading ? <Loading /> : <div className="product-model Delivery">
        <div className="edit-form">
          <h1>Create Delivery Boy Details</h1>
          <div className="edit-style">
            <div className="labels DeliveryBoyLabels">
              <label htmlFor="delivery-name">FullName :</label>
              <label htmlFor="delivery-mobile">Mobile:</label>
              <label htmlFor="delivery-password">Password :</label>
              <label htmlFor="delivery-area">Area :</label>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="right-edit">
                <input
                  type="text"
                  value={fullName}
                  name="fullname"
                  className="ipt"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="Number"
                  name="mobile"
                  className="ipt"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <input
                  type="text"
                  name="password"
                  className="ipt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="text"
                  className="ipt"
                  name="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                {
                  <div className="edit-buttons">
                    <button
                      className="update-button"
                      type="buttons"
                      disabled={loading}
                    // onClick={handleSubmit}
                    >
                      Add
                    </button>

                    <button className="close-button" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default DeliveryBoyAdd;
