import React from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";
import {
  sideBarButton,
  adminSideBarButton,
  agentSideBarButton,
} from "../utils/data";
function SideMenuBtn() {
  const { toggleSideBar, isSideBarOpen, isAdmin, isAgent } = useGlobalContext();
  const sideBarNav = isAdmin
    ? sideBarButton.concat(adminSideBarButton)
    : isAgent
    ? sideBarButton.concat(agentSideBarButton)
    : sideBarButton;
  return (
    <Container
      onMouseLeave={() => isSideBarOpen && toggleSideBar()}
      onMouseOver={() => !isSideBarOpen && toggleSideBar()}
    >
      {sideBarNav.map((eachBtn, index) => {
        const { name, url, icon } = eachBtn;

        return (
          <NavLink
            to={url}
            key={index}
            // className={({ isActive }) =>
            //   isActive ? "btn activeBtn bg-white" : "btn"
            // }
            onClick={toggleSideBar}
            className={({ isActive }) => (isActive ? "btn active" : "btn")}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </NavLink>
        );
      })}
    </Container>
  );
}

export default SideMenuBtn;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  svg {
    font-size: xx-large;
    margin-right: 2rem;
  }
  /*  */
  .btn {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: transparent;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.3);
      color: #fff;
    }
  }
  .active {
    background-color: #fff;
    color: var(--primary-500);
  }
`;
