import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productedit.scss";

const ProductEdit = ({
  openModal,
  handleCloseModal,
  getProducts,
  productId,
}) => {
  const [productData, setProductData] = useState([]);
  // const [productLength, setProductLength] = useState(0);
  const [productName, setProductName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [foodType, setFoodType] = useState("");
  const [loading, setLoading] = useState(false);
  const [productEditId, setProductEditId] = useState(null);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getProduct = async (_id) => {
    setProductEditId(_id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-single-product/${_id}`,
        // `http://localhost:9090/product/get-single-product/${_id}`,

        config
      );
      const productData = response.data;
      setProductData(productData.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId]);

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

    const formDataToUpdate = {};

    if (productName !== "") {
      formDataToUpdate.productName = productName;
    }
    if (avatar !== null) {
      formDataToUpdate.avatar = avatar;
    }
    if (description !== "") {
      formDataToUpdate.description = description;
    }
    if (price !== "") {
      formDataToUpdate.price = price;
    }
    if (foodType !== "") {
      formDataToUpdate.foodType = foodType;
    }
    if (categoryId !== "") {
      formDataToUpdate.categoryId = categoryId;
    }

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/product/update-product/${productEditId}`,
        formDataToUpdate,
        config
      );
      handleCloseModal();
      getProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <>
      <div className="product-model">
        <div className="edit-form">
          <h1>Edit Product</h1>
          <div className="edit-style">
            <div className="left-edit">
              <label htmlFor="product-name">Product Name:</label>
              <label htmlFor="product-image">Product Image:</label>
              <label htmlFor="product-description">Description:</label>
              <label htmlFor="product-price">Price:</label>
              <label htmlFor="product-categoryId">categoryId:</label>
              <label htmlFor="product-food-type">Food Type:</label>
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
                type="number"
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
          <div className="edit-buttons">
            <button
              className="update-button"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Update"}
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

export default ProductEdit;
