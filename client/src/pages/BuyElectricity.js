import React from "react";
import styled from "styled-components";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { useGlobalContext } from "../context/UserContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Container,
  Form,
  FormContainer,
  InnerWrapper,
  Wrapper,
} from "../Styles/Styles";
const BuyElectricity = () => {
  const {
    handleChange,
    isLoading,
    loadingText,

    isValidated,
    validatedName,
    meterNumber,
    meterToken,
    meterTypeList,
    selectedMeterType,
    validateMeter,
    electricityCompanyList,
    selectedElectricityCompany,
    amount,
    buyElectricity,
  } = useGlobalContext();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidated) {
      return buyElectricity();
    }
    validateMeter();
  };
  return (
    <div className=" md:ml-[6rem] bg-white p-4 ">
      <p className="underline title">Buy electricity token</p>
      <div className=" gap-4 sm:flex sm:flex-row sm:pl-[100px]  justify-center items-center">
        <Form className="form m-0 p-0" onSubmit={handleSubmit}>
          {!isValidated ? (
            <>
              <FormRowSelect
                labelText="Select meter type"
                name="selectedMeterType"
                value={selectedMeterType}
                list={meterTypeList}
                handleChange={handleInputChange}
              />
              <FormRowSelect
                labelText="company"
                name="selectedElectricityCompany"
                value={selectedElectricityCompany}
                list={electricityCompanyList}
                handleChange={handleInputChange}
              />{" "}
              <FormInput
                type="number"
                labelText="meter number"
                name="meterNumber"
                value={meterNumber}
                handleChange={handleInputChange}
                disabled={isValidated}
              />
            </>
          ) : (
            <>
              <FormInput
                type="number"
                labelText="meter number"
                name="meterNumber"
                value={meterNumber}
                handleChange={handleInputChange}
                disabled={isValidated}
              />
              <FormInput
                type="number"
                labelText="amount"
                name="amount"
                value={amount}
                handleChange={handleInputChange}
              />
            </>
          )}
          <p>You will be charged</p>
          <input
            className="form-input-disabled"
            disabled
            readOnly
            type="number"
            value={Number(amount) + 50}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-block m-4"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                {loadingText}
              </>
            ) : isValidated ? (
              "buy now"
            ) : (
              "validate meter"
            )}
          </button>
        </Form>

        <div className=" w-11/12 pt-4 m-auto capitalize">
          <div className="">
            <div className="p-3  m-auto border-2 rounded-lg mb-2 font-semibold bg-yellow-500">
              token: {meterToken}
            </div>
            <div className="p-3  m-auto border-2 rounded-lg mb-2 font-semibold bg-[var(--red-light)]">
              meter number :{meterNumber}{" "}
            </div>
            <div className="p-3 text-white  m-auto border-2 rounded-lg mb-2 font-semibold bg-purple-500">
              meter owner: {validatedName}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyElectricity;
