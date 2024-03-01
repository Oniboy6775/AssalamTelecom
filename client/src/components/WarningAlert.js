import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";
import { Modal } from "./Modal";

function WarningAlert({ close, details }) {
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const { upgradeUser } = useGlobalContext();

  return (
    <Container className="">
      {confirm && (
        <Modal
          title="are you sure"
          children="You will be charged a one time payment of ₦1000 for this upgrade"
          buttons={[
            {
              name: "no",
              handleClick: () => close(),
              className: "btn-danger",
            },
            {
              name: "Yes pay ₦1000 ",
              handleClick: () => {
                close();
                upgradeUser();
              },
            },
          ]}
        />
      )}
      <TransactionDetailsContainer className=" text-center font-bold">
        <p className="text-green-500">
          Upgrade to a reseller and enjoy a better discount
        </p>

        <p className="text-red-900 text-sm">
          You will be charged one time payment of ₦1000 for this upgrade
        </p>

        <div className="row">
          <button className=" btn btn-danger" onClick={() => close()}>
            Later
          </button>
          <button
            className="btn"
            onClick={() => {
              setConfirm(true);
            }}
          >
            Upgrade
          </button>
          <button
            className="btn btn-hipster"
            onClick={() => navigate("/priceList")}
          >
            Price List
          </button>
        </div>
      </TransactionDetailsContainer>
    </Container>
  );
}

export default WarningAlert;
const Container = styled.div`
  position: fixed; /* Sit on top of the page content */
  /* display: none; Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  display: flex;
  transition: all ease-in-out 2s;
`;
const TransactionDetailsContainer = styled.div`
  background-color: #fff;
  margin: auto;
  height: fit-content;
  width: fit-content;
  padding: 1rem;
  border-radius: 10px;
  transition: all ease-in-out 2s;
  overflow-y: scroll;
  width: 80%;
  max-width: 400px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  button {
    padding: 0.5rem;
    margin: 0.5rem;
    border: none;
    border-radius: 0.5rem;
  }
`;
