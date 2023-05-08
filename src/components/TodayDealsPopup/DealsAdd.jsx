import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deals.scss";

const DealsAdd = ({ handleCloseModal2, getProducts }) => {
  const [productData, setProductData] = useState([]);
  const [productName, setProductName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [foodType, setFoodType] = useState("");
  const [loading, setLoading] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlecategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("avatar", avatar);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("foodType", foodType);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/create-product`,
        formData,
        config
      );
      console.log(response.data);
      setProductName("");
      setAvatar(null);
      setDescription("");
      setPrice("");
      setCategoryId("");
      setFoodType("");
      document.getElementById("product-image").value = "";
      getProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      handleCloseModal2();
    }
  };

  const handleClose = () => {
    handleCloseModal2();
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="product-model">
        <div className="edit-form">
          <h1>Create Product</h1>
          <div className="edit-style">
            <div className="left-edit">
              <label htmlFor="product-name">Product Name :</label>
              <label htmlFor="product-image">Product Image :</label>
              <label htmlFor="product-description">Description :</label>
              <label htmlFor="product-price">Price :</label>
              <label htmlFor="product-categoryId">CategoryId :</label>
              <label htmlFor="product-food-type">Food Type :</label>
            </div>
            <div className="right-edit">
              <input
                type="text"
                id="product-name"
                value={productName}
                placeholder={productData.productName}
                onChange={handleProductNameChange}
              />
              <input
                type="file"
                id="product-image"
                onChange={handleAvatarChange}
              />
              <input
                type="text"
                id="product-description"
                value={description}
                placeholder={productData.description}
                onChange={handleDescriptionChange}
              />
              <input
                type="text"
                id="product-price"
                value={price}
                placeholder={productData.price}
                onChange={handlePriceChange}
              />
              <input
                type="text"
                id="product-categoryId"
                value={productData.categoryId}
                onChange={handlecategoryIdChange}
              />
              <input
                type="text"
                id="product-food-type"
                value={foodType}
                placeholder={productData.foodType}
                onChange={handleFoodTypeChange}
              />
            </div>
          </div>
          <h5 className="error-msg">* Enter all fields</h5>
          <div className="edit-buttons">
            <button
              className="update-button"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Add"}
            </button>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsAdd;
