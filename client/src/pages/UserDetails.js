import React, { useState } from "react";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "../components/FormInput";
import styled from "styled-components";
import { toast } from "react-toastify";
function UserDetails() {
  const { user, updateWebhook } = useGlobalContext();
  const [webhook, setWebhook] = useState("");
  const details = [
    {
      name: "Full name",
      value: user.fullName,
    },
    {
      name: "username",
      value: user.userName,
    },

    {
      name: "phone number",
      value: user.phoneNumber,
    },
    {
      name: "referred by",
      value: user.referredBy || "",
    },
    {
      name: "email",
      value: user.email,
    },
    {
      name: "API key",
      value: user.apiToken,
    },
  ];
  const copyAPIKey = async () => {
    await window.navigator.clipboard.writeText(user.apiToken);
    toast.success("Copied");
  };
  return (
    <Wrapper>
      <h4 className="title">YOUR DETAILS</h4>
      <div className=" form">
        {details.map((e, index) => {
          const { name, value } = e;
          return (
            <div className="each__detail">
              <FormInput
                key={index}
                name={name}
                placeholder={value}
                value={value}
                type="text"
                disabled={true}
              />
            </div>
          );
        })}
        <div className="inline-flex justify-between item-center w-[95%] mb-3">
          <FormInput
            type="text"
            placeholder={user.webhookUrl || "https://www.mywebsite.com/webhook"}
            handleChange={(e) => {
              setWebhook(e.target.value);
            }}
            value={webhook}
          />
          <button
            className="btn btn-danger"
            onClick={() => updateWebhook(webhook)}
          >
            Update webhook
          </button>
        </div>
        <div className=" flex">
          <button
            onClick={() => {
              window.location.href =
                "https://documenter.getpostman.com/view/13986654/UV5dcti3";
            }}
            className="btn"
          >
            Check Developer's API
          </button>
          <button className="btn" onClick={copyAPIKey}>
            Copy API key
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default UserDetails;
const Wrapper = styled.div`
  @media (min-width: 600px) {
    .btn__container {
      width: 100%;
      display: flex;
    }
  }
  .btn {
    margin: auto;
  }
`;
