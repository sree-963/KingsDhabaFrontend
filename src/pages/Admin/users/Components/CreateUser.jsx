import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../users.scss";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
const CreateUser = () => {
  const [userData, setUserdata] = useState([]);
  const [userlength, setUserlength] = useState(0);
  const [search, setSearch] = useState("");

  const [postperPage, setPostperPage] = useState(7);
  const [total, setTotal] = useState("");
  const [page, setpage] = useState(1);

  const indexOfLastpage = page * postperPage;
  const indexOfFirstPage = indexOfLastpage - postperPage;
  const currentposts = userData.slice(indexOfFirstPage, indexOfLastpage);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getusers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response.users;

      setUserdata(fullData);

      if (fullData.length > 0) {
        const length = fullData.length;
        setUserlength(length);
        setTotal(length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userlength);
  console.log(page);
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
      `${process.env.REACT_APP_API_URL}/admin/user/${_id}`,
      config
    );
    getusers();
  };

  // toogle status
  const toggleStatus = async (_id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/user/toggleStatus/${_id}`,
        null,
        config
      );
      const updatedUser = response.data.response[0];
      setUserdata((prevState) => {
        const updatedData = prevState.map((user) => {
          if (user.id === updatedUser.id) {
            return updatedUser;
          }
          return user;
        });
        return updatedData;
      });
      getusers();
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unable to toggle status. Please try again later.");
      }
    }
  };

  const data = {
    boxShadow: "0 2px 0px rgba(0,0,0,.3)",
  };
  const style = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const status = {
    color: "green",
    boxShadow: "0 2px 0px rgba(0,0,0,.3)",
    fontWeight: "550",
  };
  const name = {
    fontWeight: "bold",

    backgroundColor: "rgba(192,192,192)",
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

  useEffect(() => {
    getusers();
  }, []);

  return (
    <>
      <div className="searchbar">
        <h3 style={{ padding: "15px 0 0 15px" }}>Total Users: {userlength}</h3>

        <span>
          Search:{" "}
          <input
            className="input"
            type="search"
            value={search}
            placeholder="search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "rgba(192,192,192)" }}>
              <TableCell align="center" style={name}>
                Name
              </TableCell>
              <TableCell align="center" style={style}>
                Mobile Number
              </TableCell>
              <TableCell align="center" style={style}>
                Email
              </TableCell>
              <TableCell align="center" style={style}>
                Status
              </TableCell>
              <TableCell align="center" style={style}>
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
                  item.fullname.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })

              .map((users) => (
                <TableRow key={users._id}>
                  <TableCell align="center" style={data}>
                    {users.fullname}
                  </TableCell>
                  <TableCell align="center" style={data}>
                    {" "}
                    {users.mobile}
                  </TableCell>
                  <TableCell align="center" style={data}>
                    {users.email}
                  </TableCell>
                  <TableCell align="center" style={status}>
                    <button
                      onClick={() => toggleStatus(users._id)}
                      className={
                        users.status === "active"
                          ? "active-button"
                          : "inactive-button"
                      }
                    >
                      {users.status === "active" ? "Active" : "InActive"}
                    </button>
                  </TableCell>
                  <TableCell align="center" style={data}>
                    <button
                      className="delete"
                      onClick={() => Deleteuser(users._id)}
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

      <div>
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
    </>
  );
};

export default CreateUser;
