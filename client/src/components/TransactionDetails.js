import React, { useState } from "react";
import { useGlobalContext } from "../context/UserContext";
import { FaCopy, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { RiRefund2Fill } from "react-icons/ri";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import stamp from "../images/stamp.png";
function TransactionDetails({ close, details }) {
  const navigate = useNavigate();
  const { isAdmin, refund, handleChange, isAgent, reQueryWithdrawal } =
    useGlobalContext();
  const handleRefund = (id) => {
    refund(id);
    close();
  };
  const [isSharing, setIsSharing] = useState(false);
  const toggleShare = () => setIsSharing(!isSharing);

  const buyAgain = (number) => {
    handleChange({ name: "phoneNumber", value: number });
    navigate("/profile/buydata");
  };
  const {
    _id,
    balance_After,
    balance_Before,
    phone_number,
    trans_Network,
    trans_Status,
    trans_Type,
    trans_amount,
    createdAt,
    paymentLink,
    trans_UserName,
    apiResponse,
    apiResponseId,
  } = details;
  let date = moment(createdAt);
  date = date.format("llll");
  const detailsArray = [
    {
      name: "type",
      value: trans_Type,
    },
    {
      name: "Network",
      value: trans_Network,
    },
    {
      name: "response",
      value: apiResponse || `${trans_Network} ${trans_Type}`,
    },
    {
      name: "Number",
      value: phone_number,
    },
    {
      name: "Date",
      value: date,
    },
    {
      name: "Old balance",
      value: isSharing ? "" : balance_Before.toFixed(2),
    },
    {
      name: "New balance",
      value: isSharing ? "" : balance_After.toFixed(2),
    },
    {
      name: "User",
      value: isSharing ? "" : trans_UserName,
    },
  ];
  const isBalanceIncrease = balance_After > balance_Before;
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };
  return (
    <div className=" bg-black/50 flex m-auto h-full fixed left-0 right-0 top-0 bottom-0 z-10">
      <div
        className="relative  m-auto bg-white p-4 rounded-md w-[80%] max-w-[400px] text-center border-black border ]"
        isBalanceIncrease={isBalanceIncrease}
      >
        <div className="absolute max-w-xs bottom-[20%] left-0 opacity-10 z-10">
          <img src={stamp} alt="" />
        </div>
        <button className=" btn btn-danger absolute right-4" onClick={close}>
          X
        </button>
        <h4 className="underline title">Transaction details</h4>
        {!isSharing ? (
          <span
            className={`font-extrabold text-3xl ${
              isBalanceIncrease ? "text-green-700" : "text-red-500"
            }`}
          >
            {!isSharing && `₦ ${isBalanceIncrease ? "+" : "-"} ${trans_amount}`}
            <br />
          </span>
        ) : (
          <>
            <span className="text-green-600 font-extrabold capitalize text-lg ">
              {" "}
              Thanks for your patronage
            </span>{" "}
            <br />
          </>
        )}
        <span
          className={`capitalize font-bold ${
            trans_Status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trans_Status}
        </span>
        {detailsArray.map((e, index) => {
          const { name, value } = e;
          return (
            <div key={index} className="flex justify-between p-1">
              <div className="font-extrabold uppercase">{name}</div>
              <div className="font-bold capitalize text-right ">
                {value}{" "}
                {value === phone_number && (
                  <FaCopy onClick={() => copy(phone_number)} />
                )}
              </div>
            </div>
          );
        })}
        <div className="flex  justify-center space-x-4  flex-wrap">
          {trans_Type === "data" && (
            <button className="btn" onClick={() => buyAgain(phone_number)}>
              <TfiReload /> Buy again
            </button>
          )}
          {(isAdmin || isAgent) &&
            trans_Status === "pending" &&
            trans_Type === "wallet" && (
              <button
                className="btn"
                onClick={() => {
                  reQueryWithdrawal(apiResponseId || _id);
                  close();
                }}
              >
                check status
              </button>
            )}

          <button className="btn " onClick={toggleShare}>
            {isSharing ? <FaEyeSlash /> : <FaEye />} share
          </button>
          {paymentLink && (
            <button
              className="btn"
              onClick={() => (window.location.href = paymentLink)}
            >
              Continue payment
            </button>
          )}
          {(isAdmin || isAgent) &&
            trans_Status !== "refunded" &&
            trans_Status !== "failed" &&
            trans_Type !== "transfer" &&
            trans_Type !== "wallet" &&
            trans_Type !== "refund" && (
              <button
                className="btn btn-block mt-2"
                onClick={() => handleRefund(_id)}
              >
                <RiRefund2Fill /> Refund
              </button>
            )}
          <button className="btn btn-danger btn-block mt-2" onClick={close}>
            <FaTimes /> close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
