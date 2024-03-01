import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo.png";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { Container, Wrapper } from "./Login";
import FormInput from "../components/FormInput";
import { useGlobalContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Register() {
  const {
    setupUser,
    email,
    handleChange,
    phoneNumber,
    password,
    userName,
    passwordCheck,
    isLoading,
  } = useGlobalContext();
  const { referralId } = useParams();

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Enter an your email");
      return;
    }
    let currentUser = { userName, password, email, phoneNumber, passwordCheck };
    if (referralId) currentUser.referredBy = referralId;
    setupUser({ currentUser, endPoint: "register" });
  };
  return (
    <Container>
      <Wrapper>
        <img
          src={logo}
          alt="AssalamTelecom"
          height="50rem"
          width="70rem"
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        />{" "}
        <button onClick={() => navigate("/")} className="home__btn btn">
          <FaHome />
        </button>
        <h3 className="title">Register</h3>
        <form onSubmit={handleSubmit} className="">
          <FormInput
            name="userName"
            value={userName}
            placeholder="username / business name"
            handleChange={handleInputChange}
            type="text"
            labelText="username/business name"
          />

          <FormInput
            value={email}
            name="email"
            placeholder="email"
            handleChange={handleInputChange}
            type="email"
            placeHolder="email"
          />

          <FormInput
            value={phoneNumber}
            name="phoneNumber"
            placeholder="phone number"
            handleChange={handleInputChange}
            type="number"
            labelText="phone number"
          />

          <FormInput
            value={password}
            name="password"
            placeholder="password"
            handleChange={handleInputChange}
            type="password"
            placeHolder="password"
          />

          <FormInput
            value={passwordCheck}
            name="passwordCheck"
            placeholder="password"
            type="password"
            placeHolder="Re-enter password"
            handleChange={handleInputChange}
          />

          <button
            className="btn"
            href="#top"
            type="submit"
            disabled={isLoading}
          >
            <FaUserAlt />
            {isLoading ? " please wait.." : " Register"}
          </button>
        </form>
        <div className="flex justify-between">
          <p className="">Already have an account?</p>
          <button
            className="register__btn btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            login
          </button>
        </div>
      </Wrapper>
    </Container>
  );
}

export default Register;
