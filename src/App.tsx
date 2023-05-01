import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import Card from "./pages/Card";
import ProductInf from "./pages/ProductInf";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Router from "./component/Router";
import "./component/app.css";
import Footer from "./component/Footer";
export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
    <div className="body">
      <Footer />
    </div>
  </ChakraProvider>
);
