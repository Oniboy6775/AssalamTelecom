import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";

import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FundWallet = () => {
  const {
    handleChange,
    isValidated,
    initiateFundWallet,
    amount,
    paymentLink,
    user,
    isLoading,
    loadingText,
  } = useGlobalContext();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return toast.warning("enter a valid amount");
    if (amount < 100) return toast.warning("minimum payment is 100");
    if (user.reservedAccountNo3) {
      window.open(
        `https://topup.vpay.africa/${user.reservedAccountNo3}`,
        "blank"
      );
      return;
    }
    if (!isValidated) return initiateFundWallet();
    window.location.href = paymentLink;
  };

  return (
    <div className=" md:ml-[6rem] bg-white p-4 ">
      <p className="title underline">fund wallet</p>
      <div className=" m-auto">
        <p className="text-center">
          NOTE:You will be charged 1% on every successful transaction
        </p>
        <form className="card m-auto" onSubmit={handleSubmit}>
          <FormInput
            type="number"
            name="amount"
            labelText="amount"
            placeholder="enter amount"
            handleChange={handleInputChange}
            disabled={isValidated}
          />
          <button type="submit" className="btn" onClick={handleSubmit}>
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                {loadingText}
              </>
            ) : isValidated ? (
              "proceed to pay"
            ) : (
              "initiate payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundWallet;
const Wrapper = styled.div`
  padding-right: 3rem;
`;
