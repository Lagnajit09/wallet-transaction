import { Avatar } from "@mui/material";
import React from "react";
import "./User.css";

function User(props) {
  return (
    <div className="user-list">
      <div className="left">
        <Avatar src="./broken-image.png" alt={props.username.split("@")[0]} />
        <h3>{props.username}</h3>
      </div>
      <div className="right">
        <button className="send-money" onClick={props.navigate("/send")}>
          SEND MONEY
        </button>
      </div>
    </div>
  );
}

export default User;
