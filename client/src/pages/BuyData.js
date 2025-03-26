import React, { useEffect, useLayoutEffect, useState } from "react";
import FormRowSelect from "../components/FormRowSelect";
import FormInput from "../components/FormInput";

import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGlobalContext } from "../context/UserContext";
import { RiContactsBook2Fill, RiMoonCloudyLine } from "react-icons/ri";
import SelectContactModal from "../components/SelectContactModal";
import { Modal } from "../components/Modal";
import mtn from "../images/MTN.png";
import glo from "../images/glo.png";
import airtel from "../images/airtel.png";
import Nmobile from "../images/9mobile.png";
import BuyDataModal from "../components/BuyDataModal";
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
    contactName,
    dataTypeOptions,
    selectedDataType,
    networkStatus,
    isCheckingNetworkStatus,
    checkNetworkStatus,
    testLoophole,
    isAdmin,
    fetchAvailablePlans,
    availablePlans,
  } = useGlobalContext();
  const [addToContact, setAddToContact] = useState(false);

  const handleSubmit = () => {
    const { planId } = selectedDataObj;
    if (addToContact && !contactName)
      return toast.warning("Please enter a nickname for the number");

    if (!phoneNumber || !selectedNetwork || !planId) {
      toast.warning("Please provide all values");
      return;
    }
    buyData({ planId, selectedNetwork, phoneNumber });
  };

  const [isCheckingNetwork, setIsCheckingNetwork] = useState(false);
  useLayoutEffect(() => {
    handleChange({ name: "selectedNetwork", value: "select" });
  }, []);
  const availableNetworks = [
    { name: "MTN", image: mtn },
    { name: "GLO", image: glo },
    { name: "AIRTEL", image: airtel },
    { name: "9MOBILE", image: Nmobile },
  ];
  const [showModal, setShowModal] = useState(false);
  const toggleConfirmationModal = () => setShowModal(!showModal);
  const [selectedDataObj, setSelectedDataObj] = useState({});
  useEffect(() => {
    if (showModal) setShowModal(false);
    fetchAvailablePlans();
  }, [selectedNetwork]);
  // console.log(availablePlans);
  return (
    <div className=" bg-white md:ml-[6rem]">
      {showModal && (
        <Modal
          title="Confirmation"
          children={<BuyDataModal />}
          buttons={[
            {
              name: "buy now",
              handleClick: () => {
                toggleConfirmationModal();
                handleSubmit();
              },
            },
            {
              name: "close",
              handleClick: toggleConfirmationModal,
              className: "btn-danger",
            },
          ]}
        />
      )}
      <h2 className="title underline">Buy data</h2>
      <div className=" sm:flex sm:flex-row sm:gap-5 sm:pl-[80px] md:pl-0 gap-4 justify-evenly items-center">
        <div className="md:w-[80%] min-h-[20vh]">
          <h2 className="text-center font-bold text-2xl normal-case">
            Select a network{" "}
          </h2>
          <section className="flex gap-4 justify-center ">
            {availableNetworks.map((e) => {
              return (
                <div
                  className=""
                  key={e.name}
                  onClick={() =>
                    handleChange({ name: "selectedNetwork", value: e.name })
                  }
                >
                  <img
                    src={e.image}
                    className={`img object-cover  max-w-[70px] ${
                      e.name == selectedNetwork
                        ? "opacity-100  border-b-4  border-[var(--primary-300)]  "
                        : "opacity-20"
                    } hover:opacity-90 transition duration-300`}
                  />
                </div>
              );
            })}
          </section>
          {/* each plan */}
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            selectedNetwork != "select" &&
            availablePlans?.length > 0 && (
              <>
                <h2 className="text-center font-bold text-2xl m-2 normal-case">
                  Select a plan
                </h2>
                <div className="flex justify-center gap-2 flex-wrap ">
                  {availablePlans
                    .filter((e) => e.isAvailable)
                    .map((e) => {
                      return (
                        <>
                          <div
                            className="p-2 border text-center w-[45%] font-bold text-lg "
                            key={e.planId}
                          >
                            <div className="bg-[var(--primary-300)]">
                              <p className="text-[var(--primary-600)]">
                                {e.planType}
                              </p>
                            </div>
                            <div className="div">
                              <p>{e.planName}</p>
                              <button
                                className="btn"
                                onClick={() => {
                                  if (selectedNetwork == "select") {
                                    toast("Please select a network");
                                    return;
                                  }
                                  setSelectedDataObj(e);
                                  toggleConfirmationModal();
                                }}
                              >
                                Buy
                              </button>
                              <p className="text-green-600">₦{e.planAmount}</p>
                            </div>
                            <div className="bg-[var(--primary-600)] text-white">
                              <p>{e.planValidity}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            )
          )}
        </div>

        <div className=" w-11/12 pt-4 m-auto self-baseline">
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
