import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/user";
import "./Dashboard.css";
import Avatar from "@mui/material/Avatar";
import User from "../User/User";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useRecoilValue(userAtom);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUserBalance = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getUserBalance();
        setBalance(balanceData.balance);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBalance();
  }, [balance]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData.users);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBalance();
  }, [filter]);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="left-nav">DASHBOARD</div>
        <div className="right-nav">
          <h2>Hello {user.joinedUser.username.split("@")[0].toUpperCase()}</h2>
          <Avatar
            alt={user.joinedUser.username.split("@")[0]}
            src="/broken-image.jpg"
          />
        </div>
      </nav>
      <div className="user">
        <h1>{user.joinedUser.username.split("@")[0].toUpperCase()}</h1>
        <h2 className="balance">Your Balance: ${balance}</h2>
      </div>
      <div className="user">
        <input
          type="search"
          className="search"
          placeholder="search"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        {users.map((user) => (
          <User key={user._id} navigate={navigate} username={user.username} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
