import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "./FormInput";
import FormToggle from "./FormToggle";

export const EditPlan = ({ close, editId }) => {
  const { availablePlans, setUpPlan, selectedNetwork } = useGlobalContext();
  const [planToEdit, setPlanToEdit] = useState({});
  let currentPlan = {};
  useEffect(() => {
    if (editId) {
      currentPlan = availablePlans.find((e) => e._id == editId);
      setPlanToEdit(currentPlan);
    } else setPlanToEdit({});
    return;
  }, [editId]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPlanToEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    const payload = {
      planNetwork: selectedNetwork,
      _id: planToEdit._id,
      planName: planToEdit.plan,
      planType: planToEdit.planType,
      planVolumeRatio: planToEdit.volumeRatio,
      planValidity: planToEdit.planValidity,
      planId: planToEdit.planId,
      smartEarnerPrice: planToEdit.smartEarnerPrice,
      resellerPrice: planToEdit.resellerPrice,
      apiPrice: planToEdit.apiPrice,
      planCostPrice: planToEdit.planCostPrice,
      planAvailability: planToEdit.isAvailable,
      partnerPrice: planToEdit.partnerPrice || planToEdit.resellerPrice,
    };
    if (!editId) {
      setUpPlan({ action: "add", payload });
    } else setUpPlan({ action: "edit", payload });
    close();
  };
  return (
    <>
      <Modal
        title={editId ? "edit plan" : "Add new plan"}
        children={
          <Content handleChange={handleChange} planToEdit={planToEdit} />
        }
        buttons={[
          { name: "close", className: "btn-danger", handleClick: close },
          {
            name: editId ? "update plan" : "add plan",
            handleClick: handleSubmit,
          },
        ]}
      />
    </>
  );
};
const Content = ({ planToEdit, handleChange }) => {
  return (
    <div className="text-left">
      <div className="flex">
        <FormInput
          labelText=" id"
          type="text"
          name="planId"
          placeholder={planToEdit.planId || "732"}
          value={planToEdit.planId}
          handleChange={handleChange}
        />
        <FormInput
          labelText=" type"
          name="planType"
          type="text"
          placeholder={planToEdit.planType || "AWUF"}
          value={planToEdit.planType}
          handleChange={handleChange}
        />
        <FormInput
          labelText="plan Name"
          type="text"
          name="plan"
          placeholder={planToEdit.plan || "12GB"}
          value={planToEdit.plan}
          handleChange={handleChange}
        />
      </div>

      <div className="flex">
        <FormInput
          labelText=" Volume"
          type="number"
          name="volumeRatio"
          placeholder={planToEdit.volumeRatio || "12"}
          value={planToEdit.volumeRatio}
          handleChange={handleChange}
        />
        <FormInput
          labelText="validity"
          type="text"
          name="planValidity"
          placeholder={planToEdit.planValidity || "10 days"}
          value={planToEdit.planValidity}
          handleChange={handleChange}
        />
        <FormInput
          labelText=" cost price "
          type="text"
          name="planCostPrice"
          placeholder={planToEdit.planCostPrice || "3000"}
          value={planToEdit.planCostPrice}
          handleChange={handleChange}
        />
      </div>
      <div className="flex">
        <FormInput
          labelText="price"
          type="text"
          name="smartEarnerPrice"
          placeholder={planToEdit.smartEarnerPrice || "3300"}
          value={planToEdit.smartEarnerPrice}
          handleChange={handleChange}
        />
        <FormInput
          labelText="reseller "
          type="text"
          name="resellerPrice"
          placeholder={planToEdit.resellerPrice || "3200"}
          value={planToEdit.resellerPrice}
          handleChange={handleChange}
        />
        {planToEdit.partnerPrice && (
          <FormInput
            labelText="partner"
            type="text"
            name="partnerPrice"
            placeholder={planToEdit.partnerPrice || "3150"}
            value={planToEdit.partnerPrice}
            handleChange={handleChange}
          />
        )}
        <FormInput
          labelText="api "
          type="text"
          name="apiPrice"
          placeholder={planToEdit.apiPrice || "3100"}
          value={planToEdit.apiPrice}
          handleChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between ">
        <p className="capitalize">toggle availability</p>
        <FormToggle
          toggled={planToEdit.isAvailable}
          setToggle={() =>
            handleChange({
              target: { name: "isAvailable", value: !planToEdit.isAvailable },
            })
          }
        />
      </div>
    </div>
  );
};
