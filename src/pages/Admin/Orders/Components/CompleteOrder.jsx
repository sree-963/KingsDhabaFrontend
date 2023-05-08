import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Order.scss";
const CompleteOrder = () => {
  const [userData, setUserData] = useState([]);
  const [userlength, setUserlength] = useState(0);
  const [deliveryBoy, setDeliveryBoy] = useState();

  const [filter, setFilter] = useState("all"); // Default filter is "all"

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getDeliveryPersons = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/onDutyBoys`,
        // "http://localhost:9090/admin/onDutyBoys",
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setDeliveryBoy(fullData);
    } catch (error) {}
  };

  const getusers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        // "http://localhost:9090/admin/allusers",
        config
      );
      const offData = response.data;
      const fullData = offData.response.users;
      setUserData(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setUserlength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const styles = {
    boxShadow: "0px 2px 1px rgba(0,0,0,0.3)",
  };
  const header = {
    backgroundColor: "rgba(192,192,192)",
    fontWeight: "650",
  };

  const handleAssignDb = async (cartId, deliveryBoyId) => {
    try {
      const response = await fetch(
        // `http://localhost:9090/admin/assignDb/${cartId}`,
        `${process.env.REACT_APP_API_URL}/admin/assignDb/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ deliveryBoyId }),
        }
      );
      getusers();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getusers();
    getDeliveryPersons();
  }, []);

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
      >
        <button
          value="all"
          onClick={handleFilterChange}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            margin: 10,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#777")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
        >
          All Orders
        </button>
        <button
          value="ordered"
          onClick={handleFilterChange}
          style={{
            backgroundColor: "green",
            color: "#fff",
            margin: 10,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "lightgreen")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "green")}
        >
          Ordered
        </button>
        <button
          value="Self-pickup"
          onClick={handleFilterChange}
          style={{
            backgroundColor: "#0000FF",
            color: "#fff",
            margin: 10,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#5555FF")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0000FF")}
        >
          Self Pickup
        </button>
        <button
          value="canceled"
          onClick={handleFilterChange}
          style={{
            backgroundColor: "red",
            color: "#fff",
            margin:10,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "lightred")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "red")}
        >
          Canceled
        </button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={header} align="center">
                Customer Name
              </TableCell>
              <TableCell style={header} align="center">
                OrderId
              </TableCell>
              <TableCell style={header} align="center">
                Order Img
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "rgba(192,192,192)",
                  fontWeight: "650",
                }}
                align="center"
              >
                Order Status
              </TableCell>
              <TableCell style={header} align="center">
                Created At
              </TableCell>
              <TableCell style={header} align="center">
                Transaction Id
              </TableCell>
              <TableCell style={header} align="center">
                Total
              </TableCell>
              <TableCell style={header} align="center">
                Delivery Person
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
              })
              .filter((item) => {
                if (filter === "all") {
                  return true;
                } else {
                  let orders = [];
                  if (filter === "ordered") {
                    orders = item.completedCart;
                  } else if (filter === "Self-pickup") {
                    orders = item.selfPickupCart;
                  } else if (filter === "canceled") {
                    orders = item.canceledCart;
                  }
                  return orders.length > 0;
                }
              })
              .map((item) => {
                let orders = [];
                if (filter === "ordered") {
                  orders = item.completedCart;
                } else if (filter === "Self-pickup") {
                  orders = item.selfPickupCart;
                } else if (filter === "canceled") {
                  orders = item.canceledCart;
                } else {
                  orders = item.completedCart.concat(
                    item.canceledCart,
                    item.selfPickupCart
                  );
                }
                return orders.map((order) => (
                  <TableRow key={order} sx={{ styles }}>
                    <TableCell align="center">{item.fullname}</TableCell>
                    <TableCell align="center">{order.cartId}</TableCell>
                    <TableCell align="center">
                      {order.products.map((product) => (
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          width={40}
                          height={40}
                        />
                      ))}
                    </TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: "true",
                      })}
                    </TableCell>
                    <TableCell align="center">{order.transactionId}</TableCell>
                    <TableCell align="center">{order.ReceivedAmount}</TableCell>
                    <TableCell align="center">
                      {order.deliveryPerson ? (
                        order.deliveryPerson
                      ) : (
                        <select
                          value=""
                          onChange={(event) => {
                            const deliveryBoyId = event.target.value;
                            handleAssignDb(order.cartId, deliveryBoyId);
                          }}
                          disabled={
                            order.deliveryPerson !== undefined ||
                            order.status === "Self-pickup" ||
                            order.status === "canceled"
                          }
                        >
                          <option value="">Assign Delivery Boy</option>
                          {deliveryBoy &&
                            deliveryBoy[0].map((db) => {
                              return (
                                <option key={db._id} value={db._id.toString()}>
                                  {db.fullname}
                                </option>
                              );
                            })}
                        </select>
                      )}
                    </TableCell>
                  </TableRow>
                ));
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompleteOrder;
