import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo.png";
import { FaHome } from "react-icons/fa";
import { Container, Wrapper } from "./Login";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
function RequestResetPassword() {
  const { handleChange, email, isLoading, requestPasswordReset } =
    useGlobalContext();
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
    requestPasswordReset();
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
        />
        <button onClick={() => navigate("/")} className="home__btn btn">
          <FaHome />
        </button>
        <h4 className="title">Reset Password</h4>
        <form className="" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            value={email}
            placeholder="Enter your email"
            type="email"
            placeHolder="email"
            handleChange={handleInputChange}
          />
          <button type="submit" disabled={isLoading} className="btn">
            {isLoading ? "please wait..." : "submit"}
          </button>
        </form>
        <div className="new__user">
          <p>New user?</p>
          <button
            className="register__btn btn"
            onClick={() => navigate("/login")}
          >
            login
          </button>
        </div>
      </Wrapper>
    </Container>
  );
}

export default RequestResetPassword;
