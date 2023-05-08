import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productdata.scss";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from "@mui/material";
import ProductEdit from "../../../../components/productPopup/ProductEdit";
import ProductAdd from "../../../../components/productPopup/ProductAdd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "antd";
const ProducCreate = () => {
  const [productData, setProductData] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [productId, setProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [search, setsearch] = useState("");
  const [exclusive, setExclusive] = useState(true);
  const [loading, setLoading] = useState(false)
  // table pagination
  const [postperPage, setPostperPage] = useState(6);
  const [total, setTotal] = useState("");
  const [page, setpage] = useState(1);

  const indexOfLastpage = page * postperPage;
  const indexOfFirstPage = indexOfLastpage - postperPage;
  const currentposts = productData.slice(indexOfFirstPage, indexOfLastpage);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all-products`,
        // `http://localhost:9090/product/get-all-products`
      );
      const offData = response.data;
      const fullData = offData.products;
      setProductData(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setProductLength(length);
        setTotal(length);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit = (_id) => {
    setProductId(_id);
    console.log(productId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (_id) => {
    setLoading(true)

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete-product/${_id}`,
      config
    );
    getProducts();
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
  };

  const handleModel2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
    getProducts();
  };

  const toggleStatus = async (_id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/product/single-product/toggleStatus/${_id}`,
        null,
        config
      );
      const updatedProduct = response.data.response[0];
      setProductData((prevState) => {
        const updatedData = prevState.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
        return updatedData;
      });
      getProducts();
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unable to toggle status. Please try again later.");
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const data = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const image = {
    borderLeft: "3px solid rgba(0,0,0,.3)",
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const style = {
    boxShadow: "0px 3px 2px rgba(0,0,0,.3)",
  };
  const Exclusive = {
    // backgroundColor:"#e3e0c1",
    backgroundColor: "rgba(154,205,50,0.3)",

    boxShadow: "0px 2px 10px rgba(0,0,0,.5)",
  };

  const onshowSizeChange = (current, pageSize) => {
    setPostperPage(pageSize);
  };
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a className="prev">Previous</a>;
    }
    if (type === "next") {
      return <a className="next">Next</a>;
    }
    return originalElement;
  };

  const handleAddExclusive = async (_id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/product/add-to-exclusive/${_id}`,
        null,
        config
      );
      getProducts();

      setExclusive(false);
      if (response.data.product._id === productData._id) {
        setExclusive(false);
      }

      console.log("added  " + response.data.product._id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveExclusive = async (_id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/product/remove-from-exclusive/${_id}`,
        null,
        config
      );
      getProducts();
      if (productData._id) {
        setExclusive(true);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="searchbar">
        <h3 style={{ padding: "15px 0 0 15px" }}>
          Total Products: {productLength}
        </h3>

        <span>
          Search:{" "}
          <input
            className="input"
            type="search"
            placeholder="search by name"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </span>

        <button className="Add-button" onClick={handleModel2}>
          Add
        </button>
      </div>

      <TableContainer className="product-table">
        <Table>
          <TableHead>
            <TableRow
              className="product-tableRow"
              style={{ backgroundColor: "rgba(192,192,192)" }}
            >
              <TableCell align="center" style={image}>
                Image
              </TableCell>
              <TableCell align="center" style={data}>
                Name
              </TableCell>
              <TableCell align="center" style={data}>
                Description
              </TableCell>
              <TableCell align="center" style={data}>
                Price
              </TableCell>
              <TableCell align="center" style={data}>
                CategoryID
              </TableCell>
              <TableCell align="center" style={data}>
                Food Type
              </TableCell>
              <TableCell align="center" style={data}>
                Status
              </TableCell>

              <TableCell align="center" style={data}>
                Edit
              </TableCell>
              <TableCell align="center" style={data}>
                Delete
              </TableCell>
              <TableCell align="center" style={data}>
                Add Exclusive
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentposts
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.productName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })

              .map((product) => (
                <TableRow key={product._id} className="product-tableRow">
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    <img
                      src={`${product.productImage}`}
                      alt="product"
                      width="40"
                      height="28"
                    />
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    {product.productName}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    {product.description}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    {product.price}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    {product.categoryId}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    {product.foodType}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="product-tableData"
                  >
                    <button
                      onClick={() => toggleStatus(product._id)}
                      className={
                        product.status === "active"
                          ? "Pactive-button"
                          : "Pinactive-button"
                      }
                    >
                      {product.status === "active" ? "Active" : "InActive"}
                    </button>
                  </TableCell>

                  <TableCell style={style} align="center">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell style={style} align="center">
                    <button
                      className="del-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
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
                  </TableCell>
                  <TableCell style={Exclusive} align="center">
                    <div className="buttons">
                      <button
                        style={{
                          backgroundColor:
                            product.exclusiveStatus === "active"
                              ? "rgb(190, 103, 4)"
                              : "green",
                          padding: "5px 10px",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        className="remove"
                        onClick={() => handleRemoveExclusive(product._id)}
                      >
                        {product.exclusiveStatus === "active" ? (
                          "Remove"
                        ) : (
                          <span
                            style={{
                              backgroundColor:
                                product.exclusiveStatus === "active"
                                  ? "red"
                                  : "green",
                            }}
                            onClick={() => handleAddExclusive(product._id)}
                          >
                            ADD
                          </span>
                        )}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <ProductEdit
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            getProducts={getProducts}
            productId={productId}
          />
        </div>
      </Modal>
      <Modal open={openModal2} onClose={handleCloseModal2}>
        <div>
          <ProductAdd
            openModal2={openModal2}
            handleCloseModal2={handleCloseModal2}
            getProducts={getProducts}
          />
        </div>
      </Modal>
      <Pagination
        className="pagination"
        onChange={(value) => setpage(value)}
        pageSize={postperPage}
        total={total}
        current={page}
        showSizeChanger
        onShowSizeChange={onshowSizeChange}
        itemRender={itemRender}
      />
    </div>
  );
};

export default ProducCreate;