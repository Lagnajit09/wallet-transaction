import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./User.css";
import Send from "../Send/Send";

function User(props) {
  return (
    <div className="user">
      {/* {!sendClicked ? ( */}
      <div className="user-list">
        <div className="left">
          <Avatar src="./broken-image.png" alt={props.username.split("@")[0]} />
          <h3>{props.username}</h3>
        </div>
        <div className="right">
          <button
            className="send-money"
            onClick={(e) => {
              e.preventDefault();
              props.navigate(`/send/${props.username}`);
            }}
          >
            SEND MONEY
          </button>
        </div>
      </div>
      {/* ) : (
        <Send />
      )} */}
    </div>
  );
}

export default User;
