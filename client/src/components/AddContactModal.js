import React, { useEffect } from "react";
import FormInput from "./FormInput";
import FormRowSelect from "./FormRowSelect";
import { useGlobalContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddContactModal = ({
  close,
  isEditing,
  contactName: name,
  contactNumber: number,
  contactNetwork: network,
  _id,
}) => {
  const {
    networkList,
    contactNetwork,
    handleChange,
    contactName,
    contactNumber,
    addContact,
    isLoading,
    loadingText,
  } = useGlobalContext();
  const handleInputChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactNumber) return toast("All fields are required");
    if (isEditing) return addContact({ contactId: _id });
    addContact({});
  };
  useEffect(() => {
    if (name) handleChange({ name: "contactName", value: name });
    if (number) handleChange({ name: "contactNumber", value: number });
    if (network) handleChange({ name: "contactNetwork", value: network });
    else {
      handleChange({ name: "contactName", value: "" });
      handleChange({ name: "contactNumber", value: "" });
    }
  }, []);
  return (
    <div className="  bottom-0 w-[100vw] z-10 fixed bg-black/50 left-0 top-0 text-white grid items-center ">
      <form
        className="bg-white w-3/4 m-auto rounded-lg p-4 text-black max-w-[400px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center font-bold underline">
          Add Contact
        </h1>
        <FormInput
          name="contactName"
          value={contactName}
          type="text"
          labelText="Contact nickname"
          placeholder={name}
          handleChange={handleInputChange}
        />
        <FormInput
          name="contactNumber"
          value={contactNumber}
          type="number"
          labelText="Contact number"
          placeholder={number}
          handleChange={handleInputChange}
        />
        <FormRowSelect
          name="contactNetwork"
          list={networkList}
          value={contactNetwork}
          handleChange={handleInputChange}
          labelText="select the network"
        />
        <div className="flex justify-center space-x-4">
          <button disabled={isLoading} className="btn btn-primary block mt-2">
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                {loadingText}
              </>
            ) : isEditing ? (
              "update"
            ) : (
              "add"
            )}
            {/* {isEditing ? "update" : "add"} */}
          </button>
          <button
            disabled={isLoading}
            className="btn btn-danger block mt-2"
            onClick={close}
          >
            close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactModal;
