import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./LoginUi.css";
import Loading from "./Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// IMPORTING DIFFERENT COMPONENTS
import { useLogin } from "../../../Hooks/useLogin";

const LoginUi = () => {
  const { login, error } = useLogin();
  const navigate = useNavigate();
  const [logError, setLogError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    userId: "admin",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await login(loginDetails.userId, loginDetails.password);
    let user = localStorage.getItem("user");
    if (user) {
      navigate("/admin/dashboard");
    } else {
      setLogError(error);
      toast.error('Incorrect Password', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false)
    }
  };

  return (
    <>
      {
        loading ? <Loading /> : <div className="main">
          <img className='img' src="https://1.bp.blogspot.com/-AmlaA5-BQmQ/YT_QITzWOLI/AAAAAAAABjE/j9Yct6PNC6Mvx8yIy0pOm18rRi9cXZKswCLcBGAsYHQ/s0/Screenshot%2B%2528575%2529%2B%25285%2529.jpg" alt="" />
          <div className="sub-main">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <h1 className="admin">Admin Login</h1>
              <div className="imgs">

              </div>
              <div>

                <br />
                <div className="username">
                  <label htmlFor="">UserName</label>
                  <input
                    type="text"
                    placeholder="userId"
                    readOnly={true}
                    className="name"
                    name="userId"
                    value={loginDetails.userId}
                    onChange={handleChange}
                  />
                </div>
                <div className="second-input">
                  <label htmlFor="">Password</label>
                  <Input
                    style={{ color: "white" }}
                    className="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginDetails.password}
                    onChange={handleChange}
                    required
                    endAdornment={
                      <InputAdornment >
                        <IconButton
                          style={{ color: "white" }}
                          className="eye"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event) => event.preventDefault()}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <div className="login-button">
                    <button className="log-button" onClick={handleSubmit}>
                      Login
                    </button>
                  </div>
                  {logError && <div style={{ color: "red", textTransform: "capitalize", textAlign: "center" }}></div>}
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginUi;