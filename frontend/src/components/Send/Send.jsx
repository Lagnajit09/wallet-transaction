import React, { useState } from "react";
import Card from "../Card/Card";
import { Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/user";
import "./Send.css";
import { useNavigate, useParams } from "react-router-dom";

const Send = () => {
  let { receiver } = useParams();
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const [amount, setAmount] = useState("");
  const username = user.joinedUser.username;

  const initiateTransfer = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/transfer",
        {
          method: "POST",
          body: JSON.stringify({
            to: receiver,
            amount,
          }),
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
      if (json.success) {
        navigate("/dashboard");
      } else {
        console.error("Error: ", json.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Card className="send">
      <h1 className="send-heading">SEND MONEY</h1>
      <div className="inner-container">
        <div className="user-details">
          <Avatar src="./broken-image.png" alt={receiver} />
          <h2>{receiver}</h2>
        </div>
        <div className="send-amount">
          <p>Amount (in Rs)</p>
          <input
            type="text"
            placeholder="Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="send-btn"
        onClick={(e) => {
          e.preventDefault();
          initiateTransfer();
        }}
      >
        TRANSFER
      </button>
    </Card>
  );
};

export default Send;
