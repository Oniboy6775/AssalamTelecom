import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { useGlobalContext } from "../context/UserContext";
import { Modal } from "../components/Modal";
import mtn from "../images/MTN.png";
import glo from "../images/glo.png";
import airtel from "../images/airtel.png";
import Nmobile from "../images/9mobile.png";
import { useNavigate } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { EditPlan } from "../components/EditPlan";
import DeletePlanModal from "../components/DeletePlanModal";
const UpdatePriceNew = () => {
  const {
    handleChange,
    updatePrice,
    selectedNetwork,
    isAdmin,
    isLoading,
    fetchAvailablePlans,
    availablePlans,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const availableNetworks = [
    { name: "MTN", image: mtn },
    { name: "GLO", image: glo },
    { name: "AIRTEL", image: airtel },
    { name: "9MOBILE", image: Nmobile },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) navigate("/profile");
  }, [isAdmin]);
  useEffect(() => {
    fetchAvailablePlans();
  }, [selectedNetwork]);
  const [isEditing, setIsEditing] = useState();
  const [issDeleting, setIsDeleting] = useState();
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();
  const toggleEditModal = () => setIsEditing(!isEditing);
  const toggleDeleteModal = () => setIsDeleting(!issDeleting);

  const closeEditModal = () => {
    setEditId("");
    toggleEditModal();
  };
  const closeDeleteModal = () => {
    setDeleteId("");
    toggleDeleteModal();
  };
  return (
    <div className="flex flex-col md:flex-row justify-around pt-15 items-center">
      {isEditing && <EditPlan close={closeEditModal} editId={editId} />}
      {issDeleting && (
        <DeletePlanModal close={closeDeleteModal} deleteId={deleteId} />
      )}
      <div className=" sm:flex sm:flex-row sm:gap-5 sm:pl-[80px] md:pl-0 gap-4 justify-evenly items-center">
        <div className="md:w-[80%] min-h-[20vh]">
          <h2 className="text-center font-bold text-2xl normal-case">
            Select a network
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
                <div className="flex justify-center items-center">
                  <h2 className="text-center font-bold text-2xl m-2 normal-case">
                    Select a plan
                  </h2>
                  <div className="btn" onClick={toggleEditModal}>
                    Add plan
                  </div>
                </div>

                <div className="flex justify-center gap-2 flex-wrap ">
                  {availablePlans.map((e, index) => {
                    return (
                      <>
                        <div
                          className="p-2 border text-center w-[45%] md:w-[30%] font-bold text-lg "
                          key={e._id || index}
                        >
                          <div className="bg-[var(--primary-300)]">
                            <p className="text-[var(--primary-600)]">
                              {e.planType}
                            </p>
                          </div>
                          <div className="div gap-1">
                            <p>{e.planName}</p>
                            <div className="flex justify-center gap-2">
                              <button
                                className="btn"
                                onClick={() => {
                                  if (selectedNetwork == "select") {
                                    toast("Please select a network");
                                    return;
                                  }
                                  setEditId(e._id);
                                  toggleEditModal();
                                }}
                              >
                                <RiEdit2Fill />
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  if (selectedNetwork == "select") {
                                    toast("Please select a network");
                                    return;
                                  }
                                  setDeleteId(e._id);
                                  toggleDeleteModal();
                                }}
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                            <p
                              className={`capitalize text-${
                                e.isAvailable ? "green" : "red"
                              }-600`}
                            >
                              {e.isAvailable ? "available " : "unavailable"}
                            </p>
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
      </div>
    </div>
  );
};

export default UpdatePriceNew;
