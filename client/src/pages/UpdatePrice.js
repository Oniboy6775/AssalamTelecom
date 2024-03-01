import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { useGlobalContext } from "../context/UserContext";
import { Modal } from "../components/Modal";
const UpdatePrice = () => {
  const {
    networkList,
    filteredDataOptions,
    handleChange,
    selectedDataObj,
    updatePrice,
    selectedNetwork,
    supplierList,
    updateSupplier,
    productList,
    selectedProduct,
    updateCostPrice,
    servicesType,
    selectedServiceType,
    serviceAvailabilityList,
    selectedAvailability,
    updateService,
    availableServices,
    checkServices,
    isAdmin,
    isAgent,
    notification,
    updateNotification,
    loopHole,
    selectedDataType,
    dataTypeOptions,
    isLoading,
    loadingText,
    getCostPriceAndSupplier,
    suppliers,
    costPrices,
  } = useGlobalContext();

  const [newPrice, setNewPrice] = useState({
    api: "",
    reseller: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [costPrice, setCostPrice] = useState(0);
  const [checkCostPrice, setCheckCostPrice] = useState(false);
  const [checkSupplier, setCheckSupplier] = useState(false);
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleLocalChange = (e) => {
    setNewPrice((oldDetails) => {
      return { ...oldDetails, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { price, reseller, api } = newPrice;
    if (!price && !reseller && !api)
      return toast.error("Please enter a valid value");
    updatePrice(newPrice);
    setNewPrice({
      api: "",
      reseller: "",
      price: "",
    });
  };
  const handleSupplierSubmit = (e) => {
    e.preventDefault();

    updateSupplier(selectedNetwork);
  };
  const handleCostPrice = (e) => {
    e.preventDefault();
    if (!costPrice) return toast.warning("enter a valid price");
    updateCostPrice(costPrice);
  };
  const handleServicesAvailability = (e) => {
    e.preventDefault();
    updateService();
  };
  const checkServicesAvailability = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    checkServices();
  };
  const handleNotificationMsg = (e) => {
    e.preventDefault();
    updateNotification();
  };
  const [amount, setAmount] = useState(0);
  return (
    <div className="flex flex-col md:flex-row justify-around pt-15 items-center">
      <div className="">
        {isAdmin && (
          <>
            {/* update selling price */}
            <form onSubmit={handleSubmit} className="form">
              <h2 className="title">update prices</h2>
              <FormRowSelect
                handleChange={handleInputChange}
                list={networkList}
                labelText="network"
                name="selectedNetwork"
                value={selectedNetwork}
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
                handleChange={handleInputChange}
                list={filteredDataOptions || []}
                labelText="select data to update"
                name="selectedPlan"
              />
              <div className="flex justify-between pt-10">
                <FormInput
                  placeholder={selectedDataObj.my_price}
                  labelText="price"
                  type="number"
                  name="price"
                  value={newPrice.price}
                  handleChange={handleLocalChange}
                />
                <FormInput
                  placeholder={selectedDataObj.resellerPrice}
                  labelText="resellers"
                  type="number"
                  name="reseller"
                  value={newPrice.reseller}
                  handleChange={handleLocalChange}
                />
                <FormInput
                  placeholder={selectedDataObj.apiPrice}
                  labelText="api users"
                  type="number"
                  name="api"
                  value={newPrice.api}
                  handleChange={handleLocalChange}
                />
              </div>
              <button className="btn btn-block mt-5">Update</button>
            </form>
          </>
        )}
      </div>
      <div className="w-[100%] md:w-[30%]">
        {isAdmin && (
          <>
            {/* update cost price */}
            <form onSubmit={handleCostPrice} className="form ">
              <h2 className="title">update cost price</h2>
              <FormRowSelect
                handleChange={handleInputChange}
                list={productList}
                labelText="Select product"
                name="selectedProduct"
                value={selectedProduct}
              />
              <FormInput
                labelText="cost price"
                type="number"
                name="price"
                value={costPrice}
                handleChange={(e) => setCostPrice(e.target.value)}
              />
              {checkCostPrice && (
                <Modal
                  title="cost prices"
                  type="list"
                  list={costPrices.map((e) => {
                    return { name: e.network, value: e.costPrice };
                  })}
                  buttons={[
                    {
                      name: "close",
                      handleClick: () => setCheckCostPrice(false),
                      className: "btn-danger",
                    },
                  ]}
                />
              )}

              <div className="flex justify-center gap-2">
                <div
                  onClick={() => {
                    getCostPriceAndSupplier();
                    setCheckCostPrice(true);
                  }}
                  className="btn btn-block text-center btn-danger mt-5"
                >
                  check costs
                </div>
                <button className="btn btn-block mt-5">Update</button>
              </div>
            </form>
          </>
        )}
        {(isAdmin || isAgent) && (
          <>
            <form onSubmit={handleNotificationMsg} className="form ">
              <h2 className="title">update notification</h2>
              <div className="form-row">
                <label htmlFor="" className="form-label">
                  <textarea
                    className="form-textarea"
                    placeholder={notification}
                    type="text"
                    name="notification"
                    value={notification}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <button className="btn btn-block mt-5">Update</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdatePrice;
