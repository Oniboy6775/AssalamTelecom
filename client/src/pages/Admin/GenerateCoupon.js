import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import FormInput from "../../components/FormInput";
import { useGlobalContext } from "../../context/UserContext";

function GenerateCoupon() {
  const {
    userAccount,
    amount,
    isValidated,
    handleChange,
    couponCode,
    validatedName,
    generateCoupon,
    validateUser,
  } = useGlobalContext();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAccount) return toast.warning("All fields are required ");
    if (isValidated) return generateCoupon();
    validateUser();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="title">generate coupon</h4>
        <FormInput
          placeholder="Enter user userName"
          type="text"
          name="userAccount"
          value={userAccount}
          disabled={isValidated}
          handleChange={handleInputChange}
        />
        <FormInput
          placeholder="amount"
          type="number"
          name="amount"
          value={amount}
          labelText="Amount "
          handleChange={handleInputChange}
        />

        <button type="submit" className="btn">
          {isValidated ? "Generate" : "Validate"}
        </button>
      </form>
      <div className="coupon__container">
        <div className="alert alert-danger">
          <span>CouponCode</span>
          <span>{couponCode}</span>
        </div>
        <div className="alert alert-success">
          <span>Owner</span>
          <span>{validatedName}</span>
        </div>
        <div className="alert alert-danger">
          <span>Amount</span>
          <span>{amount}</span>
        </div>
      </div>
    </Wrapper>
  );
}

export default GenerateCoupon;

const Wrapper = styled.div`
  /* max-width: 90%; */
  .coupon__container {
    width: 100%;
  }
  .alert {
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: 678px) {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* max-width: 100%; */
  }
`;
