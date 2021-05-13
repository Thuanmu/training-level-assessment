import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/header/header";
import Footer from "./components/layouts/footer/footer";
import Routes from "./routes/routes";

export default function App() {
  return (
    <>
      <Header/>
      <Routes/>
      <Footer/>
    </>
  );
}
