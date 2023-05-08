import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeliveryBoyAdd from "../../../../components/DelieveryboyPopup/DeliveryBoyAdd";
import { Pagination } from "antd";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Modal
} from "@mui/material";
const CreateDeliveryForm = () => {
  const [userData, setUserdata] = useState([]);
  const [userlength, setUserlength] = useState(0);
  const [search, setSearch] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerpage = 3;
  // const lastIndex = currentPage * recordsPerpage;
  // const firstIndex = lastIndex - recordsPerpage;
  // const records = userData.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(userData.length / recordsPerpage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  const [postperPage, setPostperPage] = useState(2);
  const [total, setTotal] = useState("");
  const [page, setpage] = useState(1);
  const [openModal2, setOpenModal2] = useState(false);

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
        `${process.env.REACT_APP_API_URL}/admin/allDeliveryBoys`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;

      setUserdata(fullData);

      if (fullData.length > 0) {
        const nestedArray = fullData[0];
        const length = nestedArray.length;
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
      `${process.env.REACT_APP_API_URL}/admin/deliveryBoy/${_id}`,
      config
    );
    getusers();
  };

  // toogle status
  const toggleStatus = async (_id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/deliveryBoy/toggleStatus/${_id}`,
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
    boxShadow: "0 3px 1px rgba(0,0,0,.3)",
  };
  const style = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const status = {
    color: "green",
    boxShadow: "0 3px 1px rgba(0,0,0,.3)",
    fontWeight: "550",
  };
  const name = {
    fontWeight: "bold",
    borderLeft: "3px solid rgba(0,0,0,0.3)",
    backgroundColor: "rgba(192,192,192)",
  };

  // const prePage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  // const nextPage = () => {
  //   if (currentPage !== npage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const ChangeCPage = (id) => {
  //   setCurrentPage(id);
  // };

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
  console.log(total);
  const handleModel2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };
  useEffect(() => {
    getusers();
  }, []);
  console.log(currentposts)
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
        <button className="Add-button" onClick={handleModel2}>
          Add
        </button>

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
                Password
              </TableCell>
              <TableCell align="center" style={style}>
                Area
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
            {currentposts.map((usersArray, index) => (
              <>
                {usersArray
                  .filter((item) => {
                    if (search === "") {
                      return item;
                    } else if (
                      item.fullname.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return item;
                    }
                  })

                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell align="center" style={data}>
                        {user.fullname}
                      </TableCell>
                      <TableCell align="center" style={data}>
                        {" "}
                        {user.mobile}
                      </TableCell>
                      <TableCell align="center" style={data}>
                        {user.password}
                      </TableCell>
                      <TableCell align="center" style={data}>
                        {" "}
                        {user.area}
                      </TableCell>
                      <TableCell align="center" style={status}>
                        <button
                          onClick={() => toggleStatus(user._id)}
                          className={
                            user.status === "active"
                              ? "active-button"
                              : "inactive-button"
                          }
                        >
                          {user.status === "active" ? "Active" : "InActive"}
                        </button>
                      </TableCell>

                      <TableCell align="center" style={data}>

                        <button
                          className="delete"
                          onClick={() => Deleteuser(user._id)}
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
              </>
            ))}


          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Modal open={openModal2} onClose={handleCloseModal2}>
          <div>
            <DeliveryBoyAdd
              openModal2={openModal2}
              handleCloseModal2={handleCloseModal2}
              getusers={getusers}
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
    </>
  );
};

export default CreateDeliveryForm;
