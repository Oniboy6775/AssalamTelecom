import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";

import { toast } from "react-toastify";
import FormInput from "../components/FormInput";

const CouponFunding = () => {
  const {
    handleChange,
    isValidated,
    fundWalletCoupon,
    user: { userName },
    couponCode,
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
    if (!userName || !couponCode) return toast.error("Enter a coupon code");
    fundWalletCoupon();
  };

  return (
    <div className=" md:ml-[6rem] bg-white p-4 ">
      <p className="title underline">fund wallet</p>
      <form onSubmit={handleSubmit} className="form">
        <p className="text-center">Fund your wallet with coupon code</p>

        <FormInput
          type="text"
          name="couponCode"
          value={couponCode}
          labelText="Enter a coupon code"
          placeholder="coupon code"
          handleChange={handleInputChange}
          disabled={isValidated}
        />
        <div className="text-center mt-3">
          <button disabled={isLoading} type="submit" className="btn">
            {loadingText || "fund wallet"}
          </button>
        </div>
        <div className="text-center mt-3 ">
          <p className="p-0 m-0 mt-0 text-red-400">
            Contact an admin to get one
          </p>
        </div>
      </form>
    </div>
  );
};

export default CouponFunding;
const Wrapper = styled.div`
  padding-right: 3rem;
`;
