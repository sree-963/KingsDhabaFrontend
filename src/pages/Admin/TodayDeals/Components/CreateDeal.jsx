import React, { useState, useEffect } from "react";
import axios from "axios";
import "../TodayDeals.scss";
// import "./productdata.scss";
import { Modal } from "@mui/material";
import DealsAdd from "../../../../components/TodayDealsPopup/DealsAdd";
import DealsEdit from "../../../../components/TodayDealsPopup/DealsEdit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "antd";
const Createdeal = () => {
  const [productData, setProductData] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [productId, setProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [search, setsearch] = useState("");

  // table pagination
  // const lastIndex = currentPage * recordsPerpage;
  // const firstIndex = lastIndex - recordsPerpage;
  // const records = productData.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(productData.length / recordsPerpage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

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
        `${process.env.REACT_APP_API_URL}/product/exclusive-dishes `
        // `http://localhost:9090/product/exclusive-dishes`
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

  useEffect(() => {
    getProducts();
  }, []);

  const handleEdit = (_id) => {
    setProductId(_id);
    console.log(productId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete-product/${_id}`,
      config
    );
    getProducts();
  };

  const handleModel2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
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
  const data = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const style = {
    boxShadow: "0px 3px 2px rgba(0,0,0,.3)",
  };
  const image = {
    borderLeft: "3px solid rgba(0,0,0,.3)",
    fontWeight: "600",
    backgroundColor: "rgba(192,192,192)",
  };

  // console.log(productData.productName);

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="searchbar">
        <h3 style={{ padding: "15px 0 0 15px" }}>
          Total Deals: {productLength}
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

      <TableContainer>
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
                      height="25"
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <DealsEdit
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            getProducts={getProducts}
            productId={productId}
          />
        </div>
      </Modal>
      <Modal open={openModal2} onClose={handleCloseModal2}>
        <div>
          <DealsAdd
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

export default Createdeal;
