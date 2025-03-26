import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useGlobalContext } from "../context/UserContext";
import { toast } from "react-toastify";

const DeletePlanModal = ({ deleteId, close }) => {
  const { availablePlans, setUpPlan } = useGlobalContext();

  let currentPlan = {};
  const [planToDelete, setPlanToDelete] = useState();
  useEffect(() => {
    if (deleteId) {
      currentPlan = availablePlans.find((e) => e._id == deleteId);
      setPlanToDelete(currentPlan);
      // toast(deleteId);
    }

    return;
  }, [deleteId]);
  const handleSubmit = () => {
    setUpPlan({ action: "delete", payload: { _id: planToDelete._id } });
    close();
  };
  return (
    <>
      <Modal
        title={deleteId ? "edit plan" : "Add new plan"}
        children={<Content planToDelete={planToDelete} />}
        buttons={[
          { name: "close", className: "btn-danger", handleClick: close },
          {
            name: "delete plan",
            handleClick: handleSubmit,
          },
        ]}
      />
    </>
  );
};

export default DeletePlanModal;
const Content = ({ planToDelete }) => {
  const planName =
    planToDelete?.plan_network +
    " " +
    planToDelete?.planType +
    " " +
    planToDelete?.planName +
    " " +
    planToDelete?.planValidity;

  return (
    <div>
      <p>
        Are you sure you want to delete{" "}
        <span className="text-red-400">{planName || ""} validity</span>
      </p>
    </div>
  );
};
