import React from "react";
import { useGlobalContext } from "../context/UserContext";

import { toast } from "react-toastify";
import styled from "styled-components";
import FormInput from "../components/FormInput";
function Settings() {
  const { changePassword, handleChange, password, passwordCheck, oldPassword } =
    useGlobalContext();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !password || !passwordCheck) {
      toast.warning("All fields are required");
      return;
    }
    changePassword();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h5 className="title">EDIT DETAILS</h5>
        <FormInput
          labelText="Old password"
          placeholder="Old Password"
          type="password"
          name="oldPassword"
          value={oldPassword}
          handleChange={handleInputChange}
        />
        <FormInput
          placeholder="New Password"
          type="password"
          name="password"
          value={password}
          handleChange={handleInputChange}
        />
        <FormInput
          placeholder="New Password Again"
          label="Re-enter password"
          name="passwordCheck"
          value={passwordCheck}
          handleChange={handleInputChange}
          type="password"
        />

        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </Wrapper>
  );
}

export default Settings;
const Wrapper = styled.div``;
