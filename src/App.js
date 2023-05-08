import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import Categories from "./pages/Admin/Categories/Categories";
import Products from "./pages/Admin/products/Products";
import Users from "./pages/Admin/users/Users";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AdminPrivateRoute from "./utils/AdminPrivateRoute";
import LoginUi from "./pages/Admin/login/LoginUi";
import TodayDeals from "./pages/Admin/TodayDeals/TodayDeals";
import DeliveryBoy from "./pages/Admin/DeliveryBoy/DeliveryBoy";
import Order from "./pages/Admin/Orders/Order";
import AddAboutUs from "./pages/Admin/AboutUs/AddAboutUs";
import PrivacyPolicy from "./pages/Admin/PrivacyPolicy/PrivacyPolicy";
import Notification from "./pages/Admin/Notifications/Notification";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUi />} />
          <Route path="/admin" element={<AdminPrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="deals" element={<TodayDeals />} />
            <Route path="deliveryboy" element={<DeliveryBoy />} />
            <Route path="orders" element={<Order />} />
            <Route path="aboutus" element={<AddAboutUs />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="notification" element={<Notification/>}/>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
