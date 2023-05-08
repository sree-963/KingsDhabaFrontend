import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createcategory.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from "@mui/material";
import CategoryEdit from "../../../../components/categoryPopup/CategoryEdit";
import CategoryAdd from "../../../../components/categoryPopup/CategoryAdd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CategoriesList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLength, setCategoryLength] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(false)
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
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

  const handleModel2 = () => {
    setOpenModal2(true);
  };

  const handleEdit = (_id) => {
    setEditCategoryId(_id);
    console.log(editCategoryId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  const handleDelete = async (id, i) => {
    setLoading(true)
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/category/delete-category/${id}`,
      config
    );
    getCategories();
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

  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/category/single-category/toggleStatus/${id}`,
        null,
        config
      );
      const updatedCategory = response.data.response[0];
      setCategoryData((prevState) => {
        const updatedData = prevState.map((category) => {
          if (category.id === updatedCategory.id) {
            return updatedCategory;
          }
          return category;
        });
        return updatedData;
      });
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unable to toggle status. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const data = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const style = {
    boxShadow: "0px 2px 0px rgba(0,0,0,0.3)",
  };
  const image = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  return (
    <div className="categories">


      <div className="searchbar">
        <h3 style={{ padding: "15px 0 0 15px" }}>
          Total Categories: {categoryLength}
        </h3>
        <div className="search">
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
        </div>
        <button className="Add-button" onClick={handleModel2}>
          Add
        </button>
      </div>
      <TableContainer className="category-table" sx={{ minHeight: 490 }}>
        <Table stickyHeader aria-label="sticy table">
          <TableHead>
            <TableRow style={{ backgroundColor: "rgba(192,192,192)" }}>
              <TableCell align="center" style={image}>
                Image
              </TableCell>
              <TableCell align="center" style={data}>
                Name
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
            {categoryData
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.categoryName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })

              .map((category, index) => (
                <TableRow key={index} className="category-tableRow">
                  <TableCell
                    style={style}
                    align="center"
                    className="category-tableData"
                  >
                    <img
                      src={category.categoryImage}
                      alt={category.categoryName}
                      width="40"
                      height="30"
                    />
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="category-tableData"
                  >
                    {category.categoryName}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="category-tableData"
                  >
                    <button
                      onClick={() => toggleStatus(category.id)}
                      className={
                        category.status === "active"
                          ? "active-button"
                          : "inactive-button"
                      }
                    >
                      {category.status === "active" ? "Active" : "InActive"}
                    </button>
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="category-tableData"
                  >
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(category.id)}
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="category-tableData"
                  >
                    <button
                      className="del-btn"
                      onClick={() => handleDelete(category.id)}
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <CategoryEdit
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            getCategories={getCategories}
            categoryId={editCategoryId}
          />
        </div>
      </Modal>
      <Modal open={openModal2} onClose={handleCloseModal2}>
        <div>
          <CategoryAdd
            openModal2={openModal2}
            handleCloseModal2={handleCloseModal2}
            getCategories={getCategories}
          />
        </div>
      </Modal>

    </div>
  );
};

export default CategoriesList;
