import React, { useState } from "react";
import FormRowSelect from "../components/FormRowSelect";
import FormInput from "../components/FormInput";

import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGlobalContext } from "../context/UserContext";
import { RiContactsBook2Fill } from "react-icons/ri";
import SelectContactModal from "../components/SelectContactModal";
function BuyData() {
  const {
    networkList,
    selectedNetwork,
    handleChange,
    selectedPlan,
    phoneNumber,
    buyData,
    filteredDataOptions,
    isLoading,
    loadingText,
    selectedDataObj,
    contactName,
    dataTypeOptions,
    selectedDataType,
  } = useGlobalContext();
  const [addToContact, setAddToContact] = useState(false);
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const splittedPlan = selectedNetwork.split(" ");
    if (addToContact && !contactName)
      return toast.warning("Please enter a nickname for the number");
    if (phoneNumber.length != 11)
      return toast.warning("Please check the phone number entered");
    if (!phoneNumber || splittedPlan[0] !== selectedNetwork) {
      toast.warning("Please provide all values");
      return;
    }
    buyData();
  };
  const handleCheckBoxInput = (e) => {
    if (e.target.checked) {
      setAddToContact(true);
      handleChange({ name: "contactNumber", value: phoneNumber });
      handleChange({ name: "contactNetwork", value: selectedNetwork });
    } else {
      setAddToContact(false);
      handleChange({ name: "contactName", value: "" });
      handleChange({ name: "contactNumber", value: "" });
      handleChange({ name: "contactNetwork", value: "" });
    }
  };
  const [isSelectingContact, setIsSelectingContact] = useState(false);
  return (
    <div className=" md:ml-[6rem] bg-white p-4  ">
      <h4 className="underline title">purchase DATA</h4>
      <div className=" sm:flex sm:flex-row sm:gap-5 sm:pl-[80px] md:pl-0 gap-4 justify-evenly items-center">
        {isSelectingContact && (
          <SelectContactModal close={() => setIsSelectingContact(false)} />
        )}
        <form className="form" onSubmit={handleSubmit}>
          <FormRowSelect
            labelText="Select Network"
            name="selectedNetwork"
            value={selectedNetwork}
            list={networkList}
            handleChange={handleInputChange}
          />
          {selectedNetwork === "MTN" && (
            <FormRowSelect
              labelText="select data type"
              name="selectedDataType"
              value={selectedDataType}
              list={isLoading ? [loadingText] : dataTypeOptions}
              handleChange={handleInputChange}
            />
          )}

          <FormRowSelect
            labelText="select Plan"
            name="selectedPlan"
            value={selectedPlan}
            list={isLoading ? [loadingText] : filteredDataOptions}
            handleChange={handleInputChange}
          />
          <div className="flex justify-between w-full items-center">
            <FormInput
              type="number"
              labelText="phone number"
              name="phoneNumber"
              value={phoneNumber}
              handleChange={handleInputChange}
            />
            <div
              className="btn mt-6"
              onClick={() => setIsSelectingContact(!isSelectingContact)}
            >
              <RiContactsBook2Fill className="text-2xl" />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="" className="form-label mt-3">
              <input
                type="checkbox"
                name="contact"
                className="accent-slate-500 mr-2"
                onChange={handleCheckBoxInput}
              />
              <span>Add number to contact list</span>
            </label>
          </div>
          {addToContact && (
            <FormInput
              handleChange={handleInputChange}
              type="text"
              value={contactName}
              name="contactName"
              labelText="contact nickname"
            />
          )}
          <div className="text-center">
            <p>You will be charged</p>

            <input
              className="form-input-disabled"
              disabled
              readOnly
              type="number"
              value={selectedDataObj.plan_amount}
              onChange={() => console.log("")}
            />
          </div>
          <button disabled={isLoading} type="submit" className="btn btn-block">
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                {loadingText}
              </>
            ) : (
              "buy now"
            )}
          </button>
        </form>
        <div className=" w-11/12 pt-4 m-auto">
          <div className="">
            <p className="text-center font-semibold text-lg  underline">
              Balance checking codes
            </p>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-yellow-500">
              MTN [SME] *323*4#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-[var(--red-light)]">
              MTN [Gifting] *131*4# or *460*260#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-purple-500">
              9mobile [Gifting] *323#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-red-200">
              Airtel *323#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-lime-500">
              Glo *127*0# or *323#.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyData;
