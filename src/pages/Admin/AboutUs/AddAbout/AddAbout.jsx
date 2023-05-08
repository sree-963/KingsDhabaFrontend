import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Aboutus.scss";
const AddAbout = () => {
  const [aboutUs, setaboutUsData] = useState({
    about: ''
  });
  const [aboutdata, setaboutData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editid, setEditId] = useState(null);
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

    const url = "https://kingsdhaba.onrender.com/about-us/add";
    try {
      const response = await axios.post(url, { aboutUsData: aboutUs }, config);

      setaboutUsData({
        about: ""
      });
      getusers();
      console.log(response);
    } catch (err) {
      console.log(err, "Hi");
    } finally {
      setLoading(false);
    }
  };
  console.log(aboutUs);

  //get the data

  const getusers = async (_id) => {
    setEditId(_id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/about-us/get-aboutUs`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;

      setaboutData(fullData);
    } catch (error) {
      console.log(error);
    }
  };

  const Deleteuser = async (_id) => {
    toast.success(' Sucessfully Deleted!', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/about-us/delete/${_id}`,
      config
    );
    getusers();
  };

  const [update, setUpdate] = useState({
    about: '',
  })


  const updateAbout = async (e) => {
    e.preventDefault()
    await axios.patch(`https://kingsdhaba.onrender.com/about-us/update/${editid}`, { aboutUsData: update },
      config,
    )
    getusers();
    setUpdate({
      about: ""
    })
  }
  const toggleupdate = (item) => {
    setUpdate({
      about: item.aboutUsData,
    })

  }
  useEffect(() => {
    getusers();
  }, []);

  console.log(update)

  return (
    <>
      <div className="about">

        <div className="form">
          {
            <form action="" onSubmit={handleSubmit}>
              <div className="label"></div>
              <textarea
                type="text"
                name="aboutus"
                cols='20'
                rows='10'
                value={aboutUs.about}
                onChange={(e) => setaboutUsData(e.target.value)}
              />
              <br />
              <button className="add">{loading ? "Loading..." : "Add"}</button>
            </form>
          }
        </div>

        <div className="form">
          {
            <form action="" onSubmit={updateAbout}>
              <div className="label"></div>
              <textarea
                type="text"
                name="aboutus"
                cols='20'
                rows='10'
                value={update.about}
                onChange={(e) => setUpdate(e.target.value)}
              />
              <br />
              <button className="add">{loading ? "Loading..." : "Update"}</button>
            </form>
          }
        </div>
        <div class="vl"> </div>

        <div className="about-us">
          {aboutdata.map((item, i) => (
            <div key={i}>
              <p>{item.aboutUsData}</p>
              <button className="delete" onClick={() => Deleteuser(item._id)}>
                Delete
              </button>

              <button className="delete" onClick={() => toggleupdate(item)}>
                Edit
              </button>

            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default AddAbout;
