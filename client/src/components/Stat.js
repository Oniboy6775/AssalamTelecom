import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";
import moment from "moment";
const Stat = ({ close, totalSales, totalProfit }) => {
  const { stat, transactionFrom, transactionTo } = useGlobalContext();
  return (
    <Container>
      <TransactionDetailsContainer>
        <button className="close__btn btn btn-danger" onClick={close}>
          X
        </button>
        <h4 className="underline title">Sales Statistics</h4>
        <p className="text-green-500">
          The transactions{" "}
          {transactionFrom
            ? ` from ${moment(transactionFrom).calendar()} to ${moment(
                transactionTo
              ).calendar()}`
            : "for today"}{" "}
        </p>
        {stat.map((e, index) => (
          <div key={e.network} className="flex justify-between p-1">
            <div className="font-extrabold uppercase">{e.network}</div>
            <div className="font-bold capitalize text-right ">
              {e.total_volume_sold}GB = ₦{e.profit}
            </div>
          </div>
        ))}
        <div className="flex justify-between p-1">
          <div className="font-extrabold uppercase">Total sales</div>
          <div className="font-bold capitalize text-right ">
            {totalSales >= 1000
              ? `${(totalSales / 1000).toFixed(2)}TB`
              : `${totalSales}GB`}{" "}
            = ₦{totalProfit || 0}
          </div>
        </div>
        <button className="btn btn-danger" onClick={close}>
          <FaTimes /> close
        </button>
      </TransactionDetailsContainer>
    </Container>
  );
};

export default Stat;
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
  display: flex;
`;
const TransactionDetailsContainer = styled.div`
  margin: auto;
  background-color: var(--grey-100);
  max-height: 80vh;
  max-width: 400px;
  width: 80%;
  height: fit-content;
  padding: 1rem;
  border-radius: var(--borderRadius);
  transition: var(--transition);
  border: 2px solid var(--primary-500);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  text-align: center;
  position: relative;
  .close__btn {
    position: absolute;
    right: 1rem;
  }
  .transaction__amount {
    font-weight: 900;
    font-size: 2rem;
    /* color: ${({ isBalanceIncrease }) =>
      isBalanceIncrease ? "green" : "red"}; */
  }
  .trans__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  .trans__name {
    text-transform: uppercase;
    font-weight: 900;
    min-width: fit-content;
  }

  svg {
    font-size: x-large;
  }
  button {
    margin: auto;
    margin-right: 0.5rem;
  }
`;
