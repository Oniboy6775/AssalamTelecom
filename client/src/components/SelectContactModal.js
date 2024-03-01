import React, { useEffect } from "react";
import avatar from "../images/avatar.svg";
import { useGlobalContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const SelectContactModal = ({ close }) => {
  const navigate = useNavigate();
  const { contactList, fetchContact, handleChange } = useGlobalContext();
  useEffect(() => {
    fetchContact();
  }, []);
  const selectContact = ({ contactNumber, contactNetwork }) => {
    handleChange({ name: "selectedNetwork", value: contactNetwork });
    handleChange({ name: "phoneNumber", value: contactNumber });
    close();
  };
  return (
    <div className=" bottom-0 w-[100vw] z-10 fixed bg-black/50 left-0 top-0 text-white grid items-center ">
      <div className="bg-white w-3/4 m-auto rounded-lg p-4 text-black max-w-[400px]">
        <p className="title underline">Select contact</p>
        {contactList < 1 ? (
          <>
            <div className="loading "></div>
            <p className="text-center font-semibold">No contacts yet</p>
          </>
        ) : (
          contactList.map((e, index) => {
            return (
              <div className=" divide-y-2 ">
                <div
                  key={index}
                  className="flex p-2 hover:bg-black/10 rounded-md hover:cursor-pointer"
                  onClick={() => selectContact({ ...e })}
                >
                  <div className="w-[50px] mr-4">
                    <img src={avatar} alt="avatar" className="img" />
                  </div>
                  <div className="">
                    <p className="font-extrabold">{e.contactName}</p>
                    <p>
                      {e.contactNumber} [{e.contactNetwork}]
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div className="flex justify-center gap-4">
          <button onClick={close} className=" mt-2 btn btn-danger ">
            close
          </button>
          <button
            onClick={() => {
              navigate("/profile/contacts");
            }}
            className=" mt-2 btn  "
          >
            add contact
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default SelectContactModal;
