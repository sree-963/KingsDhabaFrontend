import React from "react";
import "./users.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CreateUser from "./Components/CreateUser";

const Users = () => {
  return (
    <div className="user-alignments">
      <div className="left" style={{height:"100vh"}}>
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-user">
          <Navbar type="users" />
        </div>
        <div className="bottom-user">
          <CreateUser />
        </div>
      </div>
    </div>
  );
};

export default Users;
