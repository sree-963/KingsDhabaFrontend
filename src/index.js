import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext from "./Contex/AuthContex";
import SidebarContext from "./Contex/SidebarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContext>
    <SidebarContext>

      <App />

    </SidebarContext>
  </AuthContext>
);
