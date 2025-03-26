import React, { memo, useState } from "react";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "./FormInput";
import { RiContactsBook2Fill } from "react-icons/ri";
import SelectContactModal from "./SelectContactModal";

const BuyDataModal = memo(() => {
  const { handleChange, phoneNumber, contactName, selectedNetwork } =
    useGlobalContext();
  const [isSelectingContact, setIsSelectingContact] = useState(false);
  const [addToContact, setAddToContact] = useState(false);

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
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <div>
      {/* {isSelectingContact && (
        <SelectContactModal close={() => setIsSelectingContact(false)} />
      )} */}
      <div className="bg-green-200 text-green-800 rounded">
        <p>
          You are about to purchase {selectedNetwork} data to {phoneNumber}
        </p>
      </div>
      <div className="flex justify-between w-full items-center">
        <FormInput
          type="number"
          labelText="phone number"
          name="phoneNumber"
          value={phoneNumber}
          handleChange={handleInputChange}
          className="text-left"
        />
        {/* <div
          className="btn mt-6"
          onClick={() => setIsSelectingContact((prev) => !prev)}
        >
          <RiContactsBook2Fill className="text-2xl" />
        </div> */}
      </div>
      {/* <div className="form-row">
        <label htmlFor="" className="form-label mt-3">
          <input
            type="checkbox"
            name="contact"
            className="accent-slate-500 mr-2"
            onChange={handleCheckBoxInput}
          />
          <span>Add number to contact list</span>
        </label>
      </div> */}
      {/* {addToContact && (
        <FormInput
          handleChange={handleInputChange}
          type="text"
          value={contactName}
          name="contactName"
          labelText="contact nickname"
        />
      )} */}
    </div>
  );
});

export default BuyDataModal;
