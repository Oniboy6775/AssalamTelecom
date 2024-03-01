import React from "react";
import styled from "styled-components";
import SideMenuBtn from "./SideMenuBtn";
import { RiAccountCircleFill } from "react-icons/ri";
import { useGlobalContext } from "../context/UserContext";
import avatar from "../images/avatar.svg";

function SideMenu() {
  const {
    isSideBarOpen,
    user: { userName, balance },
  } = useGlobalContext();
  return (
    <Container isSideBarOpen={isSideBarOpen} className="z-50 mt-[40px] pb-16">
      <Wrapper>
        <div className="mb-2 flex space-x-4 items-center">
          <div className="ring-4 rounded-full max-w-[50px]">
            <img src={avatar} alt="avatar" className="img" />
          </div>
          <div className="">
            <span className="capitalize font-bold">{userName && userName}</span>
            <p className="capitalize">
              balance:₦ {balance && balance.toFixed(2)}
            </p>
          </div>
        </div>
        <hr />
        <SideMenuBtn />
      </Wrapper>
    </Container>
  );
}

export default SideMenu;

const Container = styled.div`
  max-width: ${({ isSideBarOpen }) => (isSideBarOpen ? "30%" : "80px")};
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  max-height: 100vh;
  height: 100%;
  transition: var(--transition);
  background-color: var(--primary-700);
  color: var(--grey-100);
  z-index: 10;
  /* @media (max-width: 678px) { */
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  /* } */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 678px) {
    max-width: ${({ isSideBarOpen }) => (isSideBarOpen ? "100vw" : "0px")};
    width: 100%;
  }
`;
const Wrapper = styled.div`
  color: #fff;
  padding: 1rem 1.2rem;
  /* overflow-y: scroll; */
`;
const Header = styled.div`
  display: flex;

  width: 100%;
  /* justify-content: center; */
`;
const Avatar = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 0; */
  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: green;
    margin-left: -10px;
    margin-bottom: -10px;
  }
  svg {
    font-size: 6rem;
    color: #1a2035;
    flex-grow: 1;
  }
`;
const Balance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 1rem;
`;
