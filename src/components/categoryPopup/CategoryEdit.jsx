import React, { useState, useEffect } from "react";
import axios from "axios";
import "./categoryedit.scss";
const CategoryEdit = ({
  handleCloseModal,
  getCategories,
  categoryId,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getCategory = async (_id) => {
    setEditId(_id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/single-category/${_id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId);
    }
  }, [categoryId]);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleEditCategory = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formDataToUpdate = {};

    if (categoryName !== "") {
      formDataToUpdate.categoryName = categoryName;
    }

    if (avatar !== null) {
      formDataToUpdate.avatar = avatar;
    }

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/category/update-category/${editId}`,
        formDataToUpdate,
        config
      );
      handleCloseModal();
      console.log(formDataToUpdate);
      getCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    handleCloseModal();
  };
  return (
    <div>
      <div className="category-model">
        <div className="cat-edit-form">
          <h1>Edit Category</h1>
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
                // placeholder={cateData.categoryName}
                onChange={handleCategoryNameChange}
              />

              <input
                type="file"
                id="category-image"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <div className="edit-buttons">
            <button
              className="update-button"
              type="submit"
              disabled={loading}
              onClick={handleEditCategory}
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
