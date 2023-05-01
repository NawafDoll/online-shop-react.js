import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../component/NavBar";
import Card from "../pages/Card";
import ProductInf from "../pages/ProductInf";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ProtectRoute from "./ProtectRoute";
import ForgetPassword from "../pages/ForgetPassword";
import EditPassword from "../pages/EditPassword";
import PageOrder from "../pages/PageOrder";
import Footer from "./Footer";
import "./app.css";
import AddProduct from "./AddProduct";
function Router() {
  const [logOut, setLogOut] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      return setLogOut(true);
    } else {
      return setLogOut(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <NavBar logOuts={logOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectRoute />}>
          <Route path="/card" element={<Card />} />
        </Route>
        <Route path="/productInf/:_id" element={<ProductInf />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/user/forgetpassword/:id/:token"
          element={<EditPassword />}
        />
        <Route path="/orders" element={<PageOrder />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(Router);
