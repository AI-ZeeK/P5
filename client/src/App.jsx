import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { gapi } from "gapi-script";

function App() {
  const GOOGLE_CLIENT_ID =
    "105747698090-4k3ferdhldk418tdjd236p7h64l3a1ku.apps.googleusercontent.com";
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId: GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
