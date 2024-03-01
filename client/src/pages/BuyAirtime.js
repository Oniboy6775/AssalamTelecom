import React, { useState } from "react";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { toast } from "react-toastify";
import { RiContactsBook2Fill } from "react-icons/ri";
import SelectContactModal from "../components/SelectContactModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function BuyAirtime() {
  const {
    user,
    phoneNumber,
    networkList,
    selectedNetwork,
    handleChange,
    amount,
    buyAirtime,
    isLoading,
    loadingText,
    contactName,
  } = useGlobalContext();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const [addToContact, setAddToContact] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addToContact && !contactName)
      return toast.warning("Please enter a nickname for the number");
    if (!phoneNumber || !amount) {
      toast.warning("All fields are required");
      return;
    }
    if (phoneNumber.length !== 11) {
      toast.warning("Please check the phone number entered");
      return;
    }
    if (amount < 100) {
      toast.warning("Minimum purchase is ₦100");
      return;
    }
    buyAirtime();
  };
  const [isSelectingContact, setIsSelectingContact] = useState(false);
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
  return (
    <div className=" md:ml-[6rem] bg-white p-4  ">
      <h4 className="underline title">purchase AIRTIME</h4>
      <div className=" sm:flex  sm:flex-row sm:pl-[100px] md:pl-0 gap-4 justify-evenly items-center">
        {isSelectingContact && (
          <SelectContactModal close={() => setIsSelectingContact(false)} />
        )}
        <form className="form" onSubmit={handleSubmit}>
          <FormRowSelect
            name="selectedNetwork"
            value={selectedNetwork}
            list={networkList}
            handleChange={handleInputChange}
          />
          <div className="flex justify-between w-full items-center">
            <FormInput
              type="number"
              labelText="phone number"
              name="phoneNumber"
              value={phoneNumber}
              placeHolder="phone number"
              handleChange={handleInputChange}
            />
            <div
              className="btn mt-6"
              onClick={() => setIsSelectingContact(!isSelectingContact)}
            >
              <RiContactsBook2Fill className="text-2xl" />
            </div>
          </div>
          <FormInput
            type="number"
            labelText="amount"
            name="amount"
            value={amount}
            placeHolder="amount"
            handleChange={handleInputChange}
          />
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
              value={
                user.userType === "reseller" ? amount * 0.98 : amount * 0.99
              }
            />
          </div>
          <button className="btn btn-block" type="submit" disabled={isLoading}>
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
          <p className="text-center font-semibold text-lg  underline">
            Balance checking codes
          </p>
          <div className="">
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-yellow-500">
              MTN *310#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-purple-500">
              9Mobile *223#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-red-200">
              Airtel *310#
            </div>
            <div className="p-3 text-center m-auto border-2 rounded-lg mb-2 font-semibold bg-lime-500">
              Glo *310#.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyAirtime;
