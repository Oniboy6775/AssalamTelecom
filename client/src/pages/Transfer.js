import React from "react";
import { useGlobalContext } from "../context/UserContext";

import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Transfer() {
  const {
    userAccount,
    handleChange,
    isValidated,
    amount,
    validateUser,
    validatedName,
    transfer,
    user,
    isAdmin,
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
    if (!userAccount) {
      toast.warning("Enter a username");
      return;
    }
    if (user.balance < amount && !isAdmin) {
      toast.warning("Insufficient balance");
      return;
    }
    if (isValidated) {
      transfer();
      return;
    }
    validateUser();
  };

  return (
    <div className=" md:ml-[6rem] bg-white p-4  ">
      <p className="title underline">transfer to other user</p>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          placeholder="Receiver Username"
          type="text"
          name="userAccount"
          value={userAccount}
          labelText="username"
          handleChange={handleInputChange}
          disabled={isValidated}
        />
        {isValidated && (
          <FormInput
            placeholder="amount"
            type="number"
            name="amount"
            value={amount}
            labelText="amount"
            handleChange={handleInputChange}
          />
        )}

        <p>{validatedName}</p>
        <button disabled={isLoading} className="btn btn-block" type="submit">
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
              {loadingText}
            </>
          ) : isValidated ? (
            "transfer"
          ) : (
            "validate"
          )}
        </button>
      </form>
    </div>
  );
}
export default Transfer;
