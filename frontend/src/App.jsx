import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import Send from "./components/Send/Send";

function App() {
  return (
    <RecoilRoot>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send/:receiver" element={<Send />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

export default App;
