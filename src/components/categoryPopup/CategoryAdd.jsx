import React, { useState, useEffect } from "react";
import axios from "axios";
import "./categoryedit.scss";
import Popup from "../PopupforAdd/Popup";
const CategoryAdd = ({ handleCloseModal2, getCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/create-category`,
        formData,
        config
      );
      console.log(response.data);
      setCategoryName("");
      setAvatar(null);
      document.getElementById("category-image").value = "";
      getCategories(); // call getCategories() after successful creation of new category
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleCloseModal2();
    }
  };

  const handleClose = () => {
    handleCloseModal2();
  };

  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <div>
      {loading?<Popup/>:<div className="category-model">
        <div className="cat-edit-form">
          <h1>Create Category</h1>
          <div className="edit-style">
            <div className="left-edit">
              <label htmlFor="category-name">Category Name:</label>
              <label htmlFor="category-image">Category Image:</label>
            </div>
            <div className="right-edit">
              <input
                type="text"
                id="category-name"
                value={categoryName}
                onChange={handleCategoryNameChange}
              />

              <input
                type="file"
                id="category-image"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <h5 className="cat-error-msg">* Enter all fields</h5>
          <div className="edit-buttons">
            <button
              className="update-button"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
               Add
            </button>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default CategoryAdd;
