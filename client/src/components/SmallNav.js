import React from "react";
import styled from "styled-components";
import { RiCloseCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/UserContext";
import { FaTimes } from "react-icons/fa";

const SmallNav = () => {
  const { toggleNav, isNavOpen } = useGlobalContext();
  const nav = [
    { name: "home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "register an account", path: "/register" },
    { name: "our services", path: "/services" },
    { name: "price list", path: "/priceList" },
  ];
  return (
    <Container isNavOpen={isNavOpen}>
      <div className="my_nav__container">
        <div className="logo">
          <img src="./assets/logo.png" alt="" />
        </div>
        <div
          className="absolute text-red-500 text-3xl top-4 right-8"
          onClick={() => toggleNav()}
        >
          <FaTimes />
        </div>
        <div className="flex flex-col">
          {nav.map((e, index) => {
            return (
              <NavLink
                to={e.path}
                key={index}
                onClick={toggleNav}
                className={({
                  isActive,
                }) => ` p-4 capitalize hover:border-b-2 hover:shadow-md hover:border-l-red-500 hover:border-l rounded-md
                  ${isActive ? " active" : "nav__btn"}`}
              >
                {e.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default SmallNav;
const Container = styled.div`
  display: ${({ isNavOpen }) => (isNavOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;

  .my_nav__container {
    margin: auto;
    max-width: 500px;
    width: 80%;
    padding: 0.5rem 1rem;
    background-color: var(--white);
    border-radius: 1rem;
    position: relative;
  }
  .icon {
    color: var(--red-dark);
    svg {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 2rem;
    }
  }
  .nav__links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    * {
      background-color: var(--primary-300);
      color: var(--white);
      padding: 1rem;
      border-radius: 1rem;
      margin-bottom: 1rem;
      width: 50%;
      text-align: center;
      text-transform: uppercase;
    }
  }

  .active {
    background-color: var(--primary-500);
    color: var(--grey-100);
  }
`;
