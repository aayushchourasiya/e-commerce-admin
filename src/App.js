import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./Components/Navbars/NavbarComponent";
import Home from "./Components/Screens/Home";
import Login from "./Components/Screens/Login";
import Signup from "./Components/Screens/Signup";

function App() {
  return (
    <Fragment>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Fragment>
  );
}

export default App;
