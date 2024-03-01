import React, { useEffect } from "react";
import { useGlobalContext } from "../context/UserContext";

import { toast } from "react-toastify";
import styled from "styled-components";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BiReceipt } from "react-icons/bi";
import contact from "../images/avatar.svg";
import moment from "moment";
function Withdraw() {
  const {
    isLoading,
    handleChange,
    isValidated,
    amount,
    validateAccNumber,
    validatedName,
    withdraw,
    user,
    fetchBeneficiary,
    beneficiaryList,
    accountNumber,
    selectedBank,
    fetchBankCodes,
    bankCodesList,
  } = useGlobalContext();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber) {
      toast.warning("Enter account number");
      return;
    }
    validateAccNumber();
    // if (isValidated) {
    //   if (!amount) {
    //     toast.warning("Enter amount");
    //     return;
    //   }
    //   if (user.balance < amount) {
    //     toast.warning("Insufficient balance");
    //     return;
    //   }
    //   withdraw({ endPoint: "" });
    //   return;
    // } else
  };

  useEffect(() => {
    if (bankCodesList.length < 1) fetchBankCodes();
    fetchBeneficiary();
  }, []);
  const selectBeneficiary = ({
    bankName,
    accountName,
    accountNumber,
    bankCode,
  }) => {
    handleChange({ name: "isValidated", value: true });
    handleChange({
      name: "validatedName",
      value: accountName,
    });
    handleChange({
      name: "accountNumber",
      value: accountNumber,
    });
    handleChange({
      name: "selectedBank",
      value: bankName,
    });
    handleChange({
      name: "bankCode",
      value: bankCode,
    });
    withdraw({ endPoint: "" });
  };
  return (
    <div className=" md:ml-[6rem]  bg-white min-h-[50vh] p-4">
      <h5 className="title underline">withdrawal to bank</h5>
      <div className="md:flex md:gap-4 justify-center items-center">
        {beneficiaryList.length < 1 && (
          <form className="card m-auto" onSubmit={handleSubmit}>
            {!isValidated && (
              <FormRowSelect
                labelText="Select bank"
                name="selectedBank"
                value={selectedBank}
                list={bankCodesList}
                handleChange={handleInputChange}
              />
            )}
            <FormInput
              placeholder="Account number"
              type="number"
              name="accountNumber"
              value={accountNumber}
              labelText="account number"
              handleChange={handleInputChange}
              disabled={isValidated}
            />
            {isValidated && (
              <>
                <FormInput
                  placeholder="bank name"
                  type="text"
                  name="validatedName"
                  value={selectedBank}
                  labelText="bank name"
                  handleChange={handleInputChange}
                  disabled={isValidated}
                />
                <FormInput
                  placeholder="account name"
                  type="text"
                  name="validatedName"
                  value={validatedName}
                  labelText="account name"
                  handleChange={handleInputChange}
                  disabled={isValidated}
                />
                {/* <FormInput
                placeholder="amount"
                type="number"
                name="amount"
                value={amount}
                labelText="amount"
                handleChange={handleInputChange}
              /> */}
              </>
            )}

            <div className="flex">
              {isValidated && (
                <div
                  disabled={isLoading}
                  className="btn btn-danger btn-block mr-2"
                  onClick={() => {
                    withdraw({ endPoint: "addBeneficiary" });
                  }}
                >
                  Add beneficiary
                </div>
              )}

              {!isValidated && (
                <button
                  disabled={isLoading}
                  className="btn btn-block"
                  type="submit"
                >
                  {/* {isValidated ? "withdraw" : "validate"} */}
                  validate
                </button>
              )}
            </div>
          </form>
        )}
        <section className="card m-auto">
          <h4 className=" underline">Beneficiaries</h4>
          {beneficiaryList.length < 1 ? (
            <div className="">
              <div className="loading "></div>
              <p className="text-center font-semibold ">No beneficiary yet</p>
            </div>
          ) : (
            beneficiaryList.map((e, index) => {
              return (
                <div
                  key={index}
                  className="sm:last:mb-[5rem] md:last:mb-6 shadow-md mb-6 p-4 border-2 border-[var(--primary-200)] rounded-lg"
                >
                  <div className="flex  mb-4  ">
                    <div className=" w-[50px] mr-4  ">
                      <img
                        src={contact}
                        alt="img"
                        className="img rounded-full ring-1 w"
                      />
                    </div>
                    <div className="flex w-full ">
                      <div className="w-[80%]">
                        <p className="font-extrabold capitalize ">
                          {e.accountName}
                        </p>
                        <p className="">
                          {e.accountNumber} [{e.bankName}]
                        </p>
                      </div>
                    </div>
                  </div>
                  <FormInput
                    placeholder="amount"
                    type="number"
                    name="amount"
                    value={amount}
                    labelText="amount"
                    handleChange={handleInputChange}
                  />
                  <div className="space-x-2">
                    <p className="text-center text-red-400">
                      You will receive {amount ? amount - 50 : 0}. ₦50 charges
                      applied
                    </p>
                    <button
                      disabled={isLoading}
                      className="btn btn-block"
                      onClick={() =>
                        selectBeneficiary({
                          bankName: e.bankName,
                          accountName: e.accountName,
                          accountNumber: e.accountNumber,
                          bankCode: e.bankCode,
                        })
                      }
                    >
                      {isLoading && (
                        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                      )}
                      withdraw
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
export default Withdraw;
const Wrapper = styled.section``;
