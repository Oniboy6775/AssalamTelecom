import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import { useGlobalContext } from "../../context/UserContext";
import styled from "styled-components";
import { toast } from "react-toastify";
function SendEmail() {
  const { userAccount, sendEmail, handleChange, isValidated, validateUser } =
    useGlobalContext();
  const [emailDetails, setEmailDetails] = useState({
    subject: "",
    message: "",
    url: "",
    linkMessage: "",
  });
  const handleContextChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleInputChange = (e) => {
    setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject, linkMessage, message, url } = emailDetails;
    if (!subject || !linkMessage || !message || !url) {
      return toast.warning("All fields are required");
    }
    if ((userAccount && isValidated) || !userAccount) {
      sendEmail(emailDetails);

      return;
    }
    if (userAccount && !isValidated) validateUser();
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="title">Send Email</h4>
        <FormInput
          labelText="userAccount (ignore if sending to all users)"
          placeholder="username/email"
          type="text"
          name="userAccount"
          value={userAccount}
          handleChange={handleContextChange}
          disabled={isValidated}
        />
        <FormInput
          placeholder="Subject of the email"
          type="text"
          name="subject"
          value={emailDetails.subject}
          handleChange={handleInputChange}
        />
        <div className="form-row">
          <label htmlFor="" className="form-label">
            <textarea
              className="form-textarea"
              placeholder="message"
              type="text"
              name="message"
              value={emailDetails.message}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <FormInput
          placeholder="https://"
          type="text"
          name="url"
          value={emailDetails.url || "https://"}
          handleChange={handleInputChange}
        />
        <FormInput
          placeholder="button message"
          type="text"
          name="linkMessage"
          value={emailDetails.linkMessage}
          handleChange={handleInputChange}
        />
        <button type="submit" className="btn btn-block">
          {/* {isValidated ? "Send email" : "validate"} */}
          {userAccount && !isValidated ? "validate" : "Send email"}
        </button>
      </form>
    </Wrapper>
  );
}

export default SendEmail;
const Wrapper = styled.div``;
