import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BiReceipt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import contact from "../images/avatar.svg";
import { useGlobalContext } from "../context/UserContext";
import AddContactModal from "../components/AddContactModal";
import moment from "moment";

const Contacts = () => {
  const { handleChange, deleteContact, contactList, fetchContact, isLoading } =
    useGlobalContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const navigate = useNavigate();
  const nextPage = ({ to, phoneNumber, network }) => {
    handleChange({ name: "phoneNumber", value: phoneNumber });
    handleChange({ name: "selectedNetwork", value: network });
    navigate(`/profile/${to}`);
  };
  const closeModal = () => {
    handleChange({ name: "phoneNumber", value: "" });
    handleChange({ name: "selectedNetwork", value: "MTN" });
    setIsAdding(false);
    setIsEditing(false);
    setSelectedContact({});
  };
  useEffect(() => {
    fetchContact();
  }, []);
  return (
    <div className=" md:ml-[6rem] bg-white p-4  ">
      {isAdding && (
        <AddContactModal
          close={closeModal}
          {...selectedContact}
          isAdding={isAdding}
          isEditing={isEditing}
        />
      )}
      <h3 className="text-center title underline underline-offset-4 ">
        My contacts
      </h3>
      <p className="text-center font-extrabold text-red-500 capitalize text-sm">
        contacts are deleted automatically after 30 days of inactivity
      </p>
      {/* contact card */}
      <section className="md:flex flex-wrap md:space-x-3 lg:justify-center">
        {contactList.length < 1 ? (
          <div className="">
            <div className="loading "></div>
            <p className="text-center font-semibold ">No contacts yet</p>
          </div>
        ) : (
          contactList.map((e, index) => {
            return (
              <div
                key={index}
                className="  md:w-[48%] lg:w-[30%] sm:last:mb-[5rem] md:last:mb-6 shadow-md mb-6 p-4 border-2 border-[var(--primary-200)] rounded-lg"
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
                        {e.contactName}
                      </p>
                      <p className="">
                        {e.contactNumber} [{e.contactNetwork}]
                      </p>
                    </div>

                    <div className="flex  space-x-3 justify-self-end m-auto">
                      <button
                        disabled={isLoading}
                        className="btn"
                        onClick={() => {
                          setSelectedContact({ ...e });
                          setIsEditing(true);
                          setIsAdding(true);
                        }}
                      >
                        <AiFillEdit className="text-xl" />
                      </button>
                      <button
                        disabled={isLoading}
                        className="btn btn-danger"
                        onClick={() => deleteContact({ contactId: e._id })}
                      >
                        <MdOutlineDeleteForever className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    disabled={isLoading}
                    className="btn"
                    onClick={() =>
                      nextPage({
                        to: "buyAirtime",
                        phoneNumber: e.contactNumber,
                        network: e.contactNetwork,
                      })
                    }
                  >
                    {" "}
                    <AiOutlinePlus className="text-2xl mr-2" />
                    airtime
                  </button>
                  <button
                    disabled={isLoading}
                    className="btn-hipster btn"
                    onClick={() =>
                      nextPage({
                        to: "buyData",
                        phoneNumber: e.contactNumber,
                        network: e.contactNetwork,
                      })
                    }
                  >
                    <AiOutlinePlus className="text-2xl mr-2" />
                    data
                  </button>
                  <button
                    disabled={isLoading}
                    className="btn"
                    onClick={() =>
                      nextPage({
                        to: "transactions",
                        phoneNumber: e.contactNumber,
                      })
                    }
                  >
                    {" "}
                    <BiReceipt className="text-2xl mr-2" />
                    transactions
                  </button>
                </div>
                <p className="text-center mt-2 text-green-500">
                  Active since {moment(e.createdAt).startOf("minute").fromNow()}
                </p>
              </div>
            );
          })
        )}
      </section>

      {/* Add contact button */}
      <div className="text-center fixed top-[90%] left-[40%] md:left-[50%]">
        <button
          disabled={isLoading}
          className="btn btn-danger font-extrabold"
          onClick={() => {
            setIsAdding(!isAdding);
          }}
        >
          <BiUserPlus className="text-4xl md:text-6xl mr-2" />
          Add contact
        </button>
      </div>
    </div>
  );
};

export default Contacts;
