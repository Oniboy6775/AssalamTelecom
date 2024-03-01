import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import logo from "../images/logo.png";
import { FaHome } from "react-icons/fa";
import { Container, Wrapper } from "./Login";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
function ResetPassword() {
  const params = useParams();
  const { token, userId } = params;
  const { handleChange, password, passwordCheck, resetPassword } =
    useGlobalContext();
  // const { resetPasswordNow } = useApiCall(resetPassword);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !passwordCheck) {
      toast.warning("All fields are required");
      return;
    }
    if (password !== passwordCheck) {
      toast.warning("Enter the same password twice");
      return;
    }
    resetPassword({ userId, token });
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
        <h3 className="title">Reset Password</h3>

        <form className="" onSubmit={handleSubmit}>
          <FormInput
            labelText="Enter new password"
            name="password"
            value={password}
            placeholder="Enter new Password"
            type="password"
            handleChange={handleInputChange}
          />
          <FormInput
            labelText="Re-enter password"
            name="passwordCheck"
            value={passwordCheck}
            placeholder="Re-enter password"
            type="password"
            handleChange={handleInputChange}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <div className="new__user">
          <p>New user?</p>
          <button
            className="register__btn btn"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </Wrapper>
    </Container>
  );
}

export default ResetPassword;
