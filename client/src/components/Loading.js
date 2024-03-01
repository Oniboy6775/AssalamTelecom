import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";
function Loading() {
  const { isLoading } = useGlobalContext();
  const [netWorkError, setNetworkError] = useState(false);
  setTimeout(() => setNetworkError(true), [10000]);
  return (
    <Container isLoading={isLoading}>
      <div>
        <p className="loading__text">
          Transaction in progress, please Wait... <br />
          {netWorkError && "Poor network connection"}
        </p>
      </div>
      <div className="loading"></div>
    </Container>
  );
}

export default Loading;
const Container = styled.div`
  /* display: ${({ isLoading }) => (isLoading ? "flex" : "none")}; */
  .loading {
    padding: 3rem;
  }
  width: fit-content;
  color: white;
  border-radius: 3px;
  padding: 1rem;
  align-self: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading__text {
    text-transform: capitalize;
    font-weight: 900;
  }
  div {
    color: white;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 2rem;

    &:nth-of-type(2) {
      height: fit-content;
      width: fit-content;
      border-radius: 50%;
      transition: height 2s;
    }
  }
`;
